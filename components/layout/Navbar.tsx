'use client'

import Link from 'next/link'
import { useState } from 'react'
import { siteContent } from '@/content/site.content'

export default function Navbar() {
  const { nav } = siteContent
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-max flex items-center justify-between px-10 h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-xs font-medium tracking-widest uppercase text-text-dark no-underline"
        >
          {nav.logo}
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-baseline gap-7">
          {nav.links.map((link) => (
            <div key={link.label} className="relative">
              {link.dropdown ? (
                <div
                  onMouseEnter={() => setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className="text-xs tracking-wide text-text-mid no-underline inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3 opacity-50 group-hover:opacity-70 transition-transform duration-200"
                      style={{ transform: dropdownOpen === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {dropdownOpen === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[100]">
                      <div className="bg-white border border-border rounded-lg shadow-xl py-2 min-w-[180px] overflow-hidden">
                        <Link
                          href={link.href}
                          className="block px-4 py-2.5 text-xs font-medium text-text-dark no-underline hover:bg-bg-light border-b border-border"
                        >
                          View All
                        </Link>
                        <div className="py-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="block px-4 py-2 text-xs text-text-mid no-underline hover:bg-bg-light hover:text-text-dark transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href={link.href} className="text-xs tracking-wide text-text-mid no-underline">
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={nav.cta.href}
          className="hidden lg:block text-[11px] py-1.5 px-4 border border-border rounded text-text-dark no-underline tracking-wide whitespace-nowrap"
        >
          {nav.cta.label}
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden bg-transparent border-none cursor-pointer p-2"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-px bg-text-mid mb-1.5" />
          <div className="w-5 h-px bg-text-mid mb-1.5" />
          <div className="w-5 h-px bg-text-mid" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-text-mid no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.cta.href}
            className="text-sm text-text-dark font-medium border-t border-border pt-4 no-underline"
            onClick={() => setMobileOpen(false)}
          >
            {nav.cta.label} →
          </Link>
        </div>
      )}
    </nav>
  )
}
