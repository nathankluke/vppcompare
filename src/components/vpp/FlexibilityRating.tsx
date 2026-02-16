// =============================================================================
// FlexibilityRating Component
// =============================================================================
// Shows a color-coded pill badge (High / Medium / Low) indicating how much
// control users have over their VPP participation. An info icon shows a
// tooltip on hover (desktop) or tap (mobile) with program-specific details.
//
// Rating criteria:
//   High   — Set backup reserve, opt out of events in-app, suspend anytime
//   Medium — Some control (email opt-out, fixed reserve) but not full in-app
//   Low    — Provider controls battery, limited opt-out, long commitments
// =============================================================================

'use client'

import { useState } from 'react'

interface FlexibilityRatingProps {
  rating: 'low' | 'medium' | 'high'
  details?: string | null
}

const RATING_CONFIG = {
  high: {
    label: 'High',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
  },
  medium: {
    label: 'Medium',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
  },
  low: {
    label: 'Low',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-600',
    dotColor: 'bg-slate-400',
  },
} as const

export default function FlexibilityRating({ rating, details }: FlexibilityRatingProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const config = RATING_CONFIG[rating]

  return (
    <div className="relative inline-flex items-center">
      {/* Badge */}
      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
        {config.label} Flexibility
      </span>

      {/* Info icon with tooltip */}
      {details && (
        <button
          type="button"
          className="ml-1 w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer shrink-0"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
          aria-label="Flexibility rating details"
        >
          i
        </button>
      )}

      {/* Tooltip */}
      {showTooltip && details && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg leading-relaxed">
          <p className="font-semibold mb-1">Flexibility: {config.label}</p>
          <p>{details}</p>
          <p className="mt-1.5 text-slate-400 text-[10px]">
            High = full in-app control. Medium = some control. Low = provider-managed.
          </p>
          {/* Arrow */}
          <div className="absolute top-full left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800" />
        </div>
      )}
    </div>
  )
}
