// =============================================================================
// FAQ Section Component
// =============================================================================
// Displays a list of frequently asked questions using the Accordion component.
// Data comes from src/lib/faqData.ts.
// =============================================================================

'use client'

import Accordion from '@/components/ui/Accordion'
import { faqItems } from '@/lib/faqData'

export default function FAQSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-slate-500 mb-10">
          Everything you need to know about Virtual Power Plants.
        </p>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <Accordion
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
