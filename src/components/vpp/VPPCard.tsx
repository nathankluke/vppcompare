// =============================================================================
// VPPCard Component
// =============================================================================
// Displays a single Virtual Power Plant program as a card.
// Used on the Compare page and the "Featured VPPs" section of the homepage.
//
// Props:
//   vpp — a VPP object containing all the program details
//
// Usage:
//   <VPPCard vpp={myVppData} />
// =============================================================================

import { VPP } from '@/types/vpp'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface VPPCardProps {
  vpp: VPP
}

export default function VPPCard({ vpp }: VPPCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200">

      {/* ---- Card Header: Provider + VPP Name ---- */}
      <div className="bg-blue-800 text-white px-6 py-4">
        <p className="text-sm font-medium text-blue-200">{vpp.provider}</p>
        <h3 className="text-xl font-bold">{vpp.name}</h3>
      </div>

      {/* ---- Card Body: Key Details ---- */}
      <div className="px-6 py-5 space-y-4">

        {/* Description */}
        <p className="text-slate-600 text-sm">{vpp.description}</p>

        {/* Feed-in Rate */}
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm">Feed-in Rate</span>
          <span className="text-lg font-bold text-emerald-600">
            {vpp.feed_in_rate !== null ? `${vpp.feed_in_rate}c/kWh` : 'N/A'}
          </span>
        </div>

        {/* Signup Bonus */}
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm">Signup Bonus</span>
          <span className="text-lg font-bold text-amber-600">
            {vpp.signup_bonus !== null ? `$${vpp.signup_bonus}` : 'None'}
          </span>
        </div>

        {/* Requirements */}
        <div className="flex gap-3 text-xs">
          {vpp.solar_required && (
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              Solar Required
            </span>
          )}
          {vpp.battery_required && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Battery Required
            </span>
          )}
        </div>

        {/* States Available — shown as small badges */}
        <div className="flex flex-wrap gap-2">
          {vpp.states_available.map((state) => (
            <span
              key={state}
              className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {state}
            </span>
          ))}
        </div>
      </div>

      {/* ---- Card Footer: Action Button ---- */}
      <div className="px-6 pb-5">
        <Link href={vpp.website_url} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="md" className="w-full">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  )
}
