import { groq } from 'next-sanity'

// Get all FAQs ordered by manual order, then creation date
export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer,
    order,
    category
  }
`
