import { groq } from 'next-sanity'

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
