# Spinner studio

Customize the DeepSeek Harness activity indicator with icons, original GIFs and your own rotating verbs, without changing the chat messages.

**Category:** UI & Experience · **Version:** 1.1.0 · **License:** MIT · **Profiles:** Web / Desktop

An independent community plugin, not an official DeepSeek or Anthropic product.

## Install from GitHub

Requires **DeepSeek Harness `0.2.2-rc.1` or `0.2.2-rc.2`** and **Node.js 24.11+**. No other DSH release is declared compatible.

**Web profile**

```sh
dsh plugin --profile web add github:EdgarSantiago/dsh-spinner-studio
```

**Desktop profile**

```sh
dsh plugin --profile desktop add github:EdgarSantiago/dsh-spinner-studio
```

Follow the plugin manager's reload/restart instructions. Open **Settings → Activity indicator** (Portuguese: **Configurações → Indicador de atividade**), choose an icon and verbs, preview, then save. Changes apply to the profile's sessions. Discard leaves the saved preferences unchanged; disable personalization or restore defaults to use the native indicator.

This is **GitHub source distribution**, not an npm release. The package name remains `@local/dsh-spinner-studio`; `private: true` prevents accidental npm publication and does not require a private GitHub repository. Generated `client.js`, `gif-presets.js` and GIF assets are included in the repository/package. Installation needs **no build, Python, development dependencies or install scripts**; the package manager resolves its normal Schemastery runtime dependency.

## Features

- Native whale, spark, orbit, code, emoji or a local PNG/JPEG/WebP/GIF image (up to 250 KiB).
- Four original transparent GIF presets: dots, orbit, equalizer and pulse, with palette-aware masks and still frames for reduced motion. No CDN.
- Icon size 12–40 px; verb interval 2–60 seconds; editable list of up to 500 verbs.
- Includes all **179 attributed source verbs plus `Deep diving`** (180 initial choices).
- The initial verb varies across replies, including short replies; longer replies rotate at the chosen interval.
- Monochrome icons and text follow the current theme accent. Uploaded images and emoji keep their own colors.
- Preview, save, discard, defaults, and an enable/disable switch; English and Brazilian Portuguese labels.

## Permissions and data

- Preferences are persisted in the current **Harness profile** through its `configEditor`, not by editing YAML directly. They apply across sessions, not just the current conversation.
- Local uploaded image data and custom verbs are saved in those preferences; do not put secrets in custom text or images you share/export.
- The authenticated `api/plugins/spinner-studio` endpoint and `api/plugins/spinner-studio/watch` SSE stream serve the panel. The `spinner_studio` Agent tool can read, update, restore verbs or reset the same settings. Tool responses redact saved image bytes. This is a persistent profile-setting capability; no extra plugin-specific confirmation gate is added.
- The plugin itself does not call a model, execute shell commands, inspect workspace files or send telemetry. Normal Harness model/provider use is separate. No external service or API key is required by the plugin.
- Save failures are shown as errors, not reported as successful saves. Disabling/uninstalling the plugin releases its registrations and styling; saved profile configuration is managed by Harness.

## Compatibility and limitations

The declared range is exactly `0.2.2-rc.1 || 0.2.2-rc.2`. Runtime contracts and Client registrations were checked on macOS Desktop. This is not cross-platform visual certification.

There is no dedicated native icon/text slot. The plugin adds `settings.section` and a `conversation.composer.dock` adapter that renders a lifecycle-owned React `style` element. It targets the semantic `[data-chat-running]` marker, not hashed class names. It does not replace the root, chat flow, messages, approvals or renderers, or observe/mutate the DOM. Timeline projections provide elapsed time.

The adapter is for the **main chat**. Multiple chats mounted in one document are not CSS-isolated by session and may share the last-mounted verb/time styling. Native holding/accessible status and conversation controls are preserved. The whale preview is illustrative; chat retains the native animated whale. A future change to the indicator markup may require a plugin update.

No screenshot is claimed as verification. Automated logic/resource tests and live registration checks do not certify rendered light/dark appearance or actual pointer/keyboard interactions; check those in your running Harness.

## Reproducible checks and real output

```sh
npm run build
npm run check
npm test
npm pack --dry-run --ignore-scripts
node --input-type=module -e "import { createSpinnerService } from './service.js'; const s=createSpinnerService(()=>({}),async()=>{}); const {preferences:p}=await s.operate({action:'read'}); console.log(JSON.stringify({icon:p.icon,size:p.size,interval:p.interval,verbCount:p.verbs.length}));"
```

A local run on macOS with Node.js 24 produced this test summary (not browser certification):

```text
ℹ tests 21
ℹ pass 21
ℹ fail 0
```

The last command produces real default-service output, not a screenshot or a simulated UI:

```json
{"icon":"native","size":18,"interval":6,"verbCount":180}
```

For development, install the pinned dependencies from `package-lock.json` before running checks. `client-source.js` is the Client source; `build.mjs` uses Node built-ins to generate `client.js`, without bundling another React. Keep the generated artifact tracked. `generate-gifs.py` uses Pillow only when intentionally regenerating original `assets/gifs/` and `gif-presets.js`; it is unnecessary for installation/build/test.

## License and attribution

Project-authored code and original artwork are MIT-licensed in [LICENSE](./LICENSE). The 179-word verb list comes from [Claude Code: The Spinner — shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-spinner-verbs-and-tips.md), consulted on 2026-11-12. Its MIT copyright/permission notice and dependency information are preserved in [THIRD_PARTY.md](./THIRD_PARTY.md). Claude-specific tips are not imported as Harness features.

## Community catalog

For publication, make this repository public and add GitHub topic **`dsh-plugin`** (recommended additional topics: `deepseek-harness`, `spinner`, `personalization`). The [community submission requirements](https://dsh-plugin.org/submit) distinguish source-only website indexing from the in-app Plugin Hub: this GitHub-only package can be indexed on the website, but an npm release would be required for its npm-only in-app marketplace. No marketplace listing or verification badge is claimed.

## Português

Abra **Configurações → Indicador de atividade**, personalize o ícone/verbos e salve. Preferências ficam no perfil e valem para todas as sessões; não há chamadas de IA, CDN nem telemetria do plugin. Para instalar, use o comando GitHub do perfil acima, não o nome npm. Compatibilidade somente rc.1/rc.2; a conferência visual na sua instalação continua necessária.
