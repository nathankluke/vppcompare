// =============================================================================
// How It Works Page — src/app/how-it-works/page.tsx
// =============================================================================
// Explains what VPPCompare does, how to use it, and what a VPP is.
// This page helps users who are new to Virtual Power Plants.
// =============================================================================

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function HowItWorksPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ---- Page Heading ---- */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            How VPPCompare Works
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We make it easy to find, compare, and choose the right Virtual Power
            Plant program for your home in Australia.
          </p>
        </div>

        {/* ================================================================
            Step-by-Step Guide
            ================================================================ */}
        <section className="mb-16">
          <div className="space-y-10">

            {/* Step 1 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Browse Available VPPs
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Visit our Compare page to see all Virtual Power Plant programs
                  currently available in Australia. Each listing includes the
                  provider name, feed-in rate, signup bonus, supported battery
                  brands, and which states the program operates in.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Filter &amp; Sort
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Use the filter bar to narrow results by your state (e.g. NSW,
                  VIC, QLD). Sort by feed-in rate to find the highest paying
                  program, or by signup bonus if you want the best upfront deal.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Compare Side by Side
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Our card-based layout lets you quickly scan and compare
                  multiple VPPs. See at a glance which programs offer the best
                  rates, which batteries are supported, and what requirements
                  you need to meet.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Choose &amp; Sign Up
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Once you have found the VPP that suits your needs, click the
                  &quot;Learn More&quot; button to visit the provider&apos;s website
                  directly. You sign up with the provider — VPPCompare is a free
                  comparison tool and does not handle signups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            What is a Virtual Power Plant?
            ================================================================ */}
        <section className="bg-white rounded-xl shadow-md border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            What is a Virtual Power Plant?
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              A <strong>Virtual Power Plant (VPP)</strong> is a network of
              distributed energy resources — like home solar panels and
              batteries — that are connected and coordinated through software to
              act as a single power plant.
            </p>
            <p>
              When you join a VPP, your home battery can export stored energy
              back to the grid during periods of high demand. In return, you
              receive credits on your electricity bill, higher feed-in rates, or
              signup bonuses from the VPP provider.
            </p>
            <p>
              VPPs help stabilise the electricity grid, reduce reliance on
              fossil-fuel peaker plants, and put money back in your pocket.
              They are a key part of Australia&apos;s transition to a cleaner,
              more distributed energy system.
            </p>
            <h3 className="text-lg font-semibold text-slate-800 pt-2">
              What do you need to join a VPP?
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Solar panels</strong> — most VPPs require an existing
                rooftop solar system.
              </li>
              <li>
                <strong>Home battery</strong> — a compatible battery (e.g.
                Tesla Powerwall, BYD, Sonnen) is usually required.
              </li>
              <li>
                <strong>Internet connection</strong> — the VPP software needs to
                communicate with your battery in real time.
              </li>
              <li>
                <strong>Eligible location</strong> — VPP programs are available
                in specific Australian states.
              </li>
            </ul>
          </div>
        </section>

        {/* ---- Call to Action ---- */}
        <div className="text-center">
          <p className="text-slate-500 mb-4">
            Ready to find the right VPP for your home?
          </p>
          <Link href="/compare">
            <Button variant="accent" size="lg">
              Compare VPPs Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
