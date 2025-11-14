export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalService",
    "name": "Architecture Studio",
    "description": "Professional architecture studio specializing in innovative design and sustainable construction",
    "url": "https://yourarchitecturestudio.com",
    "logo": "https://yourarchitecturestudio.com/logo/logo.png",
    "image": "https://yourarchitecturestudio.com/og-image.jpg",
    "telephone": "+1-555-0123",
    "email": "info@yourarchitecturestudio.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Design Street",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "serviceType": ["Architectural Design", "Construction Planning", "Interior Design", "Renovation"],
    "areaServed": "Your City and surrounding areas"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}



