import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { DEFAULTS, CLAUDE_VERBS, validatePreferences, spinnerCSS, cssString, durationLabel, selectVerb, SPINNER_ACCENT } from '../shared.js';
import { createSpinnerService, boundedJSON } from '../service.js';

test('imports 179 unique source verbs plus the native verb', () => {
  assert.equal(CLAUDE_VERBS.length, 179); assert.equal(new Set(CLAUDE_VERBS).size, 179);
  assert.equal(DEFAULTS.verbs.length, 180);
  for (const word of ["Beboppin'", 'Flambéing', 'Sautéing', 'Zigzagging', 'Channelling', 'Photosynthesizing']) assert.ok(CLAUDE_VERBS.includes(word));
});
test('one-second replies start on different verbs for consecutive Turns', () => {
  const words = Array.from({ length: DEFAULTS.verbs.length }, (_, turn) => selectVerb(DEFAULTS.verbs, turn + 1, 1000, 6));
  assert.equal(words[0], 'Accomplishing');
  assert.equal(new Set(words).size, DEFAULTS.verbs.length);
  assert.equal(selectVerb(DEFAULTS.verbs, 1, 0, 6), selectVerb(DEFAULTS.verbs, 1, 5999, 6));
  assert.equal(selectVerb(DEFAULTS.verbs, 1, 6000, 6), 'Actioning');
  assert.equal(selectVerb(DEFAULTS.verbs, 1, 12000, 6), 'Actualizing');
  assert.equal(selectVerb(DEFAULTS.verbs, 1, -1000, 6), 'Accomplishing');
  assert.equal(selectVerb(['Only'], 500, 30000, 6), 'Only');
  assert.equal(selectVerb([], 1, 1000, 6), '');
});
test('validates bounds and deduplicates whitespace', () => {
  assert.deepEqual(validatePreferences({ verbs:[' Testando ', 'Testando'] }).verbs, ['Testando']);
  for (const patch of [{size:11},{size:41},{size:NaN},{interval:1},{interval:61},{verbs:[]},{verbs:['a\nb']},{verbs:['a'.repeat(81)]},{verbs:Array(501).fill('a')},{icon:'bad'},{image:'https://example.com/icon.png'},{image:'data:image/svg+xml;base64,PHN2Zz4='},{emoji:''},{enabled:'yes'},{unexpected:true}]) assert.throws(() => validatePreferences(patch));
  assert.throws(() => validatePreferences({icon:'image'}));
  assert.equal(validatePreferences({icon:'image',image:'data:image/png;base64,aGVsbG8='}).icon, 'image');
});
test('CSS escapes untrusted words, preserves holding, and disables cleanly', () => {
  const p = validatePreferences({icon:'emoji',emoji:'🦊',verbs:['";}</style><script>bad()']});
  const css = spinnerCSS(p,p.verbs[0],'2m 18s',true);
  assert.ok(css.includes('[data-chat-running]:not([data-holding])'));
  assert.ok(css.includes('há 2m 18s')); assert.ok(!css.includes('</style>'));
  assert.equal(spinnerCSS({...p,enabled:false},'x','1s',false),'');
  assert.ok(!spinnerCSS(DEFAULTS,'Testing','1s',false).includes('mask:'));
  assert.equal(cssString('\n"\\<'), '"\\a \\22 \\5c \\3c "');
  for (const icon of ['spark','orbit','code']) assert.ok(spinnerCSS({...DEFAULTS,icon},'Test','',false).includes('data:image/svg+xml'));
});
test('running label and monochrome icon follow the active palette instead of native blue', async () => {
  const root = '[data-chat-running]:not([data-holding])';
  for (const icon of ['native', 'spark', 'orbit', 'code']) {
    const css = spinnerCSS({ ...DEFAULTS, icon }, 'Testing', '1s', false);
    assert.ok(css.includes(`${root}{color:${SPINNER_ACCENT}!important}`));
    assert.ok(css.includes(`${root} > span:last-child{color:inherit!important}`));
    assert.ok(css.includes(`${root} > span:last-child > :first-child{color:inherit!important;`));
    assert.ok(css.includes('color:inherit;-webkit-text-fill-color:currentColor'));
  }
  assert.equal(SPINNER_ACCENT, 'var(--dsw-alias-state-business-primary)');
  const client = await readFile(new URL('../client-source.js', import.meta.url), 'utf8');
  assert.ok(client.includes('color:${SPINNER_ACCENT};font-size:16px'));
  assert.ok(!client.includes('--dsw-alias-brand-primary'));
});
test('duration handles subsecond, minutes, hours and negative input', () => {
  assert.equal(durationLabel(0),'1s'); assert.equal(durationLabel(-1000),'1s'); assert.equal(durationLabel(138000),'2m 18s'); assert.equal(durationLabel(3600000),'60m 0s');
});
test('shared panel/tool operations persist and notify accepted state', async () => {
  let persisted = {};
  const service = createSpinnerService(() => persisted, async next => { persisted = next; });
  const notifications = [];
  const unsubscribe = service.subscribe(p => notifications.push(p));
  const initial = await service.operate({action:'read'});
  assert.equal(initial.preferences.verbs.length,180);
  const panel = await service.operate({action:'update',patch:{icon:'emoji',emoji:'🚀',verbs:['Testando']}});
  const tool = await service.operate({action:'read'});
  assert.deepEqual(panel,tool); assert.equal(notifications.length,1);
  const restored = await service.operate({action:'claude'});
  assert.equal(restored.preferences.icon,'emoji'); assert.equal(restored.preferences.verbs.length,180);
  assert.deepEqual((await service.operate({action:'reset'})).preferences,validatePreferences(DEFAULTS));
  unsubscribe(); await service.operate({action:'reset'}); assert.equal(notifications.length,3);
});
test('failed persistence does not publish success and queue recovers', async () => {
  let persisted = {}; let failing = true; let notifications = 0;
  const service = createSpinnerService(() => persisted, async p => { if (failing) throw new Error('read-only'); persisted = p; });
  service.subscribe(() => notifications++);
  await assert.rejects(service.operate({action:'update',patch:{emoji:'🦊'}}),/read-only/);
  assert.equal(notifications,0); assert.equal(service.snapshot().emoji,'✨');
  failing = false;
  await Promise.all([service.operate({action:'update',patch:{emoji:'🦊'}}),service.operate({action:'update',patch:{interval:4}})]);
  assert.equal(persisted.emoji,'🦊'); assert.equal(persisted.interval,4);
  await assert.rejects(service.operate({action:'update',patch:{size:0}}));
  await assert.rejects(service.operate({action:'oops'}));
});
test('request parser bounds actual bytes, rejects wrong types and malformed JSON', async () => {
  const req = text => new Request('http://localhost/api', {method:'POST',headers:{'content-type':'application/json'},body:text});
  assert.deepEqual(await boundedJSON(req('{"action":"read"}')), {action:'read'});
  await assert.rejects(boundedJSON(req('not json')));
  await assert.rejects(boundedJSON(req('x'.repeat(11)),10), /too large/);
  await assert.rejects(boundedJSON(new Request('http://localhost/api',{method:'POST',body:'{}'})), /application\/json/);
});
test('distribution exports and localized metadata exist with an original small SVG', async () => {
  const manifest = JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
  assert.equal(manifest.engines.dsh, '>=0.2.2-rc.1 <0.2.3-0');
  const lock = JSON.parse(await readFile(new URL('../package-lock.json',import.meta.url),'utf8'));
  assert.equal(lock.packages[''].engines.dsh, manifest.engines.dsh);
  for (const [key, value] of Object.entries(manifest.exports)) {
    if (key.includes('*')) continue;
    assert.ok((await stat(new URL('../'+value,import.meta.url))).isFile());
  }
  for (const language of ['en','pt','pt-BR']) {
    const data = JSON.parse(await readFile(new URL('../locale/'+language+'.json',import.meta.url),'utf8'));
    assert.ok(data.meta.title && data.meta.description);
  }
  const svg = await readFile(new URL('../icon.svg',import.meta.url),'utf8');
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')); assert.ok(svg.length < 256*1024);
  const browser = await readFile(new URL('../client.js',import.meta.url),'utf8');
  assert.ok(!browser.includes("require('@deepseek-ai/"));
  assert.ok(!browser.includes('MutationObserver')); assert.ok(!browser.includes('document.body'));
});
