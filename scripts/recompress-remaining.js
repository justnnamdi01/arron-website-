/**
 * Re-compress files that are still over 10MB after initial compression
 * 
 * This script handles the Image.png file that's still 20.48MB
 */

const fs = require('fs')
const path = require('path')

let sharp
try {
  sharp = require('sharp')
} catch (error) {
  console.error('❌ Error: sharp is not installed!')
  console.error('   Install it with: npm install sharp')
  process.exit(1)
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const COMPRESSED_DIR = path.join(__dirname, '..', 'public', '_compressed')

// Files that are still too large
const largeFiles = [
  'project pages/DÔTÛ VILLA/Image.png', // 20.48MB after first compression
]

async function recompressFile(relativePath) {
  const originalPath = path.join(__dirname, '..', 'public', relativePath)
  const compressedPath = path.join(COMPRESSED_DIR, relativePath)
  
  if (!fs.existsSync(originalPath)) {
    console.log(`⚠️  File not found: ${originalPath}`)
    return false
  }

  const originalSize = fs.statSync(originalPath).size
  console.log(`\n🗜️  Re-compressing: ${relativePath}`)
  console.log(`   Original size: ${(originalSize / 1024 / 1024).toFixed(2)}MB`)

  // Ensure output directory exists
  const outputDir = path.dirname(compressedPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Try multiple compression strategies
  const strategies = [
    // Strategy 1: Convert PNG to WebP with aggressive compression
    {
      name: 'WebP (quality 70)',
      fn: async () => {
        const webpPath = compressedPath.replace('.png', '.webp')
        await sharp(originalPath)
          .webp({ quality: 70 })
          .toFile(webpPath)
        return webpPath
      }
    },
    // Strategy 2: Resize if very large dimensions
    {
      name: 'Resize + WebP',
      fn: async () => {
        const metadata = await sharp(originalPath).metadata()
        const maxDimension = 3000 // Max width or height
        
        let width = metadata.width
        let height = metadata.height
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            width = maxDimension
            height = Math.round((metadata.height / metadata.width) * maxDimension)
          } else {
            height = maxDimension
            width = Math.round((metadata.width / metadata.height) * maxDimension)
          }
        }
        
        const webpPath = compressedPath.replace('.png', '.webp')
        await sharp(originalPath)
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(webpPath)
        return webpPath
      }
    },
    // Strategy 3: Very aggressive PNG compression
    {
      name: 'PNG (aggressive)',
      fn: async () => {
        await sharp(originalPath)
          .png({ 
            quality: 60,
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: true
          })
          .toFile(compressedPath)
        return compressedPath
      }
    }
  ]

  let bestSize = Infinity
  let bestPath = null

  for (const strategy of strategies) {
    try {
      const outputPath = await strategy.fn()
      const size = fs.statSync(outputPath).size
      
      console.log(`   ${strategy.name}: ${(size / 1024 / 1024).toFixed(2)}MB`)
      
      if (size < bestSize) {
        // Delete previous best if it exists and is different
        if (bestPath && bestPath !== outputPath && fs.existsSync(bestPath)) {
          fs.unlinkSync(bestPath)
        }
        bestSize = size
        bestPath = outputPath
      } else {
        // Delete this attempt if it's not the best
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath)
        }
      }
    } catch (error) {
      console.log(`   ❌ ${strategy.name} failed: ${error.message}`)
    }
  }

  if (bestPath && bestSize <= MAX_FILE_SIZE) {
    console.log(`   ✅ Success! Final size: ${(bestSize / 1024 / 1024).toFixed(2)}MB`)
    return true
  } else if (bestPath) {
    console.log(`   ⚠️  Best attempt: ${(bestSize / 1024 / 1024).toFixed(2)}MB (still over limit)`)
    console.log(`   💡 Consider: Manual compression with TinyPNG or upgrade Cloudinary plan`)
    return false
  } else {
    console.log(`   ❌ All compression strategies failed`)
    return false
  }
}

async function main() {
  console.log('🗜️  Re-compress Large Files')
  console.log('===========================\n')

  for (const file of largeFiles) {
    await recompressFile(file)
  }

  console.log('\n✅ Done! Check the _compressed folder for results.')
}

main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})






