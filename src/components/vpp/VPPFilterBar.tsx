// =============================================================================
// VPP Filter Bar Component (Client Component)
// =============================================================================
// This component handles filtering VPPs by state, sorting by different
// fields, and toggling between card and table views.
//
// How it works:
//   1. Receives ALL VPPs from the server (passed as a prop)
//   2. User picks a state filter, sort option, or view mode
//   3. Component filters/sorts the list in the browser (no server call needed)
//   4. Displays the filtered VPP cards or table
// =============================================================================

'use client'

import { useState, useMemo } from 'react'
import { VPP } from '@/types/vpp'
import VPPCard from './VPPCard'
import VPPTable from './VPPTable'
import ViewToggle from '@/components/ui/ViewToggle'

interface VPPFilterBarProps {
  vpps: VPP[]  // All VPPs fetched from the database (passed from server)
}

export default function VPPFilterBar({ vpps }: VPPFilterBarProps) {
  // -------------------------------------------------------
  // State — tracks the user's current filter/sort/view choices
  // -------------------------------------------------------
  const [selectedState, setSelectedState] = useState('All States')
  const [sortBy, setSortBy] = useState('feed_in_rate')
  const [view, setView] = useState<'card' | 'table'>('card')

  // -------------------------------------------------------
  // Build list of states from the actual VPP data
  // This way, the dropdown only shows states that have VPPs
  // -------------------------------------------------------
  const availableStates = useMemo(() => {
    const stateSet = new Set<string>()
    vpps.forEach((vpp) => {
      vpp.states_available.forEach((state) => stateSet.add(state))
    })
    // Sort alphabetically and add "All States" at the front
    return ['All States', ...Array.from(stateSet).sort()]
  }, [vpps])

  // -------------------------------------------------------
  // Filter & Sort logic
  // useMemo means this only recalculates when the inputs change
  // -------------------------------------------------------
  const filteredAndSortedVPPs = useMemo(() => {
    // Step 1: Filter by state
    let result = vpps
    if (selectedState !== 'All States') {
      result = vpps.filter((vpp) =>
        vpp.states_available.includes(selectedState)
      )
    }

    // Step 2: Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'feed_in_rate':
          // Highest feed-in rate first (nulls go to the end)
          return (b.feed_in_rate ?? 0) - (a.feed_in_rate ?? 0)
        case 'signup_bonus':
          // Highest signup bonus first (nulls go to the end)
          return (b.signup_bonus ?? 0) - (a.signup_bonus ?? 0)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'provider':
          return a.provider.localeCompare(b.provider)
        default:
          return 0
      }
    })

    return result
  }, [vpps, selectedState, sortBy])

  return (
    <>
      {/* ================================================================
          Filter Bar
          ================================================================ */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center">

          {/* State Filter Dropdown */}
          <div className="flex-1 w-full sm:w-auto">
            <label
              htmlFor="state-filter"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              Filter by State
            </label>
            <select
              id="state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2
                         text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1 w-full sm:w-auto">
            <label
              htmlFor="sort-by"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2
                         text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="feed_in_rate">Feed-in Rate (Highest)</option>
              <option value="signup_bonus">Signup Bonus (Highest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="provider">Provider (A-Z)</option>
            </select>
          </div>

          {/* View Toggle + Results Count */}
          <div className="flex-1 w-full sm:w-auto sm:text-right space-y-2">
            <div className="flex justify-end">
              <ViewToggle view={view} onChange={setView} />
            </div>
            <p className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-700">
                {filteredAndSortedVPPs.length}
              </span>{' '}
              of {vpps.length} VPPs
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================
          VPP Cards Grid, Table, or Empty State
          ================================================================ */}
      {filteredAndSortedVPPs.length > 0 ? (
        view === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedVPPs.map((vpp) => (
              <VPPCard key={vpp.id} vpp={vpp} />
            ))}
          </div>
        ) : (
          <VPPTable vpps={filteredAndSortedVPPs} />
        )
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-slate-400 mb-2">No VPPs found</p>
          <p className="text-slate-500">
            Try selecting a different state or clearing your filters.
          </p>
          <button
            onClick={() => setSelectedState('All States')}
            className="mt-4 text-blue-700 underline hover:text-blue-900 cursor-pointer"
          >
            Show all VPPs
          </button>
        </div>
      )}
    </>
  )
}
