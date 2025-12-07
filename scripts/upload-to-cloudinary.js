/**
 * Bulk Upload Images to Cloudinary
 * 
 * This script uploads all images from your public folder to Cloudinary
 * 
 * Setup:
 * 1. npm install cloudinary dotenv
 * 2. Get your credentials from: https://cloudinary.com/console
 * 3. Add them to .env.local file in the project root
 * 4. Run: node scripts/upload-to-cloudinary.js
 */

const fs = require('fs')
const path = require('path')

// Load environment variables from .env.local (must be before other requires)
try {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })
} catch (error) {
  console.log('⚠️  dotenv not found. Install it with: npm install dotenv')
  console.log('   Or set environment variables manually in PowerShell\n')
}

const cloudinary = require('cloudinary').v2

// ============================================
// CONFIGURATION - Update these values!
// ============================================
const CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your-api-key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your-api-secret',
  
  // Upload options
  folder: 'enou-architecture', // Base folder in Cloudinary
  overwrite: false, // Set to true to overwrite existing images
  resource_type: 'image', // 'image', 'video', or 'raw'
  
  // Rate limiting (free tier: 10 uploads/sec, we'll be more conservative)
  delayBetweenUploads: 150, // milliseconds between uploads (6-7 per second)
  maxRetries: 3, // Number of retries for failed uploads
  retryDelay: 2000, // Delay before retrying (ms)
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: CONFIG.cloud_name,
  api_key: CONFIG.api_key,
  api_secret: CONFIG.api_secret,
})

// Statistics
const stats = {
  uploaded: 0,
  skipped: 0,
  errors: 0,
  total: 0,
}

/**
 * Convert local path to Cloudinary public_id
 * Example: "public/project pages/KOTO/1.jpg" → "enou-architecture/project-pages/KOTO/1"
 */
function toCloudinaryPath(filePath, baseDir) {
  const relativePath = path.relative(baseDir, filePath)
  const publicId = relativePath
    .replace(/\\/g, '/') // Windows path fix
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/\.[^/.]+$/, '') // Remove file extension
    .toLowerCase() // Cloudinary prefers lowercase
  
  return `${CONFIG.folder}/${publicId}`
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Upload a single file to Cloudinary with retry logic
 */
async function uploadFile(filePath, publicId, retryCount = 0) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`)
      stats.skipped++
      return null
    }

    // Check file size (Cloudinary free tier limit: 10MB)
    const fileSizeInBytes = fs.statSync(filePath).size
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024)
    if (fileSizeInMB > 10) {
      console.log(`⚠️  File too large (${fileSizeInMB.toFixed(2)}MB): ${path.basename(filePath)}`)
      stats.errors++
      return null
    }

    // Check if already exists (if overwrite is false)
    if (!CONFIG.overwrite) {
      try {
        const existing = await cloudinary.api.resource(publicId, {
          resource_type: CONFIG.resource_type
        })
        if (existing) {
          console.log(`⏭️  Skipped (exists): ${publicId}`)
          stats.skipped++
          return existing
        }
      } catch (error) {
        // Resource doesn't exist, continue with upload
      }
    }

    // Upload file
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: CONFIG.folder,
      resource_type: CONFIG.resource_type,
      overwrite: CONFIG.overwrite,
      // Optimization options
      quality: 'auto',
      fetch_format: 'auto', // Auto WebP/AVIF
      timeout: 60000, // 60 second timeout
    })

    console.log(`✅ Uploaded: ${publicId}`)
    stats.uploaded++
    return result
  } catch (error) {
    // Retry logic
    if (retryCount < CONFIG.maxRetries) {
      console.log(`⚠️  Upload failed, retrying (${retryCount + 1}/${CONFIG.maxRetries}): ${path.basename(filePath)}`)
      await sleep(CONFIG.retryDelay)
      return uploadFile(filePath, publicId, retryCount + 1)
    }
    
    console.error(`❌ Error uploading ${path.basename(filePath)}: ${error.message}`)
    stats.errors++
    return null
  }
}

/**
 * Recursively find all image files in a directory
 */
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      findImageFiles(filePath, fileList)
    } else {
      // Check if it's an image file
      const ext = path.extname(file).toLowerCase()
      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
      
      if (imageExts.includes(ext)) {
        fileList.push(filePath)
      }
    }
  })

  return fileList
}

/**
 * Upload all images from a directory
 */
async function uploadDirectory(localDir, cloudinaryBasePath = '') {
  console.log(`\n📁 Scanning: ${localDir}`)
  
  if (!fs.existsSync(localDir)) {
    console.error(`❌ Directory not found: ${localDir}`)
    return
  }

  const imageFiles = findImageFiles(localDir)
  stats.total = imageFiles.length

  console.log(`\n📊 Found ${imageFiles.length} images to upload\n`)

  // Upload files with a delay to avoid rate limits
  for (let i = 0; i < imageFiles.length; i++) {
    const filePath = imageFiles[i]
    const publicId = toCloudinaryPath(filePath, localDir)
    
    process.stdout.write(`[${i + 1}/${imageFiles.length}] `)
    await uploadFile(filePath, publicId)
    
    // Delay to avoid rate limiting (default: 150ms between uploads = ~6.5/sec)
    if (i < imageFiles.length - 1) {
      await sleep(CONFIG.delayBetweenUploads)
    }
  }
}

/**
 * Main upload function
 */
async function main() {
  console.log('🚀 Cloudinary Bulk Upload Script')
  console.log('================================\n')

  // Validate configuration
  if (CONFIG.cloud_name === 'your-cloud-name' || 
      CONFIG.api_key === 'your-api-key' || 
      CONFIG.api_secret === 'your-api-secret') {
    console.error('❌ ERROR: Please update CONFIG with your Cloudinary credentials!')
    console.error('\nGet them from: https://cloudinary.com/console')
    console.error('\nOr set environment variables:')
    console.error('  CLOUDINARY_CLOUD_NAME=your-cloud-name')
    console.error('  CLOUDINARY_API_KEY=your-api-key')
    console.error('  CLOUDINARY_API_SECRET=your-api-secret')
    process.exit(1)
  }

  const publicDir = path.join(__dirname, '..', 'public')
  
  // Upload project pages
  const projectPagesDir = path.join(publicDir, 'project pages')
  if (fs.existsSync(projectPagesDir)) {
    await uploadDirectory(projectPagesDir, 'project-pages')
  } else {
    console.log(`⚠️  Directory not found: ${projectPagesDir}`)
  }

  // Upload logos
  const logoDir = path.join(publicDir, 'logo')
  if (fs.existsSync(logoDir)) {
    await uploadDirectory(logoDir, 'logo')
  }

  // Upload portfolio images
  const portfolioDir = path.join(publicDir, 'portfolio')
  if (fs.existsSync(portfolioDir)) {
    await uploadDirectory(portfolioDir, 'portfolio')
  }

  // Upload project folders (Project 1, Project 2, etc.)
  const projectDirs = ['Project 1', 'Project 2', 'Project 3']
  projectDirs.forEach(projectDir => {
    const fullPath = path.join(publicDir, projectDir)
    if (fs.existsSync(fullPath)) {
      uploadDirectory(fullPath, `projects/${projectDir.toLowerCase().replace(/\s+/g, '-')}`)
    }
  })

  // Print summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Upload Summary')
  console.log('='.repeat(50))
  console.log(`Total files:     ${stats.total}`)
  console.log(`✅ Uploaded:     ${stats.uploaded}`)
  console.log(`⏭️  Skipped:      ${stats.skipped}`)
  console.log(`❌ Errors:       ${stats.errors}`)
  console.log('='.repeat(50))
  
  if (stats.errors > 0) {
    console.log('\n⚠️  Some files failed to upload. Check the errors above.')
    process.exit(1)
  } else {
    console.log('\n🎉 All images uploaded successfully!')
    console.log(`\nView them at: https://cloudinary.com/console/media_library/folders/${CONFIG.folder}`)
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})

