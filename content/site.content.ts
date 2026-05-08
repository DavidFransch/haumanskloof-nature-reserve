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
        'Haumanskloof is a land of contrast, where vibrant Renosterveld and Fynbos meet the arid beauty of the Succulent Karoo.',
      body: 'Just two hours from Cape Town, Haumanskloof is a family-run sanctuary where nature and community thrive. Explore and immerse yourself in a unique natural setting, discover the riches of the land, or simply unwind under the stars.',
      cta: 'Come experience this special intersection of rolling mountains, pristine landscapes and rugged roads — we invite you to join us!',
      primaryCta: { label: 'Explore the reserve', href: '#about' },
      secondaryCta: { label: 'View accommodation', href: '/accommodation' },
    },

    about: {
      label: 'Our sanctuary',
      heading: 'A land of contrast and wonder',
      body: 'Haumanskloof is a place where gently rolling mountains meet pristine landscapes and rugged roads. Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars — we invite you to join us.',
      cta: { label: 'Meet the family', href: '/about' },
    },

    pillars: [
      {
        icon: 'wildlife',
        title: 'Wildlife & ecology',
        body: 'Camera trap monitoring, diverse Renosterveld, Fynbos and Succulent Karoo flora, and exploration through indigenous habitat.',
      },
      {
        icon: 'accommodation',
        title: 'Accommodation',
        body: 'Comfortable bunkhouse unit nestled in the reserve. Fall asleep to the sounds of the bush.',
      },
      {
        icon: 'rockart',
        title: 'Ancient landscapes',
        body: 'Explore a timeless landscape through scenic walks, stargazing, photography and quiet immersion in nature.',
      },
    ],

    gallery: {
      label: 'The reserve',
      heading: 'Experience Haumanskloof Nature Reserve',
      cta: { label: 'View full gallery', href: '/gallery' },
      items: [
        { label: 'Wildlife', image: '/images/gallery/home-gallery-strip/home-gallery-strip-1.webp', href: '/gallery/wildlife' },
        { label: 'Scenery', image: '/images/gallery/home-gallery-strip/home-gallery-strip-2.webp', href: '/gallery/scenery' },
        { label: 'Adventure', image: '/images/gallery/home-gallery-strip/home-gallery-strip-3.webp', href: '/gallery/activities' },
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
          tag: 'Enquire for bookings',
          image: '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-2.webp',
          href: '/accommodation#bunkhouse',
        },
      ],
    },

    cta: {
      heading: 'Come experience the sanctuary',
      body: "Discover ancient landscapes, encounter local wildlife, or simply unwind under the stars. We'd love to have you.",
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
        "From self-paced exploration to quiet relaxation, Haumanskloof offers a range of outdoor experiences in a uniquely South African landscape.",
    },
    items: [
      {
        id: 'wildlife-walks',
        icon: 'wildlife',
        tag: 'Self-guided · Guided on request',
        title: 'Wildlife Walks & Ecology',
        body: 'Explore the reserve on foot through indigenous veld. The reserve is home to a remarkable diversity of species — from caracal and Cape mountain leopard to over 200 bird species and hundreds of endemic plants.',
        highlights: [
          'Camera trap monitoring stations',
          'Caracal, porcupine & aardvark sightings',
          '200+ bird species recorded',
          'Indigenous Renosterveld, Fynbos & Succulent Karoo flora',
        ],
        image: '/images/gallery/activities-wildlife/activities-wildlife-1.webp',
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
          'Night sky stargazing at altitude',
        ],
        image: '/images/gallery/activities-hiking/activities-hiking-1.webp',
      },
      {
        id: 'cycling',
        icon: 'cycling',
        tag: 'Self-guided · Bring your own bike',
        title: 'Mountain Cycling',
        body: 'Explore the reserve\'s rugged 4x4 tracks and farm roads on two wheels. The varied terrain offers everything from gentle valley rides to technical mountain routes, all set against the dramatic backdrop of the Breede Valley.',
        highlights: [
          'Farm tracks and mountain routes',
          'Varied terrain for all levels',
          'Scenic Breede Valley riding',
          'Combine with wildlife spotting on the move',
        ],
        image: '/images/gallery/activities-cycling/activities-cycling-1.webp',
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
      title: 'The Bunkhouse on Protea Lane',
      mainImage: '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-2.webp',
      capacity: 'Sleeps up to 8 guests',
      intro:
        'Nestled in a private valley, the Bunkhouse is our flagship unit. It combines rugged mountain charm with modern eco-amenities, offering the perfect base for families or groups of friends.',
      details: [
        '2 bedrooms — Queen, Twin, and Bunk configurations',
        'Fully equipped kitchen with gas stove',
        'Spacious deck with panoramic valley views',
        'Indoor and outdoor fireplace',
        'Wood-fired hot tub overlooking the valley',
        'Solar-powered lighting and charging points',
        'Compost toilet — low impact, high comfort',
        'No Wi-Fi — fully off the grid',
      ],
      storyTitle: 'The story behind the build',
      story: `The unit was constructed with the hope of having a minimal ecological footprint during its occupancy and construction. Recycled and up-cycled materials were therefore used where possible, however, the sacrifice of comfort was non-negotiable. New materials thus had to be transported in for substructures, decking, internal walling and ceiling purposes.

Due to the isolation of the house, the rocky terrain and the proximity to a stream – many variables had to be approached very cautiously. It is for this reason that we opted for a compost toilet rather than a septic tank system. The sinking of a septic tank system often requires water based flush and overflow mechanisms – which in this water scarce area and within this proximity to the stream was just not an option. The bunkhouse also boasts an unconventional electrical earth mat which was designed into the decking substructure to avoid unnecessary soil disturbance.

The bathroom is built out of fully up-cycled and recycled materials (aside for some structural timber where required by legislation). Double wooden doors, originally installed in the main building, were replaced with glass sliding doors to maximize one's opportunity for a view in the house. These double doors now clad the bathroom to allow for additional 360⁰ views of nature while showering. The bathroom's internal cladding – even the cabinetry – is made from offcuts from the rest of the house. This cabinetry rule further extends to the main house. All the furniture, aside from a few select couches and bed frames, were crafted from recycled timber on the farm. Bedframes were also manufactured on the farm, however, new timber was essential for these pieces to enable maximum comfort and peace of mind.

Paintings are all up-cycled from our personal collections on the farm, and any additional works are intended to be sourced locally. Please reach out if you would like to find out more regarding this.

The house was meticulously built and designed to be enjoyed in nature, without disturbing it – We hope that you experience and enjoy the fruits of these efforts!`,
      gallery: [
        { label: 'Inside: Living Area', image: '/images/gallery/accommodation-bunkhouse-interior/accommodation-bunkhouse-interior-1.webp', category: 'interior' },
        { label: 'Inside: The Kitchen', image: '/images/gallery/accommodation-bunkhouse-interior/accommodation-bunkhouse-interior-2.webp', category: 'interior' },
        { label: 'Outside: The Bunkhouse', image: '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-1.webp', category: 'landscape' },
        { label: 'Outside: The Hot Tub', image: '/images/gallery/accommodation-bunkhouse-facilities/accommodation-bunkhouse-facilities-1.webp', category: 'exterior' },
        { label: 'Facilities: Compost Toilet', image: '/images/gallery/accommodation-bunkhouse-facilities/accommodation-bunkhouse-facilities-2.webp', category: 'exterior' },
        { label: 'Outside: Mountain Views', image: '/images/gallery/accommodation-bunkhouse-exterior/accommodation-bunkhouse-exterior-2.webp', category: 'landscape' },
      ],
    },
    amenities: [
      { icon: 'mountain', title: 'Mountain views', body: 'Panoramic 360-degree views of the Breede Valley landscape from every window and the outdoor deck.' },
      { icon: 'fire', title: 'Indoor & outdoor fireplace', body: 'Two fireplaces — one inside for cosy evenings, one outside for gathering under the stars.' },
      { icon: 'solar', title: 'Solar powered', body: 'Fully off-grid with solar power for lighting and device charging, designed for mindful use.' },
      { icon: 'kitchen', title: 'Fully-equipped kitchen', body: 'Gas appliances, DeLonghi coffee machine and everything you need for a comfortable self-catering stay.' },
      { icon: 'hottub', title: 'Wood-fired hot tub', body: 'The ultimate way to unwind after a day on the mountain, overlooking the valley.' },
      { icon: 'privacy', title: 'Total privacy', body: 'The Bunkhouse is completely secluded — no neighbours, no noise, just nature.' },
      { icon: 'toilet', title: 'Compost toilet', body: 'An eco-conscious alternative to a septic system, designed to protect the nearby stream and surrounding habitat.' },
      { icon: 'nowifi', title: 'No Wi-Fi', body: 'Deliberately off-grid. This is your chance to disconnect completely and reconnect with what matters.' },
    ],
    cta: {
      heading: 'Book your mountain escape',
      body: 'Enquire about availability and rates for the Bunkhouse on Protea Lane. We\'ll get back to you within 24 hours.',
      button: { label: 'Enquire for bookings', href: '/contact' },
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
    ],
    legal: '© 2026 Haumanskloof Nature Reserve. All rights reserved.',
  },
}

export type SiteContent = typeof siteContent