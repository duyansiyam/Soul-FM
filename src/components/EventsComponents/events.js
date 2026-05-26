export const EVENTS = [
  {
    id: 1,

    slug: 'soulfm-night-vol1',

    title: 'SoulFM Night: Vol. 1',

    category: 'Music / Nightlife',

    ageRestriction: '18+',

    event_date: 'June 14, 2025',

    venue: {
      name: 'The Cove Underground',
      street: 'Ground Floor, The Cove Building, Rizal St.',
      city: 'Legazpi City',
      province: 'Albay',
      country: 'Philippines',
    },

    description:
      'An intimate night of deep house, soul, and afrobeat curated by the SoulFM family. Expect warm lights, cold drinks, and music that moves you.',

    tickets: [
      {
        type: 'Early Bird',
        price: 350,
        currency: 'PHP',
        detail: 'Limited slots. Non-refundable.',
        available: true,
      },

      {
        type: 'General Admission',
        price: 500,
        currency: 'PHP',
        detail: 'Standard entry. Doors open 9:00 PM.',
        available: true,
      },
    ],

    soldOut: false,

    tag: 'Live Event',

    poster_image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
  },

  {
    id: 2,

    slug: 'rooftop-frequencies',

    title: 'Rooftop Frequencies',

    category: 'Music / Outdoor',

    ageRestriction: '18+',

    event_date: 'July 5, 2025',

    venue: {
      name: 'Skybar Legazpi',
      street: 'Rooftop Level, Imperial Court Hotel',
      city: 'Legazpi City',
      province: 'Albay',
      country: 'Philippines',
    },

    description:
      'Sunset sessions on the rooftop with your favorite DJs from SoulFM. R&B, neo-soul, and lo-fi beats with a view of Mayon.',

    tickets: [
      {
        type: 'General Admission',
        price: 400,
        currency: 'PHP',
        detail: 'Includes 1 welcome drink.',
        available: true,
      },

      {
        type: 'VIP Table (4 pax)',
        price: 2500,
        currency: 'PHP',
        detail: 'Reserved table for 4 with a bottle of house spirits.',
        available: true,
      },
    ],

    soldOut: false,

    tag: 'Rooftop',

    poster_image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
  },

  {
    id: 3,

    slug: 'block-party-bicol',

    title: 'Block Party: Bicol Edition',

    category: 'Music / Community',

    ageRestriction: 'All Ages',

    event_date: 'August 23, 2025',

    venue: {
      name: 'Plaza Rizal',
      street: 'Peñafrancia Ave, Naga',
      city: 'Naga City',
      province: 'Camarines Sur',
      country: 'Philippines',
    },

    description:
      'SoulFM takes it to the streets. Free entry, live performances, food stalls, and a full outdoor stage experience celebrating Bicol culture.',

    tickets: [
      {
        type: 'Free Entry',
        price: 0,
        currency: 'PHP',
        detail: 'Register to RSVP your spot.',
        available: true,
      },
    ],

    soldOut: false,

    tag: 'Free Entry',

    poster_image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
  },

  {
    id: 4,

    slug: 'anniversary-gala',

    title: 'SoulFM Anniversary Gala',

    category: 'Music / Gala',

    ageRestriction: '18+',

    event_date: 'September 12, 2025',

    venue: {
      name: 'Grand Ballroom, Casablanca Hotel',
      street: 'Rizal Street corner Peñaranda Street',
      city: 'Legazpi City',
      province: 'Albay',
      country: 'Philippines',
    },

    description:
      "A milestone celebration. Dress up, show out. Live sets, special guests, and a night you won't stop talking about.",

    tickets: [
      {
        type: 'General Admission',
        price: 800,
        currency: 'PHP',
        detail: 'Smart casual / semi-formal attire required.',
        available: false,
      },

      {
        type: 'VIP',
        price: 1500,
        currency: 'PHP',
        detail: 'Priority entrance, reserved seating, complimentary drinks.',
        available: false,
      },
    ],

    soldOut: true,

    tag: 'Special Event',

    poster_image:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063',
  },
]