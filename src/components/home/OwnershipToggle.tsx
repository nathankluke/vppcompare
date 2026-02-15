// =============================================================================
// Ownership Toggle Component
// =============================================================================
// The main toggle at the top of the interactive section that switches
// between two paths:
//   - "I already have a battery" → shows existing filter form + VPP results
//   - "I'm looking to buy a battery" → shows buyer form + VPP+battery results
//
// This is the most important decision point on the homepage.
// =============================================================================

'use client'

import { OwnershipMode } from '@/types/vpp'

interface OwnershipToggleProps {
  mode: OwnershipMode
  onChange: (mode: OwnershipMode) => void
}

export default function OwnershipToggle({ mode, onChange }: OwnershipToggleProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex rounded-xl border-2 border-blue-800 overflow-hidden shadow-md">
        {/* Left option: I already have a battery */}
        <button
          onClick={() => onChange('have-battery')}
          className={`px-6 py-4 text-base font-semibold transition-all duration-300 cursor-pointer
                      ${mode === 'have-battery'
                        ? 'bg-blue-800 text-white'
                        : 'bg-white text-blue-800 hover:bg-blue-50'}`}
        >
          <span className="block text-lg">🔋 I Have a Battery</span>
          <span className={`block text-xs mt-1 ${mode === 'have-battery' ? 'text-blue-200' : 'text-slate-400'}`}>
            Find VPP programs to earn money
          </span>
        </button>

        {/* Right option: I'm looking to buy */}
        <button
          onClick={() => onChange('buying-battery')}
          className={`px-6 py-4 text-base font-semibold transition-all duration-300 cursor-pointer
                      ${mode === 'buying-battery'
                        ? 'bg-blue-800 text-white'
                        : 'bg-white text-blue-800 hover:bg-blue-50'}`}
        >
          <span className="block text-lg">🛒 I Want to Buy a Battery</span>
          <span className={`block text-xs mt-1 ${mode === 'buying-battery' ? 'text-blue-200' : 'text-slate-400'}`}>
            Find the best battery + VPP combo
          </span>
        </button>
      </div>
    </div>
  )
}
