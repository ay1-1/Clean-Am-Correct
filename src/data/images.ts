// Clean Am Correct - Centralized Image Asset Configuration
// Sourced and generated to editorial commercial photography standards.
// Replace any path anytime with your own high-resolution business photos.

import heroLivingImg from '../assets/images/hero_living_space_1790687006920.jpg';
import luxuryLivingImg from '../assets/images/luxury_living_room_clean_1790688890842.jpg';
import cleanerVacuumImg from '../assets/images/cleaner_vacuuming_carpet_1790688909880.jpg';
import luxuryBathroomImg from '../assets/images/luxury_bathroom_clean_1790688926494.jpg';
import luxuryBedroomImg from '../assets/images/luxury_bedroom_clean_1790688946385.jpg';
import cleaningEquipmentImg from '../assets/images/cleaning_equipment_pro_1790687017632.jpg';
import residentialHomeImg from '../assets/images/residential_clean_home_1790687032337.jpg';
import commercialOfficeImg from '../assets/images/commercial_office_clean_1790687044645.jpg';
import kitchenDeepCleanImg from '../assets/images/sparkling_kitchen_clean_1790687056589.jpg';

export interface ImageSlide {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  tag: string;
}

export const siteImages = {
  logo: {
    src: '/logo.svg',
    alt: 'Clean Am Correct official logo - Professional cleaning services in Ikorodu, Lagos',
  },
  heroLiving: {
    src: luxuryLivingImg,
    alt: 'Immaculately cleaned luxury living room with natural light and polished floor',
  },
  vacuumCleaner: {
    src: cleanerVacuumImg,
    alt: 'Professional cleaner vacuuming luxury area rug in modern room',
  },
  bedroom: {
    src: luxuryBedroomImg,
    alt: 'Pristine luxury master bedroom with fresh linens and vacuumed carpet',
  },
  bathroom: {
    src: luxuryBathroomImg,
    alt: 'Spotless modern marble bathroom after professional deep sanitation',
  },
  kitchen: {
    src: kitchenDeepCleanImg,
    alt: 'Sparkling clean quartz kitchen countertops, stainless fixtures and tiles',
  },
  commercial: {
    src: commercialOfficeImg,
    alt: 'Pristine corporate office conference and executive workspace',
  },
  equipment: {
    src: cleaningEquipmentImg,
    alt: 'Commercial grade vacuum, microfiber materials and safe cleaning solutions',
  },
  residential: {
    src: residentialHomeImg,
    alt: 'Fresh, sanitized contemporary home and living room in Ikorodu Lagos',
  },

  // Hero Layered Carousel Slides (Rotates as overlapping 3D cards)
  heroSlides: [
    {
      src: luxuryLivingImg,
      alt: 'Beautiful freshly cleaned luxury living room with natural light',
      title: 'Pristine Living Spaces',
      subtitle: 'Vacuumed upholstery, dusted cornices, and gleaming hardwood floors',
      tag: 'RESIDENTIAL',
      badge: '01 / 06',
    },
    {
      src: cleanerVacuumImg,
      alt: 'Professional cleaner vacuuming luxury area rug',
      title: 'Precision Rug & Carpet Care',
      subtitle: 'Deep fiber debris extraction and allergen removal',
      tag: 'DEEP CARE',
      badge: '02 / 06',
    },
    {
      src: kitchenDeepCleanImg,
      alt: 'Spotless modern kitchen after deep cleaning',
      title: 'Hygienic Kitchens & Appliances',
      subtitle: 'Degreased countertops, descaled sinks, and sanitised surfaces',
      tag: 'KITCHENS',
      badge: '03 / 06',
    },
    {
      src: luxuryBathroomImg,
      alt: 'Spotless luxury bathroom with sparkling tiles',
      title: 'Bathroom & Washroom Detailing',
      subtitle: 'Limescale descaling, streak-free glass, and tile grout disinfection',
      tag: 'SANITATION',
      badge: '04 / 06',
    },
    {
      src: commercialOfficeImg,
      alt: 'Clean commercial office and meeting room',
      title: 'Corporate & Commercial Spaces',
      subtitle: 'Streak-free partitions, vacuumed workstations, and executive lobbies',
      tag: 'OFFICES',
      badge: '05 / 06',
    },
    {
      src: cleaningEquipmentImg,
      alt: 'Professional cleaning equipment and tools',
      title: 'Commercial Equipment & Care',
      subtitle: 'HEPA vacuums, hygienic microfiber tools, and safe detergents',
      tag: 'EQUIPMENT',
      badge: '06 / 06',
    },
  ],

  // "What We Clean" Horizontal Gallery Items (Inspired by Collection Carousel)
  whatWeClean: [
    {
      title: 'Living Spaces',
      category: 'Residential',
      itemsCount: '15+ Points',
      image: luxuryLivingImg,
      description: 'Sofa vacuuming, dust removal, floor polish, and corner cobweb extraction.',
    },
    {
      title: 'Bedrooms',
      category: 'Personal Spaces',
      itemsCount: '10+ Points',
      image: luxuryBedroomImg,
      description: 'Linen freshening, under-bed cleaning, wardrobe dusting, and mattress vacuuming.',
    },
    {
      title: 'Kitchens',
      category: 'Food Prep',
      itemsCount: '12+ Points',
      image: kitchenDeepCleanImg,
      description: 'Stovetop degreasing, exterior appliance wipe, sink sanitising, and tile scrubbing.',
    },
    {
      title: 'Bathrooms',
      category: 'Sanitation',
      itemsCount: '14+ Points',
      image: luxuryBathroomImg,
      description: 'Toilet bowl disinfection, glass shower descaling, tile cleaning, and faucet polish.',
    },
    {
      title: 'Offices & Boardrooms',
      category: 'Commercial',
      itemsCount: '20+ Points',
      image: commercialOfficeImg,
      description: 'Workstation dust elimination, glass streak removal, and carpet vacuuming.',
    },
    {
      title: 'Move-In Turnovers',
      category: 'Turnaround',
      itemsCount: 'Full Property',
      image: residentialHomeImg,
      description: 'Top-to-bottom empty home sanitization ready for incoming occupants.',
    },
  ],
};
