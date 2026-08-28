/* The embedded Studio. The optional catch-all route lets the Studio own every
   path under /studio (desk, vision, structure deep links) client-side. */

import { NextStudio } from 'next-sanity/studio';

import config from '@/sanity.config';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Gray Lake Builders Studio',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
