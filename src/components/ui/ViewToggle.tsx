// =============================================================================
// ViewToggle Component
// =============================================================================
// Switches between "Card" and "Table" view on the Compare page.
//
// Usage:
//   <ViewToggle view={view} onChange={setView} />
// =============================================================================

'use client'

interface ViewToggleProps {
  view: 'card' | 'table'
  onChange: (view: 'card' | 'table') => void
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-slate-300 overflow-hidden">
      <button
        onClick={() => onChange('card')}
        className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer
                    ${view === 'card'
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-50'}`}
      >
        ▦ Cards
      </button>
      <button
        onClick={() => onChange('table')}
        className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer
                    ${view === 'table'
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-50'}`}
      >
        ☰ Table
      </button>
    </div>
  )
}
