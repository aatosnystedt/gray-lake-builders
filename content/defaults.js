/* ==========================================================================
   Default copy
   --------------------------------------------------------------------------
   The words the site ships with. Anything a project specifies — a Sanity
   field, an override passed in code — wins; anything it leaves out renders
   what's here. The Sanity fallbacks (sanity/queries.js) and the Studio's
   initial values (sanity/schemaTypes/homePage.js) both read this file, so the
   three can't drift apart.

   A newline in a heading is a line break on desktop and ignored on mobile.
   An "&" in the form heading is set in italic.
   ========================================================================== */

export const DEFAULT_HERO = {
  heading: 'Trusted Design-Build Remodeling\nIn Clear Creek County, Colorado',
  subheading:
    'A client-first design-build team in Colorado that focuses on clear communication, quality craftsmanship, and clean finishes that protect your investment and elevate the way you live in your home.',
  primaryCta: 'Schedule a consultation',
  secondaryCta: 'View project stories',
};

export const DEFAULT_FORM = {
  heading: 'Schedule A Free Budget &\nDesign Consultation',
  subheading: 'Fill out the required information and we’ll reach out in 24 hours.',
  fields: [
    {
      id: 'f-name',
      name: 'name',
      type: 'text',
      label: 'Full Name (Required)',
      placeholder: 'First and last name',
      required: true,
    },
    {
      id: 'f-email',
      name: 'email',
      type: 'email',
      label: 'Email Address (Required)',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      id: 'f-phone',
      name: 'phone',
      type: 'tel',
      label: 'Phone Number (Required)',
      placeholder: '(555) 123-4567',
      required: true,
    },
    {
      id: 'f-details',
      name: 'details',
      type: 'textarea',
      label: 'Project Details',
      placeholder: 'Briefly describe your remodel',
      required: false,
    },
  ],
  submit: 'Schedule my consultation',
};
