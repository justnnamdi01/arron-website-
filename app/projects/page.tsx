import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProjectGalleryGSAP } from '@/components/project-gallery-gsap'

export const metadata: Metadata = {
  title: 'Our Projects - Architecture Portfolio',
  description: 'Explore our portfolio of award-winning architectural projects including residential homes, commercial buildings, and sustainable designs.',
  keywords: ['architecture portfolio', 'residential design', 'commercial architecture', 'sustainable buildings'],
  openGraph: {
    title: 'Our Projects - Architecture Portfolio',
    description: 'Explore our portfolio of award-winning architectural projects',
    images: ['/projects-og.jpg'],
  },
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-600 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-300">Loading projects...</p>
        </div>
      </div>
    }>
      <ProjectGalleryGSAP />
    </Suspense>
  )
}
