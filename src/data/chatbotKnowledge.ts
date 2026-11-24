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

export interface PricingDetail {
  id: string;
  name: string;
  startingDeposit: number;
  depositLabel: string;
  typicalRange: string;
  description: string;
  breakdown: string[];
}

export const PRICING_CATALOGUE: Record<string, PricingDetail> = {
  'residential-cleaning': {
    id: 'residential-cleaning',
    name: 'Residential Cleaning',
    startingDeposit: 8000,
    depositLabel: '₦8,000',
    typicalRange: '₦12,000 – ₦35,000',
    description: 'Routine living space maintenance: parlour, bedrooms, kitchen counters, floor mopping, and bathroom sanitization.',
    breakdown: [
      'Self-Contain / 1-Bedroom Flat: ₦12,000 – ₦18,000 (₦8,000 deposit)',
      '2-Bedroom Flat: ₦18,000 – ₦25,000 (₦8,000 deposit)',
      '3-Bedroom Flat: ₦25,000 – ₦35,000 (₦8,000 deposit)',
      'Duplex / 4+ Bedroom: ₦35,000 – ₦55,000 (₦8,000 deposit)',
    ],
  },
  'deep-cleaning': {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    startingDeposit: 15000,
    depositLabel: '₦15,000',
    typicalRange: '₦25,000 – ₦65,000',
    description: 'Intensive top-to-bottom scrub: behind appliances, tile grout scrubbing, cabinet interiors, window tracks, descaling toilets, cooker degreasing.',
    breakdown: [
      'Self-Contain / 1-Bedroom: ₦20,000 – ₦28,000 (₦15,000 deposit)',
      '2-Bedroom Flat: ₦28,000 – ₦38,000 (₦15,000 deposit)',
      '3-Bedroom Flat: ₦38,000 – ₦50,000 (₦15,000 deposit)',
      'Duplex / Mansion: ₦50,000 – ₦75,000+ (₦15,000 deposit)',
    ],
  },
  'commercial-cleaning': {
    id: 'commercial-cleaning',
    name: 'Office & Commercial Cleaning',
    startingDeposit: 20000,
    depositLabel: '₦20,000',
    typicalRange: '₦35,000 – ₦85,000+',
    description: 'Corporate workspaces, retail stores, offices, and conference rooms across Ikorodu and Lagos.',
    breakdown: [
      'Small Office / Shop (1–3 rooms): ₦25,000 – ₦40,000 (₦20,000 deposit)',
      'Medium Corporate Suite (4–8 desks): ₦40,000 – ₦65,000 (₦20,000 deposit)',
      'Large Commercial Complex / Floors: Custom quote based on square footage',
      'Flexible recurring weekly or monthly retainer contracts available',
    ],
  },
  'move-in-move-out': {
    id: 'move-in-move-out',
    name: 'Move-In / Move-Out Cleaning',
    startingDeposit: 18000,
    depositLabel: '₦18,000',
    typicalRange: '₦25,000 – ₦55,000',
    description: 'Full sanitization for vacant apartments, ensuring you get security deposits back or move into an impeccably fresh space.',
    breakdown: [
      '1-Bedroom Empty Flat: ₦20,000 – ₦28,000 (₦18,000 deposit)',
      '2-Bedroom Empty Flat: ₦28,000 – ₦36,000 (₦18,000 deposit)',
      '3-Bedroom Empty Flat: ₦35,000 – ₦48,000 (₦18,000 deposit)',
      'Duplex Empty House: ₦45,000 – ₦70,000 (₦18,000 deposit)',
    ],
  },
  'post-event-cleaning': {
    id: 'post-event-cleaning',
    name: 'Post-Event Cleaning',
    startingDeposit: 12000,
    depositLabel: '₦12,000',
    typicalRange: '₦20,000 – ₦50,000',
    description: 'Fast recovery after parties, weddings, birthdays, and celebrations: trash sorting, sticky drinks floor scrub, and bathroom restoration.',
    breakdown: [
      'Home / Compound Party (up to 50 guests): ₦20,000 – ₦30,000 (₦12,000 deposit)',
      'Medium Hall / Compound (50–150 guests): ₦30,000 – ₦45,000 (₦12,000 deposit)',
      'Large Event Center (150+ guests): Custom quote with multi-cleaner rapid team',
    ],
  },
};

export const COMMON_SUGGESTIONS = [
  '💰 View Price List',
  '🏠 Residential Cleaning Price',
  '🧼 Deep Cleaning Quote',
  '🏢 Office Cleaning Rates',
  '📍 Areas in Ikorodu Covered',
  '💳 How to Pay Deposit',
  '💬 Book on WhatsApp',
];

/**
 * Intelligent Real-Time Natural Language Matcher
 * Parses user questions and delivers instant, accurate, contextual answers.
 */
export function getInstantChatResponse(rawInput: string): ChatResponse {
  const input = rawInput.trim().toLowerCase();

  if (!input) {
    return {
      text: "Hello! I am your Clean Am Correct Assistant. How can I help you today? You can ask for our full price list, request a quote for your apartment or office, or check our service areas in Ikorodu.",
      suggestions: COMMON_SUGGESTIONS.slice(0, 4),
    };
  }

  // 1. GREETINGS
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|how far|xup|yo|salut)\b/.test(input)) {
    return {
      text: `Hello! 👋 Welcome to **Clean Am Correct** — *Your Space. Clean & Correct.*\n\nI can answer questions about our cleaning services, give you instant pricing estimates, and help you lock in an appointment in Ikorodu.\n\nWhat type of cleaning are you looking for today?`,
      suggestions: [
        '💰 View Price List',
        '🏠 Residential Cleaning',
        '🧼 Deep Cleaning',
        '📍 Areas in Ikorodu',
      ],
    };
  }

  // 2. SPECIFIC PRICE ESTIMATES (e.g. "how much for 2 bedroom", "3 bedroom deep clean")
  const isDeep = input.includes('deep');
  const isMove = input.includes('move') || input.includes('relocat');
  const isOffice = input.includes('office') || input.includes('commercial') || input.includes('shop') || input.includes('store');
  const isEvent = input.includes('event') || input.includes('party') || input.includes('wedding') || input.includes('birthday');

  // Bedroom / Property size detection
  let detectedSize = '';
  if (input.includes('self contain') || input.includes('studio') || input.includes('1 room') || input.includes('one room') || input.includes('single room')) {
    detectedSize = 'self-contain';
  } else if (input.includes('1 bed') || input.includes('one bed')) {
    detectedSize = '1-bed';
  } else if (input.includes('2 bed') || input.includes('two bed')) {
    detectedSize = '2-bed';
  } else if (input.includes('3 bed') || input.includes('three bed')) {
    detectedSize = '3-bed';
  } else if (input.includes('4 bed') || input.includes('four bed') || input.includes('duplex') || input.includes('story') || input.includes('storey')) {
    detectedSize = 'duplex';
  }

  if (detectedSize) {
    if (isDeep) {
      const estimate =
        detectedSize === 'self-contain' || detectedSize === '1-bed'
          ? '₦20,000 – ₦28,000'
          : detectedSize === '2-bed'
          ? '₦28,000 – ₦38,000'
          : detectedSize === '3-bed'
          ? '₦38,000 – ₦50,000'
          : '₦50,000 – ₦75,000';

      return {
        text: `🧼 **Deep Cleaning Estimate for ${detectedSize.toUpperCase()}**:\n\n• **Estimated Total**: **${estimate}**\n• **Initial Booking Deposit**: **₦15,000** (locks your date and team)\n\n**What's included in this Deep Clean:**\n• Scrubbing tile grout and limescale descaling\n• Degreasing kitchen hood, cooker, and cabinet interiors\n• Behind & under heavy furniture and appliances\n• Window frames, tracks, and mosquito net washing\n• Full bathroom sanitization with hospital-grade disinfectant\n\nYou can pay the ₦15,000 deposit online right now or chat directly with our manager on WhatsApp!`,
        actions: [
          {
            label: '💳 Pay ₦15,000 Deposit Online',
            type: 'payment',
            serviceId: 'deep-cleaning',
          },
          {
            label: '💬 Confirm on WhatsApp',
            type: 'whatsapp',
            url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
              `Hello Clean Am Correct, I want to book a Deep Clean for my ${detectedSize} in Ikorodu. Quote discussed: ${estimate}.`
            )}`,
          },
        ],
        suggestions: ['💰 Full Price List', '🧼 What is Deep Clean?', '📍 Areas in Ikorodu'],
      };
    }

    if (isMove) {
      const estimate =
        detectedSize === 'self-contain' || detectedSize === '1-bed'
          ? '₦20,000 – ₦28,000'
          : detectedSize === '2-bed'
          ? '₦28,000 – ₦36,000'
          : detectedSize === '3-bed'
          ? '₦35,000 – ₦48,000'
          : '₦45,000 – ₦70,000';

      return {
        text: `📦 **Move-In / Move-Out Cleaning Estimate for ${detectedSize.toUpperCase()}**:\n\n• **Estimated Total**: **${estimate}**\n• **Initial Booking Deposit**: **₦18,000**\n\n**What's included:**\n• Complete empty flat detailing: every closet, wardrobe, and drawer\n• Full wall spot cleaning and cobweb removal\n• Deep floor scrubbing and tile shine\n• Kitchen and bathroom disinfection so it is 100% tenant-ready\n\nWould you like to lock your moving date with the deposit?`,
        actions: [
          {
            label: '💳 Pay ₦18,000 Deposit Online',
            type: 'payment',
            serviceId: 'move-in-move-out',
          },
          {
            label: '💬 Book via WhatsApp',
            type: 'whatsapp',
            url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
              `Hello Clean Am Correct, I would like to book Move-in/Move-out cleaning for my ${detectedSize} in Ikorodu.`
            )}`,
          },
        ],
        suggestions: ['💰 Full Price List', '💳 How Deposit Works', '📞 Call Now'],
      };
    }

    // Standard residential for detected size
    const estimate =
      detectedSize === 'self-contain' || detectedSize === '1-bed'
        ? '₦12,000 – ₦18,000'
        : detectedSize === '2-bed'
        ? '₦18,000 – ₦25,000'
        : detectedSize === '3-bed'
        ? '₦25,000 – ₦35,000'
        : '₦35,000 – ₦55,000';

    return {
      text: `🏠 **Residential Cleaning Estimate for ${detectedSize.toUpperCase()}**:\n\n• **Estimated Total**: **${estimate}**\n• **Initial Booking Deposit**: **₦8,000**\n\n**What's included:**\n• Parlour dusting, sofa vacuuming, and tiled floor mopping\n• Bedroom tidying, wardrobe exterior, and surface wipe\n• Kitchen counters, sinks, and cooker wipe-down\n• Bathroom toilet, tiles, and fixtures sanitization\n\nWe bring all our own professional cleaning detergents and equipment. Pay the ₦8,000 deposit online to reserve your slot:`,
      actions: [
        {
          label: '💳 Pay ₦8,000 Deposit Online',
          type: 'payment',
          serviceId: 'residential-cleaning',
        },
        {
          label: '💬 Chat on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            `Hello Clean Am Correct, I want to book residential cleaning for my ${detectedSize} in Ikorodu. Estimated: ${estimate}.`
          )}`,
        },
      ],
      suggestions: ['🧼 Compare with Deep Clean', '💰 Full Price List', '📍 Service Areas'],
    };
  }

  // 3. GENERAL PRICING / COST / HOW MUCH / RATES
  if (
    input.includes('price') ||
    input.includes('cost') ||
    input.includes('how much') ||
    input.includes('rate') ||
    input.includes('charges') ||
    input.includes('fee') ||
    input.includes('quote') ||
    input.includes('pricing') ||
    input.includes('cheap') ||
    input.includes('expensive')
  ) {
    if (isDeep) {
      return {
        text: `🧼 **Deep Cleaning Pricing**:\n\n• **Initial Deposit**: **₦15,000**\n• **Typical Range**: **₦25,000 – ₦65,000+**\n\n**Detailed Breakdown by Space:**\n• 1-Bed Flat: ₦20,000 – ₦28,000\n• 2-Bed Flat: ₦28,000 – ₦38,000\n• 3-Bed Flat: ₦38,000 – ₦50,000\n• Duplex / Mansion: ₦50,000 – ₦75,000+\n\nDeep clean removes stubborn grease, grout dirt, scales, window tracks, and reaches behind heavy furniture.`,
        actions: [
          {
            label: '💳 Pay ₦15,000 Deposit Online',
            type: 'payment',
            serviceId: 'deep-cleaning',
          },
          {
            label: '💬 Request Quote on WhatsApp',
            type: 'whatsapp',
            url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
              'Hello Clean Am Correct, I would like to get a custom Deep Cleaning quote.'
            )}`,
          },
        ],
        suggestions: ['🏠 Residential Price', '🏢 Office Cleaning Price', '💳 How Deposit Works'],
      };
    }

    if (isOffice) {
      return {
        text: `🏢 **Office & Commercial Cleaning Pricing**:\n\n• **Initial Deposit**: **₦20,000**\n• **Typical Range**: **₦35,000 – ₦85,000+**\n\n• Small Office (1–3 rooms / small team): ₦25,000 – ₦40,000\n• Corporate Office (4–8 desks, reception & meeting room): ₦40,000 – ₦65,000\n• Commercial Plaza / Full Floor: Custom monthly or one-off quote\n\nWe operate early mornings or weekends so there is zero interruption to your business operations in Ikorodu.`,
        actions: [
          {
            label: '💳 Pay ₦20,000 Deposit Online',
            type: 'payment',
            serviceId: 'commercial-cleaning',
          },
          {
            label: '💬 Chat on WhatsApp for Corporate Quote',
            type: 'whatsapp',
            url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
              'Hello Clean Am Correct, I need an Office Cleaning quote for our workplace in Ikorodu.'
            )}`,
          },
        ],
        suggestions: ['💰 Full Price List', '🏠 House Cleaning Price', '📍 Areas Covered'],
      };
    }

    if (isMove) {
      return {
        text: `📦 **Move-In / Move-Out Cleaning Pricing**:\n\n• **Initial Deposit**: **₦18,000**\n• **Typical Range**: **₦25,000 – ₦55,000**\n\n• 1-Bedroom Empty Flat: ₦20,000 – ₦28,000\n• 2-Bedroom Empty Flat: ₦28,000 – ₦36,000\n• 3-Bedroom Empty Flat: ₦35,000 – ₦48,000\n• Duplex / House: ₦45,000 – ₦70,000\n\nIncludes complete sanitization of empty cupboards, wardrobes, wall spots, and sanitizing all sanitary ware.`,
        actions: [
          {
            label: '💳 Pay ₦18,000 Deposit Online',
            type: 'payment',
            serviceId: 'move-in-move-out',
          },
          {
            label: '💬 Book Moving Clean on WhatsApp',
            type: 'whatsapp',
            url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
              'Hello Clean Am Correct, I want to book a Move-In/Move-Out clean.'
            )}`,
          },
        ],
        suggestions: ['💰 Full Price List', '🧼 Deep Clean Price', '📅 Available Dates'],
      };
    }

    if (isEvent) {
      return {
        text: `🎉 **Post-Event Cleaning Pricing**:\n\n• **Initial Deposit**: **₦12,000**\n• **Typical Range**: **₦20,000 – ₦50,000**\n\n• Home / Compound Party: ₦20,000 – ₦30,000\n• Medium Hall / Event Space: ₦30,000 – ₦45,000\n• Large Event Center: Custom quote\n\nIncludes trash collection & bag removal, floor mop, sticky drink spill removal, and bathroom cleaning.`,
        actions: [
          {
            label: '💳 Pay ₦12,000 Deposit Online',
            type: 'payment',
            serviceId: 'post-event-cleaning',
          },
          {
            label: '💬 Book Event Cleanup on WhatsApp',
            type: 'whatsapp',
            url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
              'Hello Clean Am Correct, I need post-event cleaning in Ikorodu.'
            )}`,
          },
        ],
        suggestions: ['💰 Full Price List', '🏠 House Cleaning Price', '📍 Areas Covered'],
      };
    }

    // General Full Price List
    return {
      text: `📋 **Clean Am Correct Official Price & Deposit List**:\n\n| Service | Booking Deposit | Estimated Range |\n|---|---|---|\n| 🏠 **Residential Cleaning** | **₦8,000** | ₦12,000 – ₦35,000 |\n| 🧼 **Deep Cleaning** | **₦15,000** | ₦25,000 – ₦65,000 |\n| 🏢 **Office Cleaning** | **₦20,000** | ₦35,000 – ₦85,000+ |\n| 📦 **Move-In / Move-Out** | **₦18,000** | ₦25,000 – ₦55,000 |\n| 🎉 **Post-Event Clean** | **₦12,000** | ₦20,000 – ₦50,000 |\n\n💡 **How our pricing works**:\n• You pay the **initial booking deposit** online or via transfer to lock in your date.\n• The final price is transparent based on property size & condition, with the deposit deducted from your total.\n• You inspect and approve before paying the balance!`,
      actions: [
        {
          label: '💳 Pay Booking Deposit Online',
          type: 'payment',
        },
        {
          label: '💬 Get Exact Quote on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I would like an exact quote for my property in Ikorodu.'
          )}`,
        },
      ],
      suggestions: [
        '🏠 2-Bedroom Residential Quote',
        '🧼 Deep Clean 3-Bedroom',
        '🏢 Corporate Office Quote',
        '💳 How Deposit Works',
      ],
    };
  }

  // 4. DEPOSIT & PAYMENT METHOD QUESTIONS
  if (
    input.includes('deposit') ||
    input.includes('paystack') ||
    input.includes('pay online') ||
    input.includes('card') ||
    input.includes('transfer') ||
    input.includes('payment method') ||
    input.includes('how do i pay') ||
    input.includes('how to pay')
  ) {
    return {
      text: `💳 **How Payment & Deposits Work at Clean Am Correct**:\n\n1. **Secure Online Portal**: You can pay your booking deposit (₦8,000 – ₦20,000 depending on service) right on this website via **Paystack** using Debit Card, Bank Transfer, USSD, or Apple Pay.\n2. **Bank Transfer / Cash**: You can also transfer directly to our business account via WhatsApp dispatch.\n3. **Balance on Completion**: You only pay the remaining balance after the job is completely done and you have inspected your sparkling space.\n\nReady to pay your deposit and reserve your date?`,
      actions: [
        {
          label: '💳 Open Payment Portal',
          type: 'payment',
        },
        {
          label: '💬 Chat on WhatsApp',
          type: 'whatsapp',
          url: siteConfig.whatsappLink,
        },
      ],
      suggestions: ['💰 View Price List', '🏠 Residential ₦8k Deposit', '🧼 Deep Clean ₦15k Deposit'],
    };
  }

  // 5. LOCATION & SERVICE AREAS (Ikorodu, Lagos)
  if (
    input.includes('where') ||
    input.includes('location') ||
    input.includes('ikorodu') ||
    input.includes('lagos') ||
    input.includes('area') ||
    input.includes('agric') ||
    input.includes('ebute') ||
    input.includes('ogolonto') ||
    input.includes('igbogbo') ||
    input.includes('bayeku') ||
    input.includes('owutu') ||
    input.includes('haruna') ||
    input.includes('majidun') ||
    input.includes('mainland') ||
    input.includes('address')
  ) {
    return {
      text: `📍 **Service Areas Covered**:\n\n**Clean Am Correct** is proudly based in **Ikorodu, Lagos State**.\n\nWe actively serve all neighborhoods in and around Ikorodu, including:\n• **Ebute & Ikorodu Central**\n• **Agric & Ogolonto**\n• **Igbogbo & Bayeku**\n• **Owutu & Haruna**\n• **Majidun & Mile 12 boundary**\n• **Isawo, Imota, and nearby Lagos Mainland areas upon request**\n\nOur cleaning crew arrives on time at your doorstep with full equipment.`,
      actions: [
        {
          label: '💬 Check Availability for My Area',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I want to confirm if you clean properties in my area in Ikorodu/Lagos.'
          )}`,
        },
        {
          label: '💰 View Price List',
          type: 'query',
          query: 'price list',
        },
      ],
      suggestions: ['💰 View Price List', '🏠 Book Residential Clean', '📅 Operating Hours'],
    };
  }

  // 6. EQUIPMENT & SUPPLIES (Do I need to provide anything?)
  if (
    input.includes('equipment') ||
    input.includes('detergent') ||
    input.includes('soap') ||
    input.includes('mop') ||
    input.includes('vacuum') ||
    input.includes('supply') ||
    input.includes('supplies') ||
    input.includes('material') ||
    input.includes('bring') ||
    input.includes('provide')
  ) {
    return {
      text: `🧰 **Do You Need to Provide Equipment or Detergents?**\n\n**No, you do not need to provide anything!**\n\nOur team arrives fully equipped with:\n• Heavy-duty commercial vacuum cleaners\n• Color-coded hygienic microfiber mops & cloths\n• Professional tile degreasers & grout cleaners\n• Eco-friendly toilet and bathroom descalers\n• Stainless steel polish and glass shine spray\n\n*Note*: If you have special surfaces or preferred personal detergents you'd like us to use, just let us know and we'll gladly accommodate!`,
      actions: [
        {
          label: '💬 Book an Appointment on WhatsApp',
          type: 'whatsapp',
          url: siteConfig.whatsappLink,
        },
        {
          label: '💰 View Price List',
          type: 'query',
          query: 'price list',
        },
      ],
      suggestions: ['🧼 Deep Clean Details', '💰 Full Price List', '🏠 Book Home Cleaning'],
    };
  }

  // 7. OPERATING HOURS & AVAILABILITY
  if (
    input.includes('hour') ||
    input.includes('time') ||
    input.includes('open') ||
    input.includes('close') ||
    input.includes('sunday') ||
    input.includes('saturday') ||
    input.includes('weekend') ||
    input.includes('tomorrow') ||
    input.includes('available') ||
    input.includes('schedule')
  ) {
    return {
      text: `⏰ **Operating Hours & Scheduling**:\n\n• **Monday – Saturday**: 7:30 AM – 6:00 PM\n• **Sunday**: Special booking upon request for corporate & event cleanups\n\n**Same-Day & Next-Day Cleanings**:\nWe recommend booking at least 24 hours in advance to guarantee your preferred time slot, especially for weekend slots in Ikorodu. Same-day emergency slots depend on crew availability.`,
      actions: [
        {
          label: '💬 Check Tomorrow Availability on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, do you have availability for cleaning this week?'
          )}`,
        },
        {
          label: '💳 Book & Pay Deposit Online',
          type: 'payment',
        },
      ],
      suggestions: ['💰 View Price List', '🏠 Residential Quote', '📞 Call 07046975466'],
    };
  }

  // 8. TRUST, SECURITY & VETTING
  if (
    input.includes('trust') ||
    input.includes('safe') ||
    input.includes('security') ||
    input.includes('vet') ||
    input.includes('stealing') ||
    input.includes('reliable') ||
    input.includes('background') ||
    input.includes('guarantee')
  ) {
    return {
      text: `🛡️ **Your Safety & Peace of Mind**:\n\n• **Vetted Cleaners**: Every cleaner on the Clean Am Correct team is strictly background-checked, identity-verified, and personally guaranteed.\n• **Professional Training**: Our staff is trained in domestic confidentiality, privacy etiquette, and careful handling of delicate furnishings and electronics.\n• **Satisfaction Guarantee**: We inspect alongside you before departing. If any spot was missed, we rectify it on the spot immediately!`,
      actions: [
        {
          label: '💬 Speak Directly to Operations Manager',
          type: 'whatsapp',
          url: siteConfig.whatsappLink,
        },
        {
          label: '💰 View Price List',
          type: 'query',
          query: 'price list',
        },
      ],
      suggestions: ['💰 View Price List', '🏠 Book House Cleaning', '📍 Areas Covered'],
    };
  }

  // 9. HOW TO BOOK
  if (
    input.includes('how to book') ||
    input.includes('how do i book') ||
    input.includes('book appointment') ||
    input.includes('appointment') ||
    input.includes('order') ||
    input.includes('hire')
  ) {
    return {
      text: `📅 **Booking an Appointment is Easy**:\n\n**Option 1: Direct Online via Website (Fastest)**\nClick below to choose your service, enter your address, and pay your deposit securely via Paystack.\n\n**Option 2: Instant WhatsApp Booking**\nMessage our dispatch manager at **07046975466** with your location in Ikorodu and preferred date.\n\n**Option 3: Phone Call**\nCall us directly on **07046975466** (Mon–Sat: 7:30 AM – 6:00 PM).`,
      actions: [
        {
          label: '💳 Book & Pay Deposit Online',
          type: 'payment',
        },
        {
          label: '💬 Book via WhatsApp',
          type: 'whatsapp',
          url: siteConfig.whatsappLink,
        },
        {
          label: '📞 Call 07046975466',
          type: 'call',
        },
      ],
      suggestions: ['💰 View Price List', '🏠 Residential Clean ₦8k', '🧼 Deep Clean ₦15k'],
    };
  }

  // 10. CONTACT / PHONE / WHATSAPP / SPEAK TO HUMAN
  if (
    input.includes('contact') ||
    input.includes('phone') ||
    input.includes('call') ||
    input.includes('number') ||
    input.includes('whatsapp') ||
    input.includes('speak') ||
    input.includes('human') ||
    input.includes('manager') ||
    input.includes('agent') ||
    input.includes('talk')
  ) {
    return {
      text: `📞 **Contact Clean Am Correct**:\n\n• **Phone / Dispatch**: **${siteConfig.phoneDisplay}**\n• **WhatsApp Direct**: [Click to Chat](https://wa.me/${siteConfig.phoneRaw})\n• **Email**: ${siteConfig.email}\n• **Location**: Ikorodu, Lagos State, Nigeria\n• **Hours**: Mon – Sat: 7:30 AM – 6:00 PM\n\nOur manager is on standby to assist you immediately!`,
      actions: [
        {
          label: '💬 Chat on WhatsApp Now',
          type: 'whatsapp',
          url: siteConfig.whatsappLink,
        },
        {
          label: `📞 Call ${siteConfig.phoneDisplay}`,
          type: 'call',
        },
      ],
      suggestions: ['💰 View Price List', '🏠 Residential Cleaning', '📍 Areas Covered'],
    };
  }

  // 11. RECURRING / SUBSCRIPTION CLEANING
  if (
    input.includes('recurring') ||
    input.includes('weekly') ||
    input.includes('monthly') ||
    input.includes('bi-weekly') ||
    input.includes('contract') ||
    input.includes('retainer') ||
    input.includes('regular')
  ) {
    return {
      text: `🔄 **Recurring Cleaning Plans**:\n\nYes! We offer discounted scheduled cleaning packages for homes and offices:\n• **Weekly Cleaning**: Ideal for busy working professionals and corporate offices.\n• **Bi-Weekly Cleaning**: Every 2 weeks for continuous freshness.\n• **Monthly Maintenance**: Comprehensive reset once every month.\n\nRecurring clients receive **priority date booking** and dedicated team assignments.`,
      actions: [
        {
          label: '💬 Discuss Recurring Plan on WhatsApp',
          type: 'whatsapp',
          url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
            'Hello Clean Am Correct, I want to discuss a recurring weekly/monthly cleaning plan in Ikorodu.'
          )}`,
        },
        {
          label: '💰 View One-off Price List',
          type: 'query',
          query: 'price list',
        },
      ],
      suggestions: ['💰 Full Price List', '🏠 House Cleaning Rates', '🏢 Office Cleaning'],
    };
  }

  // 12. FALLBACK / INTELLIGENT HELPER
  return {
    text: `Thanks for your question! As your **Clean Am Correct** assistant in Ikorodu, I can help you with:\n\n• 💰 **Price quotes & estimates** (e.g. ask *"How much for 2-bedroom deep clean?"*)\n• 🧼 **Our 5 core services** (Residential, Deep Clean, Office, Move-in/out, Post-event)\n• 📍 **Locations we clean in Ikorodu and Lagos**\n• 💳 **Paying your booking deposit online**\n• 📞 **Connecting you directly to our manager**\n\nWhat would you like to know?`,
    actions: [
      {
        label: '💰 View Full Price List',
        type: 'query',
        query: 'price list',
      },
      {
        label: '💬 Chat on WhatsApp',
        type: 'whatsapp',
        url: siteConfig.whatsappLink,
      },
    ],
    suggestions: [
      '💰 View Price List',
      '🏠 Residential Cleaning Price',
      '🧼 Deep Cleaning Quote',
      '📍 Areas in Ikorodu',
    ],
  };
}
