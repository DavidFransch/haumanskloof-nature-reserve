import Link from 'next/link'
import { siteContent } from '@/content/site.content'

export default function Footer() {
  const { footer, siteName } = siteContent
  return (
    <footer className="border-t border-border py-6 px-10">
      <div className="container-max flex flex-wrap items-center justify-between gap-4">
        <span className="text-[11px] tracking-widest uppercase text-text-muted">{siteName}</span>
        <div className="flex gap-6">
          {footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] text-text-muted no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-[11px] text-text-muted">{footer.legal}</p>
      </div>
    </footer>
  )
}
