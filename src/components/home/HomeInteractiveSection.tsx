// =============================================================================
// Home Interactive Section Component (MAJOR UPDATE)
// =============================================================================
// Client wrapper that connects the entire interactive form+results system.
//
// Now manages TWO PATHS via the OwnershipToggle:
//   Path A ("I have a battery"):  HomeFilterForm → HomeVPPResults
//   Path B ("Looking to buy"):    BuyerFilterForm → BuyerVPPResults
//
// Shared state (zip, solar) persists when switching paths.
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
  })

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* The big toggle: "I have a battery" vs "I'm looking to buy" */}
        <OwnershipToggle mode={mode} onChange={setMode} />

        {/* PATH A: I already have a battery */}
        {mode === 'have-battery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <HomeFilterForm
                setup={userSetup}
                onSetupChange={setUserSetup}
              />
            </div>
            <div className="lg:col-span-8">
              <HomeVPPResults
                vpps={vpps}
                userSetup={userSetup}
              />
            </div>
          </div>
        )}

        {/* PATH B: I'm looking to buy a battery */}
        {mode === 'buying-battery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <BuyerFilterForm
                setup={userSetup}
                onSetupChange={setUserSetup}
              />
            </div>
            <div className="lg:col-span-8">
              <BuyerVPPResults
                vpps={vpps}
                batteries={batteries}
                userSetup={userSetup}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
