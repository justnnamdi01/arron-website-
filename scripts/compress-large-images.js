/**
 * Compress Large Images Before Upload
 * 
 * This script compresses images that are too large for Cloudinary's free tier (10MB limit)
 * 
 * Requirements:
 * npm install sharp
 * 
 * Usage:
 * node scripts/compress-large-images.js
 */

const fs = require('fs')
const path = require('path')

// Check if sharp is installed
let sharp
try {
  sharp = require('sharp')
} catch (error) {
  console.error('❌ Error: sharp is not installed!')
  console.error('   Install it with: npm install sharp')
  process.exit(1)
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
const COMPRESSED_DIR = path.join(__dirname, '..', 'public', '_compressed')

// Statistics
const stats = {
  checked: 0,
  compressed: 0,
  skipped: 0,
  errors: 0,
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size
  } catch (error) {
    return 0
  }
}

/**
 * Compress an image file
 */
async function compressImage(filePath, outputPath) {
  try {
    const fileSize = getFileSize(filePath)
    
    if (fileSize <= MAX_FILE_SIZE) {
      stats.skipped++
      return false // No compression needed
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Get file extension
    const ext = path.extname(filePath).toLowerCase()
    const isPng = ext === '.png'
    const isJpg = ext === '.jpg' || ext === '.jpeg'

    // Determine compression quality based on file size
    // For very large files (>20MB), use more aggressive compression
    let quality = 85
    let compressionLevel = 9
    if (fileSize > 20 * 1024 * 1024) {
      quality = 75
      compressionLevel = 9
    } else if (fileSize > 15 * 1024 * 1024) {
      quality = 80
      compressionLevel = 9
    }

    // Compress based on format
    if (isPng) {
      // PNG: Optimize PNG with aggressive settings for large files
      await sharp(filePath)
        .png({ 
          quality: quality,
          compressionLevel: compressionLevel,
          adaptiveFiltering: true,
          palette: true // Use palette for better compression on large PNGs
        })
        .toFile(outputPath)
    } else if (isJpg) {
      // JPEG: Optimize with quality reduction
      await sharp(filePath)
        .jpeg({ 
          quality: quality,
          mozjpeg: true
        })
        .toFile(outputPath)
    } else {
      // Other formats: Convert to WebP
      await sharp(filePath)
        .webp({ quality: quality })
        .toFile(outputPath.replace(ext, '.webp'))
    }

    let newSize = getFileSize(outputPath)
    const reduction = ((fileSize - newSize) / fileSize * 100).toFixed(1)
    
    // If still too large, try converting PNG to WebP (better compression)
    if (newSize > MAX_FILE_SIZE && isPng) {
      const webpPath = outputPath.replace(ext, '.webp')
      await sharp(filePath)
        .webp({ quality: 75 })
        .toFile(webpPath)
      
      const webpSize = getFileSize(webpPath)
      if (webpSize < newSize) {
        // WebP is smaller, use it instead
        fs.unlinkSync(outputPath) // Delete PNG version
        outputPath = webpPath
        newSize = webpSize
        console.log(`   → Converted to WebP for better compression`)
      }
    }
    
    console.log(`✅ Compressed: ${path.basename(filePath)}`)
    console.log(`   ${(fileSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`)
    
    if (newSize > MAX_FILE_SIZE) {
      console.log(`   ⚠️  Still over 10MB limit! May need manual compression or paid plan.`)
    }
    
    stats.compressed++
    return true
  } catch (error) {
    console.error(`❌ Error compressing ${filePath}:`, error.message)
    stats.errors++
    return false
  }
}

/**
 * Find all image files recursively
 */
function findImageFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList

  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !filePath.includes('_compressed')) {
      findImageFiles(filePath, fileList)
    } else {
      const ext = path.extname(file).toLowerCase()
      const imageExts = ['.jpg', '.jpeg', '.png', '.webp']
      
      if (imageExts.includes(ext)) {
        fileList.push(filePath)
      }
    }
  })

  return fileList
}

/**
 * Main compression function
 */
async function main() {
  console.log('🗜️  Image Compression Script')
  console.log('============================\n')
  console.log(`Target: Compress images larger than ${MAX_FILE_SIZE / 1024 / 1024}MB\n`)

  const publicDir = path.join(__dirname, '..', 'public')
  const imageFiles = findImageFiles(publicDir)
  
  stats.checked = imageFiles.length
  console.log(`📊 Found ${imageFiles.length} images to check\n`)

  // Process each image
  for (let i = 0; i < imageFiles.length; i++) {
    const filePath = imageFiles[i]
    const fileSize = getFileSize(filePath)
    
    process.stdout.write(`[${i + 1}/${imageFiles.length}] `)
    
    if (fileSize > MAX_FILE_SIZE) {
      // Create output path in _compressed folder
      const relativePath = path.relative(publicDir, filePath)
      const outputPath = path.join(COMPRESSED_DIR, relativePath)
      
      await compressImage(filePath, outputPath)
    } else {
      stats.skipped++
      console.log(`⏭️  Skipped (under limit): ${path.basename(filePath)}`)
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Compression Summary')
  console.log('='.repeat(50))
  console.log(`Total checked:  ${stats.checked}`)
  console.log(`✅ Compressed:  ${stats.compressed}`)
  console.log(`⏭️  Skipped:     ${stats.skipped}`)
  console.log(`❌ Errors:       ${stats.errors}`)
  console.log('='.repeat(50))
  
  if (stats.compressed > 0) {
    console.log(`\n📁 Compressed images saved to: ${COMPRESSED_DIR}`)
    console.log('\n💡 Next steps:')
    console.log('   1. Review compressed images')
    console.log('   2. Replace originals if quality is acceptable')
    console.log('   3. Or upload compressed versions to Cloudinary')
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})

