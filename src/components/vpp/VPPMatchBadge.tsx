// =============================================================================
// VPP Match Badge Component
// =============================================================================
// Shows whether a VPP is compatible with the user's setup.
// Three states:
//   - compatible (green): Everything matches
//   - partial (yellow): Some things match, some don't
//   - incompatible (red): Major mismatch (e.g., wrong battery brand)
//   - unknown (hidden): No user data entered yet
//
// Usage:
//   <VPPMatchBadge status="compatible" reasons={[]} />
//   <VPPMatchBadge status="partial" reasons={["Battery brand not confirmed"]} />
// =============================================================================

interface VPPMatchBadgeProps {
  status: 'compatible' | 'partial' | 'incompatible' | 'unknown'
  reasons: string[]
}

export default function VPPMatchBadge({ status, reasons }: VPPMatchBadgeProps) {
  // Don't show anything if we don't have enough info to judge
  if (status === 'unknown') return null

  // Color/text config for each status
  const config = {
    compatible: {
      bg: 'bg-emerald-50 border-emerald-300',
      text: 'text-emerald-700',
      label: '✓ Compatible with your setup',
    },
    partial: {
      bg: 'bg-amber-50 border-amber-300',
      text: 'text-amber-700',
      label: '⚠ Partial match',
    },
    incompatible: {
      bg: 'bg-red-50 border-red-300',
      text: 'text-red-700',
      label: '✗ Not compatible',
    },
  }

  const c = config[status]

  return (
    <div className={`border rounded-lg px-3 py-2 text-sm mb-3 ${c.bg}`}>
      <p className={`font-semibold ${c.text}`}>{c.label}</p>
      {reasons.length > 0 && (
        <ul className={`mt-1 text-xs ${c.text}`}>
          {reasons.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
