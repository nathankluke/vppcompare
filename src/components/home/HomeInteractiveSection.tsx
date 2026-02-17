// =============================================================================
// Home Interactive Section Component
// =============================================================================
// Client wrapper that connects the entire interactive form+results system.
//
// Layout: Toggle → Form (horizontal, above) → Results (below)
// Form sits on top so users see the zip code area immediately on page load.
//
// Two paths via the OwnershipToggle:
//   Path A ("I have a battery"):  HomeFilterForm → HomeVPPResults
//   Path B ("Looking to buy"):    BuyerFilterForm → BuyerVPPResults
// =============================================================================

'use client'

import { useState } from 'react'
import { VPP, UserSetup, OwnershipMode } from '@/types/vpp'
import { Battery } from '@/types/battery'
import OwnershipToggle from './OwnershipToggle'
import HomeFilterForm from './HomeFilterForm'
import HomeVPPResults from './HomeVPPResults'
import BuyerFilterForm from './BuyerFilterForm'
import BuyerVPPResults from './BuyerVPPResults'

interface HomeInteractiveSectionProps {
  vpps: VPP[]           // All VPPs (with incentives joined when available)
  batteries: Battery[]  // All battery products
}

export default function HomeInteractiveSection({ vpps, batteries }: HomeInteractiveSectionProps) {
  // Which path is the user on?
  const [mode, setMode] = useState<OwnershipMode>('have-battery')

  // User's form state — shared between both paths
  const [userSetup, setUserSetup] = useState<UserSetup>({
    // Shared fields
    zip: '',
    state: '',
    hasSolar: false,
    solarSize: 6,
    // Path A specific
    batteryBrand: 'Tesla Powerwall',
    batteryCapacity: 13.5,
    // Path B specific
    budgetMin: 5000,
    budgetMax: 20000,
    batterySizeRange: 'fullsize',
  })

  return (
    <section className="py-6 md:py-8 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* The toggle: "I have a battery" vs "I need a battery" */}
        <OwnershipToggle mode={mode} onChange={setMode} />

        {/* PATH A: I already have a battery */}
        {mode === 'have-battery' && (
          <div className="space-y-5">
            {/* Form — full width above cards */}
            <HomeFilterForm
              setup={userSetup}
              onSetupChange={setUserSetup}
            />
            {/* Results below */}
            <HomeVPPResults
              vpps={vpps}
              userSetup={userSetup}
              onSwitchToBuyer={() => setMode('buying-battery')}
            />
          </div>
        )}

        {/* PATH B: I'm looking to buy a battery */}
        {mode === 'buying-battery' && (
          <div className="space-y-5">
            {/* Form — full width above cards */}
            <BuyerFilterForm
              setup={userSetup}
              onSetupChange={setUserSetup}
            />
            {/* Results below */}
            <BuyerVPPResults
              vpps={vpps}
              batteries={batteries}
              userSetup={userSetup}
            />
          </div>
        )}
      </div>
    </section>
  )
}
