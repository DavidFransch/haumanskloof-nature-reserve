import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'
import { urlForImage } from '@/sanity/lib/image'
import { galleryCategoryLabels } from '@/sanity/lib/types'
import type { SanityHomeGallery } from '@/sanity/lib/types'

interface StripSlot {
  href: string
  src: string
  alt: string
  label: string
}

export default function GallerySection({ data }: { data?: SanityHomeGallery | null }) {
  const label = data?.label ?? siteContent.home.gallery.label
  const heading = data?.heading ?? siteContent.home.gallery.heading
  const strip = data?.strip ?? []
  const fallbackItems = siteContent.home.gallery.items ?? []

  // Three slots. Use the managed strip image at each index; otherwise fall back
  // to the static siteContent item at that position.
  const slots: StripSlot[] = []
  for (let i = 0; i < 3; i++) {
    const item = strip[i]
    const fallback = fallbackItems[i]

    if (item?.image) {
      const categoryLabel = item.category ? galleryCategoryLabels[item.category] : ''
      slots.push({
        href: item.category ? `/gallery/${item.category}` : (fallback?.href ?? '/gallery'),
        src: urlForImage(item.image).width(800).height(400).url(),
        alt: item.imageAlt || categoryLabel || fallback?.label || 'Haumanskloof gallery',
        label: item.label || categoryLabel || fallback?.label || '',
      })
    } else if (fallback) {
      slots.push({
        href: fallback.href,
        src: fallback.image,
        alt: fallback.label,
        label: fallback.label,
      })
    }
  }

  return (
    <section className="border-b border-border">
      <div className="container-max section-padding pb-6">
        <p className="label-text mb-2">{label}</p>
        <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-light text-text-dark leading-tight">
          {heading}
        </h2>
      </div>

      {/* Image strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-[3px] h-auto sm:h-[220px]">
        {slots.map((slot, i) => (
          <Link
            key={i}
            href={slot.href}
            className={`relative overflow-hidden bg-bg-mid block h-[180px] sm:h-full ${i === 0 ? 'sm:col-span-2' : ''}`}
          >
            <Image
              src={slot.src}
              alt={slot.alt}
              fill
              sizes={i === 0 ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, 25vw'}
              priority={i === 0}
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-3.5 left-4 text-white/65 text-[10px] tracking-widest uppercase">
              {slot.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="container-max py-4 px-10">
        <Link href="/gallery" className="text-[13px] text-text-muted no-underline tracking-wide">
          View full gallery →
        </Link>
      </div>
    </section>
  )
}
