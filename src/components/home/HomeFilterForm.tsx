// =============================================================================
// Home Filter Form Component
// =============================================================================
// Interactive form on the homepage where users enter:
//   - Zip code (auto-resolves to state)
//   - Battery brand (dropdown)
//   - Battery capacity (slider, kWh)
//   - Do you have solar? (toggle)
//   - Solar system size (slider, kW — only shown if solar = yes)
//
// Changes update in real-time (no submit button needed).
// =============================================================================

'use client'

import { UserSetup } from '@/types/vpp'
import { getStateFromZip, getStateName } from '@/lib/zipToState'
import Toggle from '@/components/ui/Toggle'
import Slider from '@/components/ui/Slider'

interface HomeFilterFormProps {
  setup: UserSetup
  onSetupChange: (setup: UserSetup) => void
}

// Battery brand options — these match what VPP providers support
const BATTERY_BRANDS = [
  'Tesla Powerwall',
  'Enphase',
  'Sonnen',
  'SolarEdge',
  'Generac',
  'Franklin',
  'Other',
  'I don\'t have one yet',
]

export default function HomeFilterForm({ setup, onSetupChange }: HomeFilterFormProps) {

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
        Find VPPs for Your Home
      </h3>

      {/* Zip Code */}
      <div>
        <label htmlFor="zip" className="block text-sm font-medium text-slate-700 mb-1">
          Zip Code
        </label>
        <div className="flex items-center gap-3">
          <input
            id="zip"
            type="text"
            maxLength={5}
            placeholder="e.g. 80202"
            value={setup.zip}
            onChange={(e) => {
              // Only allow digits
              const val = e.target.value.replace(/\D/g, '')
              updateField('zip', val)
            }}
            className="w-32 rounded-md border border-slate-300 bg-white px-3 py-2
                       text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Show resolved state */}
          {stateName && (
            <span className="text-sm text-emerald-600 font-medium">
              → {stateName}
            </span>
          )}
          {setup.zip.length >= 3 && !setup.state && (
            <span className="text-sm text-red-500">
              Zip not recognized
            </span>
          )}
        </div>
      </div>

      {/* Battery Brand */}
      <div>
        <label htmlFor="battery-brand" className="block text-sm font-medium text-slate-700 mb-1">
          Battery Brand
        </label>
        <select
          id="battery-brand"
          value={setup.batteryBrand}
          onChange={(e) => updateField('batteryBrand', e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2
                     text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {BATTERY_BRANDS.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Battery Capacity Slider */}
      <Slider
        label="Battery Capacity"
        value={setup.batteryCapacity}
        min={5}
        max={50}
        step={0.5}
        unit="kWh"
        onChange={(val) => updateField('batteryCapacity', val)}
      />

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
    </div>
  )
}
