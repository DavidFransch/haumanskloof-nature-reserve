import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/client'
import { galleryImagesByCategoryQuery, galleryCategoryCountsQuery } from '@/sanity/lib/queries'
import type { GalleryImage, GalleryCategoryCounts, GalleryCategory } from '@/sanity/lib/types'
import { galleryCategoryLabels } from '@/sanity/lib/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { siteContent } from '@/content/site.content'
import GalleryGrid from '@/components/gallery/GalleryGrid'

const validCategories: GalleryCategory[] = ['camera-trap', 'wildlife', 'landscapes', 'family', 'flora']
const categoryOrder: GalleryCategory[] = ['camera-trap', 'wildlife', 'landscapes', 'flora', 'family']

const categoryDescriptions: Record<GalleryCategory, string> = {
  'camera-trap':
    'Wildlife captured by our motion-activated cameras throughout the reserve, from leopards to honey badgers.',
  wildlife:
    'Animals photographed on foot during guided walks and explorations of the reserve.',
  landscapes:
    'The dramatic mountains, valleys, and vistas of Haumanskloof Nature Reserve.',
  family:
    'The people and stories behind Haumanskloof — a family-run conservation project.',
  flora:
    'The unique Renosterveld and succulent Karoo plant species found on the reserve.',
}

type Props = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return validCategories.map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params

  if (!validCategories.includes(category as GalleryCategory)) {
    return { title: 'Not Found' }
  }

  const label = galleryCategoryLabels[category as GalleryCategory]

  return {
    title: `${label} | Gallery | ${siteContent.siteName}`,
    description: categoryDescriptions[category as GalleryCategory],
  }
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { category } = await params

  if (!validCategories.includes(category as GalleryCategory)) {
    notFound()
  }

  const typedCategory = category as GalleryCategory

  const [images, counts] = await Promise.all([
    sanityFetch<GalleryImage[]>({
      query: galleryImagesByCategoryQuery,
      params: { category: typedCategory },
      tags: ['galleryImage'],
    }),
    sanityFetch<GalleryCategoryCounts>({ query: galleryCategoryCountsQuery, tags: ['galleryImage'] }),
  ])

  const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0)
  const label = galleryCategoryLabels[typedCategory]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-10 py-20 bg-bg-light border-b border-border">
          <div className="container-max text-center">
            <span className="label-text block mb-3">Gallery</span>
            <h1 className="font-heading text-[clamp(28px,5vw,48px)] font-normal text-text-dark mb-4">
              {label}
            </h1>
            <p className="text-[15px] text-text-mid max-w-[500px] mx-auto leading-relaxed">
              {categoryDescriptions[typedCategory]}
            </p>
          </div>
        </section>

        {/* Category filters */}
        <section className="px-10 py-8 border-b border-border">
          <div className="container-max">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/gallery"
                className="px-4 py-2 text-[13px] rounded-full border border-border text-text-mid no-underline hover:border-primary hover:text-primary transition-colors"
              >
                All ({totalCount})
              </Link>
              {categoryOrder.map((cat) => (
                <Link
                  key={cat}
                  href={`/gallery/${cat}`}
                  className={`px-4 py-2 text-[13px] rounded-full no-underline transition-colors ${
                    cat === typedCategory
                      ? 'bg-primary text-white'
                      : 'border border-border text-text-mid hover:border-primary hover:text-primary'
                  }`}
                >
                  {galleryCategoryLabels[cat]} ({counts[cat]})
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
                <p className="text-[15px] mb-2">No images in this category yet.</p>
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
