import { defineField, defineType } from 'sanity'

// Singleton document — only one instance exists with _id: 'accommodationPage'
// Fields are ordered to match the visual top-to-bottom layout of the page.
export default defineType({
  name: 'accommodationPage',
  title: 'Accommodation',
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

    // ─── 2. Bunkhouse ───────────────────────────────────────────────────────
    defineField({
      name: 'bunkhouse',
      title: 'Bunkhouse',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'capacity', title: 'Capacity label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        defineField({
          name: 'details',
          title: 'Feature bullets',
          type: 'array',
          description: 'Bullet points shown in the feature list.',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'mainImage',
          title: 'Main image',
          type: 'image',
          description: 'Main hero image for the bunkhouse section.',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        }),
        defineField({
          name: 'rates',
          title: 'Rates',
          type: 'object',
          fields: [
            defineField({ name: 'baseRate', title: 'Base rate (ZAR)', type: 'number', validation: (Rule) => Rule.required().positive() }),
            defineField({ name: 'baseRateCaption', title: 'Base rate caption', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'additionalRate', title: 'Additional guest rate (ZAR)', type: 'number', validation: (Rule) => Rule.required().positive() }),
            defineField({ name: 'additionalRateCaption', title: 'Additional guest caption', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        }),
        defineField({ name: 'storyTitle', title: 'Story disclosure title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'story',
          title: 'Story',
          type: 'array',
          description: 'Each item is one paragraph of the build story.',
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
          name: 'gallery',
          title: 'Photo gallery',
          type: 'array',
          description: 'Images shown in the accommodation photo gallery. Use the order field to control the sequence.',
          of: [{
            type: 'object',
            name: 'galleryItem',
            title: 'Photo',
            fields: [
              defineField({
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
                validation: (Rule) => Rule.required(),
              }),
              defineField({ name: 'altText', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Inside: Living Area"', validation: (Rule) => Rule.required() }),
              defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. interior / exterior / landscape' }),
              defineField({ name: 'order', title: 'Display order', type: 'number', description: 'Controls the order images appear in the gallery. Lower numbers appear first.' }),
            ],
            preview: { select: { title: 'label', media: 'image' } },
          }],
        }),
      ],
    }),

    // ─── 3. Drone video ─────────────────────────────────────────────────────
    defineField({
      name: 'droneVideo',
      title: 'Drone Video',
      type: 'object',
      description: 'Update the Vimeo ID when the account is ready. The section is hidden while the ID is set to PLACEHOLDER.',
      fields: [
        defineField({ name: 'vimeoId', title: 'Vimeo ID', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'title', title: 'Video title', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 4. Compost toilet ──────────────────────────────────────────────────
    defineField({
      name: 'compostToilet',
      title: 'Compost Toilet Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        defineField({ name: 'note', title: 'Note', type: 'string' }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'reference',
          description: 'Select from Gallery Images. Falls back to the default photo if not set.',
          to: [{ type: 'galleryImage' }],
        }),
      ],
    }),

    // ─── 5. Amenities ───────────────────────────────────────────────────────
    defineField({
      name: 'amenities',
      title: 'Amenities',
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
                { title: 'Mountain', value: 'mountain' },
                { title: 'Fire / Fireplace', value: 'fire' },
                { title: 'Solar', value: 'solar' },
                { title: 'Kitchen', value: 'kitchen' },
                { title: 'Hot tub', value: 'hottub' },
                { title: 'Privacy', value: 'privacy' },
                { title: 'Compost toilet', value: 'toilet' },
                { title: 'No Wi-Fi', value: 'nowifi' },
              ],
              layout: 'dropdown',
            },
          }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'body', title: 'Description', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
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
      return { title: 'Accommodation' }
    },
  },
})
