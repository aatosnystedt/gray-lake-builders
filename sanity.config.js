'use client';

/* Config for the Studio mounted at /studio (see app/studio/[[...tool]]/page.jsx).
   Deploying a standalone Studio would use this same file. */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // a singleton has no "duplicate" or "delete" -- there is only ever one
    actions: (prev, { schemaType }) =>
      schemaType === 'homePage'
        ? prev.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : prev,
  },
});
