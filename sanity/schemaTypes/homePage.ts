import { defineField, defineType } from 'sanity'

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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        defineField({ name: 'cta', title: 'Closing invite text', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        defineField({
          name: 'image',
          title: 'Background image',
          type: 'image',
          description: 'Full-screen background image. Falls back to the default photo if not set.',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
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
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        defineField({
          name: 'image',
          title: 'Property photo',
          type: 'image',
          description: 'Image shown alongside the about text. Falls back to the default photo if not set.',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
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
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
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
      description: 'Labels only. Strip images are managed under Gallery Images (set a Homepage Strip Position on each).',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 5. Accommodation ───────────────────────────────────────────────────
    defineField({
      name: 'accommodation',
      title: 'Accommodation Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),

        defineField({
          name: 'bunkhouse',
          title: 'The Bunkhouse',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tag', title: 'Tag', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'altText', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
              ],
            }),
          ],
        }),

        defineField({
          name: 'nextUnit',
          title: 'Next unit (coming soon)',
          type: 'object',
          description: 'Shown as a "coming soon" placeholder until an image is added. Fill in all fields and upload an image to activate it as a real unit.',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tag', title: 'Tag', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Upload an image here to activate this as a live unit on the homepage.',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'altText', title: 'Alt text', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ─── 6. CTA ─────────────────────────────────────────────────────────────
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
      ],
    }),

  ],

  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
