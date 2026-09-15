# Gray Lake Builders

Next.js (App Router) site with an embedded Sanity Studio. The hero copy comes
from Sanity; everything else on the page is still markup.

## Structure

    app/(site)/page.jsx         the homepage — server component, reads Sanity
    app/(site)/theme.js         colours + images — the per-brand swap file
    app/(site)/tokens.css       every other design value (the fixed system)
    app/(site)/themeStyles.js   turns theme.js into CSS custom properties
    app/(site)/globals.css      component styles, built only from tokens
    app/(site)/icons.jsx        the system icons (arrow, phone, chevron, star)
    content/defaults.js         default copy — hero CTAs and the whole form
    app/(site)/SiteBehaviors.jsx  mobile nav panel + hero photo/white seam
    app/studio/[[...tool]]/     the embedded Studio at /studio
    sanity/                     schema, structure, client, queries
    sanity.config.js            Studio config
    public/assets/              hero photo, owner cutout, logo, Google mark

## Theming

The design is split into two layers:

- **`theme.js` — what changes per brand.** 15 semantic colours (`accent`,
  `surface`, `ink`, `scrim`, …) and the images (hero photo, owner cutout, logo,
  rating icon). This is the only file to edit to re-skin the site.
- **`tokens.css` — what doesn't.** Type families, weights, sizes, tracking,
  radii, borders, shadows, spacing, z-layers and motion.

`globals.css` contains no raw colours and no design values of its own — only
token references, structural keywords (`0`, `100%`, `auto`) and the
breakpoints, which media queries can't read from custom properties.

Colours surface as `--color-<name>` (`accentHover` → `--color-accent-hover`).
Composite tokens — shadows, the hero scrim, the focus ring, the panel's muted
links — are mixed from those colours with `color-mix()`, so they follow a
theme change without being edited.

Images carry the geometry that depends on the file:

- `owner.solidHeight` — how far down the file the solid subject reaches. Soft
  cutout halos below that row are treated as empty, so the subject lands flush
  on the fold (desktop) and meets the card (mobile). Use the image `height` if
  there's no such strip.
- `owner.offsetX` / `displayWidth` — framing, since subjects are rarely centred.
- `logo.filterOnDark` / `filterOnLight` — the logo is recoloured with CSS
  filters over the photo and over the white mobile panel. For a logo that
  already has the right colours, set both to `'none'`.

### Icons

The button arrow, phone handset, dropdown chevron and rating star live in
`app/(site)/icons.jsx` and are part of the fixed system: import them, don't
redraw them. They paint with `currentColor`, so they take the theme's colours.

### Type

- Headings — Fraunces (300), `--font-display`
- Body / UI — Raleway, `--font-body`

Both are loaded from Google Fonts in `app/(site)/layout.jsx`; change that URL
together with the family tokens.

## Local development

    npm install
    npm run dev

Then visit http://localhost:3000 (the Studio is at /studio). Copy
`.env.local.example` to `.env.local` and fill in the project id first — without
it the Studio route throws, though the homepage still renders on its fallback
copy.

## Content

### Defaults

`content/defaults.js` holds the copy the site ships with: the hero heading,
subheading and both button labels, plus the form's heading, subheadline,
every field's label and placeholder, and the submit label. Whatever a project
specifies wins; whatever it leaves out renders the default. The Sanity
fallbacks and the Studio's initial values both import this file, so the three
can't drift apart.

In headings a newline is a desktop line break (ignored on mobile), and an `&`
in the form heading is set in italic.

### Sanity

`homePage` is a singleton: one document with the id `homePage`, opened directly
from the Studio sidebar rather than through a list, with duplicate and delete
removed. It currently carries the hero heading, subheading, and the two CTA
labels; further sections get added to the same document as they are modelled.

Every field falls back to `content/defaults.js`, so a missing document, a
blank field, or an unreachable Sanity all still render a complete page (see
`sanity/queries.js`). Published copy is cached for 60s (`revalidate`).

## Notes

- Breakpoints (1180px / 1040px / 620px) are literals in `globals.css`; 1040px
  is mirrored in `SiteBehaviors.jsx`.
- The desktop nav dropdowns are CSS-only (`:hover` + `:focus-within`). Below
  1040px the same markup becomes a full-screen panel behind a hamburger, and
  the submenu parents expand in place instead. Both paths honour
  `prefers-reduced-motion`.
- Below 1040px the hero photo stops partway down the form and the rest of the
  page is white. `--hero-cut` is measured in `SiteBehaviors.jsx` because CSS
  can't see where the card lands from an absolutely positioned backdrop;
  `--hero-overlap` (in `tokens.css`) sets how far the card crosses the seam.
- The hero heading is one string with a newline in it. The newline becomes a
  `<br>` on desktop and is ignored on mobile, where the CSS hides the break.
