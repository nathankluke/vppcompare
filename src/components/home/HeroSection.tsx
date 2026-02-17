// =============================================================================
// Hero Section Component (Compact)
// =============================================================================
// The headline area at the top of the homepage.
// Compressed to get users to the interactive section faster.
// =============================================================================

interface HeroSectionProps {
  vppCount?: number
  stateCount?: number
}

export default function HeroSection({ vppCount = 12, stateCount = 10 }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-10 md:py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
          Keep the Lights On. Get Paid for It.
        </h1>

        {/* VPP explanation — single concise paragraph */}
        <p className="text-base md:text-lg text-blue-100 mb-3 max-w-2xl mx-auto">
          A <strong>Virtual Power Plant (VPP)</strong> connects your home battery
          to the grid. When demand spikes, your battery helps out — and <strong>you get paid</strong>.
        </p>

        {/* Trust stat */}
        <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-600 rounded-full px-4 py-1.5">
          <span className="text-blue-200 text-sm">
            Comparing <strong className="text-white">{vppCount}</strong> programs
            across <strong className="text-white">{stateCount}</strong> states
          </span>
        </div>
      </div>
    </section>
  )
}
