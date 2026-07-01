import { defineField, defineType } from 'sanity'

// Singleton document — only one instance exists with _id: 'homepage'
// Fields are ordered to match the visual top-to-bottom layout of the page.
export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [

    // ─── 1. Hero ────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'The small line of text shown above the main headline. e.g. "Breede Valley · Western Cape"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, description: 'The large headline that greets visitors. e.g. "Deep in the mountains of the Breede Valley, is a hidden sanctuary."', validation: (Rule) => Rule.required() }),
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, description: 'A short opening line under the headline. e.g. "Haumanskloof is a land of contrast, where vibrant Renosterveld and Fynbos meet the arid beauty of the Succulent Karoo."', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, description: 'The main welcome paragraph in the hero. e.g. "Just two hours from Cape Town, Haumanskloof is a family-run sanctuary where nature and community thrive..."', validation: (Rule) => Rule.required() }),
        defineField({ name: 'cta', title: 'Closing invite text', type: 'text', rows: 3, description: 'A closing sentence that invites visitors in. e.g. "Come experience this special intersection of rolling mountains, pristine landscapes and rugged roads — we invite you to join us!"', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'image',
          title: 'Background image',
          type: 'image',
          description: 'Full-screen background image. Falls back to the default photo if not set.',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),

    // ─── 2. About ───────────────────────────────────────────────────────────
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', description: 'The small label above the about heading. e.g. "Our sanctuary"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the about section. e.g. "A land of contrast and wonder"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, description: 'A paragraph introducing the reserve. e.g. "Haumanskloof is a place where gently rolling mountains meet pristine landscapes and rugged roads..."', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'image',
          title: 'Property photo',
          type: 'image',
          description: 'Image shown alongside the about text. Falls back to the default photo if not set.',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),

    // ─── 3. Pillars ─────────────────────────────────────────────────────────
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      description: 'The three feature pillars shown below the about section. Exactly 3 required.',
      validation: (Rule) => Rule.length(3).error('Exactly 3 pillars are required — the layout does not support more or fewer.'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'The icon shown above this pillar.',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Wildlife', value: 'wildlife' },
                  { title: 'Accommodation', value: 'accommodation' },
                  { title: 'Mountain', value: 'mountain' },
                ],
                layout: 'radio',
              },
            }),
            defineField({ name: 'title', title: 'Title', type: 'string', description: 'The pillar heading. e.g. "Wildlife & ecology"', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short description for this pillar. e.g. "Camera trap monitoring, diverse Renosterveld, Fynbos and Succulent Karoo flora..."', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
    }),

    // ─── 4. Gallery ─────────────────────────────────────────────────────────
    defineField({
      name: 'gallery',
      title: 'Gallery Section',
      type: 'object',
      description: 'Labels only. Strip images are managed under Gallery Images (set a Homepage Strip Position on each).',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', description: 'The small label above the gallery heading. e.g. "The reserve"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the gallery section. e.g. "Experience Haumanskloof Nature Reserve"', validation: (Rule) => Rule.required() }),
      ],
    }),

    // ─── 5. Accommodation ───────────────────────────────────────────────────
    defineField({
      name: 'accommodation',
      title: 'Accommodation Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string', description: 'The small label above the accommodation heading. e.g. "Where to stay"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the accommodation section. e.g. "Accommodation at Haumanskloof Nature Reserve"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short paragraph about the accommodation. e.g. "Wake up to birdsong, fall asleep under clear mountain skies..."', validation: (Rule) => Rule.required() }),

        defineField({
          name: 'bunkhouse',
          title: 'The Bunkhouse',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', description: 'The name of this unit as shown on the card. e.g. "The Bunkhouse"', validation: (Rule) => Rule.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'string', description: 'A one-line summary shown under the name. e.g. "Sleeps up to 8 · Mountain views · Fully equipped kitchen"', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tag', title: 'Tag', type: 'string', description: 'A short label shown on the card, usually a call to action. e.g. "Enquire for bookings"', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'The photo of the bunkhouse shown on the card.',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"', validation: (Rule) => Rule.required() }),
              ],
            }),
          ],
        }),

        defineField({
          name: 'nextUnit',
          title: 'Next unit (coming soon)',
          type: 'object',
          description: 'Shown as a "coming soon" placeholder until an image is added. Fill in all fields and upload an image to activate it as a real unit.',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', description: 'The name of the upcoming unit. e.g. "More coming soon"', validation: (Rule) => Rule.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'string', description: 'A one-line summary of the upcoming unit. e.g. "Additional accommodation will be added as the reserve grows."', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tag', title: 'Tag', type: 'string', description: 'An optional short label shown on the card. e.g. "Coming soon"' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Upload an image here to activate this as a live unit on the homepage.',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'altText', title: 'Alt text', type: 'string', description: 'A short description of what is shown in the image. Used by screen readers and search engines. e.g. "Sunset over the Breede Valley mountains" or "The bunkhouse exterior with mountain views"' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ─── 6. CTA ─────────────────────────────────────────────────────────────
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'The heading for the call-to-action box at the bottom of the page. e.g. "Come experience the sanctuary"', validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, description: 'A short paragraph inviting visitors to get in touch. e.g. "Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars. We\'d love to have you."', validation: (Rule) => Rule.required() }),
      ],
    }),

  ],

  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
