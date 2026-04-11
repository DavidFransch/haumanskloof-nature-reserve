'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { GalleryImage } from '@/sanity/lib/types'
import { galleryCategoryLabels } from '@/sanity/lib/types'

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1)
  }, [lightboxIndex, images.length])

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1)
  }, [lightboxIndex, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, goToPrevious, goToNext])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image._id}
            onClick={() => openLightbox(index)}
            className="block w-full mb-4 overflow-hidden rounded-lg cursor-pointer bg-transparent border-0 p-0 group"
          >
            <div className="relative overflow-hidden">
              <Image
                src={urlForImage(image.image).width(600).height(600).fit('max').url()}
                alt={image.altText}
                width={600}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium text-left">{image.title}</p>
                <p className="text-white/70 text-xs text-left">
                  {galleryCategoryLabels[image.category]}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {currentImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white bg-transparent border-0 cursor-pointer transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full border-0 cursor-pointer transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full border-0 cursor-pointer transition-colors"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlForImage(currentImage.image).width(1920).height(1920).fit('max').url()}
              alt={currentImage.altText}
              width={1920}
              height={1920}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-white text-lg font-medium mb-1">{currentImage.title}</h3>
              {currentImage.caption && (
                <p className="text-white/70 text-sm mb-2">{currentImage.caption}</p>
              )}
              <p className="text-white/50 text-xs">
                {galleryCategoryLabels[currentImage.category]} &middot; {lightboxIndex! + 1} of{' '}
                {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
