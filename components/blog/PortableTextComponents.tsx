'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading text-[clamp(22px,3vw,28px)] font-normal text-text-dark mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl font-normal text-text-dark mt-9 mb-3 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg font-medium text-text-dark mt-7 mb-2 leading-snug">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base text-text-mid leading-loose mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-primary pl-6 my-8 italic text-[17px] text-text-mid leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="pl-6 mb-6 leading-loose text-text-mid">{children}</ul>,
    number: ({ children }) => <ol className="pl-6 mb-6 leading-loose text-text-mid">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2 text-base">{children}</li>,
    number: ({ children }) => <li className="mb-2 text-base">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-text-dark">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ children, value }) => {
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      const target = value?.blank ? '_blank' : undefined
      return (
        <Link
          href={value?.href || '#'}
          rel={rel}
          target={target}
          className="text-primary underline underline-offset-2"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative w-full rounded-md overflow-hidden">
            <Image
              src={urlForImage(value).width(1200).url()}
              alt={value.alt || 'Blog post image'}
              width={1200}
              height={675}
              className="w-full h-auto block"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-[13px] text-text-muted mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
