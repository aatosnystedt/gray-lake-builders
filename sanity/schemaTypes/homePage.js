/* The homepage singleton. Only the hero is modelled for now -- the rest of the
   page is still hardcoded markup, and gets added here section by section. */

export const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'text',
      rows: 2,
      description:
        'Each line becomes its own line on desktop. On mobile the text reflows and the break is ignored.',
      initialValue:
        'Trusted Design-Build Remodeling\nIn Clear Creek County, Colorado',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubheading',
      title: 'Hero subheading',
      type: 'text',
      rows: 4,
      initialValue:
        'A client-first design-build team in Colorado that focuses on clear communication, quality craftsmanship, and clean finishes that protect your investment and elevate the way you live in your home.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroPrimaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      initialValue: 'Schedule Free Consultation',
      validation: (Rule) => Rule.required().max(40),
    },
    {
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
      initialValue: 'View Project Stories',
      validation: (Rule) => Rule.required().max(40),
    },
  ],
  preview: {
    select: { title: 'heroHeading' },
    prepare: ({ title }) => ({
      title: 'Home Page',
      subtitle: (title || '').replace(/\n/g, ' '),
    }),
  },
};
