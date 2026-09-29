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
    shortDesc: 'Regular and comprehensive home cleaning tailored for apartments, duplexes, and family homes in Ikorodu.',
    detailedDesc:
      'Our residential cleaning service handles every corner of your living space with care. From sweeping, vacuuming, and mopping floors to dusting furniture, sanitizing washrooms, and tidying living rooms.',
    benefits: [
      'Fresh, odor-free living environment',
      'Gentle handling of personal furnishings',
      'Flexible recurring or one-time schedules',
      'Safe, hygienic cleaning solutions',
    ],
    features: [
      'Living room dusting and floor polishing',
      'Bedroom tidying, under-bed cleaning, and surface care',
      'Kitchen sink, counters, and exterior appliance wipe-down',
      'Bathroom toilet, shower, and tile disinfection',
    ],
    image: siteImages.residential.src,
    imageAlt: 'Spotless residential living room and home space cleaned by Clean Am Correct',
    popular: true,
  },
  {
    id: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    shortDesc: 'Reliable office, retail, and commercial premise sanitation that leaves a lasting positive impression.',
    detailedDesc:
      'A clean workspace fosters productivity, staff wellness, and professional confidence for clients. We clean corporate offices, co-working studios, stores, and clinics with minimal disruption to your daily operations.',
    benefits: [
      'Enhanced workplace hygiene and morale',
      'Discreet, disciplined cleaning personnel',
      'Tailored after-hours or early morning scheduling',
      'Consistent cleanliness standards for visitors',
    ],
    features: [
      'Workstation, desk, and computer peripheral dusting',
      'Conference room sanitation and glass partition cleaning',
      'Breakroom counters, microwave, and sink cleaning',
      'Waste bin emptying and safe disposal',
    ],
    image: siteImages.commercial.src,
    imageAlt: 'Corporate conference room and office space cleaned by Clean Am Correct',
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    shortDesc: 'Intensive restorative cleaning targeting accumulated dirt, hidden grime, stubborn limescale, and buildup.',
    detailedDesc:
      'When standard routine cleaning is not enough, our intensive deep clean goes behind appliances, scrubs grout lines, cleans inside cabinets, washes light fixtures, and revitalizes high-traffic zones.',
    benefits: [
      'Removes deep-seated grime and allergens',
      'Restores dull tile grout and ceramic luster',
      'Reaches tight nooks, high vents, and baseboards',
      'Ideal seasonal or bi-annual reset',
    ],
    features: [
      'Tile grout scrubbing and lime scale descaling',
      'Oven exterior, range hood, and kitchen backsplash degreasing',
      'Interior window sill, track, and frame scrubbing',
      'Detailed door frame, skirting board, and vent cleaning',
    ],
    image: siteImages.kitchen.src,
    imageAlt: 'Deep cleaned kitchen countertops and sparkling fixtures',
    popular: true,
  },
  {
    id: 'move-in-move-out',
    title: 'Move-In / Move-Out Cleaning',
    shortDesc: 'Turnover cleaning for new tenants, property owners, and agents preparing spaces for fresh occupancy.',
    detailedDesc:
      'Moving into a new home or vacating a rental? We ensure empty residences are spotless from top to bottom. Landlords secure tenant satisfaction, and movers step into a thoroughly sanitized, welcoming environment.',
    benefits: [
      'Complete peace of mind on moving day',
      'Assists in securing security deposit refund',
      'Cleans inside cupboards, wardrobes, and shelves',
      'Sanitizes all previous occupant touchpoints',
    ],
    features: [
      'Interior wardrobe, cabinet, and drawer wipe-out',
      'Full wall spot-washing and cobweb removal',
      'Deep floor scrubbing and edge-to-edge mopping',
      'Sanitization of doorknobs, switches, and handles',
    ],
    image: siteImages.heroLiving.src,
    imageAlt: 'Turnover residential cleaning for move-in and move-out',
  },
  {
    id: 'post-event-cleaning',
    title: 'Post-Event Cleaning',
    shortDesc: 'Fast, efficient cleanup after celebrations, weddings, conferences, birthdays, and community gatherings.',
    detailedDesc:
      'Hosting events is rewarding; cleaning up afterwards is exhausting. Clean Am Correct restores halls, event venues, compounds, and residences quickly so you can relax after your memorable occasion.',
    benefits: [
      'Quick turnaround times after events',
      'Comprehensive trash bag sorting and collection',
      'Immediate removal of food spills and drink stains',
      'Stress-free host experience',
    ],
    features: [
      'Trash collection, sorting, and bag disposal',
      'Sticky drink and food spill floor mopping',
      'Restroom restocking and restorative sanitization',
      'Chair and table wipe-down and furniture realignment',
    ],
    image: siteImages.equipment.src,
    imageAlt: 'Post event cleaning tools and vacuuming equipment',
  },
];

export const getServiceWhatsAppUrl = (serviceTitle: string) => {
  const text = `Hello Clean Am Correct,
I would like to inquire about and book your "${serviceTitle}" service in Ikorodu.
Please provide me with a customized quote and available appointment dates.`;
  return `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(text)}`;
};
