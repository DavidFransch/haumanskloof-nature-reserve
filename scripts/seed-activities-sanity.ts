#!/usr/bin/env npx tsx

/**
 * Seed Activities Page Singleton to Sanity
 *
 * Uploads all activity images and creates the activitiesPage singleton document.
 * Safe to re-run — uses createIfNotExists for the document.
 * To replace an existing document, delete it in Studio first.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/seed-activities-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { ACTIVITIES_DOCUMENT_ID } from '../sanity/lib/constants'

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

  const [wildlifeImageId, hikingImageId, cyclingImageId] = await Promise.all([
    uploadImage(
      'images/gallery/activities-wildlife/activities-wildlife-1.webp',
      'activities-wildlife-1.webp'
    ),
    uploadImage(
      'images/gallery/activities-hiking/activities-hiking-1.webp',
      'activities-hiking-1.webp'
    ),
    uploadImage(
      'images/gallery/activities-cycling/activities-cycling-1.webp',
      'activities-cycling-1.webp'
    ),
  ])

  console.log('  ✓ Wildlife walks image')
  console.log('  ✓ Hiking image')
  console.log('  ✓ Cycling image')

  console.log('\nCreating document...')

  const result = await client.createIfNotExists({
    _type: 'activitiesPage',
    _id: ACTIVITIES_DOCUMENT_ID,

    hero: {
      eyebrow: 'Explore the reserve',
      heading: 'Things to do at\nHaumanskloof',
      intro: 'From self-paced exploration to quiet relaxation, Haumanskloof offers a range of outdoor experiences in a uniquely South African landscape.',
    },

    items: [
      {
        _key: 'activity-wildlife-walks',
        id: 'wildlife-walks',
        icon: 'wildlife',
        tag: 'Self-guided · Guided on request',
        title: 'Wildlife Walks & Ecology',
        body: 'Explore the reserve on foot through indigenous veld. The reserve is home to a remarkable diversity of species — from caracal and Cape mountain leopard to over 200 bird species and hundreds of endemic plants.',
        highlights: [
          'Camera trap monitoring stations',
          'Caracal, porcupine & aardvark sightings',
          '200+ bird species recorded',
          'Indigenous Renosterveld, Fynbos & Succulent Karoo flora',
        ],
        image: imageRef(wildlifeImageId, 'Wildlife at Haumanskloof Nature Reserve'),
      },
      {
        _key: 'activity-hiking',
        id: 'hiking',
        icon: 'hiking',
        tag: 'Self-guided · Various difficulty levels',
        title: 'Hiking & Mountain Exploration',
        body: 'Traverse rocky ridgelines, dry riverbeds, and open mountain plateaus on a network of informal trails. The terrain ranges from gentle river walks to steep summit scrambles — all rewarded with spectacular Breede Valley views.',
        highlights: [
          'Varied terrain for all fitness levels',
          'Panoramic Breede Valley views',
          'Night sky stargazing at altitude',
        ],
        image: imageRef(hikingImageId, 'Hiking trails at Haumanskloof Nature Reserve'),
      },
      {
        _key: 'activity-cycling',
        id: 'cycling',
        icon: 'cycling',
        tag: 'Self-guided · Bring your own bike',
        title: 'Mountain Cycling',
        body: "Explore the reserve’s rugged 4x4 tracks and farm roads on two wheels. The varied terrain offers everything from gentle valley rides to technical mountain routes, all set against the dramatic backdrop of the Breede Valley.",
        highlights: [
          'Farm tracks and mountain routes',
          'Varied terrain for all levels',
          'Scenic Breede Valley riding',
          'Combine with wildlife spotting on the move',
        ],
        image: imageRef(cyclingImageId, 'Mountain cycling at Haumanskloof Nature Reserve'),
      },
    ],

    cta: {
      heading: 'Ready to explore?',
      body: "Get in touch to plan your visit. We'll help tailor an experience around what you'd like to see and do.",
    },
  })

  if (result._createdAt === result._updatedAt) {
    console.log('  ✓ Activities page document created with images.')
  } else {
    console.log('  — Activities page document already exists — skipped. Delete it in Studio to re-seed.')
  }

  console.log('\nDone. View and edit at: https://haumanskloof.co.za/studio/structure/activitiesPage')
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
