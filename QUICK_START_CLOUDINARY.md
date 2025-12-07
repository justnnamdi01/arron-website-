# 🚀 Quick Start: Cloudinary Image CDN (5 Minutes)

## Why Cloudinary?

- ✅ **FREE**: 25GB storage + 25GB bandwidth/month
- ✅ **Faster**: Global CDN serves images from edge servers
- ✅ **Automatic**: WebP/AVIF optimization, automatic resizing
- ✅ **Easy**: Works with Next.js Image component

## ⚡ Quick Setup (5 Steps)

### 1. Sign Up (1 minute)
- Go to: https://cloudinary.com/users/register/free
- Sign up with email
- Verify email

### 2. Get Cloud Name (30 seconds)
- After login, you'll see your **Cloud Name** at the top of dashboard
- Example: `dxy8cqt6k` or `enou-architecture`
- Copy it!

### 3. Add to Environment (30 seconds)
Create/update `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
NEXT_PUBLIC_USE_CLOUDINARY=true
```

### 4. Upload Images (2 minutes)

**Option A: Dashboard Upload (Easiest)**
1. Go to https://cloudinary.com/console
2. Click **Media Library** → **Upload**
3. Create folder: `project-pages`
4. Upload your images maintaining folder structure:
   - `project-pages/KOTO/1.jpg`
   - `project-pages/KOTO/2.jpg`
   - etc.

**Option B: Bulk Upload Script (Recommended)**

A complete upload script is ready for you!

1. Install Cloudinary SDK:
```bash
npm install cloudinary
```

2. Get your credentials from https://cloudinary.com/console:
   - Cloud Name
   - API Key  
   - API Secret

3. Add to `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. Run the script:
```bash
node scripts/upload-to-cloudinary.js
```

The script will:
- ✅ Upload all images from `public/project pages/`
- ✅ Upload logos from `public/logo/`
- ✅ Upload portfolio images
- ✅ Show progress and summary
- ✅ Skip existing images (no duplicates)

See `scripts/README.md` for detailed instructions.

### 5. Update Code (1 minute)

**Before:**
```tsx
images: [
  "/project pages/KOTO/1.jpg",
]
```

**After:**
```tsx
import { getImageSrc } from '@/lib/image-helper'

images: [
  getImageSrc("/project pages/KOTO/1.jpg", { width: 800, quality: 85 }),
]
```

That's it! Images will now load from Cloudinary CDN.

## 📝 Example: Update Portfolio Component

In `components/parallax-section-gsap.tsx`:

```tsx
import { getImageSrc } from '@/lib/image-helper'

const portfolioProjects = [
  {
    id: 1,
    title: "KOTO Villa",
    images: [
      getImageSrc("/project pages/KOTO/1.jpg", { width: 800 }),
      getImageSrc("/project pages/KOTO/2.jpg", { width: 800 }),
      // ... etc
    ],
  },
  // ...
]
```

## 🎯 Benefits You'll See

- **Faster page loads**: Images served from CDN
- **Better Lighthouse scores**: Improved performance metrics
- **Automatic optimization**: WebP/AVIF formats
- **Responsive images**: Automatic resizing for different screens

## 🔄 Toggle On/Off

To switch back to local images:
```env
NEXT_PUBLIC_USE_CLOUDINARY=false
```

## 📚 Full Documentation

See `CLOUDINARY_SETUP.md` for detailed instructions.

## ❓ Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Dashboard: https://cloudinary.com/console

