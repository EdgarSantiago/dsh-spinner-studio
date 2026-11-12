import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

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

test('README screenshots are local PNGs and ship in the package', () => {
  assert.ok(manifest.files.includes('docs/images/*.png'));
  const readme = read('README.md');
  assert.match(readme, /Activity indicator.*highlighted in red/);
  const screenshots = ['spinner-studio-settings.png', 'spinner-studio-running.png'];
  const [packed] = JSON.parse(execFileSync('npm', ['--cache','node_modules/.cache/npm','pack','--dry-run','--ignore-scripts','--json'], {cwd:fileURLToPath(root),encoding:'utf8',timeout:60000}));
  const files = new Set(packed.files.map(file=>file.path));
  for (const name of screenshots) {
    const path = `docs/images/${name}`;
    assert.ok(readme.includes(`](<${path}>)`), path);
    assert.ok(files.has(path), path);
    const bytes = readFileSync(new URL(path, root));
    assert.deepEqual([...bytes.subarray(0,8)], [137,80,78,71,13,10,26,10], name);
    assert.ok(bytes.readUInt32BE(16)>0 && bytes.readUInt32BE(20)>0, name);
  }
});

test('original MIT and full source-verb notice are distributed without attribution loss', () => {
  const license = read('LICENSE'), thirdParty = read('THIRD_PARTY.md');
  assert.ok(license.includes('Copyright (c) 2026 Edgar Santiago'));
  assert.ok(license.includes('Permission is hereby granted, free of charge'));
  for (const term of ['Copyright (c) 2025-2026 Shayan Rais', 'Permission is hereby granted, free of charge', 'THE SOFTWARE IS PROVIDED "AS IS"', 'claude-code-best-practice', '179']) assert.ok(thirdParty.includes(term), term);
  assert.ok(read('shared.js').includes('shanraisshan/claude-code-best-practice'));
});
