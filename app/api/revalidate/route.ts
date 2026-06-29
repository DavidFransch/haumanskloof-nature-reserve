/**
 * On-Demand Revalidation Endpoint
 *
 * Receives Sanity webhook payloads and purges the Next.js cache
 * for affected pages. Requests are authenticated via a shared
 * secret passed in the x-sanity-webhook-secret header.
 *
 * Webhook URL:  https://haumanskloof.co.za/api/revalidate
 * Setup:        sanity.io/manage → API → Webhooks
 * Vercel env:   vercel env add SANITY_WEBHOOK_SECRET production
 */

import { timingSafeEqual } from 'crypto'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { galleryCategorySlugs } from '@/sanity/lib/types'

type WebhookPayload = {
  _type?: string
  slug?: { current: string } | string
}

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const incoming = Buffer.from(req.headers.get('x-sanity-webhook-secret') ?? '')
  const expected = Buffer.from(process.env.SANITY_WEBHOOK_SECRET)
  if (
    incoming.length !== expected.length ||
    !timingSafeEqual(incoming, expected)
  ) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let payload: WebhookPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Malformed payload' }, { status: 400 })
  }

  const type = payload._type
  if (!type) {
    return NextResponse.json({ error: 'Missing _type in payload' }, { status: 400 })
  }

  const revalidated: string[] = []

  if (type === 'faq') {
    revalidatePath('/faq', 'page')
    revalidatePath('/contact', 'page')
    revalidated.push('/faq', '/contact')
  } else if (type === 'galleryImage') {
    revalidatePath('/gallery', 'page')
    revalidatePath('/', 'page')
    revalidated.push('/gallery', '/')
    for (const slug of Object.values(galleryCategorySlugs)) {
      revalidatePath(`/gallery/${slug}`, 'page')
      revalidated.push(`/gallery/${slug}`)
    }
  } else if (type === 'post') {
    revalidatePath('/blog', 'page')
    revalidated.push('/blog')
    const slug =
      typeof payload.slug === 'string' ? payload.slug : payload.slug?.current
    if (slug) {
      revalidatePath(`/blog/${slug}`, 'page')
      revalidated.push(`/blog/${slug}`)
    }
  } else if (type === 'homePage') {
    revalidatePath('/', 'page')
    revalidated.push('/')
  } else if (type === 'pageContent') {
    revalidatePath('/', 'page')
    revalidated.push('/')
  } else {
    revalidatePath('/', 'page')
    revalidated.push('/')
  }

  return NextResponse.json({ revalidated: true, paths: revalidated })
}
