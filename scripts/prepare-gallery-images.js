#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Gallery Image Preparation Script
 *
 * Processes images from a source directory:
 * - Slugifies filenames
 * - Optimizes with sharp (WebP, max 1920px, quality 82)
 * - Outputs to public/images/gallery/{category}/
 * - Generates manifest.json
 *
 * Usage: node scripts/prepare-gallery-images.js /path/to/source/folder
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// Configuration
const MAX_DIMENSION = 1920
const QUALITY = 82
const TARGET_SIZE_KB = 300
const OUTPUT_BASE = path.join(process.cwd(), 'public/images/gallery')
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

/**
 * Slugify a filename
 * - Lowercase everything
 * - Replace spaces with hyphens
 * - Remove apostrophes and special characters
 * - Replace parentheses and their contents like "(2)" with "-2"
 */
function slugifyFilename(filename) {
  // Get name without extension
  const ext = path.extname(filename)
  let name = path.basename(filename, ext)

  // Replace parentheses with contents: "(2)" -> "-2"
  name = name.replace(/\s*\((\d+)\)/g, '-$1')

  // Remove other parentheses and their contents
  name = name.replace(/\s*\([^)]*\)/g, '')

  // Lowercase
  name = name.toLowerCase()

  // Remove apostrophes
  name = name.replace(/[''`]/g, '')

  // Replace spaces and underscores with hyphens
  name = name.replace(/[\s_]+/g, '-')

  // Remove special characters (keep alphanumeric and hyphens)
  name = name.replace(/[^a-z0-9-]/g, '')

  // Clean up multiple hyphens
  name = name.replace(/-+/g, '-')

  // Remove leading/trailing hyphens
  name = name.replace(/^-+|-+$/g, '')

  return name
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

/**
 * Get all image files recursively from a directory
 */
function getImageFiles(dir, baseDir = dir) {
  const files = []

  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`)
    return files
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...getImageFiles(fullPath, baseDir))
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        const relativePath = path.relative(baseDir, dir)
        files.push({
          fullPath,
          filename: entry.name,
          category: relativePath || 'uncategorized',
        })
      }
    }
  }

  return files
}

/**
 * Process a single image
 */
async function processImage(imageInfo, outputBase) {
  const { fullPath, filename, category } = imageInfo

  // Slugify the filename
  const slugifiedName = slugifyFilename(filename)
  const outputFilename = `${slugifiedName}.webp`

  // Create output directory
  const outputDir = path.join(outputBase, category)
  fs.mkdirSync(outputDir, { recursive: true })

  const outputPath = path.join(outputDir, outputFilename)

  // Get original file size
  const originalStats = fs.statSync(fullPath)
  const originalSize = originalStats.size

  try {
    // Load image and get metadata
    const image = sharp(fullPath)
    const metadata = await image.metadata()

    // Calculate resize dimensions (max 1920px on longest edge)
    let width = metadata.width
    let height = metadata.height

    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      if (width > height) {
        height = Math.round((height / width) * MAX_DIMENSION)
        width = MAX_DIMENSION
      } else {
        width = Math.round((width / height) * MAX_DIMENSION)
        height = MAX_DIMENSION
      }
    }

    // First pass: try with standard quality
    let outputBuffer = await sharp(fullPath)
      .rotate()
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer()

    // If file is too large, try reducing quality
    let finalQuality = QUALITY
    const targetBytes = TARGET_SIZE_KB * 1024

    if (outputBuffer.length > targetBytes) {
      // Try progressively lower quality
      for (const q of [75, 70, 65, 60]) {
        const testBuffer = await sharp(fullPath)
          .rotate()
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: q })
          .toBuffer()

        if (testBuffer.length <= targetBytes) {
          outputBuffer = testBuffer
          finalQuality = q
          break
        }
        // Use lowest quality attempt if still too large
        outputBuffer = testBuffer
        finalQuality = q
      }
    }

    // Write output file
    fs.writeFileSync(outputPath, outputBuffer)

    // Get final dimensions
    const finalMetadata = await sharp(outputBuffer).metadata()

    return {
      success: true,
      originalFilename: filename,
      slugifiedFilename: outputFilename,
      category,
      originalSize,
      optimizedSize: outputBuffer.length,
      width: finalMetadata.width,
      height: finalMetadata.height,
      quality: finalQuality,
    }
  } catch (error) {
    return {
      success: false,
      originalFilename: filename,
      category,
      error: error.message,
    }
  }
}

/**
 * Generate manifest.json
 */
function generateManifest(results, outputPath) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalImages: results.filter((r) => r.success).length,
    categories: {},
  }

  for (const result of results) {
    if (!result.success) continue

    if (!manifest.categories[result.category]) {
      manifest.categories[result.category] = []
    }

    manifest.categories[result.category].push({
      original: result.originalFilename,
      filename: result.slugifiedFilename,
      path: `/images/gallery/${result.category}/${result.slugifiedFilename}`,
      width: result.width,
      height: result.height,
    })
  }

  // Sort categories alphabetically
  const sortedCategories = {}
  Object.keys(manifest.categories)
    .sort()
    .forEach((key) => {
      sortedCategories[key] = manifest.categories[key].sort((a, b) =>
        a.filename.localeCompare(b.filename)
      )
    })
  manifest.categories = sortedCategories

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2))
}

/**
 * Main function
 */
async function main() {
  const sourceDir = process.argv[2]

  if (!sourceDir) {
    console.error('Usage: node scripts/prepare-gallery-images.js /path/to/source/folder')
    process.exit(1)
  }

  // Resolve the path
  const resolvedSource = path.resolve(sourceDir)

  console.log('\n📷 Gallery Image Preparation Script')
  console.log('====================================')
  console.log(`Source: ${resolvedSource}`)
  console.log(`Output: ${OUTPUT_BASE}`)
  console.log(`Max dimension: ${MAX_DIMENSION}px`)
  console.log(`Quality: ${QUALITY}`)
  console.log(`Target size: ${TARGET_SIZE_KB}KB\n`)

  // Get all image files
  const imageFiles = getImageFiles(resolvedSource)

  if (imageFiles.length === 0) {
    console.error('No image files found in source directory')
    process.exit(1)
  }

  console.log(`Found ${imageFiles.length} image(s) to process\n`)

  // Create output base directory
  fs.mkdirSync(OUTPUT_BASE, { recursive: true })

  // Process all images
  const results = []
  let totalOriginalSize = 0
  let totalOptimizedSize = 0

  for (let i = 0; i < imageFiles.length; i++) {
    const imageInfo = imageFiles[i]
    const progress = `[${i + 1}/${imageFiles.length}]`

    process.stdout.write(`${progress} Processing: ${imageInfo.filename}...`)

    const result = await processImage(imageInfo, OUTPUT_BASE)
    results.push(result)

    if (result.success) {
      totalOriginalSize += result.originalSize
      totalOptimizedSize += result.optimizedSize

      const savings = (((result.originalSize - result.optimizedSize) / result.originalSize) * 100).toFixed(1)
      console.log(
        ` ${formatBytes(result.originalSize)} → ${formatBytes(result.optimizedSize)} (-${savings}%)`
      )
    } else {
      console.log(` ERROR: ${result.error}`)
    }
  }

  // Generate manifest
  const manifestPath = path.join(OUTPUT_BASE, 'manifest.json')
  generateManifest(results, manifestPath)

  // Print summary
  const successCount = results.filter((r) => r.success).length
  const failCount = results.filter((r) => !r.success).length
  const totalSavings = (((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)

  console.log('\n====================================')
  console.log('Summary')
  console.log('====================================')
  console.log(`Processed: ${successCount} images`)
  if (failCount > 0) {
    console.log(`Failed: ${failCount} images`)
  }
  console.log(`Total original size: ${formatBytes(totalOriginalSize)}`)
  console.log(`Total optimized size: ${formatBytes(totalOptimizedSize)}`)
  console.log(`Total savings: ${totalSavings}%`)
  console.log(`Manifest: ${manifestPath}\n`)

  // List any failures
  const failures = results.filter((r) => !r.success)
  if (failures.length > 0) {
    console.log('Failed files:')
    for (const f of failures) {
      console.log(`  - ${f.originalFilename}: ${f.error}`)
    }
    console.log()
  }
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
