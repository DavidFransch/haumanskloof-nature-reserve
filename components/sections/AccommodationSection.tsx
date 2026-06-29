import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'
import type { HomeAccommodation } from '@/sanity/lib/types'

export default function AccommodationSection({ data }: { data?: HomeAccommodation | null }) {
  const accommodation = data ?? siteContent.home.accommodation
  const { bunkhouse, nextUnit } = accommodation

  return (
    <section className="section-padding border-b border-border">
      <div className="container-max">
        <p className="label-text mb-2">{accommodation.label}</p>
        <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-light text-text-dark mb-3 leading-tight">
          {accommodation.heading}
        </h2>
        <p className="text-text-mid leading-relaxed mb-10 max-w-[520px] text-[15px]">
          {accommodation.body}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* The Bunkhouse — dedicated first unit */}
          <Link
            href="/accommodation"
            className="border border-border rounded-lg overflow-hidden no-underline block"
          >
            <div className="relative h-[200px] bg-bg-mid">
              <Image
                src={bunkhouse.image}
                alt={bunkhouse.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-xl font-medium text-text-dark mb-1.5">
                {bunkhouse.name}
              </h3>
              <p className="text-[13px] text-text-mid mb-3">{bunkhouse.desc}</p>
              <span className="inline-block text-[11px] py-1 px-2.5 bg-bg-light text-text-muted rounded-sm tracking-wide">
                {bunkhouse.tag}
              </span>
            </div>
          </Link>

          {/* Second slot — live unit when image is set, coming soon otherwise */}
          {nextUnit.image ? (
            <Link
              href="/accommodation"
              className="border border-border rounded-lg overflow-hidden no-underline block"
            >
              <div className="relative h-[200px] bg-bg-mid">
                <Image
                  src={nextUnit.image}
                  alt={nextUnit.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-medium text-text-dark mb-1.5">
                  {nextUnit.name}
                </h3>
                <p className="text-[13px] text-text-mid mb-3">{nextUnit.desc}</p>
                {nextUnit.tag && (
                  <span className="inline-block text-[11px] py-1 px-2.5 bg-bg-light text-text-muted rounded-sm tracking-wide">
                    {nextUnit.tag}
                  </span>
                )}
              </div>
            </Link>
          ) : (
            <div className="border border-dashed border-border rounded-lg overflow-hidden opacity-50">
              <div className="h-[200px] bg-bg-light flex items-center justify-center">
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted text-xl">
                  +
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl text-text-muted mb-1.5">
                  {nextUnit.name}
                </h3>
                <p className="text-[13px] text-text-muted">{nextUnit.desc}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
