# swarm-animation

Source: https://github.com/thefullctx/swarm-animation

Pinned commit: `8a847bb2d62acfec1f145c905cd8a62f0078e9a4` (MIT; see `LICENSE`).

Local changes to `swarm.js`:

- `root` scopes scanning and the cursor overlay to a supplied element.
- `controls: false` keeps the upstream control bar detached.
- `onStop` notifies the caller after playback cleanup.

The homepage loads this file only after an explicit request. The adapter in
`lib/swarm-preview.ts` animates inert copies of marked static content, respects
reduced motion, and restores the page on completion or interruption. It never
passes React-owned content to the engine. The page provides localized controls.
