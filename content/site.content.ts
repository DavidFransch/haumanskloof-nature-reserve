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
      { label: 'About', href: '/about' },
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
        body: 'Camera trap monitoring, rare Renosterveld and succulent Karoo flora, and exploration through indigenous habitat.',
      },
      {
        icon: 'accommodation',
        title: 'Accommodation',
        body: 'Comfortable bunkhouse unit nestled in the reserve. Fall asleep to the sounds of the bush.',
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
    hero: {
      eyebrow: 'Our story',
      heading: 'About Us',
      intro:
        'Haumanskloof is more than just a destination – it’s a return. A return to family, to self-discovery and to deeper connection.',
    },
    story: [
      'After years of living across three South African cities, the pace of high-energy city life was all too familiar to us, and a call to the wild was beckoning.',
      'Being drawn to what had always grounded our family, our hearts kept returning to the wild landscapes that shaped and inspired us. The raw beauty of nature at its best, and us, an integral part of it this time.',
      'In 2023, being guided by good faith and bold decisions, our family’s journey lead us all to Haumanskloof, and our vision was born. What began as a move towards quiet farm life and closer family, soon became about something far greater – the community of existence. A way of life centred on celebrating rediscovery, connection and conservation.',
      'The name Haumanskloof carries a resonance to the legacy of its namesake that feels especially meaningful to us. The property was originally named after the Belgian botanist, teacher and advocate for environmental protection, Lucien Léon Hauman. The reserve reflects the values he stood for – of curiosity, learning and a deep respect for the natural world.',
      'At Haumanskloof, we let nature set the pace. Every decision we make is guided by a belief that nature is not something separate from us, but something we belong to. Our daily work is rooted in ensuring that this unique landscape is protected and preserved for future generations, offering a safe haven for threatened ecosystems, the biodiversity they support and the functions they maintain. Through the work we do, we hope to cultivate a space of connection and coexistence through thoughtful and monitored conservation.',
      'Whether you’re a hiker, a birder, a cyclist, a star gazer or simply enjoy a quiet braai – the reserve is the place for you.',
      'Tucked away in this ancient valley is more than just a destination – it’s a way of existing.',
    ],
    vision:
      'A sustainable enterprise that preserves biodiversity, builds harmony, and instils ethical values – connecting people, planet and self.',
    mission:
      'To protect and restore the natural integrity of Haumanskloof through responsible stewardship, sustainable living, and meaningful experiences that inspire conservation, simplicity and connection.',
    values: [
      {
        icon: 'integrity',
        title: 'Integrity',
        body: 'We lead with honesty, transparency and respect in everything we do.',
      },
      {
        icon: 'stewardship',
        title: 'Stewardship',
        body: 'We believe the land is not ours to own, but ours to care for and preserve.',
      },
      {
        icon: 'passion',
        title: 'Passion',
        body: 'Our love for nature, community and meaningful living guides every decision we make.',
      },
    ],
    cta: {
      heading: 'Come experience the reserve',
      body: 'Join us for a walk, a night under the stars, or a quiet moment in the mountains.',
      button: { label: 'Get in touch', href: '/contact' },
    },
  },

  /**
   * ACTIVITIES PAGE
   */
  activities: {
    hero: {
      eyebrow: 'Explore the reserve',
      heading: 'Things to do at\nHaumanskloof',
      intro:
        'From ancient rock art to rare wildlife encounters, Haumanskloof offers a range of outdoor experiences in one of South Africa\'s most unspoilt mountain landscapes.',
    },
    items: [
      {
        id: 'wildlife-walks',
        icon: 'wildlife',
        tag: 'Self-guided · Guided on request',
        title: 'Wildlife Walks & Ecology',
        body: 'Explore the reserve on foot through indigenous fynbos and succulent Karoo. The reserve is home to a remarkable diversity of species — from caracal and Cape mountain leopard to over 200 bird species and hundreds of endemic plants.',
        highlights: [
          'Camera trap monitoring stations',
          'Caracal, porcupine & aardvark sightings',
          '200+ bird species recorded',
          'Rare Renosterveld & succulent Karoo flora',
        ],
        image: '/images/gallery-wildlife.jpg',
      },
      {
        id: 'rock-art',
        icon: 'rockart',
        tag: 'Guided walks · By arrangement',
        title: 'Ancient San Rock Art',
        body: 'The mountains of Haumanskloof contain San rock art sites that have survived for thousands of years. Our guided walks bring these ancient sites to life, exploring the spiritual and cultural significance of the paintings.',
        highlights: [
          'Thousands of years of Khoisan history',
          'Guided interpretation of symbolism',
          'Scenic mountain context',
          'Photography opportunities',
        ],
        image: '/images/gallery-rockart.jpg',
      },
      {
        id: 'hiking',
        icon: 'hiking',
        tag: 'Self-guided · Various difficulty levels',
        title: 'Hiking & Mountain Exploration',
        body: 'Traverse rocky ridgelines, dry riverbeds, and open mountain plateaus on a network of informal trails. The terrain ranges from gentle river walks to steep summit scrambles — all rewarded with spectacular Breede Valley views.',
        highlights: [
          'Varied terrain for all fitness levels',
          'Panoramic Breede Valley views',
          'Natural rock pools',
          'Night sky stargazing at altitude',
        ],
        image: '/images/gallery-scenery.jpg',
      },
      {
        id: 'camera-trapping',
        icon: 'camera',
        tag: 'Citizen science · Hands-on',
        title: 'Camera Trap Monitoring',
        body: 'Join us in actively monitoring the wildlife of the reserve. Help check, deploy, and review camera trap footage as part of our ongoing conservation monitoring programme. A unique behind-the-scenes experience.',
        highlights: [
          'Hands-on conservation work',
          'Real wildlife data collection',
          'Review nocturnal wildlife footage',
          'Contribute to long-term monitoring',
        ],
        image: '/images/gallery-wildlife.jpg',
      },
    ],
    cta: {
      heading: 'Ready to explore?',
      body: "Get in touch to plan your visit. We'll help tailor an experience around what you'd like to see and do.",
      button: { label: 'Enquire about activities', href: '/contact' },
    },
  },

  /**
   * ACCOMMODATION PAGE
   */
  accommodation: {
    hero: {
      eyebrow: 'Where to stay',
      heading: 'Eco-conscious comfort\nin the mountains',
      intro:
        'Wake up to birdsong and fall asleep under clear mountain skies. Our units are designed to keep you close to the land without sacrificing comfort.',
    },
    // Replace with Lloyd's Vimeo ID when account is ready
    droneVideo: {
      vimeoId: '1185190221',
      title: 'Haumanskloof Nature Reserve — aerial view',
    },
    bunkhouse: {
      id: 'bunkhouse',
      title: 'The Bunkhouse',
      capacity: 'Sleeps up to 8 guests',
      intro:
        'Nestled in a private valley, the Bunkhouse is our flagship unit. It combines rugged mountain charm with modern eco-amenities, offering the perfect base for families or groups of friends.',
      details: [
        '3 Bedrooms (Queen, Twin, and Bunk configurations)',
        'Fully equipped kitchen with gas stove',
        'Spacious deck with sunset views',
        'Wood-fired hot tub overlooking the valley',
        'Solar-powered lighting and charging points',
      ],
      gallery: [
        { label: 'Inside: Living Area', image: '/images/bunkhouse-inside.jpg', category: 'interior' },
        { label: 'Inside: The Kitchen', image: '/images/bunkhouse-kitchen.jpg', category: 'interior' },
        { label: 'Outside: The Hot Tub', image: '/images/bunkhouse-hotub.jpg', category: 'exterior' },
        { label: 'Outside: The Surroundings', image: '/images/bunkhouse.jpg', category: 'landscape' },
      ],
    },
    amenities: [
      { icon: 'mountain', title: 'Mountain Views', body: '360-degree views of the Breede Valley peaks from every window.' },
      { icon: 'fire', title: 'Indoor Fireplace', body: 'Keep warm on cool mountain nights with our traditional wood stove.' },
      { icon: 'solar', title: 'Solar Powered', body: 'Fully off-grid with reliable solar power for lights and devices.' },
      { icon: 'kitchen', title: 'Full Kitchen', body: 'Gas appliances and everything you need for self-catering.' },
      { icon: 'hottub', title: 'Wood-fired Tub', body: 'The ultimate way to unwind after a day of hiking or exploration.' },
      { icon: 'privacy', title: 'Total Privacy', body: 'The Bunkhouse is set well away from other units for total seclusion.' },
    ],
    cta: {
      heading: 'Book your mountain escape',
      body: 'Check availability and enquire about seasonal rates for the Bunkhouse or our upcoming camping spots.',
      button: { label: 'Enquire for rates', href: '/contact' },
    },
  },

  /**
   * FOOTER
   */
  footer: {
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Instagram', href: 'https://www.instagram.com/haumanskloof/' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100092490755181&sk=about' },
      { label: 'Privacy', href: '/privacy' },
    ],
    legal: '© 2026 Haumanskloof Nature Reserve. All rights reserved.',
  },
}

export type SiteContent = typeof siteContent
