import { siteContent } from '@/content/site.content'
import type { HomePillar } from '@/sanity/lib/types'

const icons: Record<string, React.ReactNode> = {
  wildlife: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M8 14 Q12 20 12 22 Q12 20 16 14" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  accommodation: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 21 L3 10 L12 3 L21 10 L21 21Z" />
      <rect x="9" y="14" width="6" height="7" />
    </svg>
  ),
  mountain: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 20 L9 6 L13 14 L17 8 L22 20 H2 Z" />
    </svg>
  ),
}

export default function PillarsSection({ data }: { data?: HomePillar[] | null }) {
  const fallback: HomePillar[] = siteContent.home.pillars
  const pillars = data?.length ? data : fallback
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
      {pillars.map((pillar, i) => (
        <div
          key={pillar._key ?? pillar.title}
          className={`py-10 px-8 ${i < pillars.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}
        >
          <div className="text-text-muted mb-4">{icons[pillar.icon]}</div>
          <h3 className="font-heading text-lg font-medium text-text-dark mb-2">{pillar.title}</h3>
          <p className="text-[13px] text-text-mid leading-relaxed">{pillar.body}</p>
        </div>
      ))}
    </section>
  )
}
