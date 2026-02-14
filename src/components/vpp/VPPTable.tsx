// =============================================================================
// VPP Table Component
// =============================================================================
// A horizontal comparison table showing all VPPs in a spreadsheet-style view.
// Columns: Name, Provider, States, Signup Bonus, Feed-in Rate,
//          Solar Required, Battery Required, Compatible Batteries
//
// Usage:
//   <VPPTable vpps={filteredVPPs} />
// =============================================================================

import { VPP } from '@/types/vpp'
import Link from 'next/link'

interface VPPTableProps {
  vpps: VPP[]
}

export default function VPPTable({ vpps }: VPPTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        {/* Table Header */}
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="text-left px-4 py-3 font-semibold">Name</th>
            <th className="text-left px-4 py-3 font-semibold">Provider</th>
            <th className="text-left px-4 py-3 font-semibold">States</th>
            <th className="text-right px-4 py-3 font-semibold">Signup Bonus</th>
            <th className="text-right px-4 py-3 font-semibold">Feed-in Rate</th>
            <th className="text-center px-4 py-3 font-semibold">Solar</th>
            <th className="text-center px-4 py-3 font-semibold">Battery</th>
            <th className="text-left px-4 py-3 font-semibold">Compatible Batteries</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {vpps.map((vpp, index) => (
            <tr
              key={vpp.id}
              className={`border-t border-slate-200 hover:bg-blue-50 transition-colors
                          ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
            >
              {/* Name — links to provider website */}
              <td className="px-4 py-3 font-medium text-blue-800">
                <Link
                  href={vpp.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {vpp.name}
                </Link>
              </td>

              {/* Provider */}
              <td className="px-4 py-3 text-slate-600">{vpp.provider}</td>

              {/* States — small badges */}
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {vpp.states_available.map((state) => (
                    <span
                      key={state}
                      className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full"
                    >
                      {state}
                    </span>
                  ))}
                </div>
              </td>

              {/* Signup Bonus */}
              <td className="px-4 py-3 text-right font-semibold text-amber-600">
                {vpp.signup_bonus !== null ? `$${vpp.signup_bonus}` : '—'}
              </td>

              {/* Feed-in Rate */}
              <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                {vpp.feed_in_rate !== null ? `${vpp.feed_in_rate}¢/kWh` : '—'}
              </td>

              {/* Solar Required */}
              <td className="px-4 py-3 text-center">
                {vpp.solar_required ? (
                  <span className="text-amber-600">Required</span>
                ) : (
                  <span className="text-slate-400">No</span>
                )}
              </td>

              {/* Battery Required */}
              <td className="px-4 py-3 text-center">
                {vpp.battery_required ? (
                  <span className="text-blue-600">Required</span>
                ) : (
                  <span className="text-slate-400">No</span>
                )}
              </td>

              {/* Compatible Batteries */}
              <td className="px-4 py-3 text-slate-600 text-xs">
                {vpp.battery_brands_supported.length > 0
                  ? vpp.battery_brands_supported.join(', ')
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
