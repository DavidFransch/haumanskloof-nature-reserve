import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/client'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { siteContent } from '@/content/site.content'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: postSlugsQuery })
  return slugs?.map((slug) => ({ slug })) || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug },
  })

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: `${post.title} | ${siteContent.siteName}`,
    description: post.excerpt || `Read ${post.title} on the Haumanskloof Nature Reserve blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: post.mainImage
        ? [
            {
              url: urlForImage(post.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: post.mainImage.alt || post.title,
            },
          ]
        : undefined,
    },
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug },
    tags: ['post'],
  })

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <header className="pt-15 pb-10 px-10 bg-bg-light border-b border-border">
          <div className="container-max max-w-[800px]">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs tracking-wide text-text-muted no-underline mb-6"
            >
              <span className="text-sm">←</span> Back to blog
            </Link>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {post.categories.map((cat) => (
                  <span
                    key={cat._id}
                    className="text-[10px] tracking-wider uppercase text-primary bg-primary-light px-2.5 py-1 rounded-sm"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading text-[clamp(28px,5vw,42px)] font-normal text-text-dark leading-tight mb-5">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-text-muted flex-wrap">
              {post.author && (
                <div className="flex items-center gap-2.5">
                  {post.author.image && (
                    <Image
                      src={urlForImage(post.author.image).width(80).height(80).url()}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  )}
                  <span className="text-text-dark">{post.author.name}</span>
                </div>
              )}
              <span className="opacity-50">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </div>
        </header>

        {/* Main image */}
        {post.mainImage && (
          <div className="max-w-[1000px] mx-auto px-10">
            <div className="relative -mt-5 rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <Image
                src={urlForImage(post.mainImage).width(1600).height(900).url()}
                alt={post.mainImage.alt || post.title}
                width={1600}
                height={900}
                priority
                className="w-full h-auto block"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <article className="max-w-[700px] mx-auto pt-15 pb-20 px-10">
          {post.excerpt && (
            <p className="text-lg text-text-mid leading-relaxed mb-10 italic border-b border-border pb-10">
              {post.excerpt}
            </p>
          )}

          {post.body && <PortableText value={post.body} components={portableTextComponents} />}
        </article>

        {/* Author bio */}
        {post.author?.bio && (
          <section className="max-w-[700px] mx-auto px-10 pb-20">
            <div className="bg-bg-light rounded-lg p-8 flex gap-5 items-start">
              {post.author.image && (
                <Image
                  src={urlForImage(post.author.image).width(120).height(120).url()}
                  alt={post.author.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover shrink-0"
                />
              )}
              <div>
                <p className="text-[11px] tracking-widest uppercase text-text-muted mb-1">
                  Written by
                </p>
                <p className="font-heading text-lg text-text-dark mb-2">{post.author.name}</p>
                <p className="text-sm text-text-mid leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
          </section>
        )}

        {/* Back to blog CTA */}
        <section className="bg-bg-dark py-15 px-10 text-center">
          <div className="container-max">
            <h2 className="font-heading text-[clamp(20px,3vw,28px)] font-normal text-text-light mb-5">
              More from the reserve
            </h2>
            <Link
              href="/blog"
              className="inline-block py-3 px-7 bg-primary text-primary-light text-[13px] tracking-wide rounded-sm no-underline hover:bg-primary-hover transition-colors"
            >
              View all posts
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
