import Link from 'next/link'
import { siteContent } from '@/content/site.content'

export default function Footer() {
  const { footer, siteName } = siteContent
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', padding: '24px 40px' }}>
      <div className="container-max" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{siteName}</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {footer.links.map((link) => (
            <Link key={link.label} href={link.href} style={{ fontSize: '11px', color: 'var(--color-text-muted)', textDecoration: 'none' }}>{link.label}</Link>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{footer.legal}</p>
      </div>
    </footer>
  )
}
