import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { siteContent } from '@/content/site.content'

export const metadata: Metadata = {
  title: `About · ${siteContent.siteName}`,
  description:
    'Learn about Haumanskloof Nature Reserve — a family-run sanctuary in the Breede Valley mountains committed to conservation, ecology, and sustainable ecotourism.',
}

const valueIcons: Record<string, React.ReactNode> = {
  integrity: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" opacity="0.5" />
      <circle cx="12" cy="15" r="0.5" fill="currentColor" />
    </svg>
  ),
  stewardship: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z" />
      <path d="M12 7v5l3 3" opacity="0.5" />
      <circle cx="12" cy="12" r="1" opacity="0.3" />
    </svg>
  ),
  passion: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
}

export default function AboutPage() {
  const { about } = siteContent

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-10 py-20 md:py-28 bg-bg-light border-b border-border">
          <div className="container-max">
            <p className="label-text mb-4">{about.hero.eyebrow}</p>
            <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-light text-text-dark leading-tight mb-6 max-w-[640px]">
              {about.hero.heading.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-[15px] text-text-mid leading-relaxed max-w-[560px]">
              {about.hero.intro}
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding border-b border-border">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="label-text mb-4">Our history</p>
              <div className="space-y-5">
                {about.story.map((paragraph, i) => (
                  <p key={i} className="text-text-mid leading-relaxed text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative h-[380px] lg:h-[460px] rounded-lg overflow-hidden bg-bg-mid">
              <Image
                src="/images/about.jpg"
                alt="Haumanskloof Nature Reserve landscape"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/25 text-[11px] tracking-widest uppercase">
                  Property photo
                </span>
              </div>
              {/* Subtle caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-4 left-5 text-white/55 text-[10px] tracking-widest uppercase">
                Breede Valley · Western Cape
              </span>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding border-b border-border bg-bg-light/40">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="label-text mb-4 text-text-muted">Our Vision</p>
              <h2 className="font-heading text-[clamp(24px,3vw,32px)] font-light text-text-dark leading-tight italic">
                &ldquo;{about.vision}&rdquo;
              </h2>
            </div>
            <div>
              <p className="label-text mb-4 text-text-muted">Our Mission</p>
              <p className="text-text-dark/80 leading-relaxed text-[17px] font-light">
                {about.mission}
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-b border-border">
          <div className="container-max section-padding pb-0">
            <p className="label-text mb-3">What guides us</p>
            <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-light text-text-dark leading-tight mb-12 max-w-[480px]">
              Our values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
            {about.values.map((value, i) => (
              <div
                key={value.title}
                className={`py-10 px-8 ${i < about.values.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}
              >
                <div className="text-text-muted mb-4">{valueIcons[value.icon]}</div>
                <h3 className="font-heading text-lg font-medium text-text-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-[13px] text-text-mid leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-bg-dark py-20 px-10 text-center">
          <div className="max-w-[500px] mx-auto">
            <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-light text-text-light mb-4 leading-tight">
              {about.cta.heading}
            </h2>
            <p className="text-[rgba(240,235,224,0.65)] leading-relaxed mb-8 text-[15px]">
              {about.cta.body}
            </p>
            <Link
              href={about.cta.button.href}
              className="inline-block text-[11px] py-2.5 px-7 bg-primary text-primary-light rounded-sm no-underline tracking-wider hover:bg-primary-hover transition-colors"
            >
              {about.cta.button.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
