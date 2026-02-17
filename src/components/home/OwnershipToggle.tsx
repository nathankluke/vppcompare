// =============================================================================
// Ownership Toggle Component (Compact)
// =============================================================================
// The main toggle that switches between two paths.
// Tighter padding to reduce vertical space.
// =============================================================================

'use client'

import { OwnershipMode } from '@/types/vpp'

interface OwnershipToggleProps {
  mode: OwnershipMode
  onChange: (mode: OwnershipMode) => void
}

export default function OwnershipToggle({ mode, onChange }: OwnershipToggleProps) {
  return (
    <div className="flex justify-center mb-5">
      <div className="inline-flex rounded-lg border-2 border-blue-800 overflow-hidden shadow-sm w-full sm:w-auto">
        {/* Left option: I already have a battery */}
        <button
          onClick={() => onChange('have-battery')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer
                      ${mode === 'have-battery'
                        ? 'bg-blue-800 text-white'
                        : 'bg-white text-blue-800 hover:bg-blue-50'}`}
        >
          I Have a Battery
        </button>

        {/* Right option: I need a battery */}
        <button
          onClick={() => onChange('buying-battery')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer
                      ${mode === 'buying-battery'
                        ? 'bg-blue-800 text-white'
                        : 'bg-white text-blue-800 hover:bg-blue-50'}`}
        >
          I Need a Battery
        </button>
      </div>
    </div>
  )
}
