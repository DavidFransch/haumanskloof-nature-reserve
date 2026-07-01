import Link from 'next/link'
import { siteContent } from '@/content/site.content'

const socialLinks = siteContent.footer.links.filter((l) => l.external)
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Accommodation', href: '/accommodation' },
  { label: 'Activities', href: '/activities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const { siteName, siteTagline, siteLocation, siteEmail, footer } = siteContent
  return (
    <footer className="bg-bg-dark">
      {/* Main grid */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">

          {/* Left — Brand */}
          <div className="space-y-4">
            <p className="font-heading text-[16px] text-text-light">
              {siteName}
            </p>
            <p className="text-[14px] leading-relaxed text-white/55">
              {siteTagline}
            </p>
            <p className="text-[13px] text-white/40">
              {siteLocation}
            </p>
          </div>

          {/* Centre — Explore */}
          <div className="space-y-5">
            <span className="label-text text-white/40">Explore</span>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-white/55 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right — Contact & Social */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="label-text text-white/40">Get in touch</span>
              <a
                href={`mailto:${siteEmail}`}
                className="block text-[14px] text-white/55 no-underline transition-colors hover:text-white"
              >
                {siteEmail}
              </a>
            </div>

            <div className="space-y-4">
              <span className="label-text text-white/40">Follow us</span>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/55 no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-max flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-[12px] text-white/35">{footer.legal}</p>
          <a
            href="https://tugela.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-white/35 no-underline hover:text-white/60 transition-colors"
          >
            Designed by Tugela
          </a>
        </div>
      </div>
    </footer>
  )
}
