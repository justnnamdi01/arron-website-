# Cloudinary Upload Scripts

## Quick Start

### 1. Install Cloudinary SDK
```bash
npm install cloudinary
```

### 2. Get Your Credentials

1. Go to https://cloudinary.com/console
2. Copy your:
   - **Cloud Name** (e.g., `dxy8cqt6k`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

### 3. Set Environment Variables (Recommended)

Create `.env.local` in the project root:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Or set them directly in the script (see `upload-to-cloudinary.js`)

### 4. Run the Script

```bash
node scripts/upload-to-cloudinary.js
```

## What It Does

- ✅ Scans `public/project pages/` and uploads all images
- ✅ Scans `public/logo/` and uploads logos
- ✅ Scans `public/portfolio/` and uploads portfolio images
- ✅ Scans `public/Project 1/`, `Project 2/`, `Project 3/` folders
- ✅ Automatically converts paths (spaces → hyphens, lowercase)
- ✅ Skips existing images (unless `overwrite: true`)
- ✅ Shows progress and summary

## Configuration

Edit `scripts/upload-to-cloudinary.js`:

```javascript
const CONFIG = {
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
  folder: 'enou-architecture', // Base folder in Cloudinary
  overwrite: false, // Set true to overwrite existing
}
```

## Output

Images will be uploaded to Cloudinary with this structure:
```
enou-architecture/
  ├── project-pages/
  │   ├── koto/
  │   │   ├── 1
  │   │   ├── 2
  │   │   └── ...
  │   ├── dôtû-villa/
  │   └── ...
  ├── logo/
  │   ├── logo
  │   └── rh-logo
  └── portfolio/
      └── ...
```

## Troubleshooting

**"Please update CONFIG with your Cloudinary credentials"**
- Make sure you've set the environment variables or updated the CONFIG object

**"Rate limit exceeded"**
- The script has a 100ms delay between uploads
- If you have many images, you may need to increase the delay

**"File not found"**
- Check that your `public/` folder structure matches what the script expects

**Images not showing after upload**
- Verify your `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` matches your cloud name
- Check that image paths in code match Cloudinary folder structure









