import type { Metadata } from 'next'
import './globals.css'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'

export const metadata: Metadata = {
  metadataBase: new URL('https://enou-architecture.com'),
  title: {
    default: "Enou Architecture Studio – Residential & Commercial Design",
    template: '%s | Enou Architecture Studio',
  },
  description:
    'Enou Architecture Studio crafts bespoke residential and commercial spaces, blending modern design, timeless elegance, and sustainable thinking to bring your vision to life.',
  keywords: [
    'Enou architecture',
    'architecture studio',
    'architect',
    'residential design',
    'commercial architecture',
    'modern villa design',
    'interior architecture',
    'Mauritius architect',
    'African architecture studio',
    'sustainable architecture',
    'luxury home design',
    '3D visualization',
  ],
  authors: [{ name: 'Enou Architecture Studio', url: 'https://enou-architecture.com' }],
  creator: 'Enou Architecture Studio',
  publisher: 'Enou Architecture Studio',
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
    url: 'https://enou-architecture.com',
    title: 'Enou Architecture Studio – Residential & Commercial Design',
    description:
      'Bespoke architecture studio creating contemporary homes, villas, and commercial spaces with a focus on craft, proportion, and lived experience.',
    siteName: 'Enou Architecture Studio',
    images: [
      {
        url: '/logo/LOGO.png',
        width: 800,
        height: 800,
        alt: 'Enou Architecture Studio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enou Architecture Studio – Residential & Commercial Design',
    description:
      'Explore Enou’s world of architecture – thoughtful residential and commercial projects with cinematic storytelling and refined detail.',
    images: ['/logo/LOGO.png'],
  },
  verification: {
    google: '',
    yandex: '',
  },
  icons: {
    icon: '/logo/LOGO.png',
    shortcut: '/logo/LOGO.png',
    apple: '/logo/LOGO.png',
  },
  alternates: {
    canonical: '/',
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
