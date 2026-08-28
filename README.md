# Gray Lake Builders

Next.js (App Router) site with an embedded Sanity Studio. The hero copy comes
from Sanity; everything else on the page is still markup.

## Structure

    app/(site)/page.jsx         the homepage — server component, reads Sanity
    app/(site)/globals.css      all styling
    app/(site)/SiteBehaviors.jsx  mobile nav panel + hero photo/white seam
    app/studio/[[...tool]]/     the embedded Studio at /studio
    sanity/                     schema, structure, client, queries
    sanity.config.js            Studio config
    public/assets/              hero photo, owner cutout, logo, Google mark

## Type

- Headings — Fraunces (300)
- Body / UI — Raleway

Both are loaded from Google Fonts.

## Local development

    npm install
    npm run dev

Then visit http://localhost:3000 (the Studio is at /studio). Copy
`.env.local.example` to `.env.local` and fill in the project id first — without
it the Studio route throws, though the homepage still renders on its fallback
copy.

## Content

`homePage` is a singleton: one document with the id `homePage`, opened directly
from the Studio sidebar rather than through a list, with duplicate and delete
removed. It currently carries the hero heading, subheading, and the two CTA
labels; further sections get added to the same document as they are modelled.

Every field falls back to the copy that used to be hardcoded, so a missing
document, a blank field, or an unreachable Sanity all render the original page
(see `sanity/queries.js`). Published copy is cached for 60s (`revalidate`).

## Notes

- The desktop nav dropdowns are CSS-only (`:hover` + `:focus-within`). Below
  1040px the same markup becomes a full-screen panel behind a hamburger, and
  the submenu parents expand in place instead. Both paths honour
  `prefers-reduced-motion`.
- Below 1040px the hero photo stops partway down the form and the rest of the
  page is white. `--hero-cut` is measured in `SiteBehaviors.jsx` because CSS
  can't see where the card lands from an absolutely positioned backdrop;
  `--hero-overlap` (in `globals.css`) sets how far the card crosses the seam.
- The hero heading is one string with a newline in it. The newline becomes a
  `<br>` on desktop and is ignored on mobile, where the CSS hides the break.
- `public/assets/owner.png` carries a feathered halo below its last solid row
  (831 of 876); `.hero__owner` offsets by that strip so the subject sits flush
  on the fold at every breakpoint.
- The email field's placeholder reproduces the source screenshot literally,
  including its Cloudflare email-obfuscation artifact.
