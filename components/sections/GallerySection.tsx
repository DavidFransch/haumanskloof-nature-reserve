import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'

export default function GallerySection() {
  const { gallery } = siteContent.home
  return (
    <section style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="container-max section-padding" style={{ paddingBottom: '1.5rem' }}>
        <p className="label-text" style={{ marginBottom: '8px' }}>{gallery.label}</p>
        <h2 className="font-heading" style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, color: 'var(--color-text-dark)', lineHeight: 1.25 }}>
          {gallery.heading}
        </h2>
      </div>
      {/* Image strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3px', height: '220px' }}>
        {gallery.items.map((item, i) => (
          <Link key={item.label} href={item.href} style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg-mid)', display: 'block', gridColumn: i === 0 ? 'span 1' : 'span 1' }}>
            <Image src={item.image} alt={item.label} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />
            <span style={{ position: 'absolute', bottom: '14px', left: '16px', color: 'rgba(255,255,255,0.65)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="container-max" style={{ padding: '16px 2.5rem 28px' }}>
        <Link href={gallery.cta.href} style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'none', letterSpacing: '0.04em' }}>
          {gallery.cta.label} →
        </Link>
      </div>
      <style>{`@media(max-width:640px){.gallery-strip{grid-template-columns:1fr!important;height:auto!important;}}`}</style>
    </section>
  )
}
