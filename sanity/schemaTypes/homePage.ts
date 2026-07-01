import { defineField, defineType } from 'sanity'
import { imageSizeWarning } from './imageSizeValidation'

// Singleton document — only one instance exists with _id: 'homepage'
// Fields are ordered to match the visual top-to-bottom layout of the page.
export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [

    // ─── 1. Hero ────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'The small line of text shown above the main headline. e.g. "Breede Valley · Western Cape"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, description: 'The large headline that greets visitors. e.g. "Deep in the mountains of the Breede Valley, is a hidden sanctuary."', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, description: 'A short opening line under the headline. e.g. "Haumanskloof is a land of contrast, where vibrant Renosterveld and Fynbos meet the arid beauty of the Succulent Karoo."' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, description: 'The main welcome paragraph in the hero. e.g. "Just two hours from Cape Town, Haumanskloof is a family-run sanctuary where nature and community thrive..."' }),
        defineField({ name: 'cta', title: 'Closing invite text', type: 'text', rows: 3, description: 'A closing sentence that invites visitors in. e.g. "Come experience this special intersection of rolling mountains, pristine landscapes and rugged roads — we invite you to join us!"' }),
        defineField({
          name: 'image',
          title: 'Background image',
          type: 'image',
          description: 'Full-screen background image. Falls back to the default photo if not set.',
          options: { hotspot: true },
          validation: (Rule) => imageSizeWarning(Rule),
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),

    // ─── 2. About ───────────────────────────────────────────────────────────
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', description: 'The small label above the about heading. e.g. "Our sanctuary"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the about section. e.g. "A land of contrast and wonder"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, description: 'A paragraph introducing the reserve. e.g. "Haumanskloof is a place where gently rolling mountains meet pristine landscapes and rugged roads..."', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'image',
          title: 'Property photo',
          type: 'image',
          description: 'Image shown alongside the about text. Falls back to the default photo if not set.',
          options: { hotspot: true },
          validation: (Rule) => imageSizeWarning(Rule),
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),

    // ─── 3. Pillars ─────────────────────────────────────────────────────────
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      description: 'The three feature pillars shown below the about section. Exactly 3 required.',
      validation: (Rule) => Rule.length(3).error('Exactly 3 pillars are required — the layout does not support more or fewer.'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'The icon shown above this pillar.',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Wildlife', value: 'wildlife' },
                  { title: 'Accommodation', value: 'accommodation' },
                  { title: 'Mountain', value: 'mountain' },
                ],
                layout: 'radio',
              },
            }),
            defineField({ name: 'title', title: 'Title', type: 'string', description: 'The pillar heading. e.g. "Wildlife & ecology"', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short description for this pillar. e.g. "Camera trap monitoring, diverse Renosterveld, Fynbos and Succulent Karoo flora..."', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
    }),

    // ─── 4. Gallery ─────────────────────────────────────────────────────────
    defineField({
      name: 'gallery',
      title: 'Gallery Section',
      type: 'object',
      description: 'The gallery teaser strip on the homepage.',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', description: 'The small label above the gallery heading. e.g. "The reserve"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the gallery section. e.g. "Experience Haumanskloof Nature Reserve"', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'strip',
          title: 'Gallery Strip Images',
          type: 'array',
          description: 'Up to 3 images shown in the homepage gallery strip. The first image is shown large on the left. Each tile links to its chosen gallery.',
          validation: (Rule) => Rule.max(3).warning('The strip shows a maximum of 3 images — any extra items are ignored.'),
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
                description: 'Upload a compressed WebP image under 500 KB.',
                validation: (Rule) => imageSizeWarning(Rule),
                fields: [
                  defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "A leopard captured on a camera trap at dawn"', validation: (Rule) => Rule.required() }),
                ],
              }),
              defineField({
                name: 'category',
                title: 'Links to gallery',
                type: 'string',
                description: 'Which gallery this tile links to. The gallery name is also shown as the label over the image.',
                options: {
                  list: [
                    { title: 'Camera Trap', value: 'camera-trap' },
                    { title: 'Wildlife on Foot', value: 'wildlife' },
                    { title: 'Landscapes', value: 'landscapes' },
                    { title: 'Haumanskloof Family', value: 'family' },
                    { title: 'Flora & Fynbos', value: 'flora' },
                  ],
                  layout: 'dropdown',
                },
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'label',
                title: 'Overlay label',
                type: 'string',
                description: 'The text shown over the image on the homepage. Leave blank to use the category name automatically. e.g. "Discovery" instead of "Camera Trap"',
              }),
            ],
            preview: {
              select: { category: 'category', media: 'image' },
              prepare({ category, media }) {
                const labels: Record<string, string> = {
                  'camera-trap': 'Camera Trap',
                  wildlife: 'Wildlife on Foot',
                  landscapes: 'Landscapes',
                  family: 'Haumanskloof Family',
                  flora: 'Flora & Fynbos',
                }
                return { title: labels[category] || category || 'Strip image', media }
              },
            },
          }],
        }),
      ],
    }),

    // ─── 5. Accommodation ───────────────────────────────────────────────────
    defineField({
      name: 'accommodation',
      title: 'Accommodation Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', description: 'The small label above the accommodation heading. e.g. "Where to stay"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the accommodation section. e.g. "Accommodation at Haumanskloof Nature Reserve"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short paragraph about the accommodation. e.g. "Wake up to birdsong, fall asleep under clear mountain skies..."', validation: (Rule) => Rule.required() }),

        defineField({
          name: 'units',
          title: 'Accommodation Units',
          type: 'array',
          description: 'Add each accommodation unit here. The bunkhouse should always be first.',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'name', title: 'Name', type: 'string', description: 'e.g. "The Bunkhouse"', validation: (Rule) => Rule.required() }),
              defineField({ name: 'desc', title: 'Description', type: 'string', description: 'e.g. "Sleeps up to 8 · Mountain views · Fully equipped kitchen"', validation: (Rule) => Rule.required() }),
              defineField({ name: 'tag', title: 'Tag', type: 'string', description: 'Short label shown on the card. e.g. "Enquire for bookings"' }),
              defineField({
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
                description: 'Upload a compressed WebP image under 500 KB. Leave empty to show a "coming soon" placeholder.',
                validation: (Rule) => imageSizeWarning(Rule),
                fields: [
                  defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "The bunkhouse exterior with mountain views"' }),
                ],
              }),
            ],
            preview: { select: { title: 'name', subtitle: 'desc' } },
          }],
        }),
      ],
    }),

    // ─── 6. CTA ─────────────────────────────────────────────────────────────
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the call-to-action box at the bottom of the page. e.g. "Come experience the sanctuary"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short paragraph inviting visitors to get in touch. e.g. "Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars. We\'d love to have you."', validation: (Rule) => Rule.required() }),
      ],
    }),

  ],

  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
