import z from '@deepseek-ai/schemastery';
import { DEFAULTS, ICONS, spinnerErrorKey } from './shared.js';
import { createSpinnerService, boundedJSON } from './service.js';

export const Config = z.object({
  preferences: z.object({
    enabled: z.boolean().default(DEFAULTS.enabled),
    icon: z.union([...ICONS]).default(DEFAULTS.icon),
    emoji: z.string().default(DEFAULTS.emoji),
    image: z.string().default(''),
    size: z.number().default(DEFAULTS.size),
    interval: z.number().default(DEFAULTS.interval),
    verbs: z.array(z.string()).default([...DEFAULTS.verbs])
  }).default({}).volatile()
});
export const inject = ['connection', 'tools'];
export function apply(ctx, config) {
  const service = createSpinnerService(
    () => config.preferences.get(),
    async next => {
      const entry = ctx.fiber.entry;
      const editor = ctx.get('configEditor');
      if (!entry || !editor) throw new Error('This profile cannot persist plugin settings.');
      await editor.edit(entry, current => ({ ...current, preferences: next }));
    }
  );
  ctx.provide('spinnerStudio', service);
  const streams = new Set();
  ctx.effect(() => () => { for (const close of [...streams]) close(); });
  ctx.effect(() => ctx.connection.fetch.register({
    path: '/api/plugins/spinner-studio/watch', methods: ['GET'], requestBody: 'buffered',
    async fetch(request) {
      const encoder = new TextEncoder();
      let close;
      const body = new ReadableStream({
        start(controller) {
          let stopped = false;
          const publish = preferences => { if (!stopped) controller.enqueue(encoder.encode('data: ' + JSON.stringify({ preferences }) + '\n\n')); };
          const unsubscribe = service.subscribe(publish);
          close = () => { if (stopped) return; stopped = true; unsubscribe(); streams.delete(close); request.signal.removeEventListener('abort', close); try { controller.close(); } catch { /* The consumer may already have canceled. */ } };
          streams.add(close);
          request.signal.addEventListener('abort', close, { once: true });
          if (request.signal.aborted) close();
          else publish(service.snapshot());
        },
        cancel() { close?.(); }
      });
      return new Response(body, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'X-Accel-Buffering': 'no' } });
    }
  }));
  ctx.effect(() => ctx.connection.fetch.register({
    path: '/api/plugins/spinner-studio', methods: ['GET', 'POST'], requestBody: 'streaming',
    async fetch(request) {
      try {
        const input = request.method === 'GET' ? { action: 'read' } : await boundedJSON(request);
        const result = await service.operate(input);
        return Response.json(result, { headers: { 'Cache-Control': 'no-store' } });
      } catch (error) {
        return Response.json({ error: error instanceof Error ? error.message : 'Unable to save settings.', errorCode: spinnerErrorKey(error) }, { status: 400 });
      }
    }
  }));
  ctx.effect(() => ctx.tools.register({
    name: 'spinner_studio',
    description: 'Read or personalize the Harness activity indicator for this profile. Changes persist and affect all sessions. Returns saved settings, icon image presence, and verb count.',
    parameters: {
      type: 'object', additionalProperties: false,
      properties: {
        action: { type: 'string', enum: ['read', 'update', 'claude', 'reset'], description: 'claude restores the 179 source verbs plus Deep diving; reset restores all defaults.' },
        patch: { type: 'object', additionalProperties: false, description: 'Fields to change with update.', properties: {
          enabled: { type: 'boolean' }, icon: { type: 'string', enum: [...ICONS] },
          emoji: { type: 'string', maxLength: 32 },
          image: { type: 'string', description: 'PNG, JPEG, WebP or GIF data URL, up to 250 KiB.' },
          size: { type: 'integer', minimum: 12, maximum: 40 },
          interval: { type: 'integer', minimum: 2, maximum: 60, description: 'Seconds between verbs.' },
          verbs: { type: 'array', minItems: 1, maxItems: 500, items: { type: 'string', maxLength: 80 } }
        } }
      }, required: ['action']
    },
    output: { schema: { type: 'object' }, render: (_args, value) => [{ type: 'text', text: JSON.stringify(value) }] },
    async execute(input) {
      const { preferences } = await service.operate(input);
      return { preferences: { ...preferences, image: preferences.image ? '[saved image]' : '' }, verbCount: preferences.verbs.length };
    }
  }));
}
