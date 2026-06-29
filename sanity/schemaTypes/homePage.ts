import { defineField, defineType } from 'sanity'

// Singleton document — only one instance exists with _id: 'homepage'
export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
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
      ],
    }),

    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
      ],
    }),

    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      description: 'The three feature pillars shown below the hero. Exactly 3 required.',
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

    defineField({
      name: 'gallery',
      title: 'Gallery Section',
      description: 'Labels only. Gallery images are managed under Gallery Images.',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),

    defineField({
      name: 'accommodation',
      title: 'Accommodation Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        defineField({
          name: 'units',
          title: 'Units',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'desc', title: 'Description', type: 'string' },
                { name: 'tag', title: 'Tag', type: 'string' },
                { name: 'image', title: 'Image path', type: 'string', description: 'Static image path under /images/' },
              ],
              preview: { select: { title: 'name', subtitle: 'desc' } },
            },
          ],
        }),
      ],
    }),

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
