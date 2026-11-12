import { DEFAULTS, CLAUDE_VERBS, validatePreferences, spinnerError } from './shared.js';

/** One operation boundary shared by the settings panel and the agent tool. */
export function createSpinnerService(readPreferences, persistPreferences) {
  let queue = Promise.resolve();
  const snapshot = () => validatePreferences(readPreferences() ?? {});
  const listeners = new Set();
  return {
    snapshot,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    operate(input) {
      const work = queue.then(async () => {
        if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Expected an action.');
        if (input.action === 'read') return { preferences: snapshot() };
        let next;
        if (input.action === 'update') next = validatePreferences(input.patch, snapshot());
        else if (input.action === 'reset') next = validatePreferences(DEFAULTS);
        else if (input.action === 'claude') next = validatePreferences({ verbs: ['Deep diving', ...CLAUDE_VERBS] }, snapshot());
        else throw new Error('Unknown action.');
        await persistPreferences(next);
        const saved = snapshot();
        for (const listener of listeners) listener(saved);
        return { preferences: saved };
      });
      queue = work.catch(() => {});
      return work;
    }
  };
}

export async function boundedJSON(request, limit = 380000) {
  if (request.headers.get('content-type')?.split(';')[0]?.trim() !== 'application/json') throw new Error('Expected application/json.');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Empty request.');
  let size = 0;
  const chunks = [];
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new Error('Request too large.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw spinnerError('invalidRequest', 'Invalid JSON request.'); }
}
