#!/usr/bin/env npx tsx

/**
 * Seed About Page Singleton to Sanity
 *
 * Uploads the story image and creates the aboutPage singleton document.
 * Safe to re-run — uses createIfNotExists for the document.
 * To replace an existing document, delete it in Studio first.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/seed-about-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { ABOUT_DOCUMENT_ID } from '../sanity/lib/constants'

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

  const storyImageId = await uploadImage(
    'images/gallery/about-story/family-photo.webp',
    'family-photo.webp'
  )
  console.log('  ✓ Story image (family photo)')

  console.log('\nCreating document...')

  const result = await client.createIfNotExists({
    _type: 'aboutPage',
    _id: ABOUT_DOCUMENT_ID,

    hero: {
      eyebrow: 'Our story',
      heading: 'About Us',
      intro: "Haumanskloof is more than just a destination – it’s a return. A return to family, to self-discovery and to deeper connection.",
    },

    story: `After years of living across three South African cities, the pace of high-energy city life was all too familiar to us, and a call to the wild was beckoning.

Being drawn to what had always grounded our family, our hearts kept returning to the wild landscapes that shaped and inspired us. The raw beauty of nature at its best, and us, an integral part of it this time.

In 2023, being guided by good faith and bold decisions, our family's journey lead us all to Haumanskloof, and our vision was born. What began as a move towards quiet farm life and closer family, soon became about something far greater – the community of existence. A way of life centred on celebrating rediscovery, connection and conservation.

The name Haumanskloof carries a resonance to the legacy of its namesake that feels especially meaningful to us. The property was originally named after the Belgian botanist, teacher and advocate for environmental protection, Lucien Léon Hauman. The reserve reflects the values he stood for – of curiosity, learning and a deep respect for the natural world.

At Haumanskloof, we let nature set the pace. Every decision we make is guided by a belief that nature is not something separate from us, but something we belong to. Our daily work is rooted in ensuring that this unique landscape is protected and preserved for future generations, offering a safe haven for threatened ecosystems, the biodiversity they support and the functions they maintain. Through the work we do, we hope to cultivate a space of connection and coexistence through thoughtful and monitored conservation.

Whether you're a hiker, a birder, a cyclist, a star gazer or simply enjoy a quiet braai – the reserve is the place for you.

Tucked away in this ancient valley is more than just a destination – it's a way of existing.`,

    storyImage: imageRef(storyImageId, 'The family behind Haumanskloof Nature Reserve'),

    vision: 'A sustainable enterprise that preserves biodiversity, builds harmony, and instils ethical values – connecting people, planet and self.',

    mission: 'To protect and restore the natural integrity of Haumanskloof through responsible stewardship, sustainable living, and meaningful experiences that inspire conservation, simplicity and connection.',

    values: [
      {
        _key: 'value-integrity',
        icon: 'integrity',
        title: 'Integrity',
        body: 'We lead with honesty, transparency and respect in everything we do.',
      },
      {
        _key: 'value-stewardship',
        icon: 'stewardship',
        title: 'Stewardship',
        body: 'We believe the land is not ours to own, but ours to care for and preserve.',
      },
      {
        _key: 'value-passion',
        icon: 'mountain',
        title: 'Passion',
        body: 'Our love for nature, community and meaningful living guides every decision we make.',
      },
    ],

    cta: {
      heading: 'Come experience the reserve',
      body: 'Join us for a walk, a night under the stars, or a quiet moment in the mountains.',
    },
  })

  if (result._createdAt === result._updatedAt) {
    console.log('  ✓ About page document created with images.')
  } else {
    console.log('  — About page document already exists — skipped. Delete it in Studio to re-seed.')
  }

  console.log('\nDone. View and edit at: https://haumanskloof.co.za/studio/structure/aboutPage')
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
