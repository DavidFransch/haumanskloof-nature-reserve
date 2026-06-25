import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  enquiryType: 'accommodation' | 'general' | 'conservation'
  message: string
  checkIn?: string
  checkOut?: string
  guests?: string
}

// NOTE: HAUMANSKLOOF_CONSERVATION_EMAIL must be added to Vercel environment variables
// alongside HAUMANSKLOOF_BOOKINGS_EMAIL and HAUMANSKLOOF_INFO_EMAIL

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const body: ContactFormData = await request.json()
    const { name, email, phone, enquiryType, message, checkIn, checkOut, guests } = body

    // Validate required fields
    if (!name || !email || !enquiryType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Validate accommodation-specific fields
    if (enquiryType === 'accommodation') {
      if (!checkIn || !checkOut || !guests) {
        return NextResponse.json({ error: 'Missing required accommodation details' }, { status: 400 })
      }
    }

    const bookingsEmail = process.env.HAUMANSKLOOF_BOOKINGS_EMAIL || 'bookings@haumanskloof.co.za'
    const infoEmail = process.env.HAUMANSKLOOF_INFO_EMAIL || 'info@haumanskloof.co.za'
    const conservationEmail = process.env.HAUMANSKLOOF_CONSERVATION_EMAIL || 'conservation@haumanskloof.co.za'

    const targetEmail =
      enquiryType === 'accommodation' ? bookingsEmail :
      enquiryType === 'conservation' ? conservationEmail :
      infoEmail

    const enquiryLabels: Record<string, string> = {
      accommodation: 'Accommodation',
      general: 'General Enquiry',
      conservation: 'Conservation',
    }
    const enquiryLabel = enquiryLabels[enquiryType] ?? enquiryType

    const accommodationDetails = enquiryType === 'accommodation' ? `
        <p><strong>Check-in:</strong> ${checkIn}</p>
        <p><strong>Check-out:</strong> ${checkOut}</p>
        <p><strong>Number of guests:</strong> ${guests}</p>
    ` : ''

    // Send notification email to business
    await resend.emails.send({
      from: 'Haumanskloof Website <noreply@haumanskloof.co.za>',
      to: targetEmail,
      replyTo: email,
      subject: `New ${enquiryLabel} enquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Enquiry Type:</strong> ${enquiryLabel}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${accommodationDetails}
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    // Send confirmation email to the person who submitted
    await resend.emails.send({
      from: 'Haumanskloof Nature Reserve <noreply@haumanskloof.co.za>',
      to: email,
      subject: 'Thank you for contacting Haumanskloof Nature Reserve',
      html: `
        <h2>Thank you for your enquiry</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Haumanskloof Nature Reserve. We have received your ${enquiryLabel.toLowerCase()} enquiry and will get back to you within 24 hours.</p>
        ${accommodationDetails ? `<hr /><h3>Booking details:</h3>${accommodationDetails}` : ''}
        <hr />
        <h3>Your message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
        <hr />
        <p>Warm regards,<br />The Haumanskloof Team</p>
        <p style="color: #888; font-size: 12px;">Breede Valley, Western Cape</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
