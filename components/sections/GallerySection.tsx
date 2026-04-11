import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'

export default function GallerySection() {
  const { gallery } = siteContent.home
  return (
    <section className="border-b border-border">
      <div className="container-max section-padding pb-6">
        <p className="label-text mb-2">{gallery.label}</p>
        <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-light text-text-dark leading-tight">
          {gallery.heading}
        </h2>
      </div>

      {/* Image strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-[3px] h-auto sm:h-[220px]">
        {gallery.items.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            className={`relative overflow-hidden bg-bg-mid block h-[180px] sm:h-full ${i === 0 ? 'sm:col-span-2' : ''}`}
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-3.5 left-4 text-white/65 text-[10px] tracking-widest uppercase">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="container-max py-4 px-10">
        <Link
          href={gallery.cta.href}
          className="text-[13px] text-text-muted no-underline tracking-wide"
        >
          {gallery.cta.label} →
        </Link>
      </div>
    </section>
  )
}
