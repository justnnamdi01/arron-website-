/**
 * Cloudinary Image CDN Configuration
 * 
 * Free tier includes:
 * - 25GB storage
 * - 25GB bandwidth/month
 * - Automatic image optimization
 * - Global CDN
 * 
 * Sign up at: https://cloudinary.com/users/register/free
 * Get your credentials from: https://cloudinary.com/console
 */

// Your Cloudinary cloud name (e.g., "your-cloud-name")
// Get this from your Cloudinary dashboard
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'

/**
 * Generate optimized Cloudinary image URL
 * 
 * @param imagePath - Path to image in Cloudinary (e.g., "project-pages/KOTO/1.jpg")
 * @param width - Desired width (optional, for responsive images)
 * @param height - Desired height (optional)
 * @param quality - Image quality (1-100, default: 85)
 * @param format - Output format: 'auto' (best), 'webp', 'avif', 'jpg', 'png'
 */
export function getCloudinaryUrl(
  imagePath: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'thumb'
  } = {}
): string {
  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    crop = 'fill'
  } = options

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath

  // Build transformation string
  const transformations: string[] = []
  
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop) transformations.push(`c_${crop}`)
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)

  const transformString = transformations.join(',')
  
  // Construct Cloudinary URL
  // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{image_path}
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${cleanPath}`
}

/**
 * Helper for Next.js Image component
 * Returns the src and srcSet for responsive images
 */
export function getCloudinaryImageProps(
  imagePath: string,
  baseWidth?: number
) {
  const baseUrl = getCloudinaryUrl(imagePath, {
    width: baseWidth,
    quality: 85,
    format: 'auto',
    crop: 'fill'
  })

  // Generate srcSet for responsive images
  const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  const srcSet = widths
    .filter(w => !baseWidth || w <= baseWidth)
    .map(w => {
      const url = getCloudinaryUrl(imagePath, {
        width: w,
        quality: 85,
        format: 'auto',
        crop: 'fill'
      })
      return `${url} ${w}w`
    })
    .join(', ')

  return {
    src: baseUrl,
    srcSet,
    blurDataURL: getCloudinaryUrl(imagePath, {
      width: 20,
      quality: 20,
      format: 'auto',
      crop: 'fill'
    })
  }
}







