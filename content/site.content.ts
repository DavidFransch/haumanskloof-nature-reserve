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
          { label: 'Wildlife', href: '/gallery/wildlife' },
          { label: 'Scenery', href: '/gallery/scenery' },
          { label: 'Activities', href: '/gallery/activities' },
          { label: 'Camera Trap', href: '/gallery/camera-trap' },
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
      headline: 'Hidden deep in the\nBreede Valley mountains',
      subheadline:
        'Where vibrant Renosterveld greens meet the arid beauty of the succulent Karoo. A family-run sanctuary, just two hours from Cape Town, where nature and community thrive.',
      primaryCta: { label: 'Explore the reserve', href: '#about' },  // scrolls to about section
      secondaryCta: { label: 'View accommodation', href: '/accommodation' },
    },

    about: {
      label: 'Our sanctuary',
      heading: 'A land of contrast and wonder',
      body:
        'Haumanskloof is a place where soaring peaks meet pristine landscapes and rugged roads. Discover ancient rock art, encounter rare wildlife, or simply unwind under the stars — we invite you to join us.',
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
      body: 'Discover ancient rock art, encounter rare wildlife, or simply unwind under the stars. We\'d love to have you.',
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
