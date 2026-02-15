// =============================================================================
// Hero Section Component (Updated)
// =============================================================================
// The big headline area at the top of the homepage.
// Now includes a trust stat line showing how many programs are listed.
// =============================================================================

interface HeroSectionProps {
  vppCount?: number
  stateCount?: number
}

export default function HeroSection({ vppCount = 12, stateCount = 10 }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Turn Your Home Battery Into a Money-Making Machine
        </h1>

        {/* VPP explanation */}
        <p className="text-lg md:text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
          A <strong>Virtual Power Plant (VPP)</strong> connects your home battery
          to the energy grid. When the grid needs extra power, your battery helps
          out — and <strong>you get paid</strong>.
        </p>

        {/* Call to action */}
        <p className="text-blue-200 max-w-xl mx-auto mb-6">
          Whether you already have a battery or are looking to buy one,
          find the best VPP program and start earning.
        </p>

        {/* Trust stat */}
        <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-600 rounded-full px-5 py-2">
          <span className="text-blue-200 text-sm">
            Comparing <strong className="text-white">{vppCount}</strong> VPP programs
            across <strong className="text-white">{stateCount}</strong> states
          </span>
        </div>
      </div>
    </section>
  )
}
