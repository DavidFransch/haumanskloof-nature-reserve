import { defineField, defineType } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Camera Trap', value: 'camera-trap' },
          { title: 'Wildlife on Foot', value: 'wildlife' },
          { title: 'Landscapes', value: 'landscapes' },
          { title: 'Haumanskloof Family', value: 'family' },
          { title: 'Flora & Fynbos', value: 'flora' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage gallery strip',
      initialValue: false,
    }),
    defineField({
      name: 'seriesId',
      title: 'Series ID',
      type: 'string',
      description: 'Group related images into a carousel (e.g., "leopard-series")',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
      featured: 'featured',
    },
    prepare({ title, category, media, featured }) {
      const categoryLabels: Record<string, string> = {
        'camera-trap': 'Camera Trap',
        wildlife: 'Wildlife on Foot',
        landscapes: 'Landscapes',
        family: 'Haumanskloof Family',
        flora: 'Flora & Fynbos',
      }
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: categoryLabels[category] || category,
        media,
      }
    },
  },
})
