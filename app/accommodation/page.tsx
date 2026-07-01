import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VimeoEmbed from '@/components/ui/VimeoEmbed'
import Disclosure from '@/components/ui/Disclosure'
import { siteContent } from '@/content/site.content'
import AccommodationGallery from '@/components/accommodation/AccommodationGallery'
import { sanityFetch } from '@/sanity/lib/client'
import { accommodationPageQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import type { SanityAccommodationPage } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: `Accommodation · ${siteContent.siteName}`,
  description:
    'Stay at Haumanskloof Nature Reserve — eco-conscious comfort in the Breede Valley mountains. Explore the Bunkhouse with mountain views, wood-fired hot tub, and total privacy.',
}

const amenityIcons: Record<string, React.ReactNode> = {
  mountain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20 L9 6 L13 14 L17 8 L22 20 H2 Z" />
    </svg>
  ),
  fire: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-4-4-8-4-8z" />
      <path d="M12 14c-1.1 0-2 .9-2 2a2 2 0 0 0 4 0c0-1.1-.9-2-2-2z" opacity="0.5" />
    </svg>
  ),
  solar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  kitchen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M18 8a3 3 0 0 0-3-3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  hottub: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M2 12c0 5 4 9 10 9s10-4 10-9" />
      <path d="M2 12c0-3 2-5 5-5h10c3 0 5 2 5 5" />
      <path d="M7 12c0-2-1-3-3-3" opacity="0.5" />
      <path d="M17 12c0-2 1-3 3-3" opacity="0.5" />
      <path d="M10 15v2" />
      <path d="M14 15v2" />
    </svg>
  ),
  privacy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  toilet: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M7 3h10v8a5 5 0 0 1-10 0V3z" />
      <path d="M5 21h14" />
      <path d="M12 16v5" />
    </svg>
  ),
  nowifi: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" opacity="0.4" />
      <path d="M5 12.5a9 9 0 0 1 5.5-2.5" />
      <path d="M14 10a9 9 0 0 1 5 2.5" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
}

export default async function AccommodationPage() {
  const data = await sanityFetch<SanityAccommodationPage>({
    query: accommodationPageQuery,
    tags: ['accommodationPage'],
  })

  const sc = siteContent.accommodation

  // Normalized fields — Sanity takes precedence, siteContent is the fallback
  const hero = data?.hero ?? sc.hero
  const droneVideo = data?.droneVideo ?? sc.droneVideo
  const compostToilet = {
    ...(data?.compostToilet ?? sc.compostToilet),
    image: data?.compostToilet?.image
      ? urlForImage(data.compostToilet.image).width(800).height(600).url()
      : '/images/gallery/accommodation-bunkhouse-facilities/accommodation-bunkhouse-facilities-2.webp',
  }
  const amenities = data?.amenities?.length ? data.amenities : sc.amenities
  const cta = data?.cta ?? sc.cta

  const bunkhouse = {
    title: data?.bunkhouse?.title ?? sc.bunkhouse.title,
    capacity: data?.bunkhouse?.capacity ?? sc.bunkhouse.capacity,
    intro: data?.bunkhouse?.intro ?? sc.bunkhouse.intro,
    details: data?.bunkhouse?.details?.length ? data.bunkhouse.details : sc.bunkhouse.details,
    rates: data?.bunkhouse?.rates ?? sc.bunkhouse.rates,
    storyTitle: data?.bunkhouse?.storyTitle ?? sc.bunkhouse.storyTitle,
    story: data?.bunkhouse?.story?.length
      ? data.bunkhouse.story.map((p) => p.text)
      : sc.bunkhouse.story.split('\n\n').filter(Boolean),
    mainImage: data?.bunkhouse?.mainImage
      ? urlForImage(data.bunkhouse.mainImage).width(900).height(600).url()
      : sc.bunkhouse.mainImage,
    mainImageAlt: data?.bunkhouse?.mainImageAlt ?? (data?.bunkhouse?.title ?? sc.bunkhouse.title),
    gallery: data?.bunkhouse?.gallery?.length
      ? data.bunkhouse.gallery.map((item) => ({
          label: item.label,
          image: urlForImage(item.image).width(800).height(600).url(),
          category: item.category ?? '',
          altText: item.altText || item.label,
        }))
      : sc.bunkhouse.gallery,
  }

  // Sale over the base nightly rate — only shown when toggled on and the sale
  // price is a real saving. Falls back to normal pricing otherwise.
  const rates = bunkhouse.rates
  const sale = rates.sale
  const salePrice = sale?.salePrice ?? 0
  const saleActive = Boolean(sale?.onSale) && salePrice > 0 && salePrice < rates.baseRate
  const savingsPct = saleActive ? Math.round((1 - salePrice / rates.baseRate) * 100) : 0

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

        {/* The Bunkhouse Section */}
        <section id="bunkhouse" className="section-padding border-b border-border">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[340px] md:h-[450px] rounded-lg overflow-hidden bg-bg-mid">
              <Image
                src={bunkhouse.mainImage}
                alt={bunkhouse.mainImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              <span className="absolute bottom-4 left-5 text-white/65 text-[10px] tracking-widest uppercase">
                {bunkhouse.capacity}
              </span>
            </div>
            <div>
              <p className="label-text mb-4">The Flagship Unit</p>
              <h2 className="font-heading text-[clamp(28px,3.5vw,42px)] font-light text-text-dark leading-tight mb-6">
                {bunkhouse.title}
              </h2>
              <p className="text-text-mid leading-relaxed mb-8 text-[15px]">
                {bunkhouse.intro}
              </p>
              <div className="space-y-4">
                {bunkhouse.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-[14px] text-text-mid">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-heading text-xl text-text-dark mb-4">Rates</h3>
                <div className="bg-bg-light/50 rounded-md p-6 border border-border/50">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="label-text text-[10px]">Seasonal Pricing</p>
                    {saleActive && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-primary">
                        <span aria-hidden="true">✦</span>
                        {sale?.label || 'Special Offer'}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      {saleActive ? (
                        <>
                          <p className="text-lg font-medium text-text-dark">
                            <span className="text-base font-normal text-text-muted line-through mr-1.5">
                              R{rates.baseRate.toLocaleString()}
                            </span>
                            <span className="text-primary">R{salePrice.toLocaleString()}</span>{' '}
                            <span className="text-sm font-normal text-text-mid">/ night</span>
                          </p>
                          <p className="text-[12px] text-text-mid flex items-center flex-wrap gap-x-2 gap-y-1">
                            {rates.baseRateCaption}
                            {savingsPct > 0 && (
                              <span className="inline-block text-[10px] tracking-wide text-primary bg-primary-light px-1.5 py-0.5 rounded-sm">
                                Save {savingsPct}%
                              </span>
                            )}
                          </p>
                          {sale?.caption && (
                            <p className="text-[11px] text-primary/80 mt-1">{sale.caption}</p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-text-dark font-medium text-lg">
                            R{rates.baseRate.toLocaleString()}{' '}
                            <span className="text-sm font-normal text-text-mid">/ night</span>
                          </p>
                          <p className="text-[12px] text-text-mid">{rates.baseRateCaption}</p>
                        </>
                      )}
                    </div>
                    <div className="pt-4 sm:pt-0 sm:pl-6 sm:border-l border-border/30">
                      <p className="text-text-dark font-medium text-lg">
                        R{bunkhouse.rates.additionalRate.toLocaleString()}{' '}
                        <span className="text-sm font-normal text-text-mid">/ person</span>
                      </p>
                      <p className="text-[12px] text-text-mid">{bunkhouse.rates.additionalRateCaption}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bunkhouse Story Section */}
        <section className="border-b border-border">
          <div className="container-max px-10 py-0">
            <Disclosure title={bunkhouse.storyTitle}>
              <div className="space-y-6">
                {bunkhouse.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Disclosure>
          </div>
        </section>

        {/* Drone Video Section */}
        {droneVideo.vimeoId !== 'PLACEHOLDER' && (
          <section className="bg-bg-dark py-24 md:py-32 overflow-hidden border-b border-border">
            <div className="container-max px-10">
              <div className="text-center mb-8">
                <h3 className="font-heading text-[clamp(24px,3vw,36px)] text-white font-light tracking-wide">
                  Experience Haumanskloof From Above
                </h3>
              </div>
              <div className="w-full max-w-[900px] mx-auto">
                <VimeoEmbed
                  videoId={droneVideo.vimeoId}
                  title={droneVideo.title}
                />
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section className="border-b border-border bg-white">
          <div className="container-max section-padding">
            <p className="label-text mb-3">Accommodation Detail</p>
            <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-light text-text-dark leading-tight mb-12">
              Inside, Outside, and Beyond
            </h2>

            <AccommodationGallery gallery={bunkhouse.gallery} />
          </div>
        </section>

        {/* Compost Toilet Section */}
        <section className="section-padding border-b border-border bg-white">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src={compostToilet.image}
                alt={data?.compostToilet?.imageAlt || compostToilet.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="label-text mb-4">{compostToilet.eyebrow}</p>
              <h2 className="font-heading text-[clamp(28px,3.5vw,42px)] font-light text-text-dark leading-tight mb-6">
                {compostToilet.heading}
              </h2>
              <p className="text-text-mid leading-relaxed text-[15px] mb-4">
                {compostToilet.body}
              </p>
              <p className="text-[13px] text-text-muted">
                {compostToilet.note}
              </p>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="bg-bg-light border-b border-border">
          <div className="container-max section-padding">
            <div className="text-center mb-16 max-w-[600px] mx-auto">
              <p className="label-text mb-3">Amenities</p>
              <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-light text-text-dark leading-tight mb-4">
                Thoughtfully equipped for an off-grid experience
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10">
              {amenities.map((amenity, i) => (
                <div key={i} className="flex gap-5">
                  <div className="text-primary shrink-0 mt-1">
                    {amenityIcons[amenity.icon]}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-medium text-text-dark mb-2">
                      {amenity.title}
                    </h3>
                    <p className="text-[13px] text-text-mid leading-relaxed">
                      {amenity.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ nudge */}
        <div className="py-6 px-10 text-center border-b border-border">
          <p className="text-[13px] text-text-muted">
            Have questions about your stay?{' '}
            <Link href="/faq" className="underline underline-offset-2 hover:text-text-mid transition-colors">
              Read our FAQs →
            </Link>
          </p>
        </div>

        {/* CTA Section */}
        <section className="bg-bg-dark py-24 px-10 text-center">
          <div className="max-w-[500px] mx-auto text-white">
            <h2 className="font-heading text-[clamp(26px,3.5vw,40px)] font-light mb-4 leading-tight">
              {cta.heading}
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 text-[15px]">
              {cta.body}
            </p>
            <Link
              href="/contact"
              className="inline-block text-[11px] py-3 px-8 bg-primary text-primary-light rounded-sm no-underline tracking-widest hover:bg-primary-hover transition-all"
            >
              Enquire for bookings
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
