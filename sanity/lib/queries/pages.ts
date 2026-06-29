import { groq } from 'next-sanity'
import { HOMEPAGE_DOCUMENT_ID } from '../constants'

// Get homepage singleton content
export const homePageQuery = groq`
  *[_type == "homePage" && _id == "${HOMEPAGE_DOCUMENT_ID}"][0] {
    hero,
    about,
    pillars,
    gallery,
    accommodation,
    cta
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
