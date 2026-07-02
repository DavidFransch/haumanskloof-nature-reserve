import { defineField, defineType } from 'sanity'
import { imageSizeWarning } from './imageSizeValidation'

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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'The small line of text shown above the main heading. e.g. "Our story"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The big heading at the top of the About page. e.g. "About Us"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, description: 'A short welcome paragraph under the heading. e.g. "Haumanskloof is more than just a destination – it\'s a return..."', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 2. Story ───────────────────────────────────────────────────────────
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'text',
      rows: 20,
      description: 'The full story text. Press Enter twice between paragraphs to create paragraph breaks.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'storyImage',
      title: 'Story image',
      type: 'image',
      description: 'Photo shown alongside the story text.',
      options: { hotspot: true },
      validation: (Rule) => imageSizeWarning(Rule),
      fields: [
        defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 3. Vision & Mission ────────────────────────────────────────────────
    defineField({ name: 'vision', title: 'Vision', type: 'text', rows: 3, description: 'A short statement of what the reserve aspires to be, shown as a quote. e.g. "A sustainable enterprise that preserves biodiversity, builds harmony, and instils ethical values..."', validation: (Rule) => Rule.required() }),
    defineField({ name: 'mission', title: 'Mission', type: 'text', rows: 4, description: 'A short statement of what the reserve does day to day. e.g. "To protect and restore the natural integrity of Haumanskloof through responsible stewardship..."', validation: (Rule) => Rule.required() }),

    // ─── 4. Values ──────────────────────────────────────────────────────────
    defineField({
      name: 'value1',
      title: 'Value 1 — Integrity',
      type: 'object',
      description: 'The first core value shown in the values grid. Edit the title, icon, and description.',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'The icon shown next to this value.',
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
        defineField({ name: 'title', title: 'Title', type: 'string', description: 'The name of this value. e.g. "Integrity"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short description of this value. e.g. "We lead with honesty, transparency and respect in everything we do."', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'value2',
      title: 'Value 2 — Stewardship',
      type: 'object',
      description: 'The second core value shown in the values grid. Edit the title, icon, and description.',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'The icon shown next to this value.',
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
        defineField({ name: 'title', title: 'Title', type: 'string', description: 'The name of this value. e.g. "Stewardship"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short description of this value. e.g. "We believe the land is not ours to own, but ours to care for and preserve."', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'value3',
      title: 'Value 3 — Passion',
      type: 'object',
      description: 'The third core value shown in the values grid. Edit the title, icon, and description.',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'The icon shown next to this value.',
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
        defineField({ name: 'title', title: 'Title', type: 'string', description: 'The name of this value. e.g. "Passion"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short description of this value. e.g. "Our love for nature, community and meaningful living guides every decision we make."', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 5. CTA ─────────────────────────────────────────────────────────────
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the call-to-action box at the bottom of the page. e.g. "Come experience the reserve"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short paragraph inviting visitors to get in touch. e.g. "Join us for a walk, a night under the stars, or a quiet moment in the mountains."', validation: (Rule) => Rule.required() }),
      ],
    }),

  ],

  preview: {
    prepare() {
      return { title: 'About' }
    },
  },
})
