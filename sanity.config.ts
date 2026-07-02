'use client'

import { defineConfig, type Template } from 'sanity'
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
} from './sanity/lib/constants'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

// Gallery category folders — mirrors the `category` field options in
// sanity/schemaTypes/galleryImage.ts. Used purely for studio structure
// grouping; the stored `category` values are unchanged.
const GALLERY_CATEGORIES = [
  { title: 'Camera Trap', value: 'camera-trap' },
  { title: 'Wildlife on Foot', value: 'wildlife' },
  { title: 'Landscapes', value: 'landscapes' },
  { title: 'Haumanskloof Family', value: 'family' },
  { title: 'Flora & Fynbos', value: 'flora' },
] as const

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
          .title('Haumanskloof')
          .items([
            // Pages — singleton documents, one per site page
            S.listItem()
              .title('Pages')
              .id('pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
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
                  ])
              ),
            S.divider(),
            // Content — collections of repeating documents
            S.listItem()
              .title('Content')
              .id('content')
              .child(
                S.list()
                  .title('Content')
                  .items([
                    S.documentTypeListItem('faq').title('FAQ'),
                    // Gallery Images — grouped into category folders. This is a
                    // studio-only presentation of the same galleryImage documents.
                    S.listItem()
                      .title('Gallery Images')
                      .id('galleryImages')
                      .child(
                        S.list()
                          .title('Gallery Images')
                          .items([
                            S.listItem()
                              .title('All Images')
                              .id('galleryImage-all')
                              .child(
                                S.documentTypeList('galleryImage')
                                  .title('All Images')
                                  .defaultOrdering([
                                    { field: 'category', direction: 'asc' },
                                    { field: 'order', direction: 'asc' },
                                  ])
                              ),
                            ...GALLERY_CATEGORIES.map((category) =>
                              S.listItem()
                                .title(category.title)
                                .id(`galleryImage-${category.value}`)
                                .child(
                                  S.documentList()
                                    .title(category.title)
                                    .schemaType('galleryImage')
                                    .filter(
                                      '_type == "galleryImage" && category == $category'
                                    )
                                    .params({ category: category.value })
                                    .defaultOrdering([
                                      { field: 'order', direction: 'asc' },
                                    ])
                                    // Pre-fill the category when creating a new
                                    // document from within this folder.
                                    .initialValueTemplates([
                                      S.initialValueTemplateItem(
                                        'galleryImage-by-category',
                                        { category: category.value }
                                      ),
                                    ])
                                )
                            ),
                          ])
                      ),
                    S.documentTypeListItem('post').title('Blog Post'),
                  ])
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
    // Parameterised template used by the gallery category folders so that new
    // documents created inside a folder pre-fill the matching category. Because
    // it requires a parameter, it is excluded from the global "new document"
    // menu and does not affect the plain galleryImage create flow.
    templates: (prev): Template[] => [
      ...prev,
      {
        id: 'galleryImage-by-category',
        title: 'Gallery Image (by category)',
        schemaType: 'galleryImage',
        parameters: [{ name: 'category', type: 'string' }],
        value: (params: { category: string }) => ({
          category: params.category,
        }),
      },
    ],
  },
})
