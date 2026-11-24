import { siteConfig } from './siteConfig';
import { servicesData } from './services';

export interface ChatAction {
  label: string;
  type: 'payment' | 'whatsapp' | 'call' | 'query';
  serviceId?: string;
  url?: string;
  query?: string;
}

export interface ChatResponse {
  text: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

export interface OfficialPriceItem {
  id: string;
  number: number;
  name: string;
  price: string;
  amount: number | null;
  note?: string;
}

export const OFFICIAL_PRICE_LIST: OfficialPriceItem[] = [
  {
    id: 'room-self-contained',
    number: 1,
    name: 'Room (Self-contained)',
    price: '₦35,000',
    amount: 35000,
  },
  {
    id: 'full-house',
    number: 2,
    name: 'Full House',
    price: '₦50,000',
    amount: 50000,
  },
  {
    id: '1-bedroom-apartment',
    number: 3,
    name: '1-Bedroom Apartment',
    price: '₦45,000',
    amount: 45000,
  },
  {
    id: '2-bedroom-apartment',
    number: 4,
    name: '2-Bedroom Apartment',
    price: '₦60,000',
    amount: 60000,
  },
  {
    id: '3-bedroom-apartment',
    number: 5,
    name: '3-Bedroom Apartment',
    price: '₦80,000',
    amount: 80000,
  },
  {
    id: '4-bedroom-apartment',
    number: 6,
    name: '4-Bedroom Apartment',
    price: 'Price to be confirmed',
    amount: null,
    note: 'Custom inspection / quote upon inquiry',
  },
  {
    id: '5-bedroom-apartment',
    number: 7,
    name: '5-Bedroom Apartment',
    price: '₦165,000',
    amount: 165000,
  },
  {
    id: 'room-bathroom-toilet',
    number: 8,
    name: 'Room + Bathroom/Toilet',
    price: '₦45,000',
    amount: 45000,
  },
];

export const LOCATION_PRICE_NOTICE =
  "⚠️ **IMPORTANT NOTICE:**\nPrices may vary depending on the customer's location. Additional transportation or logistics charges may apply for distant locations.";

export const FORMATTED_OFFICIAL_PRICE_LIST = `📋 **CLEAN AM CORRECT – OFFICIAL PRICE LIST**\n\n1. 🏠 **Room (Self-contained)** – **₦35,000**\n2. 🏡 **Full House** – **₦50,000**\n3. 🏢 **1-Bedroom Apartment** – **₦45,000**\n4. 🛋️ **2-Bedroom Apartment** – **₦60,000**\n5. 🛏️ **3-Bedroom Apartment** – **₦80,000**\n6. 🚪 **4-Bedroom Apartment** – **Price to be confirmed**\n7. 🏰 **5-Bedroom Apartment** – **₦165,000**\n8. 🚿 **Room + Bathroom/Toilet** – **₦45,000**\n\n${LOCATION_PRICE_NOTICE}`;

export const COMMON_SUGGESTIONS = [
  '💰 Official Price List',
  '🏠 2-Bedroom Apartment (₦60k)',
  '🏡 Full House (₦50k)',
  '🛏️ 3-Bedroom Apartment (₦80k)',
  '🚪 4-Bedroom Apartment Quote',
  '📍 Areas in Ikorodu Covered',
  '💬 Book on WhatsApp',
];

/**
 * Intelligent Real-Time Natural Language Matcher with Official Price List
 */
export function getInstantChatResponse(rawInput: string): ChatResponse {
  const input = rawInput.trim().toLowerCase();

  if (!input) {
    return {
      text: `Hello! I am your Clean Am Correct Assistant. How can I help you today? Ask me for our **Official Price List**, request a quote for your apartment in Ikorodu, or check our service areas.`,
      suggestions: COMMON_SUGGESTIONS.slice(0, 4),
    };
  }

  // 1. GREETINGS
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|how far|xup|yo|salut)\b/.test(input)) {
    return {
      text: `Hello! 👋 Welcome to **Clean Am Correct** — *Your Space. Clean & Correct.*\n\nI can answer questions about our cleaning packages, give you our **Official Price List**, or help you book your cleaning appointment right now.\n\nWhat type of apartment or house are you looking to clean?`,
      suggestions: [
        '💰 Official Price List',
        '🏠 2-Bedroom (₦60,000)',
        '🏡 Full House (₦50,000)',
        '📍 Location Notice',
      ],
    };
  }

  // 2. SPECIFIC APARTMENT / PROPERTY INQUIRIES FROM OFFICIAL LIST

  // Room + Bathroom/Toilet
  if (
    (input.includes('room') && (input.includes('bathroom') || input.includes('toilet') || input.includes('bath'))) ||
    input.includes('room +') ||
    input.includes('room and bath')
  ) {
    return {
      text: `🚿 **Room + Bathroom/Toilet Cleaning**:\n\n• **Price**: **₦45,000**\n• Complete cleaning of bedroom plus intensive washing, scrubbing, and sanitization of attached bathroom and toilet.\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Book Room + Bathroom on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I want to book cleaning for Room + Bathroom/Toilet (₦45,000).'
          )}`,
        },
        {
          label: '💰 View Full Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['💰 Official Price List', '🏠 Room (Self-contained) ₦35k', '📍 Areas Covered'],
    };
  }

  // Room (Self-contained)
  if (
    input.includes('self contain') ||
    input.includes('self-contain') ||
    input.includes('single room') ||
    input.includes('studio') ||
    (input.includes('room') && !input.includes('bedroom') && !input.includes('bath') && !input.includes('toilet') && !input.includes('house'))
  ) {
    return {
      text: `🏠 **Room (Self-contained) Cleaning**:\n\n• **Price**: **₦35,000**\n• Thorough sanitization of the self-contained room, floor mopping, dusting, and detailing.\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Book Self-Contained on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I want to book cleaning for a Room (Self-contained) (₦35,000).'
          )}`,
        },
        {
          label: '💰 View Full Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['🚿 Room + Bathroom ₦45k', '🏢 1-Bedroom ₦45k', '💰 Official Price List'],
    };
  }

  // 1-Bedroom Apartment
  if (input.includes('1 bedroom') || input.includes('1-bed') || input.includes('one bedroom') || input.includes('one bed')) {
    return {
      text: `🏢 **1-Bedroom Apartment Cleaning**:\n\n• **Price**: **₦45,000**\n• Complete top-to-bottom clean: living room/parlor, 1 bedroom, kitchen counters/sink, and bathroom/toilet.\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Book 1-Bedroom on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I would like to book cleaning for a 1-Bedroom Apartment (₦45,000).'
          )}`,
        },
        {
          label: '💰 View Full Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['🛋️ 2-Bedroom ₦60k', '🏡 Full House ₦50k', '💰 Official Price List'],
    };
  }

  // Full House
  if (input.includes('full house') || input.includes('entire house') || input.includes('whole house')) {
    return {
      text: `🏡 **Full House Cleaning**:\n\n• **Price**: **₦50,000**\n• Comprehensive full house cleaning covering all living spaces, floor mopping, dusting, kitchen, and washrooms.\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Book Full House on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I want to book Full House cleaning (₦50,000).'
          )}`,
        },
        {
          label: '💰 View Full Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['🛋️ 2-Bedroom ₦60k', '🛏️ 3-Bedroom ₦80k', '💰 Official Price List'],
    };
  }

  // 2-Bedroom Apartment
  if (input.includes('2 bedroom') || input.includes('2-bed') || input.includes('two bedroom') || input.includes('two bed')) {
    return {
      text: `🛋️ **2-Bedroom Apartment Cleaning**:\n\n• **Price**: **₦60,000**\n• Full clean of living room/parlor, 2 bedrooms, kitchen cabinets and counters, and bathrooms/toilets.\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Book 2-Bedroom on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I would like to book cleaning for a 2-Bedroom Apartment (₦60,000).'
          )}`,
        },
        {
          label: '💰 View Full Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['🛏️ 3-Bedroom ₦80k', '🏢 1-Bedroom ₦45k', '💰 Official Price List'],
    };
  }

  // 3-Bedroom Apartment
  if (input.includes('3 bedroom') || input.includes('3-bed') || input.includes('three bedroom') || input.includes('three bed')) {
    return {
      text: `🛏️ **3-Bedroom Apartment Cleaning**:\n\n• **Price**: **₦80,000**\n• Detailed cleaning of spacious parlor, 3 bedrooms, kitchen scrub, balconies, and multiple washrooms.\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Book 3-Bedroom on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I would like to book cleaning for a 3-Bedroom Apartment (₦80,000).'
          )}`,
        },
        {
          label: '💰 View Full Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['🚪 4-Bedroom Quote', '🛋️ 2-Bedroom ₦60k', '💰 Official Price List'],
    };
  }

  // 4-Bedroom Apartment (Price to be confirmed)
  if (input.includes('4 bedroom') || input.includes('4-bed') || input.includes('four bedroom') || input.includes('four bed')) {
    return {
      text: `🚪 **4-Bedroom Apartment Cleaning**:\n\n• **Price**: **Price to be confirmed**\n• Because 4-bedroom apartments and duplexes vary significantly in size, number of bathrooms, and compound layout, we provide a **confirmed custom quote** based on your specific property.\n\n${LOCATION_PRICE_NOTICE}\n\nChat with our dispatch manager on WhatsApp for an immediate quote and site scheduling!`,
      actions: [
        {
          label: '💬 Confirm 4-Bedroom Price on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I have a 4-Bedroom Apartment and would like to confirm pricing and availability.'
          )}`,
        },
        {
          label: `📞 Call Dispatch (${siteConfig.phoneDisplay})`,
          type: 'call',
        },
      ],
      suggestions: ['🛏️ 3-Bedroom ₦80k', '🏰 5-Bedroom ₦165k', '💰 Official Price List'],
    };
  }

  // 5-Bedroom Apartment
  if (input.includes('5 bedroom') || input.includes('5-bed') || input.includes('five bedroom') || input.includes('five bed')) {
    return {
      text: `🏰 **5-Bedroom Apartment Cleaning**:\n\n• **Price**: **₦165,000**\n• Intensive multi-cleaner detailing for large 5-bedroom apartments, duplexes, or mansions. Covers all 5 bedrooms, grand parlor, dining, kitchen, and all bathrooms.\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Book 5-Bedroom on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I would like to book cleaning for a 5-Bedroom Apartment (₦165,000).'
          )}`,
        },
        {
          label: '💰 View Full Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['🚪 4-Bedroom Quote', '🛏️ 3-Bedroom ₦80k', '💰 Official Price List'],
    };
  }

  // 3. GENERAL PRICE LIST / COST / CHARGES
  if (
    input.includes('price') ||
    input.includes('cost') ||
    input.includes('how much') ||
    input.includes('rate') ||
    input.includes('charges') ||
    input.includes('fee') ||
    input.includes('quote') ||
    input.includes('pricing') ||
    input.includes('list')
  ) {
    return {
      text: FORMATTED_OFFICIAL_PRICE_LIST,
      actions: [
        {
          label: '💬 Book / Inquire on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I would like to book an appointment based on your Official Price List.'
          )}`,
        },
        {
          label: '💳 Book Online via Portal',
          type: 'payment',
        },
      ],
      suggestions: [
        '🏠 2-Bedroom (₦60,000)',
        '🏡 Full House (₦50,000)',
        '🛏️ 3-Bedroom (₦80,000)',
        '📍 Location Logistics Notice',
      ],
    };
  }

  // 4. NOTICE / LOCATION / TRANSPORTATION LOGISTICS
  if (
    input.includes('transport') ||
    input.includes('logistics') ||
    input.includes('notice') ||
    input.includes('location charge') ||
    input.includes('distant') ||
    input.includes('distance')
  ) {
    return {
      text: `${LOCATION_PRICE_NOTICE}\n\nOur base operations cover Ikorodu central and immediate surrounding districts (Ebute, Agric, Ogolonto, Igbogbo, Bayeku, Owutu, Haruna, Majidun). For distant locations or destinations across Lagos Mainland, a modest logistics fee is confirmed upfront before dispatch so there are no surprises!`,
      actions: [
        {
          label: '💬 Confirm My Location Charge on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I would like to confirm the price and transportation logistics for my location.'
          )}`,
        },
        {
          label: '💰 View Official Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['💰 Official Price List', '📍 Service Areas in Ikorodu', '🏠 2-Bedroom ₦60k'],
    };
  }

  // 5. AREAS COVERED
  if (
    input.includes('where') ||
    input.includes('location') ||
    input.includes('area') ||
    input.includes('ikorodu') ||
    input.includes('agric') ||
    input.includes('ebute') ||
    input.includes('ogolonto') ||
    input.includes('igbogbo')
  ) {
    return {
      text: `📍 **Service Areas Covered**:\n\n**Clean Am Correct** operates throughout **Ikorodu, Lagos State**:\n• **Ebute, Ikorodu Central & Garage**\n• **Agric, Ogolonto & Majidun**\n• **Igbogbo, Bayeku & Offin**\n• **Owutu, Haruna & Isawo**\n• **Nearby Lagos Mainland locations upon request**\n\n${LOCATION_PRICE_NOTICE}`,
      actions: [
        {
          label: '💬 Check My Area on WhatsApp',
          type: 'whatsapp',
          url: siteConfig.whatsappLink,
        },
        {
          label: '💰 View Official Price List',
          type: 'query',
          query: 'Show me the official price list',
        },
      ],
      suggestions: ['💰 Official Price List', '🏠 1-Bedroom ₦45k', '🛋️ 2-Bedroom ₦60k'],
    };
  }

  // 6. GENERAL FALLBACK
  return {
    text: `Thanks for asking! Here is our current price schedule:\n\n${FORMATTED_OFFICIAL_PRICE_LIST}\n\nWhich of these options fits your space?`,
    actions: [
      {
        label: '💬 Chat on WhatsApp',
        type: 'whatsapp',
        url: siteConfig.whatsappLink,
      },
    ],
    suggestions: [
      '💰 Official Price List',
      '🏠 2-Bedroom Apartment (₦60k)',
      '🏡 Full House (₦50k)',
      '🛏️ 3-Bedroom Apartment (₦80k)',
    ],
  };
}
