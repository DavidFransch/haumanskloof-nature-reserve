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

export interface GalleryImage {
  _id: string
  title: string
  category: GalleryCategory
  image: SanityImage
  caption?: string
  altText: string
  order?: number
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
  image?: string | null
  imageAlt?: string | null
}

export interface HomeAbout {
  label: string
  heading: string
  body: string
  image?: string | null
  imageAlt?: string | null
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

// Raw Sanity shape of a homepage gallery strip item (image is a reference).
export interface SanityHomeGalleryStripItem {
  image: SanityImage | null
  imageAlt: string | null
  category: GalleryCategory | null
  label: string | null
}

// Raw Sanity shape of the gallery section — carries the managed strip images.
export interface SanityHomeGallery {
  label: string
  heading: string
  strip: SanityHomeGalleryStripItem[] | null
}

export interface HomeAccommodationUnit {
  name: string
  desc: string
  tag?: string | null
  // Static string path in siteContent; resolved to a URL in the component when
  // it comes from Sanity as an image object.
  image?: string | null
  imageAlt?: string | null
}

export interface HomeAccommodation {
  label: string
  heading: string
  body: string
  showComingSoon?: boolean | null
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

// Raw Sanity response for the homepage — images come as SanityImage references.
// Normalized to URL strings before passing to components (see app/page.tsx).
export interface SanityHomePage extends Omit<HomePage, 'hero' | 'about' | 'gallery' | 'accommodation'> {
  hero: Omit<HomeHero, 'image'> & { image: SanityImage | null }
  about: Omit<HomeAbout, 'image'> & { image: SanityImage | null }
  gallery: SanityHomeGallery
  accommodation: Omit<HomeAccommodation, 'units'> & {
    showComingSoon: boolean | null
    units: Array<{
      name: string
      desc: string
      tag: string | null
      image: SanityImage | null
      imageAlt: string | null
    }> | null
  }
}

// The raw Sanity shape of the accommodation section — units carry SanityImage
// references (resolved to URLs in the component). Used as the component prop type.
export type SanityHomeAccommodation = SanityHomePage['accommodation']

// ============================================================
// Accommodation page singleton
// ============================================================

// Optional sale/discount shown over the seasonal pricing block.
export interface RateSale {
  onSale: boolean
  label?: string | null
  salePrice?: number | null
  caption?: string | null
}

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
      sale?: RateSale
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
      sale?: RateSale | null
    }
    storyTitle: string
    story: string
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
    imageAlt: string | null
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

// ============================================================
// About page singleton
// ============================================================

export interface SanityAboutPage {
  hero: { eyebrow: string; heading: string; intro: string }
  story: string
  storyImage: SanityImage | null
  storyImageAlt: string | null
  vision: string
  mission: string
  values: Array<{ _key?: string; icon: string; title: string; body: string }>
  cta: { heading: string; body: string }
}

// ============================================================
// Activities page singleton
// ============================================================

export interface SanityActivityItem {
  _key: string
  id: string
  icon: string
  tag: string
  title: string
  body: string
  highlights: string[] | null
  image: SanityImage | null
  imageAlt: string | null
}

export interface SanityActivitiesPage {
  hero: { eyebrow: string; heading: string; intro: string }
  items: SanityActivityItem[]
  cta: { heading: string; body: string }
}

// ============================================================
// Contact page singleton
// ============================================================

export interface SanityContactPage {
  heading: string
  intro: string
  location: { name: string; area: string; country: string }
  responseTime: string
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
