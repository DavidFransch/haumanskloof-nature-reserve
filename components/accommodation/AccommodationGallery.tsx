'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface GalleryItem {
  label: string
  image: string
  category: string
}

interface AccommodationGalleryProps {
  gallery: GalleryItem[]
}

export default function AccommodationGallery({ gallery }: AccommodationGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === 0 ? gallery.length - 1 : lightboxIndex - 1)
  }, [lightboxIndex, gallery.length])

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === gallery.length - 1 ? 0 : lightboxIndex + 1)
  }, [lightboxIndex, gallery.length])

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

  const currentItem = lightboxIndex !== null ? gallery[lightboxIndex] : null

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gallery.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="space-y-3 group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-4/3 rounded-md overflow-hidden bg-bg-mid border border-border/50">
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <span className="text-[10px] text-white tracking-widest uppercase border border-white/30 px-3 py-1.5 rounded-sm backdrop-blur-sm">
                  {index === 3 && gallery.length > 4 ? `View all (${gallery.length})` : 'Enlarge'}
                </span>
              </div>
              {index === 3 && gallery.length > 4 && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none group-hover:bg-black/30 transition-colors">
                  <span className="text-white font-medium text-lg">+ {gallery.length - 4}</span>
                </div>
              )}
            </div>
            <div>
              <p className="label-text text-[9px] text-text-muted mb-0.5">{item.category}</p>
              <p className="text-[13px] text-text-dark font-medium">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {currentItem && (
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
              src={currentItem.image}
              alt={currentItem.label}
              width={1920}
              height={1920}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h3 className="text-lg font-medium mb-1">{currentItem.label}</h3>
              <p className="text-white/50 text-xs uppercase tracking-widest">
                {currentItem.category} &middot; {lightboxIndex! + 1} of {gallery.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
