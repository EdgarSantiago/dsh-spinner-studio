export function createPlugin(React) {
  const h = React.createElement;
  const NS = 'spinner-studio';
  const PT = {
    title:'Indicador de atividade', intro:'Personalize o ícone e as palavras exibidas enquanto o agente trabalha.',
    enabled:'Personalização ativa', enabledHelp:'Desative para voltar ao indicador original do Harness.',
    preview:'Prévia', icon:'Ícone', native:'Baleia original', spark:'Brilho', orbit:'Órbita', code:'Código', emoji:'Emoji', image:'Sua imagem',
    symbol:'Emoji ou símbolo', upload:'Enviar imagem', uploadHelp:'PNG, JPEG, WebP ou GIF · até 250 KiB. A imagem fica salva neste perfil.',
    size:'Tamanho do ícone', interval:'Trocar verbo a cada', seconds:'segundos', verbs:'Verbos', verbsHelp:'Um por linha. Os verbos da fonte foram mantidos em inglês; você pode escrever os seus em português.',
    count:'{count} verbos', claude:'Repor verbos do Claude', defaults:'Restaurar padrões', save:'Salvar alterações', saving:'Salvando…', saved:'Alterações salvas.', cancel:'Descartar alterações',
    loading:'Carregando configurações…', failed:'Não foi possível concluir.', retry:'Tentar novamente', imageError:'Escolha uma imagem válida de até 250 KiB.',
    compatibility:'Adaptador visual para o indicador do chat principal no Harness 0.2.2-rc.1 / 0.2.2-rc.2. Não altera mensagens, ferramentas ou o histórico.',
    source:'Fonte dos 179 verbos', live:'Em atividade', selectImage:'Envie uma imagem abaixo.', global:'As alterações são salvas no perfil e valem para todas as sessões.',
    changed:'Há alterações não salvas.', unread:'Não foi possível carregar as configurações.',
    gallery:'GIFs prontos', galleryHelp:'Escolha um exemplo e salve. Eles seguem a paleta e ficam estáticos quando reduzir movimento está ativado.',
    'gif.dots':'Pontinhos', 'gif.orbit':'Órbita animada', 'gif.bars':'Equalizador', 'gif.pulse':'Estrela pulsante'
  };
  const EN = {
    title:'Activity indicator', intro:'Customize the icon and words shown while the agent works.',
    enabled:'Customization enabled', enabledHelp:'Turn off to restore the original Harness indicator.',
    preview:'Preview', icon:'Icon', native:'Original whale', spark:'Spark', orbit:'Orbit', code:'Code', emoji:'Emoji', image:'Your image',
    symbol:'Emoji or symbol', upload:'Upload image', uploadHelp:'PNG, JPEG, WebP or GIF · up to 250 KiB. Images are saved in this profile.',
    size:'Icon size', interval:'Rotate verb every', seconds:'seconds', verbs:'Verbs', verbsHelp:'One per line. Source verbs are in English; you can write your own in any language.',
    count:'{count} verbs', claude:'Restore Claude verbs', defaults:'Restore defaults', save:'Save changes', saving:'Saving…', saved:'Changes saved.', cancel:'Discard changes',
    loading:'Loading settings…', failed:'Could not complete the operation.', retry:'Try again', imageError:'Choose a valid image up to 250 KiB.',
    compatibility:'Visual adapter for the main chat indicator in Harness 0.2.2-rc.1 / 0.2.2-rc.2. Does not change messages, tools or history.',
    source:'Source of the 179 verbs', live:'Working', selectImage:'Upload an image below.', global:'Changes persist in the profile and apply to every session.',
    changed:'You have unsaved changes.', unread:'Unable to load settings.',
    gallery:'Ready-made GIFs', galleryHelp:'Choose a sample and save. Samples follow your palette and become still when reduced motion is enabled.',
    'gif.dots':'Dancing dots', 'gif.orbit':'Animated orbit', 'gif.bars':'Equalizer', 'gif.pulse':'Pulsing star'
  };
  const UI_CSS = `.dss-gif{background:currentColor;color:${SPINNER_ACCENT};mask:var(--dss-gif) center/contain no-repeat}.dss-gallery-title{font-size:14px;font-weight:500;margin:0}.dss-gallery .dss-option-icon{margin-bottom:10px}@media(prefers-reduced-motion:reduce){.dss-gif{mask-image:var(--dss-gif-still)}}.dss-panel{max-width:780px;margin:0 auto;color:var(--dsw-alias-label-primary);font-size:14px;line-height:1.6;padding:8px 0 28px}.dss-panel h2{font-size:20px;font-weight:600;margin:0 0 6px}.dss-panel p{margin:0 0 16px;color:var(--dsw-alias-label-secondary)}.dss-preview{padding:22px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);margin:20px 0}.dss-preview-label{display:block;color:var(--dsw-alias-label-tertiary);font-size:12px;margin-bottom:12px}.dss-preview-line{display:flex;align-items:center;gap:10px;color:${SPINNER_ACCENT};font-size:16px;min-height:40px;overflow-wrap:anywhere}.dss-preview-line img{object-fit:contain}.dss-row{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:16px 0;border-bottom:1px solid var(--dsw-alias-border-l1)}.dss-row small{display:block;color:var(--dsw-alias-label-tertiary);font-size:12px;margin-top:4px}.dss-block{display:block}.dss-panel input:not([type=checkbox]):not([type=range]):not([type=file]),.dss-panel textarea{box-sizing:border-box;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:9px 12px;font:inherit}.dss-panel textarea{width:100%;min-height:240px;resize:vertical;margin-top:12px;font-size:13px}.dss-panel input[type=number]{width:84px}.dss-panel input[type=checkbox],.dss-panel input[type=range]{accent-color:${SPINNER_ACCENT}}.dss-panel input[type=checkbox]{width:34px;height:20px;cursor:pointer}.dss-panel input[type=file]{max-width:100%;margin:12px 0;font:inherit}.dss-panel input:focus-visible,.dss-panel textarea:focus-visible,.dss-panel button:focus-visible,.dss-panel a:focus-visible{outline:2px solid ${SPINNER_ACCENT};outline-offset:3px}.dss-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0}.dss-panel button{cursor:pointer;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;min-height:36px;padding:7px 12px;font:inherit;line-height:20px}.dss-panel button:hover{background:var(--dsw-alias-bg-layer-2)}.dss-options button[aria-pressed=true]{border-color:${SPINNER_ACCENT};color:${SPINNER_ACCENT};background:var(--dsw-alias-bg-layer-2)}.dss-panel button:disabled{opacity:.55;cursor:default}.dss-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:16px 0}.dss-panel .dss-primary{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);border-color:var(--dsw-alias-button-primary-fill)}.dss-feedback{min-height:24px;color:var(--dsw-alias-state-success-primary)}.dss-error{color:var(--dsw-alias-state-error-primary)}.dss-panel a{color:${SPINNER_ACCENT}}.dss-inline{display:flex;gap:10px;align-items:center}.dss-panel .dss-note{font-size:12px;color:var(--dsw-alias-label-tertiary);margin:8px 0}.dss-icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}.dss-option-icon{display:flex;justify-content:center;margin:0 auto 5px}@media(max-width:540px){.dss-row{gap:12px}.dss-options{grid-template-columns:repeat(2,minmax(0,1fr))}.dss-panel input[type=range]{width:100px}.dss-actions button{flex:1}}`;

  return {
    inject: ['slots', 'locale'],
    apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: EN, pt: PT, 'pt-BR': PT }));
      const t = ctx.locale.bind(NS);
      let current = null;
      const subscribers = new Set();
      const publish = p => { current = validatePreferences(p); for (const f of subscribers) f(); };
      const subscribe = f => { subscribers.add(f); return () => subscribers.delete(f); };
      const getSnapshot = () => current;
      const usePreferences = () => React.useSyncExternalStore(subscribe, getSnapshot);
      const useLocale = () => React.useSyncExternalStore(f => ctx.locale.subscribe(f), () => ctx.locale.getSnapshot());
      let disposed = false;
      const requests = new Set();
      async function request(input) {
        const controller = new AbortController();
        requests.add(controller);
        const timeout = setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch('api/plugins/spinner-studio', { credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
            ...(input ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) } : {}) });
          const value = await response.json();
          if (!response.ok || value.error) throw new Error(value.error || t('failed'));
          if (!disposed) publish(value.preferences);
          return value.preferences;
        } finally { clearTimeout(timeout); requests.delete(controller); }
      }
      ctx.effect(() => {
        const events = new EventSource('api/plugins/spinner-studio/watch');
        events.onmessage = event => { try { if (!disposed) publish(JSON.parse(event.data).preferences); } catch (error) { console.error('Spinner settings:', error); } };
        request().catch(error => console.error('Spinner settings:', error));
        return () => { disposed = true; events.close(); for (const c of requests) c.abort(); requests.clear(); subscribers.clear(); };
      });

      function Icon({ preferences: p, size = p.size }) {
        const style = { width: size, height: size, fontSize: size, lineHeight: 1 };
        if (p.icon === 'native') return h('span', { className:'dss-icon', style, 'aria-hidden':true }, '🐋');
        if (p.icon === 'emoji') return h('span', { className:'dss-icon', style, 'aria-hidden':true }, p.emoji);
        if (p.icon === 'image') {
          const preset = gifPresetFor(p.image);
          if (preset) return h('span', { className:'dss-icon dss-gif', 'aria-hidden':true, style:{...style, '--dss-gif':`url("${preset.image}")`, '--dss-gif-still':`url("${preset.still}")`} });
          return p.image ? h('img', { src:p.image, alt:'', width:size, height:size }) : h('span', { style, 'aria-hidden':true }, '+');
        }
        return h('svg', { viewBox:'0 0 24 24', width:size, height:size, 'aria-hidden':true, fill:'none', stroke:'currentColor', strokeWidth:1.6, strokeLinecap:'round', strokeLinejoin:'round' }, h('path', { d:PATHS[p.icon] }));
      }
      function Preview({ preferences: p }) {
        const [tick, setTick] = React.useState(0);
        React.useEffect(() => { const timer = setInterval(() => setTick(v => v + 1), 1000); return () => clearInterval(timer); }, []);
        const list = p.verbs?.length ? p.verbs : DEFAULTS.verbs;
        const word = list[Math.floor(tick / (p.interval || 6)) % list.length];
        return h('div', { className:'dss-preview' },
          h('span', { className:'dss-preview-label' }, t('preview')),
          h('div', { className:'dss-preview-line', 'aria-hidden':true }, h(Icon, { preferences:p }), h('span', null, word, ' · ', durationLabel((138 + tick) * 1000), ' ···')));
      }
      function Panel() {
        useLocale();
        const saved = usePreferences();
        const [draft, setDraft] = React.useState(null);
        const [text, setText] = React.useState('');
        const [busy, setBusy] = React.useState(false);
        const [message, setMessage] = React.useState('');
        const [error, setError] = React.useState('');
        const [loaded, setLoaded] = React.useState(false);
        const [dirty, setDirty] = React.useState(false);
        const uploadSequence = React.useRef(0);
        const alive = React.useRef(true);
        React.useEffect(() => { alive.current = true; return () => { alive.current = false; uploadSequence.current++; }; }, []);
        const adopt = React.useCallback(p => { setDraft(p); setText(p.verbs.join('\n')); setDirty(false); }, []);
        React.useEffect(() => { if (saved && !dirty) adopt(saved); }, [saved, dirty, adopt]);
        React.useEffect(() => { let active = true; request().then(() => { if (active) setLoaded(true); }, e => { if (active) { setError(t('unread') + ' ' + e.message); setLoaded(true); } }); return () => { active = false; }; }, []);
        const update = patch => { setDraft(p => ({ ...p, ...patch })); setDirty(true); setMessage(''); setError(''); };
        const refresh = async () => { setError(''); try { const p = await request(); if (alive.current) { adopt(p); setLoaded(true); } } catch (e) { if (alive.current) setError(t('unread') + ' ' + e.message); } };
        async function upload(event) {
          const file = event.target.files?.[0];
          const sequence = ++uploadSequence.current;
          event.target.value = '';
          if (!file) return;
          try {
            if (!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type) || file.size > 250 * 1024) throw new Error(t('imageError'));
            const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error(t('imageError'))); reader.readAsDataURL(file); });
            // Decode the actual file before accepting an icon (not just its MIME label).
            await new Promise((resolve, reject) => { const image = new Image(); image.onload = resolve; image.onerror = () => reject(new Error(t('imageError'))); image.src = data; });
            if (alive.current && sequence === uploadSequence.current) update({ icon:'image', image:data });
          } catch (e) { if (alive.current && sequence === uploadSequence.current) setError(e.message); }
        }
        async function save() {
          setError(''); setMessage('');
          let p;
          try { p = validatePreferences({ ...draft, verbs:text.split(/\r?\n/u).map(v => v.trim()).filter(Boolean) }); }
          catch (e) { setError(e.message); return; }
          setBusy(true);
          try { const accepted = await request({ action:'update', patch:p }); if (alive.current) { adopt(accepted); setMessage(t('saved')); } }
          catch (e) { if (alive.current) setError(t('failed') + ' ' + e.message); }
          finally { if (alive.current) setBusy(false); }
        }
        if (!draft) return h('section', { className:'dss-panel' }, h('style', null, UI_CSS), h('h2', null, t('title')), h('p', { role:'status' }, error || t('loading')), loaded && h('button', { onClick:refresh }, t('retry')));
        const preview = { ...draft, verbs:text.split(/\r?\n/u).map(v=>v.trim()).filter(Boolean) };
        const row = (id, title, help, control) => h('div', { className:'dss-row', key:id }, h('div', null, h('label', { htmlFor:id }, title), help && h('small', null, help)), control);
        return h('section', { className:'dss-panel' }, h('style', null, UI_CSS),
          h('h2', null, t('title')), h('p', null, t('intro')),
          row('dss-enabled', t('enabled'), t('enabledHelp'), h('input', { id:'dss-enabled', type:'checkbox', role:'switch', checked:draft.enabled, 'aria-checked':draft.enabled, disabled:busy, onChange:e=>update({ enabled:e.target.checked }) })),
          h(Preview, { preferences:preview }),
          h('fieldset', { disabled:busy, style:{ border:0, padding:0, margin:0, minWidth:0 } },
            h('legend', null, t('icon')),
            h('div', { className:'dss-options' }, ICONS.map(icon => h('button', { key:icon, type:'button', 'aria-pressed':draft.icon===icon, onClick:()=>update({ icon }) }, h('span', { className:'dss-option-icon' }, h(Icon, { preferences:{...draft,icon}, size:22 })), t(icon)))),
            h('div', { className:'dss-row dss-block dss-gallery' }, h('h3', { className:'dss-gallery-title' }, t('gallery')), h('small', null, t('galleryHelp')),
              h('div', { className:'dss-options' }, GIF_PRESETS.map(preset => h('button', { key:preset.id, type:'button', 'aria-pressed':draft.icon==='image'&&draft.image===preset.image,
                onClick:()=>{uploadSequence.current++;update(gifPresetPatch(preset.id));} }, h('span', { className:'dss-option-icon' }, h(Icon, { preferences:{...draft,...gifPresetPatch(preset.id)}, size:32 })), t('gif.'+preset.id))))),
            draft.icon==='emoji' && row('dss-emoji', t('symbol'), null, h('input', { id:'dss-emoji', value:draft.emoji, maxLength:32, onChange:e=>update({emoji:e.target.value}), style:{width:100} })),
            draft.icon==='image' && h('div', { className:'dss-row dss-block' }, h('label', { htmlFor:'dss-upload' }, t('upload')), h('small', null, t('uploadHelp')), h('input', { id:'dss-upload', type:'file', accept:'image/png,image/jpeg,image/webp,image/gif', onChange:upload }), !draft.image && h('small', null, t('selectImage'))),
            row('dss-size', t('size'), null, h('span', { className:'dss-inline' }, h('input', { id:'dss-size', type:'range', min:12, max:40, value:draft.size, onChange:e=>update({size:Number(e.target.value)}) }), h('output', { htmlFor:'dss-size' }, draft.size+' px'))),
            row('dss-interval', t('interval'), null, h('span', { className:'dss-inline' }, h('input', { id:'dss-interval', type:'number', min:2, max:60, value:draft.interval, onChange:e=>update({interval:Number(e.target.value)}) }), t('seconds'))),
            h('div', { className:'dss-row dss-block' }, h('label', { htmlFor:'dss-verbs' }, t('verbs')), h('small', null, t('verbsHelp')), h('textarea', { id:'dss-verbs', value:text, spellCheck:false, maxLength:40500, onChange:e=>{setText(e.target.value);setDirty(true);setMessage('');} }),
              h('div', { className:'dss-actions' }, h('small', null, t('count', {count:new Set(preview.verbs).size})), h('button', { type:'button', onClick:()=>{setText(DEFAULTS.verbs.join('\n'));setDirty(true);setMessage('');} }, t('claude'))))
          ),
          h('div', { className:'dss-actions' }, h('button', { className:'dss-primary', disabled:busy||!dirty, onClick:save }, t(busy?'saving':'save')), h('button', { disabled:busy||!dirty, onClick:()=>{adopt(saved);setMessage('');setError('');} }, t('cancel')), h('button', { disabled:busy, onClick:()=>{setDraft({...DEFAULTS});setText(DEFAULTS.verbs.join('\n'));setDirty(true);setMessage('');setError('');} }, t('defaults'))),
          h('div', { className:'dss-feedback'+(error?' dss-error':''), role:error?'alert':'status' }, error || message || (dirty?t('changed'):'')),
          h('p', { className:'dss-note' }, t('global')), h('p', { className:'dss-note' }, t('compatibility')),
          h('a', { href:'https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-spinner-verbs-and-tips.md', target:'_blank', rel:'noopener noreferrer' }, t('source')));
      }

      // Primary-conversation skin. It reads the already projected timeline: no
      // session events are scanned, no transcript renderer is replaced.
      function Skin(props) {
        const p = usePreferences();
        const locale = useLocale();
        const running = props.useSession(s => s.running);
        const turn = props.useChat(snapshot => snapshot.timeline.turnOrder.at(-1));
        const start = props.useChat(snapshot => {
          const order = snapshot.timeline.turnOrder;
          const turn = snapshot.timeline.turns.get(order.at(-1));
          return turn?.start?.time;
        });
        const [now, setNow] = React.useState(Date.now);
        React.useEffect(() => {
          if (!p?.enabled || !running) return;
          setNow(Date.now());
          const timer = setInterval(() => setNow(Date.now()), 1000);
          return () => clearInterval(timer);
        }, [p?.enabled, running, start]);
        if (!p?.enabled || !running) return null;
        const elapsed = Number.isFinite(start) ? Math.max(0, now-start) : 0;
        const word = selectVerb(p.verbs, turn, elapsed, p.interval);
        return h('style', { 'data-spinner-studio':props.sessionId }, spinnerCSS(p, word, start===undefined?'':durationLabel(elapsed), locale.active.startsWith('pt')));
      }
      ctx.slots.inject('settings.section', () => ctx.slots.register({ name:'settings.section', id:'spinner-studio', order:44, label:()=>t('title'), locale:NS }, Panel));
      ctx.slots.inject('settings.section.icon', () => ctx.slots.register({ name:'settings.section.icon', id:'spinner-studio' }, () => h(Icon, { preferences:{...DEFAULTS,icon:'spark'}, size:18 })));
      ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({ name:'conversation.composer.dock', id:'spinner-studio-skin-v1-1-0', order:90 }, Skin));
    }
  };
}
