// =============================================================================
// Toggle Component
// =============================================================================
// A yes/no toggle switch. Used for questions like "Do you have solar?"
//
// Usage:
//   <Toggle label="Do you have solar?" value={hasSolar} onChange={setHasSolar} />
// =============================================================================

'use client'

interface ToggleProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export default function Toggle({ label, value, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer
                    ${value ? 'bg-emerald-500' : 'bg-slate-300'}`}
      >
        {/* The sliding circle */}
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                      shadow-md transition-transform duration-300
                      ${value ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </button>
    </div>
  )
}
