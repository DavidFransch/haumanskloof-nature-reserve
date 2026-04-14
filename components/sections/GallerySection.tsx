import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '@/content/site.content'
import { sanityFetch } from '@/sanity/lib/client'
import { homepageStripImagesQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import type { GalleryImage, HomepagePosition } from '@/sanity/lib/types'
import { galleryCategoryLabels } from '@/sanity/lib/types'

const positionOrder: HomepagePosition[] = ['strip-1', 'strip-2', 'strip-3']

export default async function GallerySection() {
  const { gallery } = siteContent.home

  // Fetch images from Sanity by homepage position
  const images = await sanityFetch<GalleryImage[]>({
    query: homepageStripImagesQuery,
    tags: ['galleryImage'],
  })

  // Order images by position (strip-1, strip-2, strip-3)
  const orderedImages = positionOrder.map((position) => {
    const image = images.find((img) => img.homepagePosition === position)
    return { position, image }
  })

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
        {orderedImages.map(({ position, image }, i) => (
          <Link
            key={position}
            href={image ? `/gallery/${image.category}` : '/gallery'}
            className={`relative overflow-hidden bg-bg-mid block h-[180px] sm:h-full ${i === 0 ? 'sm:col-span-2' : ''}`}
          >
            {image ? (
              <Image
                src={urlForImage(image.image).width(800).height(400).url()}
                alt={image.altText || image.title}
                fill
                sizes={i === 0 ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, 25vw'}
                priority={i === 0}
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-bg-mid" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-3.5 left-4 text-white/65 text-[10px] tracking-widest uppercase">
              {image ? galleryCategoryLabels[image.category] : 'Gallery'}
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
