# Soboku Labs — brand marks

素朴 *soboku* — simple, plain, unadorned.

## Files

| File | Use |
| --- | --- |
| `logo.svg` | The mark alone, in sakura. Square canvas — avatars, app icons, favicons. |
| `logo-mono.svg` | The mark in `currentColor`. |
| `logo-kanji.svg` | Mark + 素朴. The compact logo, for tight horizontal space. |
| `logo-kanji-mono.svg` | The same in `currentColor`. |
| `logo-lockup.svg` | Mark + 素朴 + Soboku Labs. The full logo. |
| `logo-lockup-mono.svg` | The full logo in `currentColor`, for dark backgrounds and one-colour print. |

All six are plain SVG: no external references, no embedded fonts, no raster
fallbacks. The mark files are under 700 bytes.

## Construction

The mark is **one petal, rotated five times**. That is the whole blossom — the
design-system idea stated in the geometry rather than described beside it. The
source keeps it literal: a single `<path id="p">` and five `<use>` elements at
72° increments.

```svg
<defs><path id="p" d="M 0 -6 C -10 -10, -17 -19, ... Z"/></defs>
<use href="#p" transform="rotate(0)"/>
<use href="#p" transform="rotate(72)"/>
...
```

Change the primitive and the whole blossom follows.

The petals overlap near the centre, and the five-pointed star of negative space
this leaves is part of the mark — it is what keeps a solid blossom from reading
as a blob at small sizes. Don't fill it in.

## The characters

素朴 is set in IPAMincho and converted to outlines, with 10% tracking. The
generous tracking is deliberate: at default spacing the two characters crowd
each other at logo scale.

In the full lockup the characters sit above the Latin wordmark, in sakura,
mirroring the hierarchy on the website's masthead. In `logo-kanji.svg` they
stand alone beside the mark — the better choice when the logo has to work small
or in a square-ish space.

## The wordmark

Set in Liberation Serif Regular with 1.8% tracking, converted to outlines, so
the lockup carries no font dependency and renders identically everywhere.

Both the Latin and the characters are outlined with `fontTools`
(`SVGPathPen` over the font's glyph set), normalised so the Latin cap height is
100 units with the baseline at `y=0`. Regenerate from those two fonts if the
typography ever changes — don't edit the path data by hand.

## Colour

| Token | Light | Dark |
| --- | --- | --- |
| Sakura — mark and characters | `#d4737f` | `#e3a0a8` |
| Ink — Latin wordmark | `#1b1a18` | `#ece7e0` |

On dark backgrounds use the `-mono` files and set `color` on the parent. The
light-mode sakura stays legible on dark but reads heavier than intended.

## Clear space and minimum size

- **Clear space:** one petal-length on every side — about a quarter of the
  mark's width. Nothing else sits inside it.
- **Minimum sizes:** 16px for the mark; 150px wide for `logo-kanji.svg`; 220px
  wide for the full lockup. Below 220px the characters stop resolving — drop to
  the compact logo rather than shrinking further.

## Don't

- Don't fill the centre star, outline the petals, or set the blossom in a
  container shape.
- Don't rotate the mark. One petal points up.
- Don't recolour outside the two sakura values above.
- Don't re-typeset either the characters or the wordmark in another face and
  call it the logo.
