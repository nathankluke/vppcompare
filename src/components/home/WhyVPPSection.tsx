// =============================================================================
// Why VPP Section Component (Compact)
// =============================================================================
// Explains WHY Virtual Power Plants matter — compressed into a slim horizontal
// strip to get users to the interactive section faster.
// =============================================================================

export default function WhyVPPSection() {
  const benefits = [
    { icon: '\u26A1', iconBg: 'bg-amber-100 text-amber-700', title: 'Prevent Blackouts', desc: 'Your battery helps meet peak demand.' },
    { icon: '$', iconBg: 'bg-emerald-100 text-emerald-700', title: 'Earn $300\u20131,500+/yr', desc: 'Get paid to support the grid.' },
    { icon: '\u2600', iconBg: 'bg-green-100 text-green-700', title: 'Clean Energy', desc: 'Replace dirty peaker plants.' },
    { icon: '\u2193', iconBg: 'bg-blue-100 text-blue-700', title: 'Lower Bills', desc: 'Reduced peak stress saves everyone money.' },
  ]

  return (
    <section className="py-5 md:py-6 px-4 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 p-2 md:p-3">
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${b.iconBg}`}>
                {b.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 leading-tight">{b.title}</p>
                <p className="text-xs text-slate-500 leading-snug mt-0.5 hidden sm:block">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
