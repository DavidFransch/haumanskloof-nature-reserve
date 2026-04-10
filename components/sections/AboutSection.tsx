import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'

export default function AboutSection() {
  const { about } = siteContent.home
  return (
    <section id="about" className="section-padding" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="container-max" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <p className="label-text" style={{ marginBottom: '12px' }}>{about.label}</p>
          <h2 className="font-heading" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: 'var(--color-text-dark)', marginBottom: '20px', lineHeight: 1.25 }}>
            {about.heading}
          </h2>
          <p style={{ color: 'var(--color-text-mid)', lineHeight: 1.75, marginBottom: '24px', fontSize: '15px' }}>{about.body}</p>
          <Link href={about.cta.href} style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'none', letterSpacing: '0.04em' }}>
            {about.cta.label} →
          </Link>
        </div>
        <div style={{ position: 'relative', height: '320px', borderRadius: '8px', overflow: 'hidden', background: 'var(--color-bg-mid)' }}>
          <Image src="/images/about.jpg" alt="Haumanskloof Nature Reserve" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Property photo</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about .container-max{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
