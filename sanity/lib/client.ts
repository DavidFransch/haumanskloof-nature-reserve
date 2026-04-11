import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
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
