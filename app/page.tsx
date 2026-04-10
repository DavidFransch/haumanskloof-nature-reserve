import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PillarsSection from '@/components/sections/PillarsSection'
import GallerySection from '@/components/sections/GallerySection'
import AccommodationSection from '@/components/sections/AccommodationSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <PillarsSection />
        <GallerySection />
        <AccommodationSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
