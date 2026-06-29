import { defineField, defineType } from 'sanity'

// Singleton document — only one instance exists with _id: 'contactPage'
// Contains editable page text only. Form configuration, social links,
// map embed, and email routing are all hardcoded in the component.
export default defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  fields: [

    // ─── 1. Page header ─────────────────────────────────────────────────────
    defineField({ name: 'heading', title: 'Page Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),

    // ─── 2. Location ────────────────────────────────────────────────────────
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Property name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'area', title: 'Area', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'country', title: 'Country', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 3. Response time ───────────────────────────────────────────────────
    defineField({ name: 'responseTime', title: 'Response time text', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),

  ],

  preview: {
    prepare() {
      return { title: 'Contact' }
    },
  },
})
