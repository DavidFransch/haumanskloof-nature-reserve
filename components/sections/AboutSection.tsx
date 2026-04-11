import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'

export default function AboutSection() {
  const { about } = siteContent.home
  return (
    <section id="about" className="section-padding border-b border-border">
      <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="label-text mb-3">{about.label}</p>
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-light text-text-dark mb-5 leading-tight">
            {about.heading}
          </h2>
          <p className="text-text-mid leading-relaxed mb-6 text-[15px]">{about.body}</p>
          <Link
            href={about.cta.href}
            className="text-[13px] text-text-muted no-underline tracking-wide"
          >
            {about.cta.label} →
          </Link>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden bg-bg-mid">
          <Image
            src="/images/about.jpg"
            alt="Haumanskloof Nature Reserve"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/25 text-[11px] tracking-widest uppercase">
              Property photo
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
