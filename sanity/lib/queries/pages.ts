import { groq } from 'next-sanity'
import {
  ABOUT_DOCUMENT_ID,
  ACCOMMODATION_DOCUMENT_ID,
  ACTIVITIES_DOCUMENT_ID,
  CONTACT_DOCUMENT_ID,
  HOMEPAGE_DOCUMENT_ID,
} from '../constants'

// Get homepage singleton content
export const homePageQuery = groq`
  *[_type == "homePage" && _id == "${HOMEPAGE_DOCUMENT_ID}"][0] {
    "hero": hero { eyebrow, headline, intro, body, cta, "image": image { asset, hotspot, crop } },
    "about": about { label, heading, body, "image": image { asset, hotspot, crop } },
    "pillars": pillars[] { _key, icon, title, body },
    "gallery": gallery { label, heading },
    "accommodation": accommodation {
      label, heading, body,
      "bunkhouse": bunkhouse { name, desc, tag, "image": image { asset, hotspot, crop }, "imageAlt": image.altText },
      "nextUnit": nextUnit { name, desc, tag, "image": image { asset, hotspot, crop } }
    },
    "cta": cta { heading, body }
  }
`

// Get accommodation page singleton content
export const accommodationPageQuery = groq`
  *[_type == "accommodationPage" && _id == "${ACCOMMODATION_DOCUMENT_ID}"][0] {
    "hero": hero { eyebrow, heading, intro },
    "droneVideo": droneVideo { vimeoId, title },
    "bunkhouse": bunkhouse {
      title,
      capacity,
      intro,
      details,
      "rates": rates { baseRate, baseRateCaption, additionalRate, additionalRateCaption },
      storyTitle,
      "story": story[] { _key, text },
      "mainImage": mainImage { asset, hotspot, crop },
      "mainImageAlt": mainImage.altText,
      "gallery": gallery[] { _key, "image": image { asset, hotspot, crop }, altText, label, category }
    },
    "compostToilet": compostToilet { eyebrow, heading, body, note, "image": image->image },
    "amenities": amenities[] { _key, icon, title, body },
    "cta": cta { heading, body }
  }
`

// Get about page singleton content
export const aboutPageQuery = groq`
  *[_type == "aboutPage" && _id == "${ABOUT_DOCUMENT_ID}"][0] {
    "hero": hero { eyebrow, heading, intro },
    "story": story[] { _key, text },
    "storyImage": storyImage { asset, hotspot, crop },
    "storyImageAlt": storyImage.altText,
    vision,
    mission,
    "values": values[] { _key, icon, title, body },
    "cta": cta { heading, body }
  }
`

// Get activities page singleton content
export const activitiesPageQuery = groq`
  *[_type == "activitiesPage" && _id == "${ACTIVITIES_DOCUMENT_ID}"][0] {
    "hero": hero { eyebrow, heading, intro },
    "items": items[] {
      _key, id, icon, tag, title, body,
      highlights,
      "image": image { asset, hotspot, crop },
      "imageAlt": image.altText
    },
    "cta": cta { heading, body }
  }
`

// Get contact page singleton content
export const contactPageQuery = groq`
  *[_type == "contactPage" && _id == "${CONTACT_DOCUMENT_ID}"][0] {
    heading,
    intro,
    "location": location { name, area, country },
    responseTime
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
