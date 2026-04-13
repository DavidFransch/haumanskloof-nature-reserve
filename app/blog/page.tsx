import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { siteContent } from '@/content/site.content'

export const metadata: Metadata = {
  title: `Blog | ${siteContent.siteName}`,
  description:
    'Stories, updates, and insights from Haumanskloof Nature Reserve in the Breede Valley.',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await sanityFetch<Post[]>({ query: postsQuery, tags: ['post'] })

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-10 py-20 bg-bg-light border-b border-border">
          <div className="container-max text-center">
            <span className="label-text block mb-3">Stories from the reserve</span>
            <h1 className="font-heading text-[clamp(28px,5vw,48px)] font-normal text-text-dark mb-4">
              Blog
            </h1>
            <p className="text-[15px] text-text-mid max-w-[500px] mx-auto leading-relaxed">
              Updates, wildlife sightings, conservation notes, and stories from Haumanskloof Nature
              Reserve.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="section-padding">
          <div className="container-max">
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
                {posts.map((post, index) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-md overflow-hidden border border-border transition-shadow duration-200 hover:shadow-lg"
                  >
                    <Link href={`/blog/${post.slug.current}`} className="no-underline">
                      {/* Image */}
                      <div className="relative h-[200px] bg-bg-mid">
                        {post.mainImage ? (
                          <Image
                            src={urlForImage(post.mainImage).width(640).height(400).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === 0}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-light text-sm">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex gap-2 mb-3 flex-wrap">
                            {post.categories.map((cat) => (
                              <span
                                key={cat._id}
                                className="text-[10px] tracking-wider uppercase text-primary bg-primary-light px-2 py-1 rounded-sm"
                              >
                                {cat.title}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="font-heading text-[22px] font-normal text-text-dark mb-2 leading-tight">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-sm text-text-mid leading-relaxed mb-4">
                            {post.excerpt.length > 120
                              ? `${post.excerpt.slice(0, 120)}...`
                              : post.excerpt}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-text-muted">
                          {post.author && (
                            <>
                              <span>{post.author.name}</span>
                              <span className="opacity-50">·</span>
                            </>
                          )}
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-5 text-text-muted">
                <p className="text-[15px] mb-2">No posts yet.</p>
                <p className="text-[13px]">Check back soon for updates from the reserve.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
