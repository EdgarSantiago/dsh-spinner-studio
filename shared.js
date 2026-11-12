import { GIF_PRESETS } from './gif-presets.js';
export { GIF_PRESETS };
export function gifPresetFor(image) { return GIF_PRESETS.find(preset => preset.image === image); }
export function gifPresetPatch(id) {
  const preset = GIF_PRESETS.find(item => item.id === id);
  if (!preset) throw new Error('Unknown GIF preset.');
  return { icon: 'image', image: preset.image };
}

// Source: shanraisshan/claude-code-best-practice, reports/claude-spinner-verbs-and-tips.md.
// Fetched 2026-11-12. Words only; Claude-specific tips are deliberately not imported.
export const CLAUDE_VERBS = Object.freeze([
  'Accomplishing','Actioning','Actualizing','Architecting','Baking','Beaming',"Beboppin'",'Befuddling','Billowing','Blanching','Bloviating','Boogieing','Boondoggling','Booping','Bootstrapping','Brewing','Bunning','Burrowing','Calculating','Canoodling','Caramelizing','Cascading','Catapulting','Cerebrating','Channeling','Channelling','Choreographing','Churning','Clauding','Coalescing','Cogitating','Combobulating','Composing','Computing','Concocting','Considering','Contemplating','Cooking','Crafting','Creating','Crunching','Crystallizing','Cultivating','Deciphering','Deliberating','Determining','Dilly-dallying','Discombobulating','Doing','Doodling','Drizzling','Ebbing','Effecting','Elucidating','Embellishing','Enchanting','Envisioning','Evaporating','Fermenting','Fiddle-faddling','Finagling','Flambéing','Flibbertigibbeting','Flowing','Flummoxing','Fluttering','Forging','Forming','Frolicking','Frosting','Gallivanting','Galloping','Garnishing','Generating','Gesticulating','Germinating','Gitifying','Grooving','Gusting','Harmonizing','Hashing','Hatching','Herding','Honking','Hullaballooing','Hyperspacing','Ideating','Imagining','Improvising','Incubating','Inferring','Infusing','Ionizing','Jitterbugging','Levitating','Lollygagging','Manifesting','Marinating','Meandering','Metamorphosing','Misting','Moonwalking','Moseying','Mulling','Mustering','Musing','Nebulizing','Nesting','Newspapering','Noodling','Nucleating','Orbiting','Orchestrating','Osmosing','Perambulating','Percolating','Perusing','Philosophising','Photosynthesizing','Pollinating','Pondering','Pontificating','Pouncing','Precipitating','Prestidigitating','Processing','Proofing','Propagating','Puttering','Puzzling','Quantumizing','Razzle-dazzling','Razzmatazzing','Recombobulating','Reticulating','Roosting','Ruminating','Sautéing','Scampering','Schlepping','Scurrying','Sketching','Slithering','Smooshing','Sock-hopping','Spelunking','Spinning','Sprouting','Stewing','Sublimating','Swirling','Swooping','Symbioting','Synthesizing','Tempering','Thinking','Thundering','Tinkering','Tomfoolering','Topsy-turvying','Transfiguring','Transmuting','Twisting','Undulating','Unfurling','Unravelling','Vibing','Waddling','Wandering','Warping','Whatchamacalliting','Whirlpooling','Whirring','Whisking','Wibbling','Working','Wrangling','Zesting','Zigzagging'
]);
export const DEFAULTS = Object.freeze({ enabled: true, icon: 'native', emoji: '✨', image: '', size: 18, interval: 6, verbs: ['Deep diving', ...CLAUDE_VERBS] });
export const ICONS = Object.freeze(['native', 'spark', 'orbit', 'code', 'emoji', 'image']);
export const PATHS = Object.freeze({
  spark: 'M12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5Z',
  orbit: 'M20 12a8 8 0 1 1-8-8M9 4h3v3M4 15c-3 8 16 1 16-7M18 4v4h4',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16'
});
export function validatePreferences(input, base = DEFAULTS) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Expected a settings object.');
  if (Object.keys(input).some(key => !Object.hasOwn(DEFAULTS, key))) throw new Error('Unknown setting.');
  const p = { ...base, ...input };
  if (typeof p.enabled !== 'boolean') throw new Error('enabled must be boolean.');
  if (!ICONS.includes(p.icon)) throw new Error('Unknown icon.');
  if (typeof p.emoji !== 'string' || !p.emoji.trim() || p.emoji.length > 32 || /[\x00-\x1f\x7f]/u.test(p.emoji)) throw new Error('Use an emoji or a short symbol (up to 32 characters).');
  if (typeof p.image !== 'string' || p.image.length > 350000 || (p.image && !/^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/u.test(p.image))) throw new Error('Use a PNG, JPEG, WebP or GIF up to 250 KiB.');
  if (p.icon === 'image' && !p.image) throw new Error('Choose an image first.');
  if (!Number.isInteger(p.size) || p.size < 12 || p.size > 40) throw new Error('Icon size must be 12–40 px.');
  if (!Number.isInteger(p.interval) || p.interval < 2 || p.interval > 60) throw new Error('Rotation interval must be 2–60 seconds.');
  if (!Array.isArray(p.verbs) || p.verbs.length < 1 || p.verbs.length > 500 || p.verbs.some(v => typeof v !== 'string' || !v.trim() || v.length > 80 || /[\x00-\x1f\x7f]/u.test(v))) throw new Error('Use 1–500 verbs, with up to 80 characters per line.');
  return { ...p, emoji: p.emoji.trim(), verbs: [...new Set(p.verbs.map(v => v.trim()))] };
}
export function cssString(value) {
  return '"' + String(value).replace(/["\\\x00-\x1f\x7f<>]/gu, c => '\\' + c.codePointAt(0).toString(16) + ' ') + '"';
}
export function svgIcon(kind) {
  return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="' + PATHS[kind] + '" fill="none" stroke="black" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>');
}
// Offset the cycle by the projected Turn number, so short replies do not all
// restart on verbs[0]. The same Turn keeps its word across rerenders/reloads.
export function selectVerb(verbs, turn, elapsedMs, intervalSeconds) {
  if (!verbs.length) return '';
  const initial = Number.isSafeInteger(turn) && turn >= 0 ? turn : 1;
  const elapsed = Number.isFinite(elapsedMs) ? Math.max(0, elapsedMs) : 0;
  const interval = Number.isFinite(intervalSeconds) && intervalSeconds >= 2 ? intervalSeconds : 6;
  return verbs[(initial + Math.floor(elapsed / (interval * 1000))) % verbs.length];
}
export function durationLabel(milliseconds) {
  const s = Math.max(1, Math.floor(milliseconds / 1000));
  return s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;
}
// Compatibility skin for DSH 0.2.2-rc.1 and 0.2.2-rc.2. Only semantic running-status markers;
// no hashed host classes, observers, event scans, root replacement or DOM writes.
// Theme Studio and the built-in themes expose their active accent here.
export const SPINNER_ACCENT = 'var(--dsw-alias-state-business-primary)';
export function spinnerCSS(p, verb, duration, portuguese) {
  if (!p.enabled) return '';
  const root = '[data-chat-running]:not([data-holding])';
  const content = root + ' > span:last-child';
  const icon = content + ' > :first-child';
  const label = `${verb}${duration ? (portuguese ? ' há ' : ' for ') + duration : ''} ···`;
  let css = `${root}{color:${SPINNER_ACCENT}!important}${content}{color:inherit!important}${content} > :last-child{display:none!important}${content}::after{content:${cssString(label)};white-space:pre-wrap;color:inherit;-webkit-text-fill-color:currentColor}${icon}{color:inherit!important;width:${p.size}px!important;height:${p.size}px!important;flex-shrink:0}`;
  if (p.icon !== 'native') {
    css += `${icon} > *{display:none!important}${icon}{display:inline-flex!important;align-items:center;justify-content:center;background:none!important;mask:none!important}`;
    if (p.icon === 'emoji') css += `${icon}::before{content:${cssString(p.emoji)};font-size:${p.size}px;line-height:1}`;
    else if (p.icon === 'image') {
      const preset = gifPresetFor(p.image);
      if (preset) {
        css += `${icon}::before{content:"";width:100%;height:100%;background:currentColor;mask:center/contain no-repeat url(${cssString(preset.image)})}`;
        css += `@media(prefers-reduced-motion:reduce){${icon}::before{mask-image:url(${cssString(preset.still)})}}`;
      } else css += `${icon}::before{content:"";width:100%;height:100%;background:center/contain no-repeat url(${cssString(p.image)})}`;
    }
    else css += `${icon}::before{content:"";width:100%;height:100%;background:currentColor;mask:center/contain no-repeat url(${cssString(svgIcon(p.icon))})}`;
  }
  return css;
}
