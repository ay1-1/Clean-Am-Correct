import { siteImages } from './images';
import { siteConfig } from './siteConfig';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  benefits: string[];
  features: string[];
  image: string;
  imageAlt: string;
  popular?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'residential-cleaning',
    title: 'Residential Cleaning',
    shortDesc: 'Give your home the proper clean it deserves. We handle the dust, dirt and everyday mess so you can enjoy a fresher space.',
    detailedDesc:
      'We clean your entire living space with care. From sweeping, vacuuming, and mopping tiled floors to dusting furniture, sanitizing washrooms, and tidying your parlour and bedrooms.',
    benefits: [
      'Fresh, dust-free rooms to relax in',
      'Careful handling of your furniture and electronics',
      'Flexible one-time or weekly/monthly bookings',
      'Safe, effective cleaning detergents',
    ],
    features: [
      'Parlour dusting, sofa vacuuming, and floor mopping',
      'Bedroom tidying, under-bed dust removal, and surface care',
      'Kitchen sink, counters, and cooker wipe-down',
      'Bathroom toilet, tiles, and tap cleaning',
    ],
    image: siteImages.residential.src,
    imageAlt: 'Spotless modern Nigerian living room cleaned by Clean Am Correct',
    popular: true,
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    shortDesc: 'When your space needs more than a quick clean, we take our time to clean the areas that are often missed.',
    detailedDesc:
      'When standard routine sweeping and mopping is not enough, our deep clean goes behind heavy furniture and fridges, scrubs tile grout, cleans inside kitchen cabinets, washes window frames, and removes stubborn grime.',
    benefits: [
      'Removes hidden dust, cobwebs, and dirt',
      'Restores stained tile lines and bathroom tiles',
      'Reaches tight corners and ceiling vents',
      'Perfect for monthly or seasonal reset',
    ],
    features: [
      'Tile grout scrubbing and bathroom descaling',
      'Kitchen cooker degreasing and cabinet wipe-out',
      'Window frame, track, and mosquito net cleaning',
      'Behind-furniture and skirting board cleaning',
    ],
    image: siteImages.kitchen.src,
    imageAlt: 'Deep cleaned tiled Nigerian kitchen and sparkling sinks',
    popular: true,
  },
  {
    id: 'commercial-cleaning',
    title: 'Office Cleaning',
    shortDesc: 'Keep your workplace clean, comfortable and ready for the day.',
    detailedDesc:
      'A clean office helps staff focus, stay healthy, and makes a strong impression on clients. We clean corporate offices, stores, and small business workspaces in Ikorodu with zero distraction to your work.',
    benefits: [
      'Healthier and more organized workplace',
      'Trustworthy, disciplined cleaning team',
      'Early morning or weekend cleaning slots',
      'Clean reception and meeting rooms for visitors',
    ],
    features: [
      'Workstations, computer desk, and chair dusting',
      'Meeting room cleaning and glass door wiping',
      'Office kitchen sink and counter cleaning',
      'Waste bin emptying and clean floor mopping',
    ],
    image: siteImages.commercial.src,
    imageAlt: 'Clean modern commercial office in Lagos Nigeria',
  },
  {
    id: 'move-in-move-out',
    title: 'Move-In / Move-Out Cleaning',
    shortDesc: "Moving in or leaving a space? We'll help get it properly cleaned and ready.",
    detailedDesc:
      'Moving into a new flat or packing out of a rented house? We make sure empty apartments are clean from top to bottom. Landlords get their property tenant-ready, and movers step into a fresh, properly sanitized space.',
    benefits: [
      'Total peace of mind on moving day',
      'Helps make sure you get your security deposit back',
      'Cleans inside all empty wardrobes and kitchen cabinets',
      'Sanitizes all door handles, switches, and toilets',
    ],
    features: [
      'Interior wardrobe, cupboard, and drawer wipe-out',
      'Wall spot cleaning and cobweb removal',
      'Deep tile floor scrubbing and mopping',
      'Full bathroom and kitchen sanitization',
    ],
    image: siteImages.floorMop.src,
    imageAlt: 'Nigerian cleaner mopping clean tiled floor in Lagos apartment for move-in',
  },
  {
    id: 'post-event-cleaning',
    title: 'Post-Event Cleaning',
    shortDesc: "Had an event? Leave the cleaning to us. We'll help get your space back in order.",
    detailedDesc:
      'Hosting family gatherings, birthdays, or celebrations is enjoyable, but cleaning up afterwards is exhausting. Clean Am Correct restores your compound, hall, or home quickly so you can rest.',
    benefits: [
      'Fast cleanup after your party or event',
      'All waste bagged and tidied away',
      'Sticky drinks and food spills mopped off floors',
      'Stress-free post-event recovery',
    ],
    features: [
      'Trash collection, sorting, and bag disposal',
      'Spill removal and thorough floor mopping',
      'Restroom washing and sanitization',
      'Chairs and table wipe-down and rearrangement',
    ],
    image: siteImages.cleanerSofa.src,
    imageAlt: 'Clean Am Correct staff cleaning after an event',
  },
];

export const getServiceWhatsAppUrl = (serviceTitle: string) => {
  const text = `Hello Clean Am Correct,
I would like to ask about and book your "${serviceTitle}" service in Ikorodu.
Please provide me with a quote and available dates.`;
  return `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(text)}`;
};
