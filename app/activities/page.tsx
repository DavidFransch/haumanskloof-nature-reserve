import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { siteContent } from '@/content/site.content'
import { sanityFetch } from '@/sanity/lib/client'
import { activitiesPageQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import type { SanityActivitiesPage } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: `Activities · ${siteContent.siteName}`,
  description:
    'Explore what to do at Haumanskloof Nature Reserve — wildlife walks, ancient San rock art, hiking, and hands-on camera trap monitoring in the Breede Valley mountains.',
}

const activityIcons: Record<string, React.ReactNode> = {
  wildlife: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M8 14 Q12 20 12 22 Q12 20 16 14" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  cycling: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="17" r="4" />
      <circle cx="18" cy="17" r="4" />
      <path d="M6 17 L10 9 L14 9 L18 17" />
      <path d="M10 9 L13 17" />
      <path d="M14 9 L17 6" />
    </svg>
  ),
  mountain: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 20 L9 6 L13 14 L17 8 L22 20 H2 Z" />
    </svg>
  ),
  hiking: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 20 L8 10 L12 15 L16 8 L21 20" />
      <circle cx="18" cy="5" r="2" opacity="0.5" />
    </svg>
  ),
  camera: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  gym: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="7" width="3" height="10" rx="0.5" />
      <rect x="5" y="9.5" width="2" height="5" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <rect x="17" y="9.5" width="2" height="5" />
      <rect x="19" y="7" width="3" height="10" rx="0.5" />
    </svg>
  ),
}

export default async function ActivitiesPage() {
  const data = await sanityFetch<SanityActivitiesPage | null>({
    query: activitiesPageQuery,
    tags: ['activitiesPage'],
  }).catch(() => null)

  const sc = siteContent.activities

  const hero = data?.hero ?? sc.hero
  const cta = data?.cta ?? { heading: sc.cta.heading, body: sc.cta.body }

  const items = data?.items?.length
    ? data.items.map((item) => ({
        id: item.id,
        icon: item.icon,
        tag: item.tag,
        title: item.title,
        body: item.body,
        highlights: item.highlights ?? [],
        image: item.image
          ? urlForImage(item.image).width(800).height(600).url()
          : '',
        imageAlt: item.imageAlt ?? item.title,
      }))
    : sc.items.map((item) => ({
        id: item.id,
        icon: item.icon,
        tag: item.tag,
        title: item.title,
        body: item.body,
        highlights: item.highlights,
        image: item.image,
        imageAlt: item.title,
      }))

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-10 py-20 md:py-28 bg-bg-light border-b border-border">
          <div className="container-max">
            <p className="label-text mb-4">{hero.eyebrow}</p>
            <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-light text-text-dark leading-tight mb-6 max-w-[640px]">
              {hero.heading.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-[15px] text-text-mid leading-relaxed max-w-[560px]">
              {hero.intro}
            </p>
          </div>
        </section>

        {/* Activities list */}
        <section className="border-b border-border">
          {items.map((activity, i) => {
            const isEven = i % 2 === 0
            return (
              <article
                key={activity.id}
                id={activity.id}
                className="border-b border-border last:border-b-0"
              >
                <div
                  className={`container-max grid grid-cols-1 lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}
                >
                  {/* Image */}
                  <div className="relative h-[280px] lg:h-[420px] bg-bg-mid overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-4 left-5 text-white/50 text-[10px] tracking-widest uppercase">
                      {activity.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="px-8 py-12 lg:px-14 lg:py-16 flex flex-col justify-center">
                    <div className="text-text-muted mb-5">{activityIcons[activity.icon]}</div>
                    <p className="label-text mb-3">{activity.tag}</p>
                    <h2 className="font-heading text-[clamp(22px,2.5vw,32px)] font-light text-text-dark leading-tight mb-4">
                      {activity.title}
                    </h2>
                    <p className="text-text-mid leading-relaxed text-[15px] mb-8">
                      {activity.body}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-8">
                      {activity.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-[5px] block w-1 h-1 rounded-full bg-primary shrink-0" />
                          <span className="text-[13px] text-text-mid">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/contact?enquiry=${activity.id}`}
                      className="self-start text-[11px] py-2 px-5 border border-border rounded-sm text-text-dark no-underline tracking-wide hover:bg-bg-light transition-colors"
                    >
                      Enquire about this →
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        {/* CTA */}
        <section className="bg-bg-dark py-20 px-10 text-center">
          <div className="max-w-[500px] mx-auto">
            <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-light text-text-light mb-4 leading-tight">
              {cta.heading}
            </h2>
            <p className="text-[rgba(240,235,224,0.65)] leading-relaxed mb-8 text-[15px]">
              {cta.body}
            </p>
            <Link
              href="/contact"
              className="inline-block text-[11px] py-2.5 px-7 bg-primary text-primary-light rounded-sm no-underline tracking-wider hover:bg-primary-hover transition-colors"
            >
              Enquire about activities
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
