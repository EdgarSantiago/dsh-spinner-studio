import { DEFAULTS, spinnerErrorKey } from './shared.js';
import { SPINNER_LANGUAGES, SPINNER_TRANSLATIONS } from './translations.js';
import { SPINNER_VERBS } from './verb-translations.js';

export function spinnerLocale(id = 'en') {
  const primary = String(id).toLowerCase().split('-')[0];
  return SPINNER_LANGUAGES.includes(primary) ? primary : 'en';
}
export function spinnerText(locale, key, parameters = {}) {
  const dictionary = SPINNER_TRANSLATIONS[spinnerLocale(locale)];
  const template = Object.hasOwn(dictionary, key) ? dictionary[key] : Object.hasOwn(SPINNER_TRANSLATIONS.en, key) ? SPINNER_TRANSLATIONS.en[key] : String(key);
  return template.replace(/\{(\w+)\}/g, (all, name) => Object.hasOwn(parameters, name) ? String(parameters[name]) : all);
}
export function isBuiltInVerbs(list) {
  return Array.isArray(list) && list.length === DEFAULTS.verbs.length && list.every((word, index) => word === DEFAULTS.verbs[index]);
}
export function displaySpinnerVerbs(list, locale) {
  if (!isBuiltInVerbs(list)) return list;
  return SPINNER_VERBS[spinnerLocale(locale)] ?? list;
}
export function spinnerEditorText(text, locale) {
  return text === DEFAULTS.verbs.join('\n') ? displaySpinnerVerbs(DEFAULTS.verbs, locale).join('\n') : text;
}
export function canonicalSpinnerEditorText(text, locale) {
  return text === displaySpinnerVerbs(DEFAULTS.verbs, locale).join('\n') ? DEFAULTS.verbs.join('\n') : text;
}
const elapsedFormatters = new Map();
export function spinnerElapsed(milliseconds, locale) {
  const language = spinnerLocale(locale);
  if (!elapsedFormatters.has(language)) elapsedFormatters.set(language, {
    minute: new Intl.NumberFormat(language, { style:'unit', unit:'minute', unitDisplay:'short' }),
    second: new Intl.NumberFormat(language, { style:'unit', unit:'second', unitDisplay:'short' }),
  });
  const format = elapsedFormatters.get(language);
  const seconds = Math.max(1, Math.floor((Number.isFinite(milliseconds) ? milliseconds : 0) / 1000));
  return seconds < 60 ? format.second.format(seconds) : `${format.minute.format(Math.floor(seconds / 60))} ${format.second.format(seconds % 60)}`;
}
// Keep a message key in state, never a translation or an untrusted server diagnostic.
export function spinnerNotice(error, fallback = 'failed') {
  return spinnerErrorKey(error, fallback);
}
