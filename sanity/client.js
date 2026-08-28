import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // published content only, served from the CDN edge cache
  useCdn: true,
  perspective: 'published',
});
