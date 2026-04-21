'use client'

import { useState } from 'react'

interface VimeoEmbedProps {
  videoId: string
  title: string
}

export default function VimeoEmbed({ videoId, title }: VimeoEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  const embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0`

  return (
    /*
    TEMPORARY: Video is portrait/vertical shot on phone. 
    When Bernie's 16:9 drone footage arrives:
    1. Change max-w-[360px] → max-w-[900px]
    2. Change paddingBottom 177.78% → 56.25%
    */
    <div className="relative w-full rounded-lg overflow-hidden bg-bg-dark shadow-2xl flex justify-center py-8">
      <div className="relative w-full max-w-[360px]">
        <div style={{ paddingBottom: '177.78%', position: 'relative' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-dark">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                <p className="text-white/50 text-sm">Loading video...</p>
              </div>
            </div>
          )}
          <iframe
            src={embedUrl}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title={title}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  )
}
