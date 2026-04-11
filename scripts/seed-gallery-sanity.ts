#!/usr/bin/env npx tsx

/**
 * Seed Gallery Images to Sanity
 *
 * Reads the manifest.json and uploads all gallery images to Sanity CMS.
 *
 * Prerequisites:
 * - SANITY_API_WRITE_TOKEN in .env.local (create at sanity.io/manage > API > Tokens)
 * - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - NEXT_PUBLIC_SANITY_DATASET in .env.local
 *
 * Usage: npx tsx scripts/seed-gallery-sanity.ts
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

// Category mapping from folder names to Sanity values
const categoryMapping: Record<string, string> = {
  'Camera Trap Images': 'camera-trap',
  'Wildlife on foot': 'wildlife',
  Landscapes: 'landscapes',
  'Haumanskloof Family': 'family',
  Flora: 'flora',
}

// Types
interface ManifestImage {
  original: string
  filename: string
  path: string
  width: number
  height: number
}

interface Manifest {
  generatedAt: string
  totalImages: number
  categories: Record<string, ManifestImage[]>
}

/**
 * Convert slugified filename to readable title
 */
function slugToTitle(slug: string): string {
  // Remove .webp extension
  const name = slug.replace(/\.webp$/, '')

  // Split on hyphens and capitalize each word
  return name
    .split('-')
    .map((word) => {
      // Don't capitalize numbers
      if (/^\d+$/.test(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

/**
 * Detect series ID from filename
 * e.g., "leopard-2.webp" -> "leopard-series"
 */
function detectSeriesId(filename: string, allFilenames: string[]): string | undefined {
  const baseName = filename.replace(/\.webp$/, '')

  // Check if this filename ends with a number (e.g., "leopard-2")
  const numberMatch = baseName.match(/^(.+)-(\d+)$/)

  if (numberMatch) {
    const baseWithoutNumber = numberMatch[1]
    // Check if there are other files in this series
    const hasRelated = allFilenames.some((f) => {
      const otherBase = f.replace(/\.webp$/, '')
      return (
        otherBase === baseWithoutNumber || // The base file (e.g., "leopard")
        (otherBase.startsWith(baseWithoutNumber + '-') && /^.+-\d+$/.test(otherBase)) // Other numbered files
      )
    })

    if (hasRelated) {
      return `${baseWithoutNumber}-series`
    }
  } else {
    // Check if this base name has numbered variants
    const hasNumberedVariants = allFilenames.some((f) => {
      const otherBase = f.replace(/\.webp$/, '')
      return otherBase.startsWith(baseName + '-') && /^.+-\d+$/.test(otherBase)
    })

    if (hasNumberedVariants) {
      return `${baseName}-series`
    }
  }

  return undefined
}

/**
 * Upload an image to Sanity and create a gallery document
 */
async function uploadImage(
  image: ManifestImage,
  category: string,
  categoryFolder: string,
  order: number,
  allFilenames: string[]
): Promise<boolean> {
  const imagePath = path.join(process.cwd(), 'public', 'images', 'gallery', categoryFolder, image.filename)

  if (!fs.existsSync(imagePath)) {
    console.error(`  File not found: ${imagePath}`)
    return false
  }

  try {
    // Upload the image asset
    const imageBuffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: image.filename,
      contentType: 'image/webp',
    })

    // Detect series
    const seriesId = detectSeriesId(image.filename, allFilenames)

    // Create the gallery image document
    const title = slugToTitle(image.filename)
    const doc = {
      _type: 'galleryImage',
      title,
      category,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
      altText: title,
      order,
      featured: false,
      ...(seriesId && { seriesId }),
    }

    await client.create(doc)
    return true
  } catch (error) {
    console.error(`  Error uploading ${image.filename}:`, error)
    return false
  }
}

/**
 * Main function
 */
async function main() {
  console.log('\nSanity Gallery Seed Script')
  console.log('==========================')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  // Read manifest
  const manifestPath = path.join(process.cwd(), 'public', 'images', 'gallery', 'manifest.json')

  if (!fs.existsSync(manifestPath)) {
    console.error('Error: manifest.json not found')
    console.error('Run the prepare-gallery-images.js script first')
    process.exit(1)
  }

  const manifest: Manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  console.log(`Found ${manifest.totalImages} images in manifest\n`)

  // Check for existing gallery images
  const existingCount = await client.fetch<number>('count(*[_type == "galleryImage"])')
  if (existingCount > 0) {
    console.log(`Warning: ${existingCount} gallery images already exist in Sanity`)
    console.log('Delete existing images first if you want to re-seed\n')

    const readline = await import('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const answer = await new Promise<string>((resolve) => {
      rl.question('Continue anyway? (y/N): ', resolve)
    })
    rl.close()

    if (answer.toLowerCase() !== 'y') {
      console.log('Aborted')
      process.exit(0)
    }
    console.log()
  }

  // Process each category
  let totalUploaded = 0
  let totalFailed = 0

  for (const [categoryFolder, images] of Object.entries(manifest.categories)) {
    const category = categoryMapping[categoryFolder]

    if (!category) {
      console.log(`Skipping unknown category: ${categoryFolder}`)
      continue
    }

    console.log(`\nCategory: ${categoryFolder} (${images.length} images)`)

    // Get all filenames in this category for series detection
    const allFilenames = images.map((img) => img.filename)

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      process.stdout.write(`  [${i + 1}/${images.length}] ${image.filename}...`)

      const success = await uploadImage(image, category, categoryFolder, i + 1, allFilenames)

      if (success) {
        console.log(' Done')
        totalUploaded++
      } else {
        console.log(' Failed')
        totalFailed++
      }
    }
  }

  console.log('\n==========================')
  console.log('Summary')
  console.log('==========================')
  console.log(`Uploaded: ${totalUploaded}`)
  console.log(`Failed: ${totalFailed}`)
  console.log()
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
