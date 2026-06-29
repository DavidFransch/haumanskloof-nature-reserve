import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: SanityImage
  bio?: string
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  mainImage?: SanityImage
  body?: PortableTextBlock[]
  author?: Author
  categories?: Category[]
}

export type GalleryCategory = 'camera-trap' | 'wildlife' | 'landscapes' | 'family' | 'flora'

export type HomepagePosition = 'strip-1' | 'strip-2' | 'strip-3'

export interface GalleryImage {
  _id: string
  title: string
  category: GalleryCategory
  image: SanityImage
  caption?: string
  altText: string
  order?: number
  homepagePosition?: HomepagePosition
  seriesId?: string
}

export interface GalleryCategoryCounts {
  'camera-trap': number
  wildlife: number
  landscapes: number
  family: number
  flora: number
}

export interface Faq {
  _id: string
  question: string
  answer: string
  order?: number
  category?: string
}

// ============================================================
// Homepage singleton
// ============================================================

export interface HomeHero {
  eyebrow: string
  headline: string
  intro: string
  body: string
  cta: string
}

export interface HomeAbout {
  label: string
  heading: string
  body: string
}

export interface HomePillar {
  _key?: string
  icon: string
  title: string
  body: string
}

export interface HomeGallery {
  label: string
  heading: string
  // Static fallback items used only in siteContent — not a Sanity field
  items?: Array<{ label: string; image: string; href: string }>
}

export interface HomeAccommodationUnit {
  _key?: string
  name: string
  desc: string
  tag: string
  image: string
}

export interface HomeAccommodation {
  label: string
  heading: string
  body: string
  units: HomeAccommodationUnit[]
}

export interface HomeCta {
  heading: string
  body: string
}

export interface HomePage {
  hero: HomeHero
  about: HomeAbout
  pillars: HomePillar[]
  gallery: HomeGallery
  accommodation: HomeAccommodation
  cta: HomeCta
}

// ============================================================
// Accommodation page singleton
// ============================================================

// Shape of siteContent.accommodation — the static fallback for the Sanity singleton.
export interface SiteContentAccommodation {
  hero: { eyebrow: string; heading: string; intro: string }
  droneVideo: { vimeoId: string; title: string }
  bunkhouse: {
    title: string
    capacity: string
    mainImage: string
    intro: string
    details: string[]
    rates: {
      baseRate: number
      baseRateCaption: string
      additionalRate: number
      additionalRateCaption: string
    }
    storyTitle: string
    story: string
    gallery: Array<{ label: string; image: string; category: string }>
  }
  compostToilet: { eyebrow: string; heading: string; body: string; note: string }
  amenities: Array<{ icon: string; title: string; body: string }>
  cta: { heading: string; body: string }
}

export interface SanityAccommodationGalleryItem {
  _key?: string
  image: SanityImage
  altText: string
  label: string
  category?: string
}

export interface SanityAccommodationPage {
  hero: {
    eyebrow: string
    heading: string
    intro: string
  }
  droneVideo: {
    vimeoId: string
    title: string
  }
  bunkhouse: {
    title: string
    capacity: string
    intro: string
    details: string[]
    rates: {
      baseRate: number
      baseRateCaption: string
      additionalRate: number
      additionalRateCaption: string
    }
    storyTitle: string
    story: Array<{ _key: string; text: string }>
    mainImage: SanityImage | null
    mainImageAlt: string | null
    gallery: SanityAccommodationGalleryItem[]
  }
  compostToilet: {
    eyebrow: string
    heading: string
    body: string
    note: string
    image: SanityImage | null
  }
  amenities: Array<{
    _key?: string
    icon: string
    title: string
    body: string
  }>
  cta: {
    heading: string
    body: string
  }
}

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  'camera-trap': 'Camera Trap',
  wildlife: 'Wildlife on Foot',
  landscapes: 'Landscapes',
  family: 'Haumanskloof Family',
  flora: 'Flora & Fynbos',
}

export const galleryCategorySlugs: Record<GalleryCategory, string> = {
  'camera-trap': 'camera-trap',
  wildlife: 'wildlife',
  landscapes: 'landscapes',
  family: 'family',
  flora: 'flora',
}
