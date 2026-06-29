'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'
import { HOMEPAGE_DOCUMENT_ID } from './sanity/lib/constants'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'haumanskloof',
  title: 'Haumanskloof Nature Reserve',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton — opens directly without a list view
            S.listItem()
              .title('Homepage')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId(HOMEPAGE_DOCUMENT_ID)
              ),
            S.divider(),
            // All other document types, excluding the singleton
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'homePage'
            ),
          ]),
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
