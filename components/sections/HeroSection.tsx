import Link from 'next/link'
import { siteContent } from '@/content/site.content'

export default function HeroSection() {
  const { hero } = siteContent.home
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', background: 'var(--color-bg-dark)', overflow: 'hidden' }}>
      {/* Background image — replace /images/hero.jpg with Bernie's drone shot */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.72) 100%)' }} />
      {/* Content */}
      <div className="container-max" style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 2.5rem 5rem' }}>
        <p className="label-text" style={{ color: 'rgba(220,210,180,0.7)', marginBottom: '16px' }}>{hero.eyebrow}</p>
        <h1 className="font-heading" style={{ color: 'var(--color-text-light)', fontWeight: 300, lineHeight: 1.15, marginBottom: '20px', fontSize: 'clamp(32px, 5vw, 56px)' }}>
          {hero.headline.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h1>
        <p style={{ color: 'rgba(240,235,224,0.78)', maxWidth: '480px', lineHeight: 1.75, marginBottom: '32px', fontSize: '15px' }}>
          {hero.subheadline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link href={hero.primaryCta.href} style={{ fontSize: '11px', padding: '10px 24px', background: 'var(--color-primary)', color: 'var(--color-primary-light)', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.06em' }}>
            {hero.primaryCta.label}
          </Link>
          <Link href={hero.secondaryCta.href} style={{ fontSize: '11px', padding: '10px 24px', background: 'transparent', color: 'var(--color-text-light)', border: '1px solid rgba(240,235,224,0.3)', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.06em' }}>
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '32px', right: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.35 }}>
        <div style={{ width: '1px', height: '48px', background: 'white' }} />
      </div>
    </section>
  )
}
