// =============================================================================
// Buyer Filter Form Component
// =============================================================================
// The form shown on the "I Need a Battery" path. Collects:
//   - Zip code (auto-resolves to state)
//   - Solar toggle + solar size slider
//   - Battery size range (4 selectable options)
//
// Reuses the Toggle and Slider components from the existing form.
// =============================================================================

'use client'

import { UserSetup } from '@/types/vpp'
import { getStateFromZip, getStateName } from '@/lib/zipToState'
import { BATTERY_SIZE_RANGES } from '@/lib/batterySizeRanges'
import Toggle from '@/components/ui/Toggle'
import Slider from '@/components/ui/Slider'

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
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 space-y-5">
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        Find the Best Battery + VPP Combo
      </h3>

      {/* Zip Code — same pattern as HomeFilterForm */}
      <div>
        <label htmlFor="buyer-zip" className="block text-sm font-medium text-slate-700 mb-1">
          Zip Code
        </label>
        <div className="flex items-center gap-3">
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
            className="w-32 rounded-md border border-slate-300 bg-white px-3 py-2
                       text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {stateName && (
            <span className="text-sm text-emerald-600 font-medium">{stateName}</span>
          )}
          {setup.zip.length >= 3 && !setup.state && (
            <span className="text-sm text-red-500">Zip not recognized</span>
          )}
        </div>
      </div>

      {/* Solar Toggle */}
      <Toggle
        label="Do you have solar panels?"
        value={setup.hasSolar}
        onChange={(val) => updateField('hasSolar', val)}
      />

      {/* Solar Size Slider — only shows when solar = yes */}
      {setup.hasSolar && (
        <Slider
          label="Solar System Size"
          value={setup.solarSize}
          min={1}
          max={20}
          step={0.5}
          unit="kW"
          onChange={(val) => updateField('solarSize', val)}
        />
      )}

      {/* Battery Size Range Selector */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-sm font-medium text-slate-700 mb-3">Battery Size</p>
        <div className="grid grid-cols-2 gap-2">
          {BATTERY_SIZE_RANGES.map((size) => (
            <button
              key={size.key}
              onClick={() => updateField('batterySizeRange', size.key)}
              className={`relative p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer
                ${setup.batterySizeRange === size.key
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                  : 'border-slate-200 bg-white hover:border-blue-300'}`}
            >
              {size.recommended && (
                <span className="absolute -top-2 right-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-semibold">
                  Optimal
                </span>
              )}
              <p className="font-bold text-sm text-slate-800">{size.label}</p>
              <p className="text-xs text-blue-700 font-medium">{size.range}</p>
              <p className="text-xs text-slate-400 mt-1">{size.description}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Full-Size batteries (13-14 kWh) qualify for the most VPP programs and offer the best ROI after 30% ITC.
        </p>
      </div>
    </div>
  )
}
