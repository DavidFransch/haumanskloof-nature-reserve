'use client'

import { useState } from 'react'

interface DisclosureProps {
  title: string
  children: React.ReactNode
}

export default function Disclosure({ title, children }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between group hover:opacity-70 transition-opacity"
        aria-expanded={isOpen}
      >
        <h3 className="font-heading text-[clamp(20px,2.5vw,28px)] font-light text-text-dark text-left">
          {title}
        </h3>
        <span className="label-text text-text-muted shrink-0 ml-4 flex items-center gap-2">
          {isOpen ? (
            <>
              Close
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 9 L6 3" />
                <path d="M3 6 L9 6" opacity="0.5" />
              </svg>
            </>
          ) : (
            <>
              Read more
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 3 L6 9" />
                <path d="M3 6 L9 6" />
              </svg>
            </>
          )}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-12 text-[15px] text-text-mid leading-relaxed max-w-[720px]">
          {children}
        </div>
      </div>
    </div>
  )
}
