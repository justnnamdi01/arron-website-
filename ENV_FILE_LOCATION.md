# 📍 Where to Create `.env.local`

## Location

Create `.env.local` in the **root directory** of your project, at the same level as:
- `package.json`
- `next.config.mjs`
- `env.example`
- `app/` folder
- `components/` folder
- `public/` folder

## Visual Structure

```
arron-website-/
│
├── .env.local          ← CREATE THIS FILE HERE
├── .env.example        ← Template file (already exists)
├── .gitignore         ← Should ignore .env.local
│
├── package.json
├── next.config.mjs
├── tsconfig.json
│
├── app/
├── components/
├── public/
├── lib/
└── scripts/
```

## How to Create It

### Option 1: Copy from Template (Recommended)
```bash
# In the project root directory
cp env.example .env.local
```

### Option 2: Create Manually
1. Open your code editor
2. In the root directory (`arron-website-/`), create a new file
3. Name it exactly: `.env.local` (with the dot at the beginning)
4. Add your environment variables

## What to Put Inside

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
NEXT_PUBLIC_USE_CLOUDINARY=true

# For the upload script
CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here

# Site Configuration (if needed)
NEXT_PUBLIC_SITE_URL=https://www.enou.mu
```

## Important Notes

✅ **`.env.local` is already in `.gitignore`** - it won't be committed to GitHub  
✅ **Never commit `.env.local`** - it contains sensitive credentials  
✅ **Use `.env.example`** as a template for what variables are needed  
✅ **Restart your dev server** after creating/updating `.env.local`

## Verify It's in the Right Place

Run this command in the project root:
```bash
# Windows PowerShell
Test-Path .env.local

# Should return: True
```

Or check that these files are in the same directory:
- `.env.local` (your file)
- `package.json`
- `next.config.mjs`

## Troubleshooting

**"Environment variable not found"**
- Make sure `.env.local` is in the root directory (not in `app/` or `components/`)
- Restart your dev server: `npm run dev`
- Check variable names start with `NEXT_PUBLIC_` for client-side access

**"File not showing in VS Code"**
- Files starting with `.` are hidden by default
- In VS Code: View → Show Hidden Files
- Or use: `Ctrl+Shift+P` → "Files: Toggle Excluded Files"









