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
      name: 'homepagePosition',
      title: 'Homepage Strip Position',
      type: 'string',
      description: 'Select a position to feature this image on the homepage strip. Leave empty to not feature.',
      options: {
        list: [
          { title: 'Position 1 (large, left)', value: 'strip-1' },
          { title: 'Position 2 (small, centre)', value: 'strip-2' },
          { title: 'Position 3 (small, right)', value: 'strip-3' },
        ],
        layout: 'radio',
      },
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
      homepagePosition: 'homepagePosition',
    },
    prepare({ title, category, media, homepagePosition }) {
      const categoryLabels: Record<string, string> = {
        'camera-trap': 'Camera Trap',
        wildlife: 'Wildlife on Foot',
        landscapes: 'Landscapes',
        family: 'Haumanskloof Family',
        flora: 'Flora & Fynbos',
      }
      const positionLabels: Record<string, string> = {
        'strip-1': '① ',
        'strip-2': '② ',
        'strip-3': '③ ',
      }
      const prefix = homepagePosition ? positionLabels[homepagePosition] || '' : ''
      return {
        title: `${prefix}${title}`,
        subtitle: categoryLabels[category] || category,
        media,
      }
    },
  },
})
