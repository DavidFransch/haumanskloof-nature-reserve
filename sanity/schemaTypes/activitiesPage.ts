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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'The small line of text shown above the main heading. e.g. "Explore the reserve"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'text', rows: 2, description: 'The big heading at the top of the Activities page. e.g. "Things to do at Haumanskloof"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, description: 'A short welcome paragraph under the heading. e.g. "From self-paced exploration to quiet relaxation, Haumanskloof offers a range of outdoor experiences..."', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 2. Activities ──────────────────────────────────────────────────────
    defineField({
      name: 'items',
      title: 'Activities',
      type: 'array',
      description: 'The list of activities shown on the page. Add one entry for each activity.',
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
            description: 'A small icon shown next to the activity. Optional — if left blank, no icon will be shown for this activity.',
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
          defineField({ name: 'tag', title: 'Tag', type: 'string', description: 'A short label shown on the activity card. e.g. "Self-guided · Guided on request"', validation: (Rule) => Rule.required() }),
          defineField({ name: 'title', title: 'Title', type: 'string', description: 'The main heading for this activity. e.g. "Wildlife Walks & Ecology"', validation: (Rule) => Rule.required() }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, description: 'A paragraph describing this activity in detail. e.g. "Explore the reserve on foot through indigenous veld..."', validation: (Rule) => Rule.required() }),
          defineField({
            name: 'highlights',
            title: 'Highlights',
            type: 'array',
            description: 'A short bullet-point list of highlights for this activity. Add one line per bullet. e.g. "200+ bird species recorded"',
            of: [{ type: 'string' }],
          }),
          defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'The photo shown for this activity.',
            options: { hotspot: true },
            fields: [
              defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
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
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the call-to-action box at the bottom of the page. e.g. "Ready to explore?"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short paragraph inviting visitors to get in touch. e.g. "Get in touch to plan your visit..."', validation: (Rule) => Rule.required() }),
      ],
    }),

  ],

  preview: {
    prepare() {
      return { title: 'Activities' }
    },
  },
})
