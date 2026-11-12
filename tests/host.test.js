import { test } from 'node:test';
import assert from 'node:assert/strict';
import { apply, Config } from '../index.js';

function mount() {
  let raw = {};
  let rejectSave = false;
  const routes = new Map();
  const tools = new Map();
  const cleanup = [];
  const ctx = {
    fiber: { entry: {} },
    provide() {},
    get(name) { if (name === 'configEditor') return { async edit(_entry, change) { if (rejectSave) throw new Error('Read-only profile'); raw = change(raw); } }; },
    effect(fn) { const disposer = fn(); if (disposer) cleanup.push(disposer); return disposer; },
    connection: { fetch: { register(route) { routes.set(route.path,route); return async () => routes.delete(route.path); } } },
    tools: { register(tool) { tools.set(tool.name,tool); return () => tools.delete(tool.name); } }
  };
  apply(ctx, { preferences: { get: () => raw.preferences } });
  return { routes, tool:tools.get('spinner_studio'), fail:()=>{rejectSave=true;}, async dispose() { for (const f of cleanup.reverse()) await f(); } };
}
const request = action => new Request('http://localhost/api/plugins/spinner-studio', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(action) });

test('real Config supplies volatile defaults', () => {
  const config = Config({});
  assert.equal(config.preferences.get().verbs.length,180);
});
test('HTTP panel and agent tool share success and failure semantics', async () => {
  const m = mount();
  try {
    const route = m.routes.get('/api/plugins/spinner-studio');
    const changed = await route.fetch(request({action:'update',patch:{icon:'emoji',emoji:'🦊',verbs:['Testando']}}));
    assert.equal(changed.status,200);
    const panel = await changed.json();
    const tool = await m.tool.execute({action:'read'});
    assert.deepEqual(tool.preferences,panel.preferences);
    assert.equal(tool.verbCount,1);
    await m.tool.execute({action:'update',patch:{icon:'spark'}});
    assert.equal((await (await route.fetch(new Request('http://localhost/api/plugins/spinner-studio'))).json()).preferences.icon,'spark');
    assert.equal((await route.fetch(request({action:'update',patch:{interval:0}}))).status,400);
    await assert.rejects(m.tool.execute({action:'update',patch:{interval:0}}));
    m.fail();
    assert.equal((await route.fetch(request({action:'update',patch:{icon:'native'}}))).status,400);
    await assert.rejects(m.tool.execute({action:'update',patch:{icon:'native'}}),/Read-only profile/);
    assert.equal((await m.tool.execute({action:'read'})).preferences.icon,'spark');
  } finally { await m.dispose(); }
});
test('SSE publishes accepted tool changes and cleans up on disconnect', async () => {
  const m = mount();
  const controller = new AbortController();
  try {
    const response = await m.routes.get('/api/plugins/spinner-studio/watch').fetch(new Request('http://localhost/api/plugins/spinner-studio/watch',{signal:controller.signal}));
    assert.equal(response.headers.get('content-type'),'text/event-stream');
    const reader = response.body.getReader();
    const decode = value => JSON.parse(new TextDecoder().decode(value).slice(6));
    assert.equal(decode((await reader.read()).value).preferences.icon,'native');
    await m.tool.execute({action:'update',patch:{icon:'code'}});
    assert.equal(decode((await reader.read()).value).preferences.icon,'code');
    controller.abort();
    assert.equal((await reader.read()).done,true);
    reader.releaseLock();
  } finally { await m.dispose(); }
});
