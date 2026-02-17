// =============================================================================
// Buyer Filter Form Component (Horizontal Layout)
// =============================================================================
// Form for "I Need a Battery" path — laid out horizontally above results.
// Fields: Zip code | Solar toggle | Battery size pills
// =============================================================================

'use client'

import { UserSetup } from '@/types/vpp'
import { getStateFromZip, getStateName } from '@/lib/zipToState'
import { BATTERY_SIZE_RANGES } from '@/lib/batterySizeRanges'

interface BuyerFilterFormProps {
  setup: UserSetup
  onSetupChange: (setup: UserSetup) => void
}

export default function BuyerFilterForm({ setup, onSetupChange }: BuyerFilterFormProps) {
  // Helper: update a single field and resolve state from zip
  const updateField = (field: keyof UserSetup, value: string | number | boolean) => {
    const newSetup = { ...setup, [field]: value }

    // If zip changed, auto-resolve the state
    if (field === 'zip' && typeof value === 'string') {
      newSetup.state = getStateFromZip(value)
    }

    onSetupChange(newSetup)
  }

  // Resolved state name for display
  const stateName = setup.state ? getStateName(setup.state) : ''

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">

        {/* Zip Code */}
        <div className="sm:w-36 shrink-0">
          <label htmlFor="buyer-zip" className="block text-xs font-medium text-slate-600 mb-1">
            Zip Code
          </label>
          <input
            id="buyer-zip"
            type="text"
            maxLength={5}
            placeholder="e.g. 80202"
            value={setup.zip}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '')
              updateField('zip', val)
            }}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2
                       text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {stateName && (
            <p className="text-xs text-emerald-600 font-medium mt-0.5">{stateName}</p>
          )}
          {setup.zip.length >= 3 && !setup.state && (
            <p className="text-xs text-red-500 mt-0.5">Not recognized</p>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-slate-200 shrink-0" />

        {/* Solar toggle — compact */}
        <div className="flex items-center gap-2 shrink-0 sm:pb-0.5">
          <span className="text-xs font-medium text-slate-600 whitespace-nowrap">Solar?</span>
          <button
            type="button"
            onClick={() => updateField('hasSolar', !setup.hasSolar)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer shrink-0
                        ${setup.hasSolar ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
                          shadow-sm transition-transform duration-200
                          ${setup.hasSolar ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
          {setup.hasSolar && (
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={setup.solarSize}
                onChange={(e) => updateField('solarSize', Number(e.target.value))}
                className="w-16 md:w-20 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">{setup.solarSize} kW</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-slate-200 shrink-0" />

        {/* Battery Size — horizontal pills */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-600 mb-1.5">Battery Size</p>
          <div className="flex gap-1.5 flex-wrap">
            {BATTERY_SIZE_RANGES.map((size) => (
              <button
                key={size.key}
                onClick={() => updateField('batterySizeRange', size.key)}
                className={`relative px-3 py-1.5 rounded-lg border text-left transition-all duration-200 cursor-pointer
                  ${setup.batterySizeRange === size.key
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                    : 'border-slate-200 bg-white hover:border-blue-300'}`}
              >
                {size.recommended && (
                  <span className="absolute -top-1.5 right-1 text-[10px] bg-emerald-500 text-white px-1.5 py-0 rounded-full font-semibold leading-tight">
                    Best
                  </span>
                )}
                <p className="font-bold text-xs text-slate-800">{size.label}</p>
                <p className="text-[11px] text-blue-700 font-medium">{size.range}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
