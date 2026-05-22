// events.js — Ticketmelon-compatible event data format
// ticketUrl points to your Ticketmelon event page, e.g. https://www.ticketmelon.com/soulfm/event-slug

export const EVENTS = [
  {
    id: 1,
    slug: 'soulfm-night-vol1',
    title: 'SoulFM Night: Vol. 1',
    coverImage: null, // URL to event poster/banner (from Ticketmelon or your own)
    category: 'Music / Nightlife',
    ageRestriction: 18, // 0 = no restriction
    // Date & time (Ticketmelon supports multiple dates — use an array)
    dates: [
      {
        date: 'June 14, 2025',       // Display string
        isoDate: '2025-06-14',        // ISO for sorting
        startTime: '9:00 PM',
        endTime: '2:00 AM',
        timezone: 'PHT (UTC+8)',
      },
    ],
    venue: {
      name: 'The Cove Underground',
      detail: 'Ground Floor, The Cove Building, Rizal St.',
      city: 'Legazpi City',
      province: 'Albay',
      country: 'Philippines',
    },
    description:
      'An intimate night of deep house, soul, and afrobeat curated by the SoulFM family. Expect warm lights, cold drinks, and music that moves you.',
    // Ticket types (mirrors Ticketmelon's ticket tier structure)
    tickets: [
      {
        type: 'Early Bird',
        price: 350,          // in PHP
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
    ticketUrl: 'https://www.ticketmelon.com/soulfm/soulfm-night-vol1',
    disclaimer: 'Tickets are non-refundable. Valid ID required for 18+ entry.',
    soldOut: false,
    tag: 'Live Event',
  },
  {
    id: 2,
    slug: 'rooftop-frequencies',
    title: 'Rooftop Frequencies',
    coverImage: null,
    category: 'Music / Outdoor',
    ageRestriction: 18,
    dates: [
      {
        date: 'July 5, 2025',
        isoDate: '2025-07-05',
        startTime: '6:00 PM',
        endTime: '12:00 AM',
        timezone: 'PHT (UTC+8)',
      },
    ],
    venue: {
      name: 'Skybar Legazpi',
      detail: 'Rooftop Level, Imperial Court Hotel',
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
    ticketUrl: 'https://www.ticketmelon.com/soulfm/rooftop-frequencies',
    disclaimer: 'No refunds. Management reserves the right to refuse entry.',
    soldOut: false,
    tag: 'Rooftop',
  },
  {
    id: 3,
    slug: 'block-party-bicol',
    title: 'Block Party: Bicol Edition',
    coverImage: null,
    category: 'Music / Community',
    ageRestriction: 0,
    dates: [
      {
        date: 'August 23, 2025',
        isoDate: '2025-08-23',
        startTime: '4:00 PM',
        endTime: '11:00 PM',
        timezone: 'PHT (UTC+8)',
      },
    ],
    venue: {
      name: 'Plaza Rizal',
      detail: 'Peñafrancia Ave, Naga',
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
    ticketUrl: 'https://www.ticketmelon.com/soulfm/block-party-bicol',
    disclaimer: '',
    soldOut: false,
    tag: 'Free Entry',
  },
  {
    id: 4,
    slug: 'anniversary-gala',
    title: 'SoulFM Anniversary Gala',
    coverImage: null,
    category: 'Music / Gala',
    ageRestriction: 18,
    dates: [
      {
        date: 'September 12, 2025',
        isoDate: '2025-09-12',
        startTime: '8:00 PM',
        endTime: '3:00 AM',
        timezone: 'PHT (UTC+8)',
      },
    ],
    venue: {
      name: 'Grand Ballroom, Casablanca Hotel',
      detail: 'Rizal Street corner Peñaranda Street',
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
    ticketUrl: 'https://www.ticketmelon.com/soulfm/anniversary-gala',
    disclaimer: 'Tickets are non-refundable. Dress code strictly enforced.',
    soldOut: true,
    tag: 'Special Event',
  },
]
