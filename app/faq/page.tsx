import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { sanityFetch } from '@/sanity/lib/client'
import { faqsQuery } from '@/sanity/lib/queries'
import type { Faq } from '@/sanity/lib/types'
import FaqAccordion from '@/components/faq/FaqAccordion'
import { siteContent } from '@/content/site.content'

export const metadata: Metadata = {
  title: `FAQ · ${siteContent.siteName}`,
  description:
    'Frequently asked questions about staying at Haumanskloof Nature Reserve — accommodation, activities, getting here, and what to expect.',
}

export default async function FaqPage() {
  const faqs = await sanityFetch<Faq[]>({ query: faqsQuery, tags: ['faq'] })

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-10 py-20 bg-bg-light border-b border-border">
          <div className="container-max text-center">
            <span className="label-text block mb-3">Questions &amp; Answers</span>
            <h1 className="font-heading text-[clamp(28px,5vw,48px)] font-normal text-text-dark mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[15px] text-text-mid max-w-[500px] mx-auto leading-relaxed">
              Everything you need to know before your visit. Can&apos;t find what you&apos;re
              looking for?{' '}
              <Link href="/contact" className="text-primary underline underline-offset-2">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="section-padding border-b border-border">
          <div className="container-max max-w-[800px]">
            {faqs.length > 0 ? (
              <FaqAccordion faqs={faqs} />
            ) : (
              <p className="text-[15px] text-text-mid leading-relaxed text-center py-8">
                We&apos;re adding our FAQs shortly. In the meantime, feel free to{' '}
                <Link href="/contact" className="text-primary underline underline-offset-2">
                  get in touch
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
