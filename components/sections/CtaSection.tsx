import Link from 'next/link'
import { siteContent } from '@/content/site.content'

export default function CtaSection() {
  const { cta } = siteContent.home
  return (
    <section style={{ background: 'var(--color-bg-dark)', padding: '80px 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="font-heading" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: 'var(--color-text-light)', marginBottom: '16px', lineHeight: 1.25 }}>
          {cta.heading}
        </h2>
        <p style={{ color: 'rgba(240,235,224,0.65)', lineHeight: 1.75, marginBottom: '32px', fontSize: '15px' }}>{cta.body}</p>
        <Link href={cta.button.href} style={{ display: 'inline-block', fontSize: '11px', padding: '11px 28px', background: 'var(--color-primary)', color: 'var(--color-primary-light)', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.06em' }}>
          {cta.button.label}
        </Link>
      </div>
    </section>
  )
}
