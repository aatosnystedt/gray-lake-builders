/* ==========================================================================
   Theme — the swap file
   --------------------------------------------------------------------------
   This is the only file that changes from brand to brand: colours and images.
   Everything else about the design (type, weights, sizes, radii, spacing,
   shadows, motion) is the fixed system in tokens.css.

   Colours become --color-<name> custom properties (camelCase -> kebab-case,
   so `accentHover` is --color-accent-hover). Images become --image-*,
   --logo-* and --owner-* properties, plus the src/alt used in the markup.
   themeStyles.js does that conversion; you should never need to touch it.
   ========================================================================== */

export const theme = {
  colors: {
    /* primary buttons, the form submit, focus rings, link hover */
    accent: '#6b1640',
    accentHover: '#571133',
    /* text and icons sitting on the accent */
    onAccent: '#ffffff',

    /* ground behind the whole page */
    page: '#0d1628',
    /* text and icons over the hero photo: nav, phone, headline, lede, rating */
    heroText: '#ffffff',
    /* the wash laid over the hero photo (alpha is set by the system) */
    scrim: '#0b1528',
    /* card and dropdown shadows (alpha is set by the system) */
    shadow: '#091223',

    /* card, dropdown, mobile nav panel, light button, form fields */
    surface: '#ffffff',
    surfaceHover: '#eceef2',

    /* text on surfaces */
    ink: '#17182b',
    /* form labels */
    inkSoft: '#2a2c3c',
    /* the form card's subtitle */
    inkStrong: '#000000',

    placeholder: '#a2a8b2',
    border: '#dcdfe4',

    /* review stars */
    rating: '#d3a94b',
  },

  images: {
    hero: {
      src: '/assets/hero.jpg',
      alt: 'Snow-covered mountain neighborhood in Clear Creek County, Colorado',
      /* background-position: which part of the photo survives the crop */
      position: 'center top',
    },

    /* A cutout of the person, sitting on the bottom edge of the hero. */
    owner: {
      src: '/assets/owner.png',
      alt: 'Owner of Gray Lake Builders',
      /* the file's intrinsic size, in px */
      width: 1080,
      height: 876,
      /* How far down the file the solid subject reaches. Cutouts often carry
         a soft, near-transparent halo below the body; everything under this
         row is treated as empty, so the subject lands flush on the fold.
         Use `height` if the image has no such strip. */
      solidHeight: 832,
      /* rendered width on desktop, and how far to shift it off centre -- the
         subject isn't centred in the file */
      displayWidth: '560px',
      offsetX: '-44%',
    },

    /* The logo is drawn once and recoloured with CSS filters: `onDark` over
       the hero photo, `onLight` over the white mobile nav panel. For a logo
       that already has the right colours, set both to 'none'. */
    logo: {
      src: '/assets/logo.png',
      alt: 'Gray Lake Builders',
      width: '130px',
      filterOnDark: 'brightness(0) invert(1)',
      filterOnLight: 'none',
    },

    /* the review-source mark in front of the star rating */
    ratingIcon: {
      src: '/assets/google.svg',
      alt: 'Google',
    },
  },
};
