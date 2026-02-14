// =============================================================================
// Slider Component
// =============================================================================
// A range slider with a label and value display.
// Used for battery capacity (kWh) and solar system size (kW).
//
// Usage:
//   <Slider label="Battery Capacity" value={13.5} min={5} max={50}
//           step={0.5} unit="kWh" onChange={setCapacity} />
// =============================================================================

'use client'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
}

export default function Slider({ label, value, min, max, step, unit, onChange }: SliderProps) {
  return (
    <div>
      {/* Label and current value display */}
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-bold text-blue-800">
          {value} {unit}
        </span>
      </div>

      {/* The range input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-800"
      />

      {/* Min and max labels */}
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}
