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
