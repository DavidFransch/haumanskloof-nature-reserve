import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PillarsSection from '@/components/sections/PillarsSection'
import GallerySection from '@/components/sections/GallerySection'
import AccommodationSection from '@/components/sections/AccommodationSection'
import CtaSection from '@/components/sections/CtaSection'
import { sanityFetch } from '@/sanity/lib/client'
import { homePageQuery } from '@/sanity/lib/queries'
import type { HomePage } from '@/sanity/lib/types'

export const revalidate = 60

export default async function Home() {
  const homeData = await sanityFetch<HomePage | null>({
    query: homePageQuery,
    tags: ['homePage'],
  }).catch(() => null)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection data={homeData?.hero} />
        <PillarsSection data={homeData?.pillars} />
        <GallerySection data={homeData?.gallery} />
        <AboutSection data={homeData?.about} />
        <AccommodationSection data={homeData?.accommodation} />
        <CtaSection data={homeData?.cta} />
      </main>
      <Footer />
    </>
  )
}
