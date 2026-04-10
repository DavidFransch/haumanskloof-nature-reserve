# Haumanskloof Nature Reserve — Website

Built with Next.js 15, Tailwind CSS v4, TypeScript.

---

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

---

## How to make changes

### Change colours, fonts, or spacing
Edit **`theme.config.ts`** in the root.  
Every colour, font, and spacing value is defined here. Change once, updates everywhere.

### Change page text or navigation
Edit **`content/site.content.ts`**.  
All copy, nav labels, CTAs, and section content live here. No need to touch any component files.

### Swap in real images
Drop images into **`/public/images/`** using these filenames:

| File | Used for |
|---|---|
| `hero.jpg` | Homepage hero background |
| `about.jpg` | About section photo |
| `bunkhouse.jpg` | Accommodation card |
| `gallery-wildlife.jpg` | Gallery — Wildlife panel |
| `gallery-scenery.jpg` | Gallery — Scenery panel |
| `gallery-rockart.jpg` | Gallery — Rock Art panel |

Images will automatically appear once the files are in place — no code changes needed.

---

## Project structure

```
haumanskloof/
├── theme.config.ts          ← colours, fonts, spacing (edit here)
├── content/
│   └── site.content.ts      ← all text & nav content (edit here)
├── app/
│   ├── layout.tsx           ← root layout, fonts, metadata
│   ├── globals.css          ← global styles & CSS variables
│   └── page.tsx             ← homepage (assembles sections)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       ← navigation bar
│   │   └── Footer.tsx       ← footer
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── PillarsSection.tsx
│       ├── GallerySection.tsx
│       ├── AccommodationSection.tsx
│       └── CtaSection.tsx
└── public/
    └── images/              ← drop photos here
```

---

## Adding a new page

1. Create `app/your-page/page.tsx`
2. Add the route to `content/site.content.ts` under `nav.links`
3. Build the page using the same section component pattern

---

## Deployment

Recommended: **Vercel** (free tier, connects to GitHub, auto-deploys on push)

1. Push to GitHub
2. Import repo on vercel.com
3. Deploy — done
