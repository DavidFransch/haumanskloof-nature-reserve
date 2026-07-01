import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The question a visitor might ask, written the way they would ask it. e.g. "Is there Wi-Fi at the bunkhouse?"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      description: 'A clear, friendly answer to the question. e.g. "No — the bunkhouse is deliberately off-grid so you can fully disconnect."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank to sort by date added.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Optional — for future grouping (e.g. Accommodation, Activities, Conservation).',
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
