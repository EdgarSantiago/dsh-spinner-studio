import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const manifest = JSON.parse(read('package.json'));
const repo = 'EdgarSantiago/dsh-spinner-studio';

test('public source identity retains private npm guard and exact runtime bounds', () => {
  assert.equal(manifest.name, '@local/dsh-spinner-studio');
  assert.equal(manifest.version, '1.1.0');
  assert.equal(manifest.private, true);
  assert.equal(manifest.license, 'MIT');
  assert.equal(manifest.repository.url, `https://github.com/${repo}.git`);
  assert.equal(manifest.homepage, `https://github.com/${repo}#readme`);
  assert.equal(manifest.bugs.url, `https://github.com/${repo}/issues`);
  assert.ok(manifest.keywords.includes('dsh-plugin'));
  assert.equal(manifest.engines.dsh, '0.2.2-rc.1 || 0.2.2-rc.2');
  assert.equal(JSON.parse(read('package-lock.json')).packages[''].license, 'MIT');
});

test('GitHub distribution retains build-free artifacts and lifecycle script safety', () => {
  for (const script of ['preinstall', 'install', 'postinstall', 'prepare', 'prepublish', 'prepack']) {
    assert.equal(manifest.scripts?.[script], undefined, script);
  }
  for (const file of ['index.js', 'client.js', 'shared.js', 'service.js', 'gif-presets.js', 'cordis.patch.yml', 'icon.svg', 'README.md', 'LICENSE', 'THIRD_PARTY.md']) {
    assert.ok(manifest.files.includes(file), file);
    assert.ok(existsSync(new URL(file, root)), file);
  }
  assert.equal(manifest.exports['./client'], './client.js');
  assert.ok(read('client.js').includes("id:'@local/dsh-spinner-studio'"));
  assert.ok(read('index.js').includes('export function apply(ctx, config)'));
  assert.ok(!manifest.files.some(path => /node_modules|cache|\.tgz|\.log/.test(path)));
  const ignored = read('.gitignore');
  for (const entry of ['node_modules/', '.npm-cache/', 'test-results/', '*.tgz', '*.log', '.env', '.dsh/']) assert.ok(ignored.split('\n').includes(entry), entry);
  assert.ok(!ignored.split('\n').includes('client.js'));
});

test('source-only README carries both install profiles, category, risks and real output', () => {
  const text = read('README.md');
  for (const profile of ['web', 'desktop']) assert.ok(text.includes(`dsh plugin --profile ${profile} add github:${repo}`));
  for (const term of ['UI & Experience', 'spinner_studio', 'profile', '179', '180', 'npm', 'https://dsh-plugin.org/submit']) assert.ok(text.includes(term), term);
  assert.ok(text.includes('{"icon":"native","size":18,"interval":6,"verbCount":180}'));
});

test('original MIT and full source-verb notice are distributed without attribution loss', () => {
  const license = read('LICENSE'), thirdParty = read('THIRD_PARTY.md');
  assert.ok(license.includes('Copyright (c) 2026 Edgar Santiago'));
  assert.ok(license.includes('Permission is hereby granted, free of charge'));
  for (const term of ['Copyright (c) 2025-2026 Shayan Rais', 'Permission is hereby granted, free of charge', 'THE SOFTWARE IS PROVIDED "AS IS"', 'claude-code-best-practice', '179']) assert.ok(thirdParty.includes(term), term);
  assert.ok(read('shared.js').includes('shanraisshan/claude-code-best-practice'));
});
