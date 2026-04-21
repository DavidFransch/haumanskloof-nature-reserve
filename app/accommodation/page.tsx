import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VimeoEmbed from '@/components/ui/VimeoEmbed'
import Disclosure from '@/components/ui/Disclosure'
import { siteContent } from '@/content/site.content'

export const metadata: Metadata = {
  title: `Accommodation · ${siteContent.siteName}`,
  description:
    'Stay at Haumanskloof Nature Reserve — eco-conscious comfort in the Breede Valley mountains. Explore the Bunkhouse with mountain views, wood-fired hot tub, and total privacy.',
}

const amenityIcons: Record<string, React.ReactNode> = {
  mountain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 20 L12 4 L20 20" />
      <path d="M8 12 L10 10 L12 11 L14 9 L16 12" opacity="0.5" />
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
}

export default function AccommodationPage() {
  const { accommodation } = siteContent

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-10 py-20 md:py-28 bg-bg-light border-b border-border">
          <div className="container-max">
            <p className="label-text mb-4">{accommodation.hero.eyebrow}</p>
            <h1 className="font-heading text-[clamp(32px,5vw,56px)] font-light text-text-dark leading-tight mb-6 max-w-[640px]">
              {accommodation.hero.heading.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-[15px] text-text-mid leading-relaxed max-w-[560px]">
              {accommodation.hero.intro}
            </p>
          </div>
        </section>

        {/* The Bunkhouse Section */}
        <section id="bunkhouse" className="section-padding border-b border-border">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[340px] md:h-[450px] rounded-lg overflow-hidden bg-bg-mid">
              <Image
                src={accommodation.bunkhouse.gallery[3].image}
                alt={accommodation.bunkhouse.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span className="absolute bottom-4 left-5 text-white/65 text-[10px] tracking-widest uppercase">
                {accommodation.bunkhouse.capacity}
              </span>
            </div>
            <div>
              <p className="label-text mb-4">The Flagship Unit</p>
              <h2 className="font-heading text-[clamp(28px,3.5vw,42px)] font-light text-text-dark leading-tight mb-6">
                {accommodation.bunkhouse.title}
              </h2>
              <p className="text-text-mid leading-relaxed mb-8 text-[15px]">
                {accommodation.bunkhouse.intro}
              </p>
              <div className="space-y-4">
                {accommodation.bunkhouse.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-[14px] text-text-mid">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bunkhouse Story Section */}
        <section className="border-b border-border">
          <div className="container-max px-10 py-0">
            <Disclosure title={accommodation.bunkhouse.storyTitle}>
              <div className="space-y-6">
                {accommodation.bunkhouse.story.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Disclosure>
          </div>
        </section>

        {/* Drone Video Section */}
        {accommodation.droneVideo.vimeoId !== 'PLACEHOLDER' && (
          <section className="bg-bg-dark py-24 md:py-32 overflow-hidden border-b border-border">
            <div className="container-max px-10">
              <div className="text-center mb-8">
                <h3 className="font-heading text-[clamp(24px,3vw,36px)] text-white font-light tracking-wide">
                  Experience Haumanskloof From Above
                </h3>
              </div>
              <div className="w-full max-w-[900px] mx-auto">
                <VimeoEmbed
                  videoId={accommodation.droneVideo.vimeoId}
                  title={accommodation.droneVideo.title}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accommodation.bunkhouse.gallery.map((item, index) => (
                <div key={index} className="space-y-3 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-bg-mid border border-border/50">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                       <span className="text-[10px] text-white tracking-widest uppercase border border-white/30 px-3 py-1.5 rounded-sm backdrop-blur-sm">
                         Enlarge
                       </span>
                    </div>
                  </div>
                  <div>
                    <p className="label-text text-[9px] text-text-muted mb-0.5">{item.category}</p>
                    <p className="text-[13px] text-text-dark font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
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
              {accommodation.amenities.map((amenity, i) => (
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

        {/* CTA Section */}
        <section className="bg-bg-dark py-24 px-10 text-center">
          <div className="max-w-[500px] mx-auto text-white">
            <h2 className="font-heading text-[clamp(26px,3.5vw,40px)] font-light mb-4 leading-tight">
              {accommodation.cta.heading}
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 text-[15px]">
              {accommodation.cta.body}
            </p>
            <Link
              href={accommodation.cta.button.href}
              className="inline-block text-[11px] py-3 px-8 bg-primary text-primary-light rounded-sm no-underline tracking-widest hover:bg-primary-hover transition-all"
            >
              {accommodation.cta.button.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
