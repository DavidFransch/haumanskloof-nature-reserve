import Link from 'next/link'
import { siteContent } from '@/content/site.content'

export default function HeroSection() {
  const { hero } = siteContent.home
  return (
    <section className="relative min-h-screen flex items-center bg-bg-dark overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero.jpg)' }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Content */}
      <div className="container-max relative z-10 w-full px-10 py-24 lg:py-32">
        <p className="label-text text-[rgba(220,210,180,0.7)] mb-4">{hero.eyebrow}</p>

        <h1 className="font-heading text-text-light font-light leading-tight mb-6 text-[clamp(28px,4.5vw,48px)] max-w-[700px]">
          {hero.headline.split('\n').map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <div className="max-w-[520px] space-y-4 mb-8">
          <p className="text-[rgba(240,235,224,0.9)] leading-relaxed text-[15px] lg:text-base">
            {hero.intro}
          </p>
          <p className="text-[rgba(240,235,224,0.75)] leading-relaxed text-[14px] lg:text-[15px]">
            {hero.body}
          </p>
          <p className="text-[rgba(240,235,224,0.85)] leading-relaxed text-[14px] lg:text-[15px] italic">
            {hero.cta}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={hero.primaryCta.href}
            className="text-[11px] py-2.5 px-6 bg-primary text-primary-light rounded-sm no-underline tracking-wider hover:bg-primary-hover transition-colors"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="text-[11px] py-2.5 px-6 bg-transparent text-text-light border border-white/30 rounded-sm no-underline tracking-wider hover:bg-white/10 transition-colors"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2 opacity-35">
        <div className="w-px h-12 bg-white" />
      </div>
    </section>
  )
}
