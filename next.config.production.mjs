const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '' : '',
  basePath: '',
  env: {
    CUSTOM_KEY: 'value',
  },
}

module.exports = nextConfig
