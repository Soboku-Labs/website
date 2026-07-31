# Soboku Labs — brand marks

素朴 *soboku* — simple, plain, unadorned.

## Files

| File | Use |
| --- | --- |
| `logo.svg` | The mark, in sakura. Square canvas, safe for avatars and app icons. |
| `logo-mono.svg` | The mark in `currentColor` — inherits the surrounding text colour. |
| `logo-lockup.svg` | Mark + wordmark, for headers and letterheads. |
| `logo-lockup-mono.svg` | Lockup in `currentColor`, for dark backgrounds and single-colour print. |

All four are plain SVG with no external references, no embedded fonts, and no
raster fallbacks. The mark files are under 700 bytes.

## Construction

The mark is **one petal, rotated five times**. That is the whole logo — the
design-system idea stated in the geometry rather than described next to it. The
source keeps it literal: a single `<path id="p">` and five `<use>` elements at
72° increments.

```svg
<defs><path id="p" d="M 0 -4 C -6 -10, -11 -20, ... Z"/></defs>
<use href="#p" transform="rotate(0)"/>
<use href="#p" transform="rotate(72)"/>
...
```

Change the primitive and the whole blossom follows. The petal is deliberately
narrow with a shallow notch: a rounder petal and a deeper notch turn the shape
into a heart, and five hearts are not what this is.

The petals stop short of the centre, leaving an open void rather than a solid
core. Do not close it up — the negative space is what keeps the mark legible at
16px.

## Colour

| Token | Light | Dark |
| --- | --- | --- |
| Sakura (mark) | `#d4737f` | `#e3a0a8` |
| Ink (wordmark) | `#1b1a18` | `#ece7e0` |

On dark backgrounds use the mono files and set `color` on the parent, or swap
the mark's fill to the dark-mode sakura. The light-mode sakura is legible on
dark but reads heavier than intended.

## Clear space and minimum size

- **Clear space:** one petal-length on every side — a quarter of the mark's
  width. Nothing else sits inside it.
- **Minimum size:** 16px for the mark, 120px wide for the lockup. Below 120px
  the wordmark's serifs start to fill in; use the mark alone instead.

## The wordmark

Set in Liberation Serif Regular with 1.8% tracking, converted to outlines — the
lockup carries no font dependency and renders identically everywhere. The
tracking is deliberate; re-setting the wordmark at default tracking makes it
noticeably tighter than the site's headline.

To regenerate after changing the typeface, the glyphs are outlined with
`fontTools` (`SVGPathPen` over the font's glyph set), normalised so cap height
is 100 units and the baseline sits at `y=0`.

## Don't

- Don't add a centre dot, outline the petals, or set the blossom in a container
  shape.
- Don't rotate the mark. One petal points up.
- Don't recolour the mark outside the two sakura values above.
- Don't re-typeset the wordmark in another face and call it the lockup.
