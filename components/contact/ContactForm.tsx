'use client'

import { useState } from 'react'

const enquiryTypes = [
  { label: 'Accommodation', value: 'accommodation' },
  { label: 'General Enquiries', value: 'general' },
  { label: 'Conservation', value: 'conservation' },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  phone: string
  enquiryType: string
  message: string
  checkIn: string
  checkOut: string
  guests: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  enquiryType: '',
  message: '',
  checkIn: '',
  checkOut: '',
  guests: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isAccommodation = formData.enquiryType === 'accommodation'
  const today = new Date().toISOString().split('T')[0]

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

    if (isAccommodation) {
      if (!formData.checkIn) {
        newErrors.checkIn = 'Check-in date is required'
      }
      if (!formData.checkOut) {
        newErrors.checkOut = 'Check-out date is required'
      } else if (formData.checkIn && formData.checkOut <= formData.checkIn) {
        newErrors.checkOut = 'Check-out must be after check-in'
      }
      if (!formData.guests) {
        newErrors.guests = 'Number of guests is required'
      }
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
      setFormData(emptyForm)
    } catch (error) {
      setFormState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'enquiryType' && value !== 'accommodation') {
      setFormData((prev) => ({ ...prev, enquiryType: value, checkIn: '', checkOut: '', guests: '' }))
      setErrors((prev) => ({ ...prev, enquiryType: undefined, checkIn: undefined, checkOut: undefined, guests: undefined }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 border rounded-md text-[15px] text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors[field] ? 'border-red-400' : 'border-border'}`

  if (formState === 'success') {
    return (
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
    )
  }

  return (
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
          className={inputClass('name')}
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
          className={inputClass('email')}
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

      {/* Enquiry Type + Accommodation fields */}
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
          className={`w-full px-4 py-3 border rounded-md text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none ${errors.enquiryType ? 'border-red-400' : 'border-border'} ${formData.enquiryType ? 'text-text-dark' : 'text-text-muted'}`}
        >
          <option value="">Select an option</option>
          {enquiryTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.enquiryType && (
          <p className="mt-1 text-xs text-red-500">{errors.enquiryType}</p>
        )}

        {/* Accommodation extra fields */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isAccommodation ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-6 pt-6">
            {/* Preferred dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkIn"
                  className="block text-[13px] text-text-dark mb-2 font-medium"
                >
                  Check-in <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  min={today}
                  onChange={handleChange}
                  className={inputClass('checkIn')}
                />
                {errors.checkIn && (
                  <p className="mt-1 text-xs text-red-500">{errors.checkIn}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="checkOut"
                  className="block text-[13px] text-text-dark mb-2 font-medium"
                >
                  Check-out <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  min={formData.checkIn || today}
                  onChange={handleChange}
                  className={inputClass('checkOut')}
                />
                {errors.checkOut && (
                  <p className="mt-1 text-xs text-red-500">{errors.checkOut}</p>
                )}
              </div>
            </div>

            {/* Number of guests */}
            <div>
              <label
                htmlFor="guests"
                className="block text-[13px] text-text-dark mb-2 font-medium"
              >
                Number of guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                min={1}
                max={8}
                onChange={handleChange}
                className={inputClass('guests')}
                placeholder="1–8 guests"
              />
              {errors.guests && (
                <p className="mt-1 text-xs text-red-500">{errors.guests}</p>
              )}
            </div>
          </div>
        </div>
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
          className={`w-full px-4 py-3 border rounded-md text-[15px] text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-border'}`}
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
  )
}
