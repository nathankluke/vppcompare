// =============================================================================
// Hero Section Component
// =============================================================================
// The big headline area at the top of the homepage.
// Explains what a VPP is and encourages users to enter their details below.
// =============================================================================

export default function HeroSection() {
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
        <p className="text-blue-200 max-w-xl mx-auto">
          Enter your details below to find VPP programs in your area and see how
          much you could earn.
        </p>
      </div>
    </section>
  )
}
