'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'
import {
  ABOUT_DOCUMENT_ID,
  ACCOMMODATION_DOCUMENT_ID,
  ACTIVITIES_DOCUMENT_ID,
  CONTACT_DOCUMENT_ID,
  HOMEPAGE_DOCUMENT_ID,
  SINGLETON_SCHEMA_TYPES,
} from './sanity/lib/constants'

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
            // Singletons — each opens directly without a list view
            S.listItem()
              .title('Homepage')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId(HOMEPAGE_DOCUMENT_ID)
              ),
            S.listItem()
              .title('Accommodation')
              .id('accommodationPage')
              .child(
                S.document()
                  .schemaType('accommodationPage')
                  .documentId(ACCOMMODATION_DOCUMENT_ID)
              ),
            S.listItem()
              .title('About')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId(ABOUT_DOCUMENT_ID)
              ),
            S.listItem()
              .title('Activities')
              .id('activitiesPage')
              .child(
                S.document()
                  .schemaType('activitiesPage')
                  .documentId(ACTIVITIES_DOCUMENT_ID)
              ),
            S.listItem()
              .title('Contact')
              .id('contactPage')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId(CONTACT_DOCUMENT_ID)
              ),
            S.divider(),
            // All other document types, excluding singletons
            ...S.documentTypeListItems().filter(
              (item) => !(SINGLETON_SCHEMA_TYPES as readonly string[]).includes(item.getId() ?? '')
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
