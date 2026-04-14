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
  conservation: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C12 2 4 6 4 13a8 8 0 0 0 16 0C20 6 12 2 12 2z" />
      <path d="M12 7v10M9 10l3-3 3 3" opacity="0.5" />
    </svg>
  ),
  community: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="8" r="3" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <path d="M16 14c2.5 0 6 1.5 6 6" opacity="0.5" />
    </svg>
  ),
  education: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 10L12 4l10 6-10 6L2 10z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" opacity="0.5" />
      <line x1="22" y1="10" x2="22" y2="17" opacity="0.4" />
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
