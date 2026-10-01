// Clean Am Correct - Centralized Image Asset Configuration
// Sourced and generated to reflect authentic Nigerian homes, apartments, and offices in Lagos / Ikorodu.
// Replace any path anytime with your own high-resolution business photos.

import nigerianLivingImg from '../assets/images/nigerian_living_room_clean_1790886053240.jpg';
import nigerianCleanerSofaImg from '../assets/images/nigerian_cleaner_vacuum_1790886070579.jpg';
import nigerianFloorMopImg from '../assets/images/nigerian_tiled_floor_mop_1790886120742.jpg';
import nigerianKitchenImg from '../assets/images/nigerian_tiled_kitchen_clean_1790886087608.jpg';
import nigerianOfficeImg from '../assets/images/nigerian_office_clean_1790886104571.jpg';
import nigerianBedroomImg from '../assets/images/nigerian_bedroom_clean_1790886142399.jpg';
import nigerianBathroomImg from '../assets/images/nigerian_bathroom_clean_1790886174065.jpg';
import cleaningEquipmentImg from '../assets/images/cleaning_equipment_pro_1790687017632.jpg';

export interface ImageSlide {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
}

export const siteImages = {
  logo: {
    src: '/logo.svg',
    alt: 'Clean Am Correct official logo - Professional cleaning services in Ikorodu, Lagos',
  },
  heroLiving: {
    src: nigerianLivingImg,
    alt: 'Clean modern Nigerian living room in Lagos with polished tiled floors and comfortable seating',
  },
  cleanerSofa: {
    src: nigerianCleanerSofaImg,
    alt: 'Professional Nigerian cleaner carefully cleaning sofa and living area',
  },
  floorMop: {
    src: nigerianFloorMopImg,
    alt: 'Nigerian cleaner mopping clean ceramic tile floor in Lagos home',
  },
  bedroom: {
    src: nigerianBedroomImg,
    alt: 'Tidy, fresh master bedroom in a Lagos apartment with clean sheets and tiled floor',
  },
  bathroom: {
    src: nigerianBathroomImg,
    alt: 'Spotless tiled bathroom in a Lagos residence after deep cleaning',
  },
  kitchen: {
    src: nigerianKitchenImg,
    alt: 'Sparkling clean tiled Nigerian kitchen in a Lagos apartment with tidy countertops',
  },
  commercial: {
    src: nigerianOfficeImg,
    alt: 'Clean, organized commercial office workspace in Lagos Nigeria',
  },
  equipment: {
    src: cleaningEquipmentImg,
    alt: 'Commercial grade vacuum, microfiber materials and safe cleaning supplies',
  },
  residential: {
    src: nigerianLivingImg,
    alt: 'Fresh, clean Nigerian home living room in Ikorodu Lagos',
  },

  // Hero Layered Carousel Slides (Rotates as overlapping 3D cards)
  heroSlides: [
    {
      src: nigerianLivingImg,
      alt: 'Clean, comfortable Nigerian living room in Lagos with gleaming tiled floors',
      title: 'Clean & Comfortable Living Rooms',
      subtitle: 'Vacuumed sofas, clean tiled floors, and fresh dust-free spaces for family and guests',
      tag: 'HOMES & FLATS',
      badge: '01 / 06',
    },
    {
      src: nigerianCleanerSofaImg,
      alt: 'Professional Nigerian cleaner cleaning a living room sofa',
      title: 'Sofa Cleaning & Dust Removal',
      subtitle: 'Proper vacuuming and dusting to remove trapped dust, sand, and pet hair',
      tag: 'FURNITURE CARE',
      badge: '02 / 06',
    },
    {
      src: nigerianFloorMopImg,
      alt: 'Nigerian cleaner mopping a clean tiled floor with mop and bucket',
      title: 'Spotless Mopped Tile Floors',
      subtitle: 'Properly mopped and polished tiles, clean skirting boards, and no slippery residue',
      tag: 'FLOOR CARE',
      badge: '03 / 06',
    },
    {
      src: nigerianKitchenImg,
      alt: 'Spotless modern Nigerian tiled kitchen with clean countertops and sink',
      title: 'Clean & Fresh Tiled Kitchens',
      subtitle: 'Degreased cooker surroundings, wiped wall tiles, and sanitized washing sinks',
      tag: 'KITCHENS',
      badge: '04 / 06',
    },
    {
      src: cleaningEquipmentImg,
      alt: 'Professional cleaning equipment, vacuum cleaner, and safe detergents',
      title: 'Proper Equipment & Supplies',
      subtitle: 'Commercial vacuums, clean microfiber cloths, and safe disinfectants',
      tag: 'OUR GEAR',
      badge: '05 / 06',
    },
    {
      src: nigerianOfficeImg,
      alt: 'Clean commercial office workspace in Lagos Nigeria',
      title: 'Clean Offices & Workplaces',
      subtitle: 'Dusted computer desks, streak-free glass, clean floors, and tidy meeting rooms',
      tag: 'OFFICES',
      badge: '06 / 06',
    },
  ],

  // "What We Clean" Horizontal Gallery Items
  whatWeClean: [
    {
      title: 'Living Rooms & Parlours',
      category: 'Residential',
      itemsCount: 'Full Space',
      image: nigerianLivingImg,
      description: 'Sofa vacuuming, tiled floor mopping, TV console dusting, and corner cobweb removal.',
    },
    {
      title: 'Bedrooms',
      category: 'Family Homes',
      itemsCount: 'Every Room',
      image: nigerianBedroomImg,
      description: 'Under-bed dust removal, wardrobe wipe-down, floor sweeping, and bed freshening.',
    },
    {
      title: 'Tiled Kitchens',
      category: 'Food Prep',
      itemsCount: 'Deep Degrease',
      image: nigerianKitchenImg,
      description: 'Cooker degreasing, wall tile scrubbing, cabinet wipe-down, and double sink sanitizing.',
    },
    {
      title: 'Bathrooms & Washrooms',
      category: 'Sanitation',
      itemsCount: 'Descaled',
      image: nigerianBathroomImg,
      description: 'Toilet bowl disinfection, shower tile scrubbing, mirror polish, and tap descaling.',
    },
    {
      title: 'Lagos Offices & Shops',
      category: 'Commercial',
      itemsCount: 'Workplaces',
      image: nigerianOfficeImg,
      description: 'Desk wipe-down, keyboard and screen dusting, trash emptying, and floor cleaning.',
    },
    {
      title: 'Move-In & Move-Out',
      category: 'New Tenants',
      itemsCount: 'Empty Property',
      image: nigerianFloorMopImg,
      description: 'Complete top-to-bottom turnover cleaning before you unpack or hand over the keys.',
    },
  ],
};
