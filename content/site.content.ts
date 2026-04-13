/**
 * ============================================================
 *  HAUMANSKLOOF — SITE CONTENT
 * ============================================================
 *  All site copy, navigation labels, and page content lives
 *  here. Update text without touching any component files.
 * ============================================================
 */

export const siteContent = {
  /**
   * GLOBAL
   */
  siteName: 'Haumanskloof Nature Reserve',
  siteTagline: 'Hidden deep in the Breede Valley mountains',
  siteEmail: 'info@haumanskloof.co.za',
  sitePhone: '',
  siteLocation: 'Breede Valley, Western Cape',
  siteInstagram: 'https://instagram.com/haumanskloof',

  /**
   * NAVIGATION
   * Update labels or add/remove items here.
   * Set dropdown: true to enable a dropdown menu.
   */
  nav: {
    logo: 'Haumanskloof Nature Reserve',
    cta: { label: 'Get in touch', href: '/contact' },
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      {
        label: 'Gallery',
        href: '/gallery',
        dropdown: [
          { label: 'Camera Trap', href: '/gallery/camera-trap' },
          { label: 'Wildlife on Foot', href: '/gallery/wildlife' },
          { label: 'Landscapes', href: '/gallery/landscapes' },
          { label: 'Flora & Fynbos', href: '/gallery/flora' },
          { label: 'The Family', href: '/gallery/family' },
        ],
      },
      { label: 'Activities', href: '/activities' },
      { label: 'Accommodation', href: '/accommodation' },
      { label: 'Blog', href: '/blog' },
    ],
  },

  /**
   * HOMEPAGE
   */
  home: {
    hero: {
      eyebrow: 'Breede Valley · Western Cape',
      headline: 'Deep in the mountains of the\nBreede Valley, is a hidden sanctuary.',
      intro:
        'Haumanskloof is a land of contrast, where vibrant Renosterveld greens meet the arid beauty of the succulent Karoo.',
      body: 'Just two hours from Cape Town, Haumanskloof is a family-run sanctuary where nature and community thrive. Explore and immerse yourself in a unique natural setting, discover ancient rock art, or simply unwind under the stars.',
      cta: 'Come experience this special intersection of soaring peaks, pristine landscapes and rugged roads — we invite you to join us!',
      primaryCta: { label: 'Explore the reserve', href: '#about' },
      secondaryCta: { label: 'View accommodation', href: '/accommodation' },
    },

    about: {
      label: 'Our sanctuary',
      heading: 'A land of contrast and wonder',
      body: 'Haumanskloof is a place where soaring peaks meet pristine landscapes and rugged roads. Discover ancient rock art, encounter rare wildlife, or simply unwind under the stars — we invite you to join us.',
      cta: { label: 'Meet the family', href: '/about' },
    },

    pillars: [
      {
        icon: 'wildlife',
        title: 'Wildlife & ecology',
        body: 'Camera trap monitoring, rare Renosterveld flora, and guided walks through indigenous habitat.',
      },
      {
        icon: 'accommodation',
        title: 'Accommodation',
        body: 'Comfortable bunkhouse units nestled in the reserve. Fall asleep to the sounds of the bush.',
      },
      {
        icon: 'rockart',
        title: 'Ancient rock art',
        body: 'Explore San rock art sites and connect with thousands of years of human history in the valley.',
      },
    ],

    gallery: {
      label: 'The reserve',
      heading: 'Experience Haumanskloof Nature Reserve',
      cta: { label: 'View full gallery', href: '/gallery' },
      items: [
        { label: 'Wildlife', image: '/images/gallery-wildlife.jpg', href: '/gallery/wildlife' },
        { label: 'Scenery', image: '/images/gallery-scenery.jpg', href: '/gallery/scenery' },
        { label: 'Rock art', image: '/images/gallery-rockart.jpg', href: '/gallery/activities' },
      ],
    },

    accommodation: {
      label: 'Where to stay',
      heading: 'Accommodation at Haumanskloof Nature Reserve',
      body: 'Wake up to birdsong, fall asleep under clear mountain skies. Our units are designed to keep you close to the land without sacrificing comfort.',
      units: [
        {
          name: 'The Bunkhouse',
          desc: 'Sleeps up to 8 · Mountain views · Fully equipped kitchen',
          tag: 'Enquire for rates',
          image: '/images/bunkhouse.jpg',
          href: '/accommodation#bunkhouse',
        },
      ],
    },

    cta: {
      heading: 'Come experience the sanctuary',
      body: "Discover ancient rock art, encounter rare wildlife, or simply unwind under the stars. We'd love to have you.",
      button: { label: 'Get in touch', href: '/contact' },
    },
  },

  /**
   * ABOUT PAGE
   */
  about: {
    heading: 'Our story',
    body: [
      'Haumanskloof is a family-run nature reserve nestled deep in the mountains of the Breede Valley.',
      'We are committed to conservation, ecology education, and sustainable ecotourism — inviting guests to experience the land as we do, with curiosity, respect, and wonder.',
    ],
  },

  /**
   * FOOTER
   */
  footer: {
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Instagram', href: 'https://instagram.com/haumanskloof' },
      { label: 'Privacy', href: '/privacy' },
    ],
    legal: '© 2025 Haumanskloof Nature Reserve. All rights reserved.',
  },
}

export type SiteContent = typeof siteContent
