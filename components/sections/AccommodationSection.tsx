import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'
import { urlForImage } from '@/sanity/lib/image'
import type { SanityHomeAccommodation, SanityImage } from '@/sanity/lib/types'

// Resolve a unit image to a URL: Sanity image objects go through urlForImage,
// static string paths (the siteContent fallback) are used directly.
function resolveUnitImage(image: SanityImage | string | null | undefined): string | null {
  if (!image) return null
  return typeof image === 'string' ? image : urlForImage(image).width(600).height(400).url()
}

export default function AccommodationSection({ data }: { data?: SanityHomeAccommodation | null }) {
  const sc = siteContent.home.accommodation

  const label = data?.label ?? sc.label
  const heading = data?.heading ?? sc.heading
  const body = data?.body ?? sc.body
  const units = data?.units?.length ? data.units : sc.units

  // Render complete pairs only, but never hide a lone single unit.
  const displayCount = units.length === 1 ? 1 : Math.floor(units.length / 2) * 2
  const displayedUnits = units.slice(0, displayCount)

  return (
    <section className="section-padding border-b border-border">
      <div className="container-max">
        <p className="label-text mb-2">{label}</p>
        <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-light text-text-dark mb-3 leading-tight">
          {heading}
        </h2>
        <p className="text-text-mid leading-relaxed mb-10 max-w-[520px] text-[15px]">
          {body}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {displayedUnits.map((unit, i) => {
            const imageSrc = resolveUnitImage(unit.image)

            // Live unit when an image is set, "coming soon" placeholder otherwise.
            return imageSrc ? (
              <Link
                key={i}
                href="/accommodation"
                className="border border-border rounded-lg overflow-hidden no-underline block"
              >
                <div className="relative h-[200px] bg-bg-mid">
                  <Image
                    src={imageSrc}
                    alt={unit.imageAlt || unit.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={i === 0}
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-medium text-text-dark mb-1.5">
                    {unit.name}
                  </h3>
                  <p className="text-[13px] text-text-mid mb-3">{unit.desc}</p>
                  {unit.tag && (
                    <span className="inline-block text-[11px] py-1 px-2.5 bg-bg-light text-text-muted rounded-sm tracking-wide">
                      {unit.tag}
                    </span>
                  )}
                </div>
              </Link>
            ) : (
              <div
                key={i}
                className="border border-dashed border-border rounded-lg overflow-hidden opacity-50"
              >
                <div className="h-[200px] bg-bg-light flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted text-xl">
                    +
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl text-text-muted mb-1.5">
                    {unit.name}
                  </h3>
                  <p className="text-[13px] text-text-muted">{unit.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
