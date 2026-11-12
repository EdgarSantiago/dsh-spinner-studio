import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { DEFAULTS, validatePreferences, spinnerErrorKey, spinnerError, spinnerCSS } from '../shared.js';
import { createSpinnerService } from '../service.js';
import { SPINNER_LANGUAGES, SPINNER_TRANSLATIONS } from '../translations.js';
import { SPINNER_VERBS } from '../verb-translations.js';
import { spinnerLocale, spinnerText, isBuiltInVerbs, displaySpinnerVerbs, spinnerEditorText, canonicalSpinnerEditorText, spinnerElapsed, spinnerNotice } from '../localization.js';

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();

test('all eight native languages have complete catalogs, interpolation and real metadata', () => {
  assert.deepEqual(SPINNER_LANGUAGES, ['en','pt','zh','ja','es','fr','de','ru']);
  const keys = Object.keys(SPINNER_TRANSLATIONS.en).sort();
  for (const lang of SPINNER_LANGUAGES) {
    const dict = SPINNER_TRANSLATIONS[lang];
    assert.deepEqual(Object.keys(dict).sort(), keys, lang);
    for (const key of keys) {
      assert.equal(typeof dict[key], 'string', `${lang}:${key}`);
      assert.ok(dict[key].trim(), `${lang}:${key}`);
      assert.deepEqual(placeholders(dict[key]), placeholders(SPINNER_TRANSLATIONS.en[key]), `${lang}:${key}`);
      assert.doesNotMatch(dict[key], /[\u200b-\u200f\u202a-\u202e\u2060-\u2069\ufeff]/u, `${lang}:${key}`);
    }
    const {meta} = JSON.parse(read(`locale/${lang}.json`));
    assert.ok(meta.title && meta.description);
    if (lang !== 'en') {
      assert.notEqual(dict.title, SPINNER_TRANSLATIONS.en.title, lang);
      assert.notEqual(meta.description, JSON.parse(read('locale/en.json')).meta.description, lang);
    }
  }
  assert.equal(SPINNER_TRANSLATIONS['pt-BR'], SPINNER_TRANSLATIONS.pt);
  assert.deepEqual(JSON.parse(read('locale/pt-BR.json')), JSON.parse(read('locale/pt.json')));
});

test('every literal and dynamic UI translation key resolves without a raw-key fallback', () => {
  const source = read('client-source.js');
  const literals = [...source.matchAll(/\bt\('([^']+)'\s*[,)]/g)].map(match => match[1]);
  const dynamic = ['native','spark','orbit','code','emoji','image','saving','save','changed','saved','failed','unread','imageError', ...['dots','orbit','bars','pulse'].map(id=>'gif.'+id)];
  for (const lang of SPINNER_LANGUAGES) for (const key of [...literals, ...dynamic]) {
    assert.ok(Object.hasOwn(SPINNER_TRANSLATIONS[lang], key), `${lang}:${key}`);
  }
});

test('locale aliases and unsupported languages use a deterministic English fallback', () => {
  for (const tag of ['pt','pt-BR','PT-br','pt-PT']) assert.equal(spinnerLocale(tag), 'pt');
  assert.equal(spinnerLocale('zh-CN'), 'zh');
  assert.equal(spinnerLocale('ja-JP'), 'ja');
  for (const tag of ['xx', '', 'constructor', '__proto__']) assert.equal(spinnerLocale(tag), 'en');
  assert.equal(spinnerText('xx','title'), SPINNER_TRANSLATIONS.en.title);
  assert.equal(spinnerText('en','__proto__'), '__proto__');
  assert.equal(spinnerText('en','constructor'), 'constructor');
});

test('all 180 built-in verbs have display translations without changing canonical values', () => {
  const canonical = Object.freeze([...DEFAULTS.verbs]);
  assert.equal(canonical.length, 180);
  assert.equal(isBuiltInVerbs(canonical), true);
  for (const lang of SPINNER_LANGUAGES) {
    const displayed = displaySpinnerVerbs(canonical, lang);
    assert.equal(displayed.length, canonical.length, lang);
    assert.ok(displayed.every(word=>typeof word==='string' && word.trim() && word.length<=80 && !/[\r\n|]/u.test(word)), lang);
    if (lang !== 'en') {
      assert.equal(displayed, SPINNER_VERBS[lang]);
      assert.ok(displayed.every((word,index)=>word!==canonical[index]), lang);
    }
  }
  assert.deepEqual(canonical, DEFAULTS.verbs);
});

test('custom lists and unsaved custom text are never translated or mutated', () => {
  const custom = Object.freeze(['Trabalhando no meu projeto', 'Working', '自分の文']);
  const almostBuiltIn = [...DEFAULTS.verbs]; almostBuiltIn[10] = 'Meu verbo';
  for (const lang of SPINNER_LANGUAGES) {
    assert.equal(displaySpinnerVerbs(custom, lang), custom);
    assert.equal(displaySpinnerVerbs(almostBuiltIn, lang), almostBuiltIn);
    assert.equal(spinnerEditorText(custom.join('\n'), lang), custom.join('\n'));
    assert.equal(canonicalSpinnerEditorText(custom.join('\n'), lang), custom.join('\n'));
  }
});

test('the untouched default editor follows language changes and saves the canonical list', async () => {
  const text = DEFAULTS.verbs.join('\n');
  for (const lang of SPINNER_LANGUAGES) {
    const display = spinnerEditorText(text, lang);
    assert.equal(canonicalSpinnerEditorText(display, lang), text, lang);
    assert.deepEqual(validatePreferences({verbs:canonicalSpinnerEditorText(display, lang).split('\n')}).verbs, DEFAULTS.verbs);
    const custom = display + '\nMinha palavra';
    assert.equal(canonicalSpinnerEditorText(custom, lang), custom);
  }
  let saved = {...DEFAULTS, verbs:[...DEFAULTS.verbs]};
  const service = createSpinnerService(()=>saved, async next=>{saved=next;});
  for (const lang of SPINNER_LANGUAGES) {
    spinnerEditorText(text, lang); // Displaying a language must not persist a preference.
    await service.operate({action:'update',patch:{size:22}});
    assert.deepEqual(saved.verbs, DEFAULTS.verbs);
  }
});

test('stable feedback keys are translated again after every language change', () => {
  const notice = spinnerNotice(new Error('Icon size must be 12–40 px.'));
  assert.equal(notice, 'invalidSize');
  assert.equal(spinnerNotice(spinnerError('imageError','private details')), 'imageError');
  const rendered = new Set();
  for (const lang of SPINNER_LANGUAGES) {
    rendered.add(spinnerText(lang, notice));
    assert.equal(spinnerText(lang,'saved'), SPINNER_TRANSLATIONS[lang].saved);
    const running = spinnerText(lang,'runningLabel',{verb:displaySpinnerVerbs(DEFAULTS.verbs,lang)[0],duration:spinnerElapsed(138000,lang)});
    assert.doesNotMatch(running, /\{\w+\}/u);
    const css = spinnerCSS(DEFAULTS, '', '', false, running);
    assert.ok(css.includes('content:'));
    assert.doesNotMatch(css, /\{verb\}|\{duration\}/u);
  }
  assert.equal(rendered.size, 8);
});

test('untrusted backend messages cannot become visible text or prototype keys', () => {
  for (const value of ['private token abc', '__proto__', 'constructor', 'toString']) {
    assert.equal(spinnerErrorKey({message:value,code:value}), 'failed');
    assert.equal(spinnerNotice({message:value},'unread'), 'unread');
  }
  for (const patch of [{size:0},{interval:0},{verbs:[]},{emoji:''},{icon:'bad'},{image:'bad'},{enabled:'yes'},{unknown:true}]) {
    try { validatePreferences(patch); assert.fail('should reject'); }
    catch(error) {
      const key = spinnerNotice(error);
      assert.notEqual(key, 'failed');
      for (const lang of SPINNER_LANGUAGES) assert.ok(Object.hasOwn(SPINNER_TRANSLATIONS[lang],key), `${lang}:${key}`);
    }
  }
});

test('elapsed units use the active language and remain bounded for invalid input', () => {
  assert.equal(spinnerElapsed(0,'en'), new Intl.NumberFormat('en',{style:'unit',unit:'second',unitDisplay:'short'}).format(1));
  assert.equal(spinnerElapsed(NaN,'pt'),spinnerElapsed(0,'pt'));
  for (const lang of SPINNER_LANGUAGES) assert.ok(spinnerElapsed(138000,lang).trim());
  assert.notEqual(spinnerElapsed(138000,'ja'),spinnerElapsed(138000,'en'));
});

test('Client source and distribution keep reactive locale wiring and every new runtime resource', () => {
  const source = read('client-source.js'), bundle = read('client.js'), manifest = JSON.parse(read('package.json'));
  assert.ok(source.includes('ctx.locale.register(NS, SPINNER_TRANSLATIONS)'));
  assert.ok(source.includes('ctx.locale.subscribe(f)'));
  assert.ok(source.includes('label:()=>t(\'title\')'));
  assert.ok(source.includes('value:spinnerEditorText(text, locale.active)'));
  assert.ok(source.includes('canonicalSpinnerEditorText(e.target.value, locale.active)'));
  assert.ok(source.includes("setMessage('saved')"));
  assert.ok(source.includes("setText(DEFAULTS.verbs.join('\\n'));setDirty(true);setMessage('');setError('');} }, t('claude')"));
  assert.ok(source.includes('error ? t(error) : message ? t(message)'));
  assert.ok(!source.includes('setMessage(t(') && !source.includes('setError(e.message)'));
  assert.ok(!source.includes('setLocale('));
  for (const file of ['translations.js','verb-translations.js','localization.js']) {
    assert.ok(manifest.files.includes(file), file);
    assert.ok(existsSync(new URL('../'+file,import.meta.url)));
  }
  for (const lang of SPINNER_LANGUAGES) assert.ok(bundle.includes(SPINNER_TRANSLATIONS[lang].title),lang);
  assert.ok(!/\bimport\s.*from\s+['"]\.\//u.test(bundle));
});
