import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  enquiryType: string
  message: string
}

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
    const { name, email, phone, enquiryType, message } = body

    // Validate required fields
    if (!name || !email || !enquiryType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const businessEmail = process.env.HAUMANSKLOOF_EMAIL || 'info@haumanskloof.co.za'

    // Send notification email to business
    await resend.emails.send({
      from: 'Haumanskloof Website <noreply@haumanskloof.co.za>',
      to: businessEmail,
      replyTo: email,
      subject: `New ${enquiryType} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
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
        <p>Thank you for reaching out to Haumanskloof Nature Reserve. We have received your ${enquiryType.toLowerCase()} and will get back to you within 24 hours.</p>
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
