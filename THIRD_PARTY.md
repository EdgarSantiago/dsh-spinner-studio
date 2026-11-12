# Third-party notices

## Spinner verb source

The 179-word `CLAUDE_VERBS` list is adapted from [Claude Code: The Spinner](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-spinner-verbs-and-tips.md), in shanraisshan/claude-code-best-practice, consulted on 2026-11-12. `Deep diving` is an additional default, for 180 initial choices. Claude-specific tips and product functionality are not imported. Claude and DeepSeek names identify compatibility/source context, not affiliation or endorsement.

The source repository's [MIT license](https://github.com/shanraisshan/claude-code-best-practice/blob/main/LICENSE) was verified on 2026-11-12:

MIT License

Copyright (c) 2025-2026 Shayan Rais

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Original assets and runtime dependencies

The plugin icon and four GIF presets (including reduced-motion still frames) are original project artwork, covered by the root MIT license. GIF generation uses Pillow as development tooling; Pillow is not bundled or required for installation.

React is supplied by Harness and is not bundled. `@deepseek-ai/schemastery` is a normal MIT-licensed runtime dependency resolved by the package manager, not vendored here; its own package retains its license. No third-party runtime is copied into the generated Client artifact other than the attributed verb list above.
