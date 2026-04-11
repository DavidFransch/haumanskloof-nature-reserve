export const metadata = {
  title: 'Sanity Studio | Haumanskloof',
  description: 'Content management for Haumanskloof Nature Reserve',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 font-sans">
      {children}
    </div>
  )
}
