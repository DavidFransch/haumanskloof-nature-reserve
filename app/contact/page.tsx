import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/contact/ContactForm'
import { siteContent } from '@/content/site.content'
import { sanityFetch } from '@/sanity/lib/client'
import { contactPageQuery } from '@/sanity/lib/queries'
import type { SanityContactPage } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: `Contact · ${siteContent.siteName}`,
  description:
    'Get in touch with Haumanskloof Nature Reserve — enquire about accommodation, activities, or conservation.',
}

const socialLinks = siteContent.footer.links.filter((l) => l.external)

export default async function ContactPage() {
  const data = await sanityFetch<SanityContactPage | null>({
    query: contactPageQuery,
    tags: ['contactPage'],
  }).catch(() => null)

  const sc = siteContent.contact

  const heading = data?.heading ?? sc.heading
  const intro = data?.intro ?? sc.intro
  const location = data?.location ?? sc.location
  const responseTime = data?.responseTime ?? sc.responseTime

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-10 py-20 bg-bg-light border-b border-border">
          <div className="container-max text-center">
            <span className="label-text block mb-3">Get in touch</span>
            <h1 className="font-heading text-[clamp(28px,5vw,48px)] font-normal text-text-dark mb-4">
              {heading}
            </h1>
            <p className="text-[15px] text-text-mid max-w-[500px] mx-auto leading-relaxed">
              {intro}
            </p>
            <p className="mt-4 text-[13px] text-text-muted">
              Before reaching out, you may find your answer in our{' '}
              <Link href="/faq" className="underline underline-offset-2 hover:text-text-mid transition-colors">
                FAQs →
              </Link>
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <ContactForm />

              {/* Info Section */}
              <div className="space-y-8">
                {/* Location */}
                <div>
                  <h3 className="font-heading text-xl text-text-dark mb-3">Location</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed">
                    {location.name}
                    <br />
                    {location.area}
                    <br />
                    {location.country}
                  </p>
                </div>

                {/* Response Time */}
                <div>
                  <h3 className="font-heading text-xl text-text-dark mb-3">Response Time</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed">
                    {responseTime}
                  </p>
                </div>

                {/* Map */}
                <div className="mt-8">
                  <h3 className="font-heading text-xl text-text-dark mb-3">Find Us</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4136.067704106463!2d19.52301217645887!3d-33.79264367325578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDQ3JzMzLjUiUyAxOcKwMzEnMzIuMSJF!5e1!3m2!1sen!2sza!4v1776780773101!5m2!1sen!2sza"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Haumanskloof Nature Reserve location"
                    />
                  </div>
                  <p className="text-text-muted text-xs mt-2">
                    Located in the Breede Valley, approximately 2 hours from Cape Town.
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-heading text-xl text-text-dark mb-3">Follow Us</h3>
                  <div className="flex flex-col gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-text-mid no-underline hover:text-text-dark transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
