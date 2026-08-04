# Soboku Labs — brand marks

素朴 *soboku* — simple, plain, unadorned.

## Files

| File | Use |
| --- | --- |
| `logo.svg` | **The logo.** 素朴 on the blossom. Square, so it drops straight into avatar and app-icon slots. |
| `logo-mono.svg` | The logo in one colour — characters knocked out of a `currentColor` blossom. |
| `logo-mark.svg` | **The reduction.** The plain blossom, for anywhere the logo is too small to read. |
| `logo-mark-mono.svg` | The reduction in `currentColor`. |
| `logo-lockup.svg` | Logo + Soboku Labs, for headers and letterheads. |
| `logo-lockup-mono.svg` | The lockup in `currentColor`, for dark backgrounds and one-colour print. |

All six are plain SVG: no external references, no embedded fonts, no raster
fallbacks.

## Two marks, and when to use which

素 is a ten-stroke character. Overlaid on the blossom it is crisp at 64px,
marginal at 48px, and illegible below that — no amount of redrawing fixes
that, it is a property of the character.

So the system has two marks, and picking between them is a size decision:

- **48px and above → `logo.svg`.** The logo proper.
- **Below 48px → `logo-mark.svg`.** Favicons, dense lists, home-screen icons.
  The blossom alone still reads at 16px.

The site follows this rule: the favicon and the touch icon both use the plain
mark, not the logo.

## Construction

The blossom is **one petal, rotated five times** — the design-system idea
stated in the geometry rather than described beside it. The source keeps it
literal: a single `<path id="p">` and five `<use>` elements at 72° increments.

```svg
<defs><path id="p" d="M 0 -6 C -10 -10, -17 -19, ... Z"/></defs>
<use href="#p" transform="rotate(0)"/>
<use href="#p" transform="rotate(72)"/>
...
```

Change the primitive and the whole blossom follows.

素朴 sits stacked vertically over the centre, set in IPAMincho and converted to
outlines. Vertical is not decoration: two stacked characters fit a round mark,
where side-by-side would force them small enough to lose the overlay entirely.

The two marks differ at the centre, deliberately:

- In **`logo.svg`** the centre is filled, so petal gaps do not show through
  between the strokes.
- In **`logo-mark.svg`** the five-pointed star of negative space is left open.
  Don't fill it — that void is what stops the plain blossom reading as a blob
  at small sizes.

## Colour

| Token | Value | Where |
| --- | --- | --- |
| Petal pale | `#eec2c8` | the blossom, in `logo.svg` |
| Ink | `#1b1a18` | the characters and the Latin wordmark |
| Sakura | `#d4737f` | the blossom, in `logo-mark.svg` |
| Sakura, dark mode | `#e3a0a8` | the reduction on dark backgrounds |

Ink on petal-pale is about 10.9:1 — the contrast is what keeps the characters
legible as the logo shrinks, so don't deepen the blossom without re-checking
it. `logo.svg` needs no dark-mode variant: the pale blossom carries its own
field, so it sits on light and dark alike.

## The wordmark

Set in Liberation Serif Regular with 1.8% tracking, converted to outlines, so
the lockup carries no font dependency and renders identically everywhere.

Both the characters and the Latin are outlined with `fontTools` (`SVGPathPen`
over the font's glyph set), normalised so the Latin cap height is 100 units
with the baseline at `y=0`. Regenerate from those two fonts if the typography
changes — don't edit path data by hand.

## Clear space and minimum size

- **Clear space:** one petal-length on every side — about a quarter of the
  blossom's width. Nothing else sits inside it.
- **Minimum sizes:** 48px for `logo.svg`; 16px for `logo-mark.svg`; 200px wide
  for the lockup.

## Don't

- Don't shrink `logo.svg` below 48px. Switch to the reduction instead.
- Don't fill the star in `logo-mark.svg`, or open the centre in `logo.svg`.
- Don't set the characters side by side, or rotate the blossom. One petal
  points up.
- Don't re-typeset either the characters or the wordmark in another face and
  call it the logo.
