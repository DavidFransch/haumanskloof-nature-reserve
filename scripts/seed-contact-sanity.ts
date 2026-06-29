#!/usr/bin/env npx tsx

/**
 * Seed Contact Page Singleton to Sanity
 *
 * Creates the contactPage singleton document with editable page text.
 * Safe to re-run — uses createIfNotExists for the document.
 * To replace an existing document, delete it in Studio first.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/seed-contact-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { CONTACT_DOCUMENT_ID } from '../sanity/lib/constants'

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

async function seed() {
  console.log('Creating document...')

  const result = await client.createIfNotExists({
    _type: 'contactPage',
    _id: CONTACT_DOCUMENT_ID,

    heading: 'Contact Us',

    intro: "Have a question about the reserve, our accommodation, or activities? We'd love to hear from you.",

    location: {
      name: 'Haumanskloof Nature Reserve',
      area: 'Breede Valley, Western Cape',
      country: 'South Africa',
    },

    responseTime: 'We typically respond to all enquiries within 24 hours. For urgent matters, please indicate this in your message.',
  })

  if (result._createdAt === result._updatedAt) {
    console.log('  ✓ Contact page document created.')
  } else {
    console.log('  — Contact page document already exists — skipped. Delete it in Studio to re-seed.')
  }

  console.log('\nDone. View and edit at: https://haumanskloof.co.za/studio/structure/contactPage')
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
