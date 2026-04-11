import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'

export default function AccommodationSection() {
  const { accommodation } = siteContent.home
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
          {accommodation.units.map((unit) => (
            <Link
              key={unit.name}
              href={unit.href}
              className="border border-border rounded-lg overflow-hidden no-underline block"
            >
              <div className="relative h-[200px] bg-bg-mid">
                <Image src={unit.image} alt={unit.name} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-[10px] tracking-widest uppercase">
                    Interior photo
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-medium text-text-dark mb-1.5">
                  {unit.name}
                </h3>
                <p className="text-[13px] text-text-mid mb-3">{unit.desc}</p>
                <span className="inline-block text-[11px] py-1 px-2.5 bg-bg-light text-text-muted rounded-sm tracking-wide">
                  {unit.tag}
                </span>
              </div>
            </Link>
          ))}

          {/* Coming soon placeholder */}
          <div className="border border-dashed border-border rounded-lg overflow-hidden opacity-50">
            <div className="h-[200px] bg-bg-light flex items-center justify-center">
              <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted text-xl">
                +
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-heading text-xl text-text-muted mb-1.5">More coming soon</h3>
              <p className="text-[13px] text-text-muted">
                Additional accommodation will be added as the reserve grows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
