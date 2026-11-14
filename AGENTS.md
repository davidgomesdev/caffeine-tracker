# Caffeine tracker

One-tap caffeine log for a phone. Static page hosted on GitHub Pages. Data lives in the browser's `localStorage`; there is no backend.

## Files

- `index.html`: the whole app (HTML, CSS, JS). No dependencies and no build step.
- `sw.js`: service worker, network-first with cache fallback, so the page opens offline.
- `test.mjs`: checks the pure logic. Run `node test.mjs`; it prints `ok` on success.

## Rules

- Keep it one file with no dependencies. Do not add a framework, bundler or package manager unless asked.
- Pure logic (`ITEMS`, `ymd`, `bump`, `toCSV`) stays between the `// <pure>` and `// </pure>` markers in `index.html`. `test.mjs` extracts that block, so do not move DOM code into it.
- Dates are local `YYYY-MM-DD` strings (`ymd`). Never use `toISOString()`: it returns UTC and logs the wrong day late in the evening.
- Data shape: `{ "2026-11-14": { choc: 1, coffee: 2, tea: 0 } }` under the `caffeine` key. Changing it needs a migration for existing phones.
- Behavior to preserve:
  - One tap logs one serving, with an Undo toast.
  - Tapping an item already logged today asks "Log another?" first.
  - Logged buttons stay full strength (white, thick border, ✓ count); never dim them.
  - CSV (`date,dark_chocolate,coffee,tea`) has a row for every day from the first entry to today, zeros included.
- Check layout at 390px wide. Headless Chrome crops wider than the window, so screenshot inside a 390px iframe.

## Git

- Never commit or push to `main`. Work in a worktree on `<type>/<short-description>`.
- Conventional commits. No co-author trailers. Never skip hooks or signing.
- Open a PR with `gh pr create`. A human merges it.
