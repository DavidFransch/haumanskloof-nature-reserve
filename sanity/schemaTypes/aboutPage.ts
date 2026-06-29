import { defineField, defineType } from 'sanity'

// Singleton document — only one instance exists with _id: 'aboutPage'
// Fields are ordered to match the visual top-to-bottom layout of the page.
export default defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  fields: [

    // ─── 1. Hero ────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 2. Story ───────────────────────────────────────────────────────────
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'array',
      description: 'Each item is one paragraph of the reserve story.',
      of: [{
        type: 'object',
        name: 'paragraph',
        title: 'Paragraph',
        fields: [
          defineField({ name: 'text', title: 'Text', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'text' } },
      }],
    }),

    defineField({
      name: 'storyImage',
      title: 'Story image',
      type: 'image',
      description: 'Photo shown alongside the story text.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'altText', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 3. Vision & Mission ────────────────────────────────────────────────
    defineField({ name: 'vision', title: 'Vision', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'mission', title: 'Mission', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),

    // ─── 4. Values ──────────────────────────────────────────────────────────
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            validation: (Rule) => Rule.required(),
            options: {
              list: [
                { title: 'Integrity (shield)', value: 'integrity' },
                { title: 'Stewardship (circle)', value: 'stewardship' },
                { title: 'Mountain', value: 'mountain' },
              ],
              layout: 'dropdown',
            },
          }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
    }),

    // ─── 5. CTA ─────────────────────────────────────────────────────────────
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
      return { title: 'About' }
    },
  },
})
