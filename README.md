# Event App

White-label event app (adiClub). Components built in code from the Figma file
[Events - Shangai](https://www.figma.com/design/dIfJBQBNE3077rmLk0rXbN/Events---Shangai), used as the prototype for dev handoff.

Stack: Next.js (App Router) + TypeScript + CSS Modules + Storybook. Components and tokens only; no Tailwind.

## Run

```bash
npm install
npm run storybook   # component docs and states at http://localhost:6006
npm run dev         # prototype page at http://localhost:3000
```

## Structure

```
src/
  tokens/
    tokens.css          # --ss-* variables, same names as Figma. Theme = data-theme attribute
    typography.css      # text styles (body-s, body-xs, headline-s)
  components/
    points-card/        # PointsCard.tsx, .module.css, .stories.tsx, index.ts
  app/                  # prototype pages
.storybook/             # theme switcher in the toolbar
```

One folder per component, each with its own stories.

## Theming (white label)

Themes are set with `data-theme` on any ancestor. Only the accent tokens change per theme:

| Token | `default` | `stan-smith` |
|---|---|---|
| `--ss-color-accent` | #000000 | #00AA55 |
| `--ss-color-accent-strong` | #000000 | #0A5128 |

Everything else (surface, text, border, spacing) is shared. A new brand = a new `[data-theme="..."]` block in `tokens.css`.

## Components

| Component | Figma | Themes | Notes |
|---|---|---|---|
| `PointsCard` | node 1:161 | default, stan-smith | `progress` (0-100) and `pointsToNextEntry` are separate props until the entry-conversion rule is confirmed |

## Open decisions (from the Figma spec)

- Entry-conversion threshold: how `progress` and `pointsToNextEntry` relate.
- Singular/plural for "raffle entries" when the value is 1 (copy is overridable via `labels`).
- Zero and completed-progress behavior, loading and error states.
