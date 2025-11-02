# Hostinger Deployment Guide for Architecture Website

## Prerequisites
1. **Hostinger Account**: Premium or Business hosting plan (supports Node.js)
2. **Domain**: Your domain should be pointed to Hostinger nameservers
3. **File Manager Access**: Through Hostinger hPanel

## Deployment Methods

### Method 1: Static Export (Recommended for Hostinger)

1. **Prepare Static Build**:
   ```bash
   npm run build
   npm run export
   ```

2. **Upload Files**:
   - Access Hostinger File Manager
   - Navigate to `public_html` folder
   - Upload contents of `out` folder (not the folder itself)
   - Ensure `index.html` is in the root of `public_html`

### Method 2: Node.js Hosting (If Available)

1. **Check Node.js Support**:
   - Login to hPanel
   - Check if Node.js is available in your hosting plan
   - If available, create a Node.js app

2. **Upload Project**:
   - Upload entire project folder
   - Install dependencies: `npm install`
   - Build project: `npm run build`
   - Start application: `npm start`

## File Structure for Upload

```
public_html/
├── _next/
│   ├── static/
│   └── ...
├── admin/
│   └── index.html
├── public/
│   ├── Project 1/
│   ├── Project 2/
│   ├── Project 3/
│   ├── portfolio/
│   └── placeholder images
├── index.html
└── other static files
```

## Important Notes

1. **Image Paths**: All images are in `/public` folder and will work with static export
2. **Admin Dashboard**: Will work as static files with localStorage
3. **Chat System**: Uses localStorage, no server required
4. **Contact Forms**: Currently store data locally (consider adding form service)

## DNS Configuration

1. **A Record**: Point your domain to Hostinger's server IP
2. **CNAME**: Add `www` subdomain if needed
3. **SSL**: Enable SSL certificate in hPanel

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All images display properly
- [ ] Navigation works smoothly
- [ ] Contact forms function
- [ ] Admin dashboard accessible
- [ ] Chat system operates
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active

## Optimization Tips

1. **Gzip Compression**: Enable in hPanel
2. **CDN**: Use Hostinger's CDN if available
3. **Caching**: Set browser caching rules
4. **Monitoring**: Set up uptime monitoring

## Troubleshooting

- **404 Errors**: Check file paths and ensure trailing slashes
- **Images Not Loading**: Verify image paths and file permissions
- **Slow Loading**: Enable compression and optimize images
- **Mobile Issues**: Test responsive design on multiple devices

## Support

For technical issues:
- Hostinger Support: Available 24/7
- Documentation: Check Hostinger knowledge base
- Community: Hostinger community forums
