#!/usr/bin/env npx tsx

/**
 * Seed Homepage Singleton to Sanity
 *
 * Uploads all homepage images and creates:
 *   - The homepage singleton document (hero, about, pillars, gallery, accommodation, cta)
 *     including the three managed gallery strip images embedded in gallery.strip
 *
 * Safe to re-run — uses createIfNotExists for every document.
 * To replace an existing document, delete it in Studio first.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/seed-homepage-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { HOMEPAGE_DOCUMENT_ID } from '../sanity/lib/constants'

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

function ref(id: string) {
  return { _type: 'reference' as const, _ref: id }
}

async function seed() {
  console.log('Uploading images...')

  const [heroImageId, aboutImageId, strip1Id, strip2Id, strip3Id, bunkhouseImageId] =
    await Promise.all([
      uploadImage(
        'images/gallery/home-hero/home-hero-1.webp',
        'home-hero-1.webp'
      ),
      uploadImage(
        'images/gallery/home-about/home-about-1.webp',
        'home-about-1.webp'
      ),
      uploadImage(
        'images/gallery/home-gallery-strip/home-gallery-strip-1.webp',
        'home-gallery-strip-1.webp'
      ),
      uploadImage(
        'images/gallery/home-gallery-strip/home-gallery-strip-2.webp',
        'home-gallery-strip-2.webp'
      ),
      uploadImage(
        'images/gallery/home-gallery-strip/home-gallery-strip-3.webp',
        'home-gallery-strip-3.webp'
      ),
      uploadImage(
        'images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-2.webp',
        'accommodation-bunkhouse-exterior-2.webp'
      ),
    ])

  console.log('  ✓ Hero background image')
  console.log('  ✓ About property photo')
  console.log('  ✓ Gallery strip image 1 (Wildlife)')
  console.log('  ✓ Gallery strip image 2 (Landscapes)')
  console.log('  ✓ Gallery strip image 3 (Camera Trap)')
  console.log('  ✓ Bunkhouse unit image')

  // ── Homepage singleton ───────────────────────────────────────────────────
  console.log('\nCreating homepage document...')

  const result = await client.createIfNotExists({
    _type: 'homePage',
    _id: HOMEPAGE_DOCUMENT_ID,

    hero: {
      eyebrow: 'Breede Valley · Western Cape',
      headline: 'Deep in the mountains of the\nBreede Valley, is a hidden sanctuary.',
      intro: 'Haumanskloof is a land of contrast, where vibrant Renosterveld and Fynbos meet the arid beauty of the Succulent Karoo.',
      body: 'Just two hours from Cape Town, Haumanskloof is a family-run sanctuary where nature and community thrive. Explore and immerse yourself in a unique natural setting, discover the riches of the land, or simply unwind under the stars.',
      cta: 'Come experience this special intersection of rolling mountains, pristine landscapes and rugged roads — we invite you to join us!',
      image: {
        _type: 'image',
        asset: ref(heroImageId),
        altText: 'Haumanskloof Nature Reserve',
      },
    },

    about: {
      label: 'Our sanctuary',
      heading: 'A land of contrast and wonder',
      body: 'Haumanskloof is a place where gently rolling mountains meet pristine landscapes and rugged roads. Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars — we invite you to join us.',
      image: {
        _type: 'image',
        asset: ref(aboutImageId),
        altText: 'Haumanskloof Nature Reserve property',
      },
    },

    pillar1: {
      icon: 'wildlife',
      title: 'Wildlife & ecology',
      body: 'Camera trap monitoring, diverse Renosterveld, Fynbos and Succulent Karoo flora, and exploration through indigenous habitat.',
    },
    pillar2: {
      icon: 'accommodation',
      title: 'Accommodation',
      body: 'Comfortable bunkhouse unit nestled in the reserve. Fall asleep to the sounds of the bush.',
    },
    pillar3: {
      icon: 'mountain',
      title: 'Ancient landscapes',
      body: 'Explore a timeless landscape through scenic walks, stargazing, photography and quiet immersion in nature.',
    },

    gallery: {
      label: 'The reserve',
      heading: 'Experience Haumanskloof Nature Reserve',
      strip: [
        {
          _key: 'strip-1',
          image: { _type: 'image', asset: ref(strip1Id), altText: 'Wildlife at Haumanskloof Nature Reserve' },
          category: 'wildlife',
        },
        {
          _key: 'strip-2',
          image: { _type: 'image', asset: ref(strip2Id), altText: 'Mountain landscapes of Haumanskloof' },
          category: 'landscapes',
        },
        {
          _key: 'strip-3',
          image: { _type: 'image', asset: ref(strip3Id), altText: 'Road less travelled' },
          category: 'landscapes',
        },
      ],
    },

    accommodation: {
      label: 'Where to stay',
      heading: 'Accommodation at Haumanskloof Nature Reserve',
      body: 'Wake up to birdsong, fall asleep under clear mountain skies. Our units are designed to keep you close to the land without sacrificing comfort.',
      units: [
        {
          _key: 'unit-bunkhouse',
          name: 'The Bunkhouse',
          desc: 'Sleeps up to 8 · Mountain views · Fully equipped kitchen',
          tag: 'Enquire for bookings',
          image: {
            _type: 'image',
            asset: ref(bunkhouseImageId),
            altText: 'The Bunkhouse on Protea Lane',
          },
        },
        {
          _key: 'unit-coming-soon',
          name: 'More coming soon',
          desc: 'Additional accommodation will be added as the reserve grows.',
        },
      ],
    },

    cta: {
      heading: 'Come experience the sanctuary',
      body: "Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars. We'd love to have you.",
    },
  })

  if (result._createdAt === result._updatedAt) {
    console.log('  ✓ Homepage document created with all images.')
  } else {
    console.log('  — Homepage document already exists — skipped. Delete it in Studio to re-seed.')
  }

  console.log('\nDone. View and edit at: https://haumanskloof.co.za/studio/structure/homePage')
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
