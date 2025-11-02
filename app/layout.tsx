import type { Metadata } from 'next'
import './globals.css'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourarchitecturestudio.com'),
  title: {
    default: 'Architecture Studio - Award-Winning Design & Construction',
    template: '%s | Architecture Studio'
  },
  description: 'Award-winning architecture studio specializing in innovative residential and commercial design, sustainable planning, and collaborative construction processes. Transform your vision into reality.',
  keywords: [
    'architecture', 'architect', 'design', 'construction', 'planning', 
    'sustainable', 'residential', 'commercial', 'renovation', 'blueprint',
    'building design', 'interior design', 'urban planning', 'green building'
  ],
  authors: [{ name: 'Architecture Studio', url: 'https://yourarchitecturestudio.com' }],
  creator: 'Architecture Studio',
  publisher: 'Architecture Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourarchitecturestudio.com',
    title: 'Architecture Studio - Award-Winning Design & Construction',
    description: 'Award-winning architecture studio specializing in innovative design, sustainable planning, and collaborative construction processes.',
    siteName: 'Architecture Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Architecture Studio - Professional Design Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Studio - Award-Winning Design & Construction',
    description: 'Award-winning architecture studio specializing in innovative design, sustainable planning, and collaborative construction processes.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <script 
          src="https://www.paypal.com/sdk/js?client-id=BAAsAQjpG3WNujNZdfd1rmCvM5yCkybWecO5JbRZpdvckCc_gelDAaB8eKRp-d3FS_DdlODfqK8dK-m_V4&components=hosted-buttons&disable-funding=venmo&currency=USD"
          async
        ></script>
        <style>{`
          html {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  )
}
