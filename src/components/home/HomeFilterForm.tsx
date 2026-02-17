// =============================================================================
// Home Filter Form Component (Horizontal Layout)
// =============================================================================
// Interactive form — laid out horizontally above the VPP cards.
// Fields in a row on desktop, stacking on mobile.
//
// Fields: Zip code | Battery brand | Battery capacity | Solar toggle + size
// =============================================================================

'use client'

import { UserSetup } from '@/types/vpp'
import { getStateFromZip, getStateName } from '@/lib/zipToState'

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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5">
      {/* Row: all fields aligned to top of inputs */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

        {/* Zip Code — fixed height wrapper so state text doesn't push layout */}
        <div className="sm:w-36 shrink-0">
          <label htmlFor="zip" className="block text-xs font-medium text-slate-600 mb-1">
            Zip Code
          </label>
          <input
            id="zip"
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
          {/* State name / error — sits below input, doesn't affect neighbor alignment */}
          <div className="h-4 mt-0.5">
            {stateName && (
              <p className="text-xs text-emerald-600 font-medium">{stateName}</p>
            )}
            {setup.zip.length >= 3 && !setup.state && (
              <p className="text-xs text-red-500">Not recognized</p>
            )}
          </div>
        </div>

        {/* Battery Brand — same structure: label + input + spacer */}
        <div className="sm:w-44 shrink-0">
          <label htmlFor="battery-brand" className="block text-xs font-medium text-slate-600 mb-1">
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
          {/* Spacer to match zip code height */}
          <div className="h-4 mt-0.5" />
        </div>

        {/* Battery Capacity slider */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-600">Battery Capacity</label>
            <span className="text-xs font-bold text-blue-800">{setup.batteryCapacity} kWh</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={0.5}
            value={setup.batteryCapacity}
            onChange={(e) => updateField('batteryCapacity', Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-800 mt-1.5"
          />
          <div className="h-4 mt-0.5" />
        </div>

        {/* Divider on desktop */}
        <div className="hidden sm:flex items-center">
          <div className="w-px h-8 bg-slate-200" />
        </div>

        {/* Solar toggle + solar size slider */}
        <div className="shrink-0">
          <div className="flex items-center gap-2 mb-1">
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
          </div>
          {/* Solar size slider — same height zone as the other inputs */}
          {setup.hasSolar ? (
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={setup.solarSize}
                onChange={(e) => updateField('solarSize', Number(e.target.value))}
                className="w-full sm:w-24 md:w-32 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">{setup.solarSize} kW</span>
            </div>
          ) : (
            <div className="h-[10px]" />
          )}
          <div className="h-4 mt-0.5" />
        </div>
      </div>
    </div>
  )
}
