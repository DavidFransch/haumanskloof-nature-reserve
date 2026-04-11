import { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { galleryImagesQuery, galleryCategoryCountsQuery } from '@/sanity/lib/queries'
import type { GalleryImage, GalleryCategoryCounts, GalleryCategory } from '@/sanity/lib/types'
import { galleryCategoryLabels } from '@/sanity/lib/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { siteContent } from '@/content/site.content'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export const metadata: Metadata = {
  title: `Gallery | ${siteContent.siteName}`,
  description:
    'Explore the wildlife, landscapes, and flora of Haumanskloof Nature Reserve through our photo gallery.',
}

const categoryOrder: GalleryCategory[] = ['camera-trap', 'wildlife', 'landscapes', 'flora', 'family']

export default async function GalleryPage() {
  const [images, counts] = await Promise.all([
    sanityFetch<GalleryImage[]>({ query: galleryImagesQuery, tags: ['galleryImage'] }),
    sanityFetch<GalleryCategoryCounts>({ query: galleryCategoryCountsQuery, tags: ['galleryImage'] }),
  ])

  const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="px-10 py-20 bg-bg-light border-b border-border">
          <div className="container-max text-center">
            <span className="label-text block mb-3">The reserve in images</span>
            <h1 className="font-heading text-[clamp(28px,5vw,48px)] font-normal text-text-dark mb-4">
              Gallery
            </h1>
            <p className="text-[15px] text-text-mid max-w-[500px] mx-auto leading-relaxed">
              From camera trap captures to sweeping landscapes — explore the beauty and biodiversity
              of Haumanskloof Nature Reserve.
            </p>
          </div>
        </section>

        {/* Category filters */}
        <section className="px-10 py-8 border-b border-border">
          <div className="container-max">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/gallery"
                className="px-4 py-2 text-[13px] rounded-full bg-primary text-white no-underline transition-colors"
              >
                All ({totalCount})
              </Link>
              {categoryOrder.map((category) => (
                <Link
                  key={category}
                  href={`/gallery/${category}`}
                  className="px-4 py-2 text-[13px] rounded-full border border-border text-text-mid no-underline hover:border-primary hover:text-primary transition-colors"
                >
                  {galleryCategoryLabels[category]} ({counts[category]})
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="section-padding">
          <div className="container-max">
            {images && images.length > 0 ? (
              <GalleryGrid images={images} />
            ) : (
              <div className="text-center py-20 px-5 text-text-muted">
                <p className="text-[15px] mb-2">No images yet.</p>
                <p className="text-[13px]">Check back soon for gallery updates.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
