# Vercel Deployment Guide

This guide will help you deploy your Arron Architecture website to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier available)
2. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Node.js installed locally (for testing)

## Project Configuration

Your project has been configured for Vercel deployment with the following changes:

### ✅ Files Updated/Created:

1. **next.config.mjs** - Optimized for Vercel with:
   - Removed static export mode to enable SSR and API routes
   - Enabled image optimization (Vercel's built-in feature)
   - Added security headers
   - Configured compression

2. **vercel.json** - Vercel-specific configuration:
   - Build and dev commands
   - Custom headers for security
   - Region configuration (defaults to US East)

3. **.gitignore** - Updated to exclude:
   - Vercel deployment files
   - Environment variables
   - IDE-specific files

4. **env.example** - Template for environment variables
   - Copy to `.env.local` for local development
   - Set environment variables in Vercel dashboard for production

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to Git:**
   ```bash
   git init
   git add .
   git commit -m "Prepare for Vercel deployment"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git repository
   - Vercel will auto-detect Next.js settings

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `arron-website-` (if not at root)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables (if needed):**
   - Click "Environment Variables"
   - Add variables from `env.example`:
     - `NEXT_PUBLIC_SITE_URL`
     - `NEXT_PUBLIC_CONTACT_EMAIL`
     - `NEXT_PUBLIC_WHATSAPP_NUMBER`
     - etc.

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-5 minutes for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd arron-website-
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No (first time)
   - Project name? (default or custom)
   - Directory? `./` (current directory)

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Post-Deployment Configuration

### Custom Domain

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

### Environment Variables

Add/update environment variables in Vercel Dashboard:
- Project Settings → Environment Variables
- Add variables for Production, Preview, and Development environments

### Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Compression

### Analytics (Optional)

Enable Vercel Analytics:
1. Go to project dashboard
2. Click "Analytics" tab
3. Enable Web Analytics (free tier available)

## Continuous Deployment

Once connected to Git, Vercel automatically:
- Deploys on every push to `main` branch (production)
- Creates preview deployments for pull requests
- Provides unique URLs for each deployment

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### Environment Variables Not Working

1. Ensure variables start with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding/updating variables
3. Check variable names match exactly

### Images Not Loading

1. Verify image paths are correct
2. Check `next.config.mjs` image configuration
3. Ensure images are in `public` folder or use absolute URLs

### 404 Errors

1. Check file structure matches Next.js conventions
2. Verify routing in `app` directory
3. Check `vercel.json` rewrites configuration

## Local Development

Test locally before deploying:

```bash
cd arron-website-
npm install
npm run dev
```

Visit `http://localhost:3000` to preview.

## Build Locally

Test production build:

```bash
npm run build
npm start
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)

## Support

If you encounter issues:
1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review [Vercel Community](https://github.com/vercel/vercel/discussions)
3. Contact Vercel Support (paid plans)

---

**Note:** This project is configured for optimal Vercel deployment. The configuration supports:
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- API Routes (if added)
- Image Optimization
- Automatic Code Splitting
- Edge Functions (if needed)

Happy deploying! 🚀

