/* Reading the homepage hero.

   The public site must render even when Sanity is unreachable or the document
   has not been created yet, so every field falls back to the default copy in
   content/defaults.js. `sanity/env` throws on missing config (the Studio
   needs that to be loud), which is why the client is imported lazily here. */

import { DEFAULT_HERO } from '../content/defaults';

export const HERO_FALLBACK = {
  heroHeading: DEFAULT_HERO.heading,
  heroSubheading: DEFAULT_HERO.subheading,
  heroPrimaryCtaLabel: DEFAULT_HERO.primaryCta,
  heroSecondaryCtaLabel: DEFAULT_HERO.secondaryCta,
};

const HOME_PAGE_QUERY = `*[_type == "homePage" && _id == "homePage"][0]{
  heroHeading,
  heroSubheading,
  heroPrimaryCtaLabel,
  heroSecondaryCtaLabel
}`;

export async function getHomePage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return HERO_FALLBACK;

  try {
    const { client } = await import('./client');
    const doc = await client.fetch(HOME_PAGE_QUERY);
    return withFallbacks(doc);
  } catch (error) {
    console.warn('[sanity] homePage fetch failed, using fallback copy:', error.message);
    return HERO_FALLBACK;
  }
}

/* A field that is missing or blank keeps its fallback, so a half-filled
   document can never blank out part of the hero. */
function withFallbacks(doc) {
  const merged = { ...HERO_FALLBACK };
  for (const key of Object.keys(HERO_FALLBACK)) {
    const value = doc?.[key];
    if (typeof value === 'string' && value.trim()) merged[key] = value;
  }
  return merged;
}
