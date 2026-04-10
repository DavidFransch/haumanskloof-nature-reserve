'use client'

import Link from 'next/link'
import { useState } from 'react'
import { siteContent } from '@/content/site.content'

export default function Navbar() {
  const { nav } = siteContent
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div className="container-max" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', height: '64px' }}>

        {/* Logo */}
        <Link href="/" style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-dark)', textDecoration: 'none' }}>
          {nav.logo}
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {nav.links.map((link) => (
            <div key={link.label} style={{ position: 'relative' }}>
              {link.dropdown ? (
                <div
                  onMouseEnter={() => setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button style={{ fontSize: '12px', letterSpacing: '0.04em', color: 'var(--color-text-mid)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {link.label} <span style={{ fontSize: '10px', opacity: 0.6 }}>▾</span>
                  </button>
                  {dropdownOpen === link.label && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '4px 0', minWidth: '160px', zIndex: 100 }}>
                      {link.dropdown.map((item) => (
                        <Link key={item.label} href={item.href} style={{ display: 'block', padding: '8px 16px', fontSize: '12px', color: 'var(--color-text-mid)', textDecoration: 'none' }}
                          onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--color-bg-light)'}
                          onMouseLeave={e => (e.target as HTMLElement).style.background = 'transparent'}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={link.href} style={{ fontSize: '12px', letterSpacing: '0.04em', color: 'var(--color-text-mid)', textDecoration: 'none' }}>
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={nav.cta.href} style={{ fontSize: '11px', padding: '7px 16px', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-dark)', textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
          className="desktop-nav"
        >
          {nav.cta.label}
        </Link>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }} className="mobile-btn" aria-label="Toggle menu">
          <div style={{ width: '20px', height: '1px', background: 'var(--color-text-mid)', marginBottom: '5px' }} />
          <div style={{ width: '20px', height: '1px', background: 'var(--color-text-mid)', marginBottom: '5px' }} />
          <div style={{ width: '20px', height: '1px', background: 'var(--color-text-mid)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: 'white', borderTop: '1px solid var(--color-border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {nav.links.map((link) => (
            <Link key={link.label} href={link.href} style={{ fontSize: '14px', color: 'var(--color-text-mid)', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href={nav.cta.href} style={{ fontSize: '14px', color: 'var(--color-text-dark)', fontWeight: 500, borderTop: '1px solid var(--color-border)', paddingTop: '16px', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
            {nav.cta.label} →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
