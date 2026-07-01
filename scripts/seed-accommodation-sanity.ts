#!/usr/bin/env npx tsx

/**
 * Seed Accommodation Page Singleton to Sanity
 *
 * Creates the accommodation document and uploads the current static images
 * so they appear in Studio immediately. Safe to re-run after deleting the
 * document — will not overwrite an existing document.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/seed-accommodation-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { ACCOMMODATION_DOCUMENT_ID } from '../sanity/lib/constants'

const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = value
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN is not set')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

const PUBLIC = path.join(process.cwd(), 'public')

async function uploadImage(relativePath: string, filename: string) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{ _id }`,
    { sourceId: filename }
  )
  if (existing) return existing._id

  const stream = fs.createReadStream(path.join(PUBLIC, relativePath))
  const asset = await client.assets.upload('image', stream, {
    filename,
    contentType: 'image/webp',
    source: { id: filename, name: filename },
  })
  return asset._id
}

function imageRef(assetId: string, altText: string) {
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: assetId },
    altText,
  }
}

async function seed() {
  console.log('Uploading images...')

  const mainImageId = await uploadImage(
    '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-2.webp',
    'accommodation-bunkhouse-exterior-2.webp'
  )
  console.log('  ✓ Main image')

  const compostToiletImageId = await uploadImage(
    '/images/gallery/accommodation-bunkhouse-facilities/accommodation-bunkhouse-facilities-2.webp',
    'accommodation-bunkhouse-facilities-2.webp'
  )
  console.log('  ✓ Compost toilet image')

  const galleryDefs = [
    {
      file: '/images/gallery/accommodation-bunkhouse-interior/accommodation-bunkhouse-living-room.webp',
      filename: 'accommodation-bunkhouse-living-room.webp',
      label: 'Inside: Living Area',
      altText: 'Inside the bunkhouse — living area',
      category: 'interior',
      key: 'gallery-1',
      order: 1,
    },
    {
      file: '/images/gallery/accommodation-bunkhouse-interior/accommodation-bunkhouse-kitchen.webp',
      filename: 'accommodation-bunkhouse-kitchen.webp',
      label: 'Inside: The Kitchen',
      altText: 'Inside the bunkhouse — kitchen',
      category: 'interior',
      key: 'gallery-2',
      order: 2,
    },
    {
      file: '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-1.webp',
      filename: 'accommodation-bunkhouse-exterior-1.webp',
      label: 'Outside: The Bunkhouse',
      altText: 'The Bunkhouse on Protea Lane — exterior view',
      category: 'landscape',
      key: 'gallery-3',
      order: 3,
    },
    {
      file: '/images/gallery/accommodation-bunkhouse-facilities/accommodation-bunkhouse-facilities-1.webp',
      filename: 'accommodation-bunkhouse-facilities-1.webp',
      label: 'Outside: The Hot Tub',
      altText: 'Wood-fired hot tub overlooking the valley',
      category: 'exterior',
      key: 'gallery-4',
      order: 4,
    },
    {
      file: '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-2.webp',
      filename: 'accommodation-bunkhouse-exterior-2.webp',
      label: 'Outside: Mountain Views',
      altText: 'Mountain views from the bunkhouse deck',
      category: 'landscape',
      key: 'gallery-5',
      order: 5,
    },
  ]

  const gallery = []
  for (const def of galleryDefs) {
    const assetId = await uploadImage(def.file, def.filename)
    gallery.push({
      _key: def.key,
      _type: 'object',
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
      altText: def.altText,
      label: def.label,
      category: def.category,
      order: def.order,
    })
    console.log(`  ✓ ${def.label}`)
  }

  console.log('Creating document...')

  const result = await client.createIfNotExists({
    _type: 'accommodationPage',
    _id: ACCOMMODATION_DOCUMENT_ID,

    hero: {
      eyebrow: 'Where to stay',
      heading: 'Eco-conscious comfort\nin the mountains',
      intro: 'Wake up to birdsong and fall asleep under clear mountain skies. Our units are designed to keep you close to the land without sacrificing comfort.',
    },

    droneVideo: {
      vimeoId: '1185190221',
      title: 'Haumanskloof Nature Reserve — aerial view',
    },

    bunkhouse: {
      title: 'The Bunkhouse on Protea Lane',
      capacity: 'Sleeps up to 8 guests',
      intro: 'Nestled in a private valley, the Bunkhouse is our flagship unit. It combines rugged mountain charm with modern eco-amenities, offering the perfect base for families or groups of friends.',
      details: [
        '2 bedrooms — Queen, Twin, and Bunk configurations',
        'Fully equipped kitchen with gas stove',
        'Spacious deck with panoramic valley views',
        'Indoor and outdoor fireplace',
        'Wood-fired hot tub overlooking the valley',
        'Solar-powered lighting and charging points',
        'Compost toilet — low impact, high comfort',
        'No Wi-Fi — fully off the grid',
      ],
      mainImage: imageRef(mainImageId, 'The Bunkhouse on Protea Lane'),
      rates: {
        baseRate: 2800,
        baseRateCaption: 'Base rate for up to 2 people',
        additionalRate: 600,
        additionalRateCaption: 'Additional guest fee (up to 8)',
      },
      storyTitle: 'The story behind the build',
      story: [
        {
          _key: 'story-1',
          text: 'The unit was constructed with the hope of having a minimal ecological footprint during its occupancy and construction. Recycled and up-cycled materials were therefore used where possible, however, the sacrifice of comfort was non-negotiable. New materials thus had to be transported in for substructures, decking, internal walling and ceiling purposes.',
        },
        {
          _key: 'story-2',
          text: 'Due to the isolation of the house, the rocky terrain and the proximity to a stream – many variables had to be approached very cautiously. It is for this reason that we opted for a compost toilet rather than a septic tank system. The sinking of a septic tank system often requires water based flush and overflow mechanisms – which in this water scarce area and within this proximity to the stream was just not an option. The bunkhouse also boasts an unconventional electrical earth mat which was designed into the decking substructure to avoid unnecessary soil disturbance.',
        },
        {
          _key: 'story-3',
          text: "The bathroom is built out of fully up-cycled and recycled materials (aside for some structural timber where required by legislation). Double wooden doors, originally installed in the main building, were replaced with glass sliding doors to maximize one's opportunity for a view in the house. These double doors now clad the bathroom to allow for additional 360⁰ views of nature while showering. The bathroom's internal cladding – even the cabinetry – is made from offcuts from the rest of the house. This cabinetry rule further extends to the main house. All the furniture, aside from a few select couches and bed frames, were crafted from recycled timber on the farm. Bedframes were also manufactured on the farm, however, new timber was essential for these pieces to enable maximum comfort and peace of mind.",
        },
        {
          _key: 'story-4',
          text: 'Paintings are all up-cycled from our personal collections on the farm, and any additional works are intended to be sourced locally. Please reach out if you would like to find out more regarding this.',
        },
        {
          _key: 'story-5',
          text: 'The house was meticulously built and designed to be enjoyed in nature, without disturbing it – We hope that you experience and enjoy the fruits of these efforts!',
        },
      ],
      gallery,
    },

    compostToilet: {
      eyebrow: 'Eco-conscious design',
      heading: 'Our compost toilet',
      body: 'At Haumanskloof, we believe thoughtful design and comfort can coexist with environmental responsibility. Our compost toilet is a considered alternative to a conventional septic system — protecting the nearby stream and the surrounding habitat, without compromising your experience.',
      note: 'Guests are always briefed on use before their stay.',
      image: imageRef(compostToiletImageId, 'The compost toilet facility at Haumanskloof'),
    },

    amenities: [
      { _key: 'amenity-mountain', icon: 'mountain', title: 'Mountain views', body: 'Panoramic 360-degree views of the Breede Valley landscape from every window and the outdoor deck.' },
      { _key: 'amenity-fire', icon: 'fire', title: 'Indoor & outdoor fireplace', body: 'Two fireplaces — one inside for cosy evenings, one outside for gathering under the stars.' },
      { _key: 'amenity-solar', icon: 'solar', title: 'Solar powered', body: 'Fully off-grid with solar power for lighting and device charging, designed for mindful use.' },
      { _key: 'amenity-kitchen', icon: 'kitchen', title: 'Fully-equipped kitchen', body: 'Gas appliances, DeLonghi coffee machine and everything you need for a comfortable self-catering stay.' },
      { _key: 'amenity-hottub', icon: 'hottub', title: 'Wood-fired hot tub', body: 'The ultimate way to unwind after a day on the mountain, overlooking the valley.' },
      { _key: 'amenity-privacy', icon: 'privacy', title: 'Total privacy', body: 'The Bunkhouse is completely secluded — no neighbours, no noise, just nature.' },
      { _key: 'amenity-toilet', icon: 'toilet', title: 'Compost toilet', body: 'An eco-conscious alternative to a septic system, designed to protect the nearby stream and surrounding habitat.' },
      { _key: 'amenity-nowifi', icon: 'nowifi', title: 'No Wi-Fi', body: 'Deliberately off-grid. This is your chance to disconnect completely and reconnect with what matters.' },
    ],

    cta: {
      heading: 'Book your mountain escape',
      body: "Enquire about availability and rates for the Bunkhouse on Protea Lane. We'll get back to you within 24 hours.",
    },
  })

  if (result._createdAt === result._updatedAt) {
    console.log('✓ Accommodation document created with images.')
  } else {
    console.log('Accommodation document already exists — skipped. Delete it in Studio first to re-seed.')
  }
  console.log('View and edit at: https://haumanskloof.co.za/studio/structure/accommodationPage')
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
