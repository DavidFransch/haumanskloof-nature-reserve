// Fixed document IDs for singleton pages.
// Referenced in GROQ queries, studio structure, and seed scripts.
export const HOMEPAGE_DOCUMENT_ID = 'homepage'
export const ACCOMMODATION_DOCUMENT_ID = 'accommodationPage'

// Schema types that are singletons — excluded from the default document list in Studio.
// Add new singleton schema names here when migrating additional pages.
export const SINGLETON_SCHEMA_TYPES = ['homePage', 'accommodationPage'] as const
