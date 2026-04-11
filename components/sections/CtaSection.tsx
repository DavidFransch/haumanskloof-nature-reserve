import Link from 'next/link'
import { siteContent } from '@/content/site.content'

export default function CtaSection() {
  const { cta } = siteContent.home
  return (
    <section className="bg-bg-dark py-20 px-10 text-center">
      <div className="max-w-[500px] mx-auto">
        <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-light text-text-light mb-4 leading-tight">
          {cta.heading}
        </h2>
        <p className="text-[rgba(240,235,224,0.65)] leading-relaxed mb-8 text-[15px]">{cta.body}</p>
        <Link
          href={cta.button.href}
          className="inline-block text-[11px] py-2.5 px-7 bg-primary text-primary-light rounded-sm no-underline tracking-wider"
        >
          {cta.button.label}
        </Link>
      </div>
    </section>
  )
}
