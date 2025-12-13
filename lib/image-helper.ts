/**
 * Image Helper Utility
 * 
 * Use this to easily switch between local and Cloudinary images
 * Set USE_CLOUDINARY=true in .env.local to enable Cloudinary
 */

import { getCloudinaryUrl, getCloudinaryImageProps } from './cloudinary'

const USE_CLOUDINARY = process.env.NEXT_PUBLIC_USE_CLOUDINARY === 'true'

/**
 * Convert local image path to Cloudinary path
 * Example: "/project pages/KOTO/1.jpg" → "project-pages/KOTO/1.jpg"
 */
function toCloudinaryPath(localPath: string): string {
  return localPath
    .replace(/^\//, '') // Remove leading slash
    .replace(/ /g, '-') // Replace spaces with hyphens
    .toLowerCase() // Cloudinary prefers lowercase
}

/**
 * Get image source - automatically uses Cloudinary if enabled
 * 
 * @param localPath - Local image path (e.g., "/project pages/KOTO/1.jpg")
 * @param options - Cloudinary transformation options
 */
export function getImageSrc(
  localPath: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  } = {}
): string {
  if (USE_CLOUDINARY && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    const cloudinaryPath = toCloudinaryPath(localPath)
    return getCloudinaryUrl(cloudinaryPath, {
      ...options,
      crop: 'fill'
    })
  }
  
  // Fallback to local path
  return localPath
}

/**
 * Get responsive image props for Next.js Image component
 */
export function getResponsiveImageProps(
  localPath: string,
  baseWidth?: number
) {
  if (USE_CLOUDINARY && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    const cloudinaryPath = toCloudinaryPath(localPath)
    return getCloudinaryImageProps(cloudinaryPath, baseWidth)
  }
  
  // Fallback to local
  return {
    src: localPath,
    srcSet: undefined,
    blurDataURL: undefined
  }
}

/**
 * Batch convert image paths (useful for migration)
 */
export function convertImagePaths(
  images: string[],
  options?: { width?: number; quality?: number }
): string[] {
  return images.map(img => getImageSrc(img, options))
}









