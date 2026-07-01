import { defineField, defineType } from 'sanity'
import { imageSizeWarning } from './imageSizeValidation'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The headline of the blog post. e.g. "Tracking the leopards of Haumanskloof"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The web address for this post. Click "Generate" to create it automatically from the title. e.g. "tracking-the-leopards-of-haumanskloof"',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'The date and time this post should be shown as published.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary shown in post previews and search results. e.g. "How our camera traps revealed a resident leopard family this winter."',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      description: 'The main photo shown at the top of the post and in previews.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => imageSizeWarning(Rule),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"',
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'The main content of the blog post. Write and format the article here.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const { date } = selection
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No date'
      return {
        ...selection,
        subtitle: formattedDate,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})
