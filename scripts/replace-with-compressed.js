/**
 * Replace original images with compressed versions
 * 
 * This script copies compressed images from _compressed folder to replace originals
 */

const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '..', 'public')
const compressedDir = path.join(publicDir, '_compressed')

function copyCompressedFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    return
  }

  const files = fs.readdirSync(sourceDir)

  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file)
    const targetPath = path.join(targetDir, file)
    const stat = fs.statSync(sourcePath)

    if (stat.isDirectory()) {
      // Recursively copy subdirectories
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true })
      }
      copyCompressedFiles(sourcePath, targetPath)
    } else {
      // Copy file (WebP files will replace PNG originals)
      try {
        // For WebP files, also check if there's a PNG original to replace
        if (file.endsWith('.webp')) {
          const pngOriginal = targetPath.replace('.webp', '.png')
          if (fs.existsSync(pngOriginal)) {
            console.log(`📝 Replacing: ${path.relative(publicDir, pngOriginal)} → ${file}`)
            // Keep the WebP version, optionally delete PNG
            // fs.unlinkSync(pngOriginal) // Uncomment to delete PNG originals
          }
        }
        
        fs.copyFileSync(sourcePath, targetPath)
        console.log(`✅ Copied: ${path.relative(publicDir, targetPath)}`)
      } catch (error) {
        console.error(`❌ Error copying ${file}:`, error.message)
      }
    }
  })
}

function main() {
  console.log('📋 Replace Originals with Compressed Versions')
  console.log('============================================\n')

  if (!fs.existsSync(compressedDir)) {
    console.error('❌ Compressed folder not found! Run compression script first.')
    process.exit(1)
  }

  console.log('Copying compressed images to replace originals...\n')
  copyCompressedFiles(compressedDir, publicDir)

  console.log('\n✅ Done! Original images have been replaced with compressed versions.')
  console.log('\n💡 Note: WebP files are in _compressed folder.')
  console.log('   You may want to update your code to use .webp extensions,')
  console.log('   or rename them back to .png if needed.')
}

main()




