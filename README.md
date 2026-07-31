# Soboku Labs — website

素朴 *soboku* — simple, plain, unadorned.

A single-page site for a design and application systems lab. No framework, no
build step, no dependencies: three static files that can be served from
anywhere.

```
index.html    markup and copy
styles.css    layout and theme
sakura.js     the falling-petal canvas
brand/        logo marks + usage notes
```

## Running it

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

## Deploying

`.github/workflows/deploy.yml` publishes the site to GitHub Pages on every push
to `main`, and can be run by hand from the Actions tab.

The workflow asks Pages to enable itself (`enablement: true`), so a fresh repo
normally needs no manual setup. If the deploy step still reports that Pages is
not enabled, set *Source* to **GitHub Actions** once in **Settings → Pages**.

Any other static host works too — there is nothing to build, so serving the
repo root is enough.

## Notes

- **One page, one screen.** The vertical rhythm is driven by `vh`-based
  `clamp()` values, and the wordmark is sized against `min(11vw, 13vh)`, so a
  short laptop window compresses the type rather than producing a scrollbar.
  It fits a single viewport from 768px-wide tablets up; phones scroll slightly.
- **Petals** are drawn on a 2D canvas sized to `devicePixelRatio`. Petal count
  scales with viewport area (14–46), the animation pauses when the tab is
  hidden, and `prefers-reduced-motion: reduce` renders a still scatter with no
  animation loop at all.
- **Theme** follows `prefers-color-scheme`; both light and dark are defined as
  custom properties at the top of `styles.css`.
- **The three "Selected work" entries are placeholders** — swap the names,
  descriptions, and years in `index.html`.
- There is no contact section yet. If you want one, the footer in `index.html`
  is the natural place for a `mailto:` link.
