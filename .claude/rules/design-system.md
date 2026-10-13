---
paths:
  - "app/**/*.tsx"
  - "app/**/*.css"
  - "components/**/*.tsx"
---

# Design system

The UI is shadcn components (`components/ui/`) styled by the tokens in `app/globals.css`.
Every color comes from a token, so light and dark mode work without `dark:` classes.

## Colors

| Token | Use |
| --- | --- |
| `background` / `foreground` | Page surface and body text (neutrals carry a faint blue tint) |
| `card` | Raised surfaces (Card, Table container) |
| `muted-foreground` | Secondary text: descriptions, table meta, placeholders |
| `primary` | The one action color (deep blue): main buttons, links, focus ring |
| `accent` | Hover / selected backgrounds |
| `success` | Maintenance up to date, completed |
| `warning` | Service due soon |
| `destructive` | Overdue, errors, delete actions |

- One primary action per area; other buttons use `outline`, `ghost` or `secondary`.
- Status colors mean status only (green OK, amber due soon, red overdue/error), never decoration.
- Never use raw Tailwind palette colors (`zinc-*`, `red-600`, …) or `dark:` overrides in pages.
- Exception: a car's paint color is data, not theme. It comes from `lib/car-colors.ts` (`swatch`) and is shown with `CarColorLabel` or as the left stripe on car cards; it doesn't change between light and dark mode.
- `.surface-brand` (in `globals.css`) re-scopes the tokens to the deep-blue brand surface used by the nav; components inside adapt automatically.
- New tokens need light and dark values in `globals.css` and a `--color-*` entry in `@theme inline`; check text contrast ≥ 4.5:1.

## Typography

- Overpass (`font-sans`) for all UI text; Overpass Mono (`font-mono`) for license plates and VINs. Loaded with `next/font/google` in `app/layout.tsx`.
- Compared numbers (mileage, cost, counts): `tabular-nums`, right-aligned in tables, `toLocaleString()`.
- Page title via `PageHeader` (`text-2xl font-bold`); card titles via `CardTitle`; body `text-sm`; secondary `text-sm text-muted-foreground`.
- Sentence case. Buttons name the action ("Save changes", "Delete car"); the toast echoes it ("Changes saved", "Car deleted").

## Shape and spacing

- `--radius: 0.5rem`: inputs/buttons `rounded-lg`, cards `rounded-xl`, badges are pills.
- 4px grid. Page sections `gap-6` (from the layout), form fields `gap-4`.

## Layout

- Signed-in pages go in `app/(app)/`; the layout supplies the `max-w-3xl p-6 gap-6` container, so pages don't add their own.
- Every app page starts with `<PageHeader title=… />` (optional `eyebrow`, `description`, `actions`).

## Patterns

| Situation | Use |
| --- | --- |
| Form fields | `FieldGroup` > `Field` > `FieldLabel` + `Input`; two columns with `grid sm:grid-cols-2` |
| Submitting | `ActionForm` (toast, optional `redirectTo`) + `SubmitButton` (spinner while pending) |
| Destructive action | `AlertDialog` confirmation; confirm with `SubmitButton variant="destructive"` |
| Nothing to show | `Empty` with an icon, one sentence, and the action that fills it |
| Loading | A `Skeleton` fallback shaped like the final content (same Cards, grid and row count), defined next to the page as `XxxSkeleton`; mark it `aria-busy` with an `aria-label` |
| Card title / stat icon | `IconTile` (tinted square: `tone="primary"`, or `"destructive"` for danger zones); `size="sm"` beside a `CardTitle`, default size in a stat card's `CardAction` |
| Empty state icon | `EmptyMedia variant="icon"` (already primary-tinted) |
| Logo | `<Logo className="w-8" />` (inline SVG drawn in `currentColor`; set its color with a `text-*` class, never add colored logo files) |
