// =============================================================================
// US Map Component
// =============================================================================
// Interactive SVG map of the United States using react-simple-maps.
// States with VPP programs are colored blue; others are gray.
// Clicking a state triggers the onStateClick callback.
//
// Note: Uses dynamic import with ssr: false because react-simple-maps
// relies on browser APIs that aren't available during server rendering.
// =============================================================================

'use client'

import { useState, memo } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-simple-maps to avoid SSR issues
const ComposableMap = dynamic(
  () => import('react-simple-maps').then((mod) => mod.ComposableMap),
  { ssr: false }
)
const Geographies = dynamic(
  () => import('react-simple-maps').then((mod) => mod.Geographies),
  { ssr: false }
)
const Geography = dynamic(
  () => import('react-simple-maps').then((mod) => mod.Geography),
  { ssr: false }
)

// TopoJSON URL for US states (from the us-atlas package on CDN)
const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// FIPS code → 2-letter state abbreviation mapping
const FIPS_TO_STATE: Record<string, string> = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
  '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
  '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
  '56': 'WY',
}

// State code → full state name
const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
}

interface USMapProps {
  statesWithVPPs: Set<string>
  selectedState: string | null
  onStateClick: (stateCode: string, stateName: string) => void
}

function USMapComponent({ statesWithVPPs, selectedState, onStateClick }: USMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hovered state name tooltip */}
      <div className="text-center h-8 mb-2">
        {hoveredState && (
          <span className="text-sm font-medium text-slate-600">
            {STATE_NAMES[hoveredState] || hoveredState}
            {statesWithVPPs.has(hoveredState) ? ' — Click to see programs' : ' — Coming soon'}
          </span>
        )}
      </div>

      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: Array<{ id: string; rsmKey: string }> }) =>
            geographies.map((geo) => {
              const fips = geo.id
              const stateCode = FIPS_TO_STATE[fips] || ''
              const hasVPP = statesWithVPPs.has(stateCode)
              const isSelected = selectedState === stateCode
              const isHovered = hoveredState === stateCode

              // Determine fill color
              let fill = '#e2e8f0' // slate-200 (no VPP)
              if (hasVPP) {
                fill = isSelected ? '#1e3a5f' : isHovered ? '#2563eb' : '#1e40af' // blue shades
              } else if (isHovered) {
                fill = '#cbd5e1' // slate-300
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                  onMouseEnter={() => setHoveredState(stateCode)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => {
                    const name = STATE_NAMES[stateCode] || stateCode
                    onStateClick(stateCode, name)
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders when parent state changes
export default memo(USMapComponent)
