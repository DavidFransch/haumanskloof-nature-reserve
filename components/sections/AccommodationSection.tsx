import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'

export default function AccommodationSection() {
  const { accommodation } = siteContent.home
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="container-max">
        <p className="label-text" style={{ marginBottom: '8px' }}>{accommodation.label}</p>
        <h2 className="font-heading" style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, color: 'var(--color-text-dark)', marginBottom: '12px', lineHeight: 1.25 }}>
          {accommodation.heading}
        </h2>
        <p style={{ color: 'var(--color-text-mid)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '520px', fontSize: '15px' }}>{accommodation.body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {accommodation.units.map((unit) => (
            <Link key={unit.name} href={unit.href} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', textDecoration: 'none', display: 'block' }}>
              <div style={{ position: 'relative', height: '200px', background: 'var(--color-bg-mid)' }}>
                <Image src={unit.image} alt={unit.name} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Interior photo</span>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--color-text-dark)', marginBottom: '6px' }}>{unit.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-mid)', marginBottom: '12px' }}>{unit.desc}</p>
                <span style={{ display: 'inline-block', fontSize: '11px', padding: '4px 10px', background: 'var(--color-bg-light)', color: 'var(--color-text-muted)', borderRadius: '3px', letterSpacing: '0.04em' }}>{unit.tag}</span>
              </div>
            </Link>
          ))}
          {/* Coming soon placeholder */}
          <div style={{ border: '1px dashed var(--color-border)', borderRadius: '8px', overflow: 'hidden', opacity: 0.5 }}>
            <div style={{ height: '200px', background: 'var(--color-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '20px' }}>+</div>
            </div>
            <div style={{ padding: '20px' }}>
              <h3 className="font-heading" style={{ fontSize: '20px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>More coming soon</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Additional accommodation will be added as the reserve grows.</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){.container-max > div:last-child{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
