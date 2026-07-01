import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Must be false: on-demand (webhook) revalidation re-fetches immediately
  // after publish, and Sanity's edge CDN (apicdn.sanity.io) lags behind the
  // live API by a few seconds. Because our fetches use `revalidate: false`
  // (cache indefinitely, bust by tag), a stale CDN read gets locked into
  // Next.js's cache until the *next* publish. Reading from the uncached API
  // (api.sanity.io) guarantees fresh data the moment the webhook fires.
  // Next.js's own cache still shields us from per-request API traffic.
  useCdn: false,
})

// Preview client with token for draft content
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
})

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
  preview = false,
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
  preview?: boolean
}): Promise<T> {
  const clientToUse = preview ? previewClient : client

  if (preview) {
    return clientToUse.fetch<T>(query, params)
  }

  return clientToUse.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
