// Fixed document IDs for singleton pages.
// Referenced in GROQ queries, studio structure, and seed scripts.
export const HOMEPAGE_DOCUMENT_ID = 'homepage'
export const ACCOMMODATION_DOCUMENT_ID = 'accommodationPage'
export const ABOUT_DOCUMENT_ID = 'aboutPage'
export const ACTIVITIES_DOCUMENT_ID = 'activitiesPage'
export const CONTACT_DOCUMENT_ID = 'contactPage'

// Schema types that are singletons — excluded from the default document list in Studio.
// Add new singleton schema names here when migrating additional pages.
export const SINGLETON_SCHEMA_TYPES = ['homePage', 'accommodationPage', 'aboutPage', 'activitiesPage', 'contactPage'] as const
