#!/usr/bin/env npx tsx

/**
 * Seed FAQ Documents to Sanity
 *
 * Creates the default FAQ entries in Sanity CMS. Skips seeding if any
 * FAQ documents already exist to avoid duplicates.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local (create at sanity.io/manage > API > Tokens)
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/seed-faqs-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

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

const faqs = [
  {
    _type: 'faq',
    question: 'Do I need a high-clearance vehicle?',
    answer:
      'Yes. The road to Haumanskloof is constantly being improved, but a high-clearance vehicle is required to access the reserve.',
    order: 1,
  },
  {
    _type: 'faq',
    question: 'Can I bring my pets?',
    answer:
      'No. Pets are not permitted at Haumanskloof. As a nature reserve, we have a responsibility to protect the local wildlife and ecosystem.',
    order: 2,
  },
  {
    _type: 'faq',
    question: 'Is there cell signal at the reserve?',
    answer:
      'Cell signal is limited at Haumanskloof. We recommend downloading offline maps and any essential content before your arrival.',
    order: 3,
  },
  {
    _type: 'faq',
    question: 'Is there Wi-Fi?',
    answer:
      'No Wi-Fi is available at the reserve. This is intentional — Haumanskloof is designed as a space to disconnect and reconnect with nature.',
    order: 4,
  },
  {
    _type: 'faq',
    question: 'What is the closest town for supplies?',
    answer:
      'Worcester is the closest town for supplies, approximately 120 kilometres north-east of Cape Town on the N1 highway. We recommend stocking up on groceries and essentials before heading to the reserve.',
    order: 5,
  },
  {
    _type: 'faq',
    question: 'What is a compost toilet and how does it work?',
    answer:
      'A compost toilet is a waterless, eco-friendly alternative to a conventional flush toilet. Rather than using water to carry waste to a septic system, it uses a natural composting process to break down organic matter into safe, nutrient-rich compost. At Haumanskloof, we chose a compost toilet to protect the nearby stream and surrounding habitat from the risk of septic overflow. Guests are always briefed on use before their stay — it is straightforward, odour-free when used correctly, and a small but meaningful part of how we tread lightly on this land.',
    order: 6,
  },
]

async function seed() {
  const existing = await client.fetch<number>(`count(*[_type == "faq"])`)

  if (existing > 0) {
    console.log(
      `Skipped — ${existing} FAQ document${existing === 1 ? '' : 's'} already exist in the dataset.`
    )
    return
  }

  const transaction = client.transaction()
  for (const faq of faqs) {
    transaction.create(faq)
  }

  await transaction.commit()
  console.log(`Created ${faqs.length} FAQ documents.`)
  console.log(`View and edit at: https://haumanskloof.co.za/studio/structure/faq`)
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
