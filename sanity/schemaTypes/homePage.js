import { DEFAULT_HERO } from '../../content/defaults';

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
      initialValue: DEFAULT_HERO.heading,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubheading',
      title: 'Hero subheading',
      type: 'text',
      rows: 4,
      initialValue: DEFAULT_HERO.subheading,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroPrimaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      initialValue: DEFAULT_HERO.primaryCta,
      validation: (Rule) => Rule.required().max(40),
    },
    {
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
      initialValue: DEFAULT_HERO.secondaryCta,
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
