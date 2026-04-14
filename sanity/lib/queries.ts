import { groq } from 'next-sanity'

// Get all posts for the blog listing
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->{
      name,
      slug,
      image
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

// Get a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    "author": author->{
      name,
      slug,
      image,
      bio
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

// Get all post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->{
      name,
      slug,
      image
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

// Get all authors
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio
  }
`

// ============================================
// Gallery Queries
// ============================================

// Get all gallery images
export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(category asc, order asc) {
    _id,
    title,
    category,
    image,
    caption,
    altText,
    order,
    seriesId
  }
`

// Get gallery images by category
export const galleryImagesByCategoryQuery = groq`
  *[_type == "galleryImage" && category == $category] | order(order asc) {
    _id,
    title,
    category,
    image,
    caption,
    altText,
    order,
    seriesId
  }
`

// Get homepage strip images by position
export const homepageStripImagesQuery = groq`
  *[_type == "galleryImage" && homepagePosition in ["strip-1", "strip-2", "strip-3"]] | order(homepagePosition asc) {
    _id,
    title,
    category,
    image,
    altText,
    homepagePosition
  }
`

// Get gallery images by series
export const galleryImagesBySeriesQuery = groq`
  *[_type == "galleryImage" && seriesId == $seriesId] | order(order asc) {
    _id,
    title,
    category,
    image,
    caption,
    altText,
    order
  }
`

// Get gallery category counts
export const galleryCategoryCountsQuery = groq`
  {
    "camera-trap": count(*[_type == "galleryImage" && category == "camera-trap"]),
    "wildlife": count(*[_type == "galleryImage" && category == "wildlife"]),
    "landscapes": count(*[_type == "galleryImage" && category == "landscapes"]),
    "family": count(*[_type == "galleryImage" && category == "family"]),
    "flora": count(*[_type == "galleryImage" && category == "flora"])
  }
`

