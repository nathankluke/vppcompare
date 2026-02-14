// =============================================================================
// Accordion Component
// =============================================================================
// An expandable/collapsible item used for FAQ sections.
// Click the question to reveal/hide the answer with a smooth animation.
//
// Usage:
//   <Accordion question="How does it work?" answer="It works like magic." />
// =============================================================================

'use client'

import { useState } from 'react'

interface AccordionProps {
  question: string
  answer: string
}

export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      {/* Clickable header — toggles open/closed */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left
                   text-slate-800 font-medium hover:bg-slate-50
                   transition-colors duration-200 cursor-pointer"
      >
        <span className="pr-4">{question}</span>
        {/* Arrow that rotates when open */}
        <span
          className={`text-slate-400 transform transition-transform duration-300
                      flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {/* Answer panel — expands/collapses with animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-4 text-slate-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}
