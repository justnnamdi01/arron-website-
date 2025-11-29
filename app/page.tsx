import { ParallaxSectionGSAP } from "@/components/parallax-section-gsap"
import { Header } from "@/components/header"
import { HeroVideo } from "@/components/hero-video"
import { ProjectSlideshow } from "@/components/project-slideshow"
import { VideoSection } from "@/components/video-section"

import { FloorPlanSection } from "@/components/floor-plan-section"
import { ReviewsSectionGSAP } from "@/components/reviews-section-gsap"
import { ArchitectProfile } from "@/components/architect-profile"

import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { ChatButton } from "@/components/chat-button"
import { ArchitectureStudioVideo } from "@/components/architecture-studio-video"
import { PaymentSection } from "@/components/payment-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Hero Video Section */}
      <HeroVideo />
      
      {/* Parallax Section with Architectural Planning - GSAP Enhanced */}
      <ParallaxSectionGSAP />
      
      {/* Architecture Studio Video Section */}
      <ArchitectureStudioVideo />
      
      {/* Project Slideshow */}
      <ProjectSlideshow />
      
      {/* Video Section */}
      <VideoSection />



      {/* Floor Plan Section */}
      <FloorPlanSection />



      {/* Reviews Section - GSAP Enhanced */}
      <ReviewsSectionGSAP />

      {/* Architect Profile Section */}
      <ArchitectProfile />

      {/* FAQ Section */}
      <FAQSection />

      {/* Payment Section */}
      <PaymentSection />

      {/* Footer */}
      <Footer />
      
      {/* Chat Button - Global */}
      <ChatButton />
    </main>
  )
}
