'use client'

import { useState } from 'react'
import type { Faq } from '@/sanity/lib/types'

function FaqItem({ faq }: { faq: Faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between gap-4 group hover:opacity-70 transition-opacity text-left"
        aria-expanded={isOpen}
      >
        <h2 className="font-heading text-[clamp(17px,2vw,22px)] font-light text-text-dark">
          {faq.question}
        </h2>
        <span className="shrink-0 text-text-muted transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-8 text-[15px] text-text-mid leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-b border-border">
      {faqs.map((faq) => (
        <FaqItem key={faq._id} faq={faq} />
      ))}
    </div>
  )
}
