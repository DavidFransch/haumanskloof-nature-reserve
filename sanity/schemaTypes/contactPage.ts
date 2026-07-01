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
    defineField({ name: 'heading', title: 'Page Heading', type: 'string', description: 'The main heading at the top of the Contact page. e.g. "Contact Us"', validation: (Rule) => Rule.required() }),
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, description: 'A short welcome paragraph under the heading. e.g. "Have a question about the reserve, our accommodation, or activities? We\'d love to hear from you."', validation: (Rule) => Rule.required() }),

    // ─── 2. Location ────────────────────────────────────────────────────────
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Property name', type: 'string', description: 'The name of the property, shown in the location details. e.g. "Haumanskloof Nature Reserve"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'area', title: 'Area', type: 'string', description: 'The region or area the reserve is in. e.g. "Breede Valley, Western Cape"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'country', title: 'Country', type: 'string', description: 'The country the reserve is in. e.g. "South Africa"', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 3. Response time ───────────────────────────────────────────────────
    defineField({ name: 'responseTime', title: 'Response time text', type: 'text', rows: 2, description: 'A short note telling visitors how quickly you reply. e.g. "We typically respond to all enquiries within 24 hours..."', validation: (Rule) => Rule.required() }),

  ],

  preview: {
    prepare() {
      return { title: 'Contact' }
    },
  },
})
