# Cloudinary Image CDN Setup Guide

This guide will help you migrate your images to Cloudinary's free CDN for faster website performance.

## 🎯 Benefits

- **Free Tier**: 25GB storage + 25GB bandwidth/month
- **Global CDN**: Images served from edge servers worldwide
- **Automatic Optimization**: WebP, AVIF formats automatically
- **On-the-fly Resizing**: No need to pre-generate multiple sizes
- **Faster Load Times**: Reduces server load and improves Lighthouse scores

## 📋 Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up with your email (free account)
3. Verify your email
4. You'll be taken to your dashboard

## 🔑 Step 2: Get Your Cloud Name

1. In your Cloudinary dashboard, you'll see your **Cloud Name** at the top
2. It looks like: `dxy8cqt6k` or `your-company-name`
3. Copy this value

## ⚙️ Step 3: Configure Environment Variable

1. Open your `.env.local` file (create it if it doesn't exist)
2. Add your Cloudinary cloud name:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
```

Replace `your-cloud-name-here` with your actual cloud name from Step 2.

## 📤 Step 4: Upload Images to Cloudinary

### Option A: Upload via Dashboard (Small batches)

1. Go to https://cloudinary.com/console
2. Click **Media Library** → **Upload**
3. Drag and drop your images
4. Organize them in folders (e.g., `project-pages/KOTO/`, `logo/`)

### Option B: Upload via API (Bulk upload - Recommended)

Create a script to upload all your images at once:

```javascript
// upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

// Configure Cloudinary (get these from your dashboard)
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
})

// Upload images from public folder
async function uploadImages() {
  const publicDir = path.join(__dirname, 'public')
  
  // Upload project pages
  const projectPagesDir = path.join(publicDir, 'project pages')
  if (fs.existsSync(projectPagesDir)) {
    const folders = fs.readdirSync(projectPagesDir)
    
    for (const folder of folders) {
      const folderPath = path.join(projectPagesDir, folder)
      const files = fs.readdirSync(folderPath)
      
      for (const file of files) {
        const filePath = path.join(folderPath, file)
        const publicId = `project-pages/${folder}/${path.parse(file).name}`
        
        try {
          const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            folder: 'project-pages',
            resource_type: 'image'
          })
          console.log(`✅ Uploaded: ${publicId}`)
        } catch (error) {
          console.error(`❌ Error uploading ${file}:`, error)
        }
      }
    }
  }
  
  // Upload logos
  const logoDir = path.join(publicDir, 'logo')
  if (fs.existsSync(logoDir)) {
    const files = fs.readdirSync(logoDir)
    for (const file of files) {
      const filePath = path.join(logoDir, file)
      const publicId = `logo/${path.parse(file).name}`
      
      try {
        await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          folder: 'logo',
          resource_type: 'image'
        })
        console.log(`✅ Uploaded: ${publicId}`)
      } catch (error) {
        console.error(`❌ Error uploading ${file}:`, error)
      }
    }
  }
}

uploadImages()
```

To run this script:
```bash
npm install cloudinary
node upload-to-cloudinary.js
```

### Option C: Use Cloudinary Upload Widget (Easiest for beginners)

1. Go to https://cloudinary.com/console
2. Click **Media Library** → **Upload**
3. Create folders: `project-pages`, `logo`, etc.
4. Upload images maintaining the same folder structure

## 🔄 Step 5: Update Image Paths in Code

### Before (Local):
```tsx
<Image
  src="/project pages/KOTO/1.jpg"
  alt="KOTO Villa"
  fill
/>
```

### After (Cloudinary):
```tsx
import { getCloudinaryUrl } from '@/lib/cloudinary'

<Image
  src={getCloudinaryUrl('project-pages/KOTO/1.jpg', {
    width: 800,
    quality: 85,
    format: 'auto'
  })}
  alt="KOTO Villa"
  fill
/>
```

### For Responsive Images:
```tsx
import { getCloudinaryImageProps } from '@/lib/cloudinary'

const imageProps = getCloudinaryImageProps('project-pages/KOTO/1.jpg', 1920)

<Image
  src={imageProps.src}
  srcSet={imageProps.srcSet}
  alt="KOTO Villa"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
/>
```

## 📝 Step 6: Update Components

### Example: Update `parallax-section-gsap.tsx`

**Before:**
```tsx
images: [
  "/project pages/KOTO/1.jpg",
  "/project pages/KOTO/2.jpg",
]
```

**After:**
```tsx
import { getCloudinaryUrl } from '@/lib/cloudinary'

images: [
  getCloudinaryUrl('project-pages/KOTO/1.jpg', { width: 800, quality: 85 }),
  getCloudinaryUrl('project-pages/KOTO/2.jpg', { width: 800, quality: 85 }),
]
```

## 🚀 Step 7: Test & Deploy

1. Test locally: `npm run dev`
2. Verify images load from Cloudinary
3. Check browser DevTools → Network tab to see Cloudinary URLs
4. Deploy to Vercel

## 📊 Monitoring

- Check your Cloudinary dashboard for:
  - Storage usage
  - Bandwidth usage
  - Image transformations

## 💡 Tips

1. **Folder Structure**: Keep the same structure in Cloudinary as your local `public/` folder
2. **Image Naming**: Use lowercase, no spaces (e.g., `project-pages` not `project pages`)
3. **Lazy Loading**: Cloudinary works great with Next.js Image lazy loading
4. **Format Auto**: Use `format: 'auto'` to let Cloudinary choose the best format (WebP/AVIF)

## 🔗 Resources

- Cloudinary Docs: https://cloudinary.com/documentation
- Next.js Image Optimization: https://nextjs.org/docs/pages/api-reference/components/image
- Cloudinary Free Tier Limits: https://cloudinary.com/pricing

## ❓ Troubleshooting

**Images not loading?**
- Check your `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`
- Verify image paths match Cloudinary folder structure
- Check browser console for 404 errors

**Exceeded free tier?**
- Free tier: 25GB storage, 25GB bandwidth/month
- Upgrade to paid plan if needed, or optimize images further






