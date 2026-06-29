#!/usr/bin/env npx tsx

/**
 * Seed Homepage Singleton to Sanity
 *
 * Creates the homepage content document with the current copy from
 * site.content.ts. Uses createIfNotExists so it is safe to run
 * multiple times — it will not overwrite any edits made in the studio.
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

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) {
        process.env[key] = value
      }
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

const homepageDoc = {
  _type: 'homePage',
  _id: HOMEPAGE_DOCUMENT_ID,

  hero: {
    eyebrow: 'Breede Valley · Western Cape',
    headline: 'Deep in the mountains of the\nBreede Valley, is a hidden sanctuary.',
    intro:
      'Haumanskloof is a land of contrast, where vibrant Renosterveld and Fynbos meet the arid beauty of the Succulent Karoo.',
    body: 'Just two hours from Cape Town, Haumanskloof is a family-run sanctuary where nature and community thrive. Explore and immerse yourself in a unique natural setting, discover the riches of the land, or simply unwind under the stars.',
    cta: 'Come experience this special intersection of rolling mountains, pristine landscapes and rugged roads — we invite you to join us!',
  },

  about: {
    label: 'Our sanctuary',
    heading: 'A land of contrast and wonder',
    body: 'Haumanskloof is a place where gently rolling mountains meet pristine landscapes and rugged roads. Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars — we invite you to join us.',
  },

  pillars: [
    {
      _key: 'pillar-wildlife',
      icon: 'wildlife',
      title: 'Wildlife & ecology',
      body: 'Camera trap monitoring, diverse Renosterveld, Fynbos and Succulent Karoo flora, and exploration through indigenous habitat.',
    },
    {
      _key: 'pillar-accommodation',
      icon: 'accommodation',
      title: 'Accommodation',
      body: 'Comfortable bunkhouse unit nestled in the reserve. Fall asleep to the sounds of the bush.',
    },
    {
      _key: 'pillar-mountain',
      icon: 'mountain',
      title: 'Ancient landscapes',
      body: 'Explore a timeless landscape through scenic walks, stargazing, photography and quiet immersion in nature.',
    },
  ],

  gallery: {
    label: 'The reserve',
    heading: 'Experience Haumanskloof Nature Reserve',
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
        image: '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-2.webp',
      },
    ],
  },

  cta: {
    heading: 'Come experience the sanctuary',
    body: "Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars. We'd love to have you.",
  },
}

async function seed() {
  const result = await client.createIfNotExists(homepageDoc)
  if (result._createdAt === result._updatedAt) {
    console.log('Created homepage document.')
  } else {
    console.log('Homepage document already exists — skipped.')
  }
  console.log('View and edit at: https://haumanskloof.co.za/studio/structure/homePage')
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
