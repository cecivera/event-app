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
    typography.css      # text styles (body-*, headline-*), same names as Figma
  components/
    points-card/        # PointsCard.tsx, .module.css, .stories.tsx, index.ts
    event-pass/
    event-banner/
    earn-points/
  app/                  # prototype pages
.storybook/             # theme switcher in the toolbar
```

One folder per component, each with its own stories.

## Theming (white label)

Tokens come in three layers, same as the Figma extended library:

1. **Primitives**: `--ss-green-*`, `--ss-neutral-*`. Components never use them directly.
2. **Theme**: `--ss-color-accent*`, `--ss-color-on-accent`. Switches with `data-theme` on any ancestor.
3. **Shared**: surface, text, border, spacing. Same in every theme.

| Token | `default` | `stan-smith` |
|---|---|---|
| `--ss-color-accent` | black | green/600 #00AA55 |
| `--ss-color-accent-strong` | black | green/800 #0A5128 |
| `--ss-color-accent-deep` | black | green/900 #0E361B |
| `--ss-color-accent-subtle` | #F5F5E5 | green/100 #E3F3EA |
| `--ss-color-on-accent` | white | white |

A new brand = a new `[data-theme="..."]` block in `tokens.css`.

## Components

| Component | Figma | States | Notes |
|---|---|---|---|
| `PointsCard` | node 1:161 | Default, Stan Smith | `progress` and `pointsToNextEntry` are separate props until the entry-conversion rule is confirmed |
| `EventPass` | node 1:160 | `valid`, `checked-in` | QR is a slot (`qr` prop); placeholder by default |
| `EventBanner` | node 1:174 | with and without image | CTA renders as a link (`ctaHref`) or a button |
| `EarnPoints` | node 35:65 ("Suma puntos") | pending, done | Uses hardcoded colors in Figma, so it does not react to the theme yet |

## Open decisions

- Entry-conversion threshold: how `progress` and `pointsToNextEntry` relate.
- Singular/plural for "raffle entries" when the value is 1 (copy is overridable via `labels`).
- Zero and completed-progress behavior, loading and error states.
- `EarnPoints` colors (`#E0E0E0` row divider, `#2E6A3D` DONE tag) are not Figma variables. Proposed tokens `--ss-color-border-subtle` and `--ss-color-status-done` hold them until they are bound.
