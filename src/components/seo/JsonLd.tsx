// =============================================================================
// JSON-LD Structured Data Components
// =============================================================================
// Adds structured data for Google rich results:
//   - Organization schema (brand knowledge panel)
//   - WebSite schema (sitelinks search box)
//   - FAQPage schema (FAQ rich results in Google)
// =============================================================================

import { faqItems } from '@/lib/faqData'

// Organization + WebSite schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VPPcompare',
  legalName: 'VPPcompare LLC',
  url: 'https://vppcompare.com',
  logo: 'https://vppcompare.com/favicon.svg',
  description:
    'Independent comparison tool for Virtual Power Plant programs across the United States.',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@vppcompare.com',
    contactType: 'customer service',
  },
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VPPCompare',
  url: 'https://vppcompare.com',
  description:
    'Compare Virtual Power Plant programs, battery compatibility, and earnings across the US.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://vppcompare.com/compare?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

// FAQ schema — generated from the same data as the FAQ section
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
