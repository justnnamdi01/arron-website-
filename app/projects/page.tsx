import type { Metadata } from 'next'

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

import { ProjectGallery } from '@/components/project-gallery'

export default function ProjectsPage() {
  return <ProjectGallery />
}
