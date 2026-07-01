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
import { urlForImage } from '@/sanity/lib/image'
import type { SanityHomePage } from '@/sanity/lib/types'

export const revalidate = 60

export default async function Home() {
  const homeData = await sanityFetch<SanityHomePage | null>({
    query: homePageQuery,
    tags: ['homePage'],
  }).catch(() => null)

  // Normalize images from SanityImage references to URL strings before passing to components
  const hero = homeData?.hero
    ? {
        ...homeData.hero,
        image: homeData.hero.image
          ? urlForImage(homeData.hero.image).width(1920).height(1080).url()
          : null,
      }
    : null

  const about = homeData?.about
    ? {
        ...homeData.about,
        image: homeData.about.image
          ? urlForImage(homeData.about.image).width(800).height(600).url()
          : null,
      }
    : null

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection data={hero} />
        <AboutSection data={about} />
        <PillarsSection data={homeData?.pillars} />
        <GallerySection data={homeData?.gallery} />
        <AccommodationSection data={homeData?.accommodation} />
        <CtaSection data={homeData?.cta} />
      </main>
      <Footer />
    </>
  )
}
