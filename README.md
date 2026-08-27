# Gray Lake Builders — Hero

Static, dependency-free recreation of the Gray Lake Builders hero section.

## Structure

    index.html      markup
    styles.css      all styling
    assets/         hero photo, owner cutout, logo, Google mark

## Type

- Headings — Fraunces (300)
- Body / UI — Raleway

Both are loaded from Google Fonts; there is no build step.

## Local preview

The page must be served over HTTP — opening `index.html` via `file://`
blocks the stylesheet and images.

    python3 -m http.server 4321

Then visit http://localhost:4321.

## Notes

- The nav dropdowns are CSS-only (`:hover` + `:focus-within`), with a
  `prefers-reduced-motion` fallback.
- `assets/owner.png` carries a feathered halo below its last solid row (831
  of 876); `.hero__owner` offsets by that strip so the subject sits flush on
  the fold at every breakpoint.
- The email field's placeholder reproduces the source screenshot literally,
  including its Cloudflare email-obfuscation artifact.
