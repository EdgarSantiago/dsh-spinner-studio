import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { GIF_PRESETS, gifPresetFor, gifPresetPatch, validatePreferences, DEFAULTS, spinnerCSS } from '../shared.js';
import { createSpinnerService } from '../service.js';

test('four original animated GIFs and static posters ship locally within upload limits', async () => {
  assert.deepEqual(GIF_PRESETS.map(p => p.id), ['dots','orbit','bars','pulse']);
  for (const preset of GIF_PRESETS) {
    assert.ok(preset.frames > 1); assert.ok(preset.durationMs >= 1000 && preset.durationMs <= 2000);
    for (const [field, suffix] of [['image',''],['still','-still']]) {
      const embedded = Buffer.from(preset[field].split(',')[1], 'base64');
      const asset = await readFile(new URL(`../assets/gifs/${preset.id}${suffix}.gif`, import.meta.url));
      assert.deepEqual(embedded, asset);
      assert.ok(['GIF87a','GIF89a'].includes(asset.subarray(0,6).toString()));
      assert.equal(asset.readUInt16LE(6),64); assert.equal(asset.readUInt16LE(8),64);
      assert.ok(asset.length < 250*1024);
    }
    assert.ok(gifPresetFor(preset.image) === preset);
    assert.equal(validatePreferences(gifPresetPatch(preset.id)).image,preset.image);
  }
  assert.throws(() => gifPresetPatch('missing'));
  assert.equal(gifPresetFor('data:image/gif;base64,userimage'),undefined);
});
test('choosing a gallery preset uses the same saved image operation as uploaded GIFs', async () => {
  let saved = { ...DEFAULTS, verbs:['Testando'], size:24 };
  const service = createSpinnerService(() => saved, async next => {saved = next;});
  for (const preset of GIF_PRESETS) {
    const result = await service.operate({action:'update',patch:gifPresetPatch(preset.id)});
    assert.equal(result.preferences.icon,'image');
    assert.equal(result.preferences.image,preset.image);
    assert.equal(result.preferences.size,24);
    assert.deepEqual(result.preferences.verbs,['Testando']);
    assert.equal((await service.operate({action:'read'})).preferences.image,preset.image);
  }
});
test('built-in GIF masks follow the palette and reduce motion; custom images retain colors', () => {
  for (const preset of GIF_PRESETS) {
    const css = spinnerCSS(validatePreferences(gifPresetPatch(preset.id)), 'Testing','1s',false);
    assert.ok(css.includes('background:currentColor;mask:center/contain no-repeat url('));
    assert.ok(css.includes('prefers-reduced-motion:reduce'));
    assert.ok(css.includes(preset.image)); assert.ok(css.includes(preset.still));
  }
  const custom = spinnerCSS(validatePreferences({icon:'image',image:'data:image/gif;base64,dXNlcg=='}),'Testing','1s',false);
  assert.ok(custom.includes('background:center/contain no-repeat url('));
});
test('gallery controls are localized, keyboard buttons, and do not auto-save drafts', async () => {
  const source = await readFile(new URL('../client-source.js',import.meta.url),'utf8');
  for (const id of ['dots','orbit','bars','pulse']) assert.ok(source.includes(`'gif.${id}'`));
  assert.ok(source.includes("'aria-pressed':draft.icon==='image'&&draft.image===preset.image"));
  assert.ok(source.includes('update(gifPresetPatch(preset.id))'));
  assert.ok(source.includes('mask-image:var(--dss-gif-still)'));
  const manifest = JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
  assert.ok(manifest.files.includes('gif-presets.js'));
  assert.ok(manifest.files.includes('assets/gifs/*.gif'));
});
