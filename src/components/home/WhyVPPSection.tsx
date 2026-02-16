// =============================================================================
// Why VPP Section Component
// =============================================================================
// Explains WHY Virtual Power Plants matter — inspired by Octopus Energy's
// "Why is this program important" messaging.
//
// Four benefit cards with clean styled icons (no emojis).
// =============================================================================

export default function WhyVPPSection() {
  const benefits = [
    {
      iconBg: 'bg-amber-100 text-amber-700',
      iconChar: '\u26A1',
      title: 'Prevent Blackouts',
      description:
        'During extreme heat or cold, the grid gets overwhelmed. Your battery helps meet peak demand and keeps the lights on for your community.',
    },
    {
      iconBg: 'bg-emerald-100 text-emerald-700',
      iconChar: '$',
      title: 'Earn Money',
      description:
        'Get paid $300\u20131,500+ per year just by letting your battery help the grid when it needs it most. Some programs also offer big upfront rebates.',
    },
    {
      iconBg: 'bg-green-100 text-green-700',
      iconChar: '\u2600',
      title: 'Clean Energy',
      description:
        'VPPs replace expensive, dirty gas "peaker" plants that only run during peak demand. Your battery is the cleaner, cheaper alternative.',
    },
    {
      iconBg: 'bg-blue-100 text-blue-700',
      iconChar: '\u2193',
      title: 'Lower Everyone\'s Bills',
      description:
        'When batteries reduce peak grid stress, utility companies spend less on emergency power \u2014 savings that get passed to all ratepayers.',
    },
  ]

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-3">
          Why Virtual Power Plants Matter
        </h2>
        <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto">
          Your home battery is more than backup power. Connected to a VPP,
          it becomes part of a distributed energy network that benefits everyone.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100
                         hover:border-blue-200 hover:shadow-sm transition-all duration-200"
            >
              <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold ${benefit.iconBg}`}>
                {benefit.iconChar}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
