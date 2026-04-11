import type { Metadata } from 'next'
import './globals.css'
import { siteContent } from '@/content/site.content'

export const metadata: Metadata = {
  title: siteContent.siteName,
  description: siteContent.siteTagline,
  openGraph: {
    title: siteContent.siteName,
    description: siteContent.siteTagline,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* 
          FONTS — loaded via Google Fonts link tag so they work in all environments.
          To change fonts: update the href below AND update font-family in globals.css
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-text-dark bg-white antialiased">
        {children}
      </body>
    </html>
  )
}
