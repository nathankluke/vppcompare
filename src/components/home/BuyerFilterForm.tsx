// =============================================================================
// Buyer Filter Form Component
// =============================================================================
// The form shown on the "Looking to Buy" path. Collects:
//   - Zip code (auto-resolves to state)
//   - Solar toggle + solar size slider
//   - Budget range (min and max sliders)
//
// Reuses the Toggle and Slider components from the existing form.
// =============================================================================

'use client'

import { UserSetup } from '@/types/vpp'
import { getStateFromZip, getStateName } from '@/lib/zipToState'
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
            <span className="text-sm text-emerald-600 font-medium">→ {stateName}</span>
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

      {/* Budget Range */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-sm font-medium text-slate-700 mb-3">Battery Budget Range</p>
        <Slider
          label="Minimum Budget"
          value={setup.budgetMin}
          min={5000}
          max={25000}
          step={1000}
          unit="$"
          onChange={(val) => {
            // Ensure min doesn't exceed max
            const newMin = Math.min(val, setup.budgetMax - 1000)
            updateField('budgetMin', newMin)
          }}
        />
        <div className="mt-3">
          <Slider
            label="Maximum Budget"
            value={setup.budgetMax}
            min={5000}
            max={25000}
            step={1000}
            unit="$"
            onChange={(val) => {
              // Ensure max doesn't go below min
              const newMax = Math.max(val, setup.budgetMin + 1000)
              updateField('budgetMax', newMax)
            }}
          />
        </div>
      </div>

      {/* Budget info */}
      <p className="text-xs text-slate-400">
        30% federal tax credit and VPP rebates can significantly reduce your out-of-pocket cost.
      </p>
    </div>
  )
}
