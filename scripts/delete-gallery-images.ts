#!/usr/bin/env npx tsx

/**
 * Delete All Gallery Images from Sanity
 *
 * Removes all documents with _type == 'galleryImage' from Sanity CMS.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local (create at sanity.io/manage > API > Tokens)
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/delete-gallery-images.ts
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

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN is not set')
  console.error('Create a write token at https://sanity.io/manage > Your Project > API > Tokens')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Types
interface GalleryImage {
  _id: string
  title: string
}

/**
 * Delete images in batches to avoid rate limiting
 */
async function deleteBatch(images: GalleryImage[], startIndex: number): Promise<number> {
  const BATCH_SIZE = 10
  const batch = images.slice(startIndex, startIndex + BATCH_SIZE)

  let deletedCount = 0

  for (const image of batch) {
    try {
      await client.delete(image._id)
      console.log(`[${startIndex + deletedCount + 1}/${images.length}] Deleting: ${image.title}`)
      deletedCount++
    } catch (error) {
      console.error(`  Error deleting ${image.title}:`, error)
    }
  }

  return deletedCount
}

/**
 * Ask for user confirmation
 */
async function confirm(question: string): Promise<boolean> {
  const readline = await import('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise<boolean>((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'y')
    })
  })
}

/**
 * Main function
 */
async function main() {
  console.log('\nSanity Gallery Delete Script')
  console.log('============================')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  // Fetch all gallery images
  console.log('Fetching gallery images...')
  const images = await client.fetch<GalleryImage[]>(
    '*[_type == "galleryImage"] { _id, title } | order(title asc)'
  )

  if (images.length === 0) {
    console.log('No gallery images found.')
    process.exit(0)
  }

  console.log(`Found ${images.length} gallery images to delete.\n`)

  // Confirmation prompt
  const confirmed = await confirm(`About to delete ${images.length} gallery images. Are you sure? (y/n): `)

  if (!confirmed) {
    console.log('Aborted.')
    process.exit(0)
  }

  console.log('\nDeleting images...\n')

  // Delete in batches
  let totalDeleted = 0
  for (let i = 0; i < images.length; i += 10) {
    const deleted = await deleteBatch(images, i)
    totalDeleted += deleted

    // Brief pause to avoid rate limiting
    if (i + 10 < images.length) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  console.log('\n============================')
  console.log(`Done. Deleted ${totalDeleted} images.`)
  console.log()
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
