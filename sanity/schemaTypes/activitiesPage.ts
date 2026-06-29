import { defineField, defineType } from 'sanity'

// Singleton document — only one instance exists with _id: 'activitiesPage'
// Fields are ordered to match the visual top-to-bottom layout of the page.
export default defineType({
  name: 'activitiesPage',
  title: 'Activities',
  type: 'document',
  fields: [

    // ─── 1. Hero ────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 2. Activities ──────────────────────────────────────────────────────
    defineField({
      name: 'items',
      title: 'Activities',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'id',
            title: 'Activity ID',
            type: 'string',
            description: 'Unique identifier — used as an HTML anchor and enquiry query parameter (e.g. wildlife-walks). Use lowercase with hyphens.',
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            validation: (Rule) => Rule.required(),
            options: {
              list: [
                { title: 'Wildlife', value: 'wildlife' },
                { title: 'Mountain', value: 'mountain' },
                { title: 'Hiking', value: 'hiking' },
                { title: 'Camera', value: 'camera' },
                { title: 'Cycling', value: 'cycling' },
              ],
              layout: 'dropdown',
            },
          }),
          defineField({ name: 'tag', title: 'Tag', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
          defineField({
            name: 'highlights',
            title: 'Highlights',
            type: 'array',
            description: 'Bullet-point highlights for this activity.',
            of: [{ type: 'string' }],
          }),
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
        preview: { select: { title: 'title', subtitle: 'tag' } },
      }],
    }),

    // ─── 3. CTA ─────────────────────────────────────────────────────────────
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
      return { title: 'Activities' }
    },
  },
})
