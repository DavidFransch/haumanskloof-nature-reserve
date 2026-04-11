import { siteContent } from '@/content/site.content'

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
  rockart: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 19 Q8 6 12 4 Q16 6 20 19" />
      <path d="M7 13 Q12 10 17 13" />
      <line x1="12" y1="4" x2="12" y2="1" />
    </svg>
  ),
}

export default function PillarsSection() {
  const { pillars } = siteContent.home
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
      {pillars.map((pillar, i) => (
        <div
          key={pillar.title}
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
