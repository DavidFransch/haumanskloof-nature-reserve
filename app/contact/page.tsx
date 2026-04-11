'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const enquiryTypes = ['General Enquiry', 'Accommodation', 'Activities', 'Press & Media']

type FormState = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  phone: string
  enquiryType: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = 'Please select an enquiry type'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setFormState('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setFormState('success')
      setFormData({ name: '', email: '', phone: '', enquiryType: '', message: '' })
    } catch (error) {
      setFormState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="px-10 py-20 bg-bg-light border-b border-border">
          <div className="container-max text-center">
            <span className="label-text block mb-3">Get in touch</span>
            <h1 className="font-heading text-[clamp(28px,5vw,48px)] font-normal text-text-dark mb-4">
              Contact Us
            </h1>
            <p className="text-[15px] text-text-mid max-w-[500px] mx-auto leading-relaxed">
              Have a question about the reserve, our accommodation, or activities? We&apos;d love to
              hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                {formState === 'success' ? (
                  <div className="bg-bg-light rounded-lg p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="font-heading text-2xl text-text-dark mb-3">Thank you!</h2>
                    <p className="text-text-mid mb-6">
                      We&apos;ve received your message and will be in touch within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormState('idle')}
                      className="text-[13px] text-primary underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formState === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 text-sm">
                        {errorMessage}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[13px] text-text-dark mb-2 font-medium"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-md text-[15px] text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.name ? 'border-red-400' : 'border-border'
                          }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[13px] text-text-dark mb-2 font-medium"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-md text-[15px] text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.email ? 'border-red-400' : 'border-border'
                          }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[13px] text-text-dark mb-2 font-medium"
                      >
                        Phone <span className="text-text-muted">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-md text-[15px] text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="+27 XX XXX XXXX"
                      />
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label
                        htmlFor="enquiryType"
                        className="block text-[13px] text-text-dark mb-2 font-medium"
                      >
                        Enquiry Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-md text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none ${errors.enquiryType ? 'border-red-400' : 'border-border'
                          } ${formData.enquiryType ? 'text-text-dark' : 'text-text-muted'}`}
                      >
                        <option value="">Select an option</option>
                        {enquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.enquiryType && (
                        <p className="mt-1 text-xs text-red-500">{errors.enquiryType}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[13px] text-text-dark mb-2 font-medium"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-md text-[15px] text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-border'
                          }`}
                        placeholder="Tell us about your enquiry..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full py-3.5 px-6 bg-primary text-primary-light text-[13px] tracking-wide rounded-md no-underline hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formState === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Info Section */}
              <div className="space-y-8">
                {/* Location */}
                <div>
                  <h3 className="font-heading text-xl text-text-dark mb-3">Location</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed">
                    Haumanskloof Nature Reserve
                    <br />
                    Breede Valley, Western Cape
                    <br />
                    South Africa
                  </p>
                </div>

                {/* Response Time */}
                <div>
                  <h3 className="font-heading text-xl text-text-dark mb-3">Response Time</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed">
                    We typically respond to all enquiries within 24 hours. For urgent matters,
                    please indicate this in your message.
                  </p>
                </div>

                {/* Map */}
                <div className="mt-8">
                  <h3 className="font-heading text-xl text-text-dark mb-3">Find Us</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16033.738730671163!2d19.5513889!3d-33.8444439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcd89cca3992467%3A0xb7ce348c0f3b23a5!2sHaumanskloof!5e1!3m2!1sen!2sza!4v1775910062491!5m2!1sen!2sza"
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
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
