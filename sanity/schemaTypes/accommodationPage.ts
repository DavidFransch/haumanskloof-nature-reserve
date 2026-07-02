import { defineField, defineType } from 'sanity'
import { imageSizeWarning } from './imageSizeValidation'

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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'The small line of text shown above the main heading. e.g. "Where to stay"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'text', rows: 2, description: 'The big heading at the top of the Accommodation page. e.g. "Eco-conscious comfort in the mountains"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, description: 'A short welcome paragraph under the heading. e.g. "Wake up to birdsong and fall asleep under clear mountain skies..."', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 2. Bunkhouse ───────────────────────────────────────────────────────
    defineField({
      name: 'bunkhouse',
      title: 'Bunkhouse',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', description: 'The name of the bunkhouse. e.g. "The Bunkhouse on Protea Lane"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'capacity', title: 'Capacity label', type: 'string', description: 'How many guests the bunkhouse sleeps, shown as a label. e.g. "Sleeps up to 8 guests"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, description: 'A paragraph introducing the bunkhouse. e.g. "Nestled in a private valley, the Bunkhouse is our flagship unit..."', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'details',
          title: 'Feature bullets',
          type: 'array',
          description: 'A short bullet-point list of the bunkhouse\'s main features. Add one line per bullet. e.g. "Wood-fired hot tub overlooking the valley"',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'mainImage',
          title: 'Main image',
          type: 'image',
          description: 'Main hero image for the bunkhouse section.',
          options: { hotspot: true },
          validation: (Rule) => imageSizeWarning(Rule),
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
          ],
        }),
        defineField({
          name: 'rates',
          title: 'Rates',
          type: 'object',
          fields: [
            defineField({ name: 'baseRate', title: 'Base rate (ZAR)', type: 'number', description: 'The nightly price in Rand for the base number of guests, as a plain number. e.g. 2800', validation: (Rule) => Rule.required().positive() }),
            defineField({ name: 'baseRateCaption', title: 'Base rate caption', type: 'string', description: 'A short note explaining what the base rate covers. e.g. "Base rate for up to 2 people"', validation: (Rule) => Rule.required() }),
            defineField({ name: 'additionalRate', title: 'Additional guest rate (ZAR)', type: 'number', description: 'The extra price in Rand per additional guest, as a plain number. e.g. 600', validation: (Rule) => Rule.required().positive() }),
            defineField({ name: 'additionalRateCaption', title: 'Additional guest caption', type: 'string', description: 'A short note explaining the additional guest fee. e.g. "Additional guest fee (up to 8)"', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'sale',
              title: 'Sale / Discount',
              type: 'object',
              description: 'Optional. Show a discounted nightly rate over the seasonal pricing. Turn the toggle off for normal pricing.',
              options: { collapsible: true, collapsed: true },
              fields: [
                defineField({
                  name: 'onSale',
                  title: 'Show sale price?',
                  type: 'boolean',
                  description: 'Turn this on to show a discounted nightly rate on the accommodation page. Leave it off for normal pricing.',
                  initialValue: false,
                }),
                defineField({
                  name: 'label',
                  title: 'Sale label',
                  type: 'string',
                  description: 'A short badge shown next to the price. e.g. "Winter Special" or "Limited Offer"',
                  hidden: ({ parent }) => !(parent as { onSale?: boolean })?.onSale,
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      const parent = context.parent as { onSale?: boolean } | undefined
                      if (parent?.onSale && !value) return 'Add a label for the sale, e.g. "Winter Special".'
                      return true
                    }).warning(),
                }),
                defineField({
                  name: 'salePrice',
                  title: 'Sale nightly rate (ZAR)',
                  type: 'number',
                  description: 'The discounted price per night, as a plain number. e.g. 2380. Should be lower than the base rate above.',
                  hidden: ({ parent }) => !(parent as { onSale?: boolean })?.onSale,
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      const parent = context.parent as { onSale?: boolean } | undefined
                      if (!parent?.onSale) return true
                      if (typeof value !== 'number' || value <= 0) {
                        return 'Add the discounted nightly rate to show the sale.'
                      }
                      const baseRate = (context.document as { bunkhouse?: { rates?: { baseRate?: number } } } | undefined)
                        ?.bunkhouse?.rates?.baseRate
                      if (typeof baseRate === 'number' && value >= baseRate) {
                        return 'The sale rate is not lower than the base rate — guests won’t see a saving.'
                      }
                      return true
                    }).warning(),
                }),
                defineField({
                  name: 'caption',
                  title: 'Sale note (optional)',
                  type: 'string',
                  description: 'Optional small print shown under the sale price. e.g. "For stays booked in June & July."',
                  hidden: ({ parent }) => !(parent as { onSale?: boolean })?.onSale,
                }),
              ],
            }),
          ],
        }),
        defineField({ name: 'storyTitle', title: 'Story disclosure title', type: 'string', description: 'The clickable title of the collapsible story section. e.g. "The story behind the build"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'story', title: 'Story', type: 'text', rows: 20, description: 'The build story. Press Enter twice between paragraphs to create paragraph breaks.', validation: (Rule) => Rule.required() }),
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
                description: 'A photo of the bunkhouse to show in the gallery.',
                options: { hotspot: true },
                validation: (Rule) => [Rule.required(), imageSizeWarning(Rule)],
              }),
              defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
              defineField({ name: 'label', title: 'Label', type: 'string', description: 'A short caption shown on the photo. e.g. "Inside: Living Area"', validation: (Rule) => Rule.required() }),
              defineField({ name: 'category', title: 'Category', type: 'string', description: 'An optional grouping word for the photo. e.g. "interior", "exterior" or "landscape"' }),
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
        defineField({ name: 'vimeoId', title: 'Vimeo ID', type: 'string', description: 'The numeric ID of the video on Vimeo (the number at the end of the video\'s web address). e.g. "1185190221". Set to "PLACEHOLDER" to hide the video section.', validation: (Rule) => Rule.required() }),
        defineField({ name: 'title', title: 'Video title', type: 'string', description: 'A short title describing the video, used for accessibility. e.g. "Haumanskloof Nature Reserve — aerial view"', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 4. Compost toilet ──────────────────────────────────────────────────
    defineField({
      name: 'compostToilet',
      title: 'Compost Toilet Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'The small line of text shown above the heading. e.g. "Eco-conscious design"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the compost toilet section. e.g. "Our compost toilet"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, description: 'A paragraph explaining the compost toilet. e.g. "At Haumanskloof, we believe thoughtful design and comfort can coexist with environmental responsibility..."', validation: (Rule) => Rule.required() }),
        defineField({ name: 'note', title: 'Note', type: 'string', description: 'An optional short note shown below the paragraph. e.g. "Guests are always briefed on use before their stay."' }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          description: 'A photo of the compost toilet facility.',
          validation: (Rule) => imageSizeWarning(Rule),
          fields: [
            defineField({
              name: 'altText',
              title: 'Alt text',
              type: 'string',
              description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "The compost toilet facility at Haumanskloof"',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    // ─── 5. Amenities ───────────────────────────────────────────────────────
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      description: 'The list of amenities shown in the amenities grid. Add one entry for each amenity.',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'The icon shown next to this amenity.',
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
          defineField({ name: 'title', title: 'Title', type: 'string', description: 'The name of this amenity. e.g. "Wood-fired hot tub"', validation: (Rule) => Rule.required() }),
          defineField({ name: 'body', title: 'Description', type: 'text', rows: 2, description: 'A short description of this amenity. e.g. "The ultimate way to unwind after a day on the mountain, overlooking the valley."', validation: (Rule) => Rule.required() }),
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
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the call-to-action box at the bottom of the page. e.g. "Book your mountain escape"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short paragraph inviting visitors to enquire. e.g. "Enquire about availability and rates for the Bunkhouse on Protea Lane..."', validation: (Rule) => Rule.required() }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Accommodation' }
    },
  },
})
