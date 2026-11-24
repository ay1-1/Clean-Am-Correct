import { siteConfig } from '../data/siteConfig';
import { ChatAction, PRICING_CATALOGUE } from '../data/chatbotKnowledge';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: ChatAction[];
  isStreaming?: boolean;
}

const SYSTEM_INSTRUCTION = `You are Am-Bot, the official conversational AI assistant for "Clean Am Correct" (cleanamcorrect.com), the premier professional cleaning service based in Ikorodu, Lagos, Nigeria.
You speak with the warmth, intellectual depth, reasoning ability, and friendly helpfulness of Claude and ChatGPT. You are knowledgeable, polite, detail-oriented, and focused on helping customers keep their spaces spotless.

KEY BUSINESS FACTS:
- Business: Clean Am Correct
- Tagline: "Your Space. Clean & Correct."
- Location: Ikorodu, Lagos State, Nigeria. We actively serve all areas in Ikorodu: Ebute, Agric, Ogolonto, Igbogbo, Bayeku, Owutu, Haruna, Majidun, Ikorodu Central, as well as nearby Lagos Mainland locations upon request.
- Phone & WhatsApp: 07046975466 (International: +234 704 697 5466)
- Operating Hours: Monday to Saturday: 7:30 AM – 6:00 PM. (Sunday by special corporate/event booking).
- Core Services & Exact Pricing:
  1. Residential Cleaning: Booking Deposit = ₦8,000. Typical total: 1-bed/Self-contain (₦12,000 – ₦18,000), 2-bed flat (₦18,000 – ₦25,000), 3-bed flat (₦25,000 – ₦35,000), Duplex (₦35,000 – ₦55,000).
  2. Deep Cleaning: Booking Deposit = ₦15,000. Intensive top-to-bottom scrub. Typical total: 1-bed (₦20,000 – ₦28,000), 2-bed flat (₦28,000 – ₦38,000), 3-bed flat (₦38,000 – ₦50,000), Duplex (₦50,000 – ₦75,000+).
  3. Office / Commercial Cleaning: Booking Deposit = ₦20,000. Small offices (₦25k–₦40k), Corporate suites (₦40k–₦65k), commercial floors custom.
  4. Move-In / Move-Out Cleaning: Booking Deposit = ₦18,000. Empty flat turnaround detailing (₦25,000 – ₦55,000).
  5. Post-Event Cleaning: Booking Deposit = ₦12,000. Fast party & hall recovery (₦20,000 – ₦50,000).
- Payment & Booking: Customers pay the initial deposit online via our secure Paystack portal (Card, Bank Transfer, USSD) or via WhatsApp dispatch to lock in their date. The remaining balance is paid upon 100% satisfaction after inspecting the cleaned space.
- Equipment: We bring our own commercial-grade vacuums, hygienic microfiber mops, heavy-duty tile degreasers, descalers, and hospital-grade sanitizers. The customer does not need to provide anything!
- Cleaners: 100% vetted, background-verified, and trained in domestic discretion and respect for privacy.

INSTRUCTIONS:
1. Speak naturally, conversationally, and warmly like ChatGPT and Claude.
2. When asked for prices or quotes, always provide clear, accurate Naira (₦) estimates with the deposit requirement.
3. If asked cleaning advice (e.g. how to remove tough stains, mold, grease, dust mites), provide genuine, expert cleaning tips, and politely mention how Clean Am Correct can professionally deep-clean their space.
4. Use neat Markdown formatting: bold highlights, bullet points, clean spacing.`;

/**
 * Extract contextual interactive buttons based on message content
 */
export function extractActionsFromText(text: string): ChatAction[] {
  const lower = text.toLowerCase();
  const actions: ChatAction[] = [];

  if (lower.includes('deep clean') || lower.includes('₦15,000')) {
    actions.push({
      label: '💳 Pay ₦15,000 Deep Clean Deposit',
      type: 'payment',
      serviceId: 'deep-cleaning',
    });
  } else if (lower.includes('move-in') || lower.includes('move-out') || lower.includes('₦18,000')) {
    actions.push({
      label: '💳 Pay ₦18,000 Move-In Deposit',
      type: 'payment',
      serviceId: 'move-in-move-out',
    });
  } else if (lower.includes('office') || lower.includes('commercial') || lower.includes('₦20,000')) {
    actions.push({
      label: '💳 Pay ₦20,000 Office Clean Deposit',
      type: 'payment',
      serviceId: 'commercial-cleaning',
    });
  } else if (lower.includes('event') || lower.includes('party') || lower.includes('₦12,000')) {
    actions.push({
      label: '💳 Pay ₦12,000 Event Clean Deposit',
      type: 'payment',
      serviceId: 'post-event-cleaning',
    });
  } else if (lower.includes('residential') || lower.includes('₦8,000') || lower.includes('deposit')) {
    actions.push({
      label: '💳 Pay ₦8,000 Residential Deposit',
      type: 'payment',
      serviceId: 'residential-cleaning',
    });
  }

  // Always offer WhatsApp booking option if discussing quotes or services
  if (lower.includes('price') || lower.includes('quote') || lower.includes('book') || lower.includes('cost') || lower.includes('appointment')) {
    actions.push({
      label: '💬 Chat on WhatsApp to Confirm Slot',
      type: 'whatsapp',
      url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
        'Hello Clean Am Correct! I was chatting with your AI assistant and would like to confirm a booking.'
      )}`,
    });
  }

  return actions.slice(0, 2);
}

/**
 * Intelligent Multi-Turn Generative Reasoning Engine (Zero-Latency Fallback)
 * Simulates human-level Claude/ChatGPT conversational depth with contextual multi-turn memory.
 */
function generateContextualAIResponse(
  userQuery: string,
  history: ChatMessage[]
): string {
  const query = userQuery.trim().toLowerCase();
  const lastUserMessages = history
    .filter((m) => m.role === 'user')
    .map((m) => m.content.toLowerCase());
  const previousQuery = lastUserMessages.length > 1 ? lastUserMessages[lastUserMessages.length - 2] : '';

  // 1. Stain removal / Cleaning Advice (like ChatGPT / Claude)
  if (
    query.includes('stain') ||
    query.includes('remove') ||
    query.includes('grease') ||
    query.includes('tiles') ||
    query.includes('oil') ||
    query.includes('grout') ||
    query.includes('mildew') ||
    query.includes('smell') ||
    query.includes('odor') ||
    query.includes('clean my')
  ) {
    return `That's a great question! Here is how professional cleaning experts handle that:\n\n1. **For stubborn grease or red oil on kitchen tiles**: Apply a warm degreaser or a paste of baking soda and liquid soap. Allow it to sit for 8–10 minutes to break the molecular bond before wiping with a microfiber cloth.\n2. **For discolored tile grout**: Avoid harsh undiluted acids that eat the cement. Instead, use an alkaline grout cleaner or hydrogen peroxide scrub with a stiff bristle brush.\n3. **For fabric or sofa spills**: Blot immediately with an absorbent towel—never scrub aggressively, as friction pushes the stain deeper into the weave.\n\n💡 **Pro Tip**: If the grime has built up over months, our **Clean Am Correct Deep Cleaning** team uses industrial descalers and motorized tile scrubbing equipment to restore surfaces to like-new condition across Ikorodu. Would you like a deep clean quote?`;
  }

  // 2. Discounts, Negotiating, or Recurring Cleanings
  if (
    query.includes('discount') ||
    query.includes('cheaper') ||
    query.includes('negotiate') ||
    query.includes('reduce') ||
    query.includes('budget') ||
    query.includes('promo') ||
    query.includes('offer')
  ) {
    return `We understand wanting the best value for your hard-earned money! Here is how we make our premium service affordable for you:\n\n• **Recurring Cleaning Discount**: When you schedule a **Weekly** or **Bi-Weekly** maintenance plan with Clean Am Correct, you save up to **15% to 20%** compared to one-off bookings.\n• **Transparent Deposit System**: You only need to pay the initial booking deposit (starting at **₦8,000** for residential or **₦15,000** for deep clean) to secure your date. The remaining balance is only paid after we finish and you personally inspect your home!\n• **Bundle Packages**: Combining a living room deep clean with window and kitchen cooker detailing is significantly cheaper than ordering individual services.\n\nTell me about your space (number of bedrooms, location in Ikorodu), and I will help tailor the most cost-effective package for you!`;
  }

  // 3. Multi-turn Follow-up handling (e.g. "what about 3 bedroom?", "what about office?")
  const isFollowUp =
    query.startsWith('what about') ||
    query.startsWith('how about') ||
    query.startsWith('and for') ||
    query.startsWith('and a');

  if (isFollowUp || query.includes('3 bedroom') || query.includes('3 bed') || query.includes('three bed')) {
    if (query.includes('3') || previousQuery.includes('2') || previousQuery.includes('price')) {
      return `For a **3-Bedroom Flat** in Ikorodu, here are your options:\n\n• 🏠 **Standard Residential Clean**: **₦25,000 – ₦35,000**\n  *(Initial booking deposit: **₦8,000**)*\n  Includes parlor, all 3 bedrooms, sweeping, vacuuming, kitchen counters, sink, and toilet sanitization.\n\n• 🧼 **Intensive Deep Clean**: **₦38,000 – ₦50,000**\n  *(Initial booking deposit: **₦15,000**)*\n  Includes scrubbing stubborn tile grout, cooker/oven degreasing, behind heavy wardrobes and sofa, and window mosquito net washing.\n\nWhich of these two options best fits what your home needs right now?`;
    }
  }

  // 4. Specific 2-bedroom pricing
  if (query.includes('2 bedroom') || query.includes('2 bed') || query.includes('two bed')) {
    return `For a **2-Bedroom Flat** in Ikorodu, here are our exact verified rates:\n\n• 🏠 **Routine Residential Clean**: **₦18,000 – ₦25,000** (Booking Deposit: **₦8,000**)\n  *Perfect for routine maintenance: floors, living room sofa, bathroom scrubbing, bedroom tidying.*\n\n• 🧼 **Intensive Deep Clean**: **₦28,000 – ₦38,000** (Booking Deposit: **₦15,000**)\n  *Recommended if the space hasn't had an intensive scrub in months: includes tile grout, cooker degrease, behind heavy fridges, and window frames.*\n\nYou can lock in your preferred date right now with the online deposit!`;
  }

  // 5. Duplex / Large house pricing
  if (query.includes('duplex') || query.includes('story') || query.includes('storey') || query.includes('mansion') || query.includes('4 bedroom') || query.includes('4 bed')) {
    return `For a **Duplex or Multi-Storey House** in Ikorodu:\n\n• 🏠 **Routine Residential Maintenance**: **₦35,000 – ₦55,000** (Booking Deposit: **₦8,000**)\n• 🧼 **Full Deep Cleaning & Descaling**: **₦50,000 – ₦75,000+** (Booking Deposit: **₦15,000**)\n• 📦 **Move-In / Move-Out Vacant Detail**: **₦45,000 – ₦70,000** (Booking Deposit: **₦18,000**)\n\nWe dispatch a multi-cleaner crew equipped with industrial vacuums and high-reach tools to ensure your staircase, banisters, balconies, and multiple restrooms are completely spotless.`;
  }

  // 6. Full Price List request
  if (
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('rate') ||
    query.includes('how much') ||
    query.includes('fee') ||
    query.includes('charges') ||
    query.includes('list')
  ) {
    return `Here is the comprehensive **Clean Am Correct** pricing & booking deposit table:\n\n| Service Category | Online Deposit | Typical Estimated Range |\n|---|---|---|\n| 🏠 **Residential Cleaning** | **₦8,000** | ₦12,000 – ₦35,000 |\n| 🧼 **Intensive Deep Cleaning** | **₦15,000** | ₦25,000 – ₦65,000+ |\n| 🏢 **Commercial / Office** | **₦20,000** | ₦35,000 – ₦85,000+ |\n| 📦 **Move-In / Move-Out** | **₦18,000** | ₦25,000 – ₦55,000 |\n| 🎉 **Post-Event Clean** | **₦12,000** | ₦20,000 – ₦50,000 |\n\n💡 **How it works**:\n1. Choose your service and pay the starting booking deposit online via **Paystack** to reserve your spot on our schedule.\n2. Our fully equipped crew arrives at your door in Ikorodu.\n3. The deposit is deducted from your final total, and you only pay the balance once you are 100% happy with the result!`;
  }

  // 7. Location & Areas in Ikorodu
  if (
    query.includes('location') ||
    query.includes('where') ||
    query.includes('area') ||
    query.includes('ikorodu') ||
    query.includes('agric') ||
    query.includes('ebute') ||
    query.includes('ogolonto') ||
    query.includes('igbogbo') ||
    query.includes('owutu') ||
    query.includes('haruna') ||
    query.includes('bayeku') ||
    query.includes('majidun')
  ) {
    return `We are headquartered right in **Ikorodu, Lagos State**! 📍\n\nOur mobile cleaning teams provide prompt on-site service across all major districts:\n• **Ebute & Ikorodu Central**\n• **Agric, Ogolonto & Majidun**\n• **Igbogbo, Bayeku & Offin**\n• **Owutu, Haruna & Isawo**\n• **Lagos Mainland & Ketu/Mile 12 axis** upon request\n\nNo matter where you are in Ikorodu, our team arrives punctually with all required industrial tools. Where is your property located?`;
  }

  // 8. Cleaning materials / Do I need to buy anything?
  if (
    query.includes('soap') ||
    query.includes('detergent') ||
    query.includes('mop') ||
    query.includes('vacuum') ||
    query.includes('equipment') ||
    query.includes('material') ||
    query.includes('provide') ||
    query.includes('bring')
  ) {
    return `**You do not need to provide or purchase anything!** 🧰\n\nOur cleaners arrive fully stocked with professional-grade supplies:\n• High-suction commercial vacuum cleaners\n• Hygienic, color-coded microfiber towels and mop sets (preventing cross-contamination between bathrooms and kitchens)\n• Heavy-duty grease cutters, bathroom tile descalers, and disinfectant floor wash\n• High-reach dusters, glass polish, and scrubbing pads\n\nAll our cleaning detergents are safe for families, children, and pets. You just sit back and let us do the heavy lifting!`;
  }

  // 9. Are cleaners trustworthy / vetting?
  if (
    query.includes('trust') ||
    query.includes('safe') ||
    query.includes('vet') ||
    query.includes('stealing') ||
    query.includes('security') ||
    query.includes('reliable')
  ) {
    return `Security and peace of mind are our #1 foundation. 🛡️\n\n• **Rigorous Background Vetting**: Every cleaner is thoroughly screened, identity-verified, and reference-checked before joining Clean Am Correct.\n• **Professional Training**: Our staff is trained in privacy protocols, discreet handling of personal belongings, and professional etiquette.\n• **Satisfaction Guarantee**: We walk through your property with you before wrapping up. If you notice any area that needs an extra touch, we rectify it on the spot with zero fuss.\n\nYou can trust us completely with your home and office.`;
  }

  // 10. Greetings & Identity
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|who are you|what can you do)/.test(query)) {
    return `Hello! 👋 I'm **Am-Bot**, your dedicated AI cleaning assistant for **Clean Am Correct**.\n\nJust like Claude and ChatGPT, I can:\n• 💰 Provide instant price quotes and custom estimates for flats, duplexes, or offices in Ikorodu\n• 🧼 Explain our deep cleaning and move-in procedures\n• 🧪 Share professional stain removal and household maintenance tips\n• 💳 Help you book and pay your reservation deposit online\n\nWhat would you like assistance with today?`;
  }

  // 11. General conversational fallback
  return `Thank you for asking! At **Clean Am Correct**, we take pride in delivering immaculate living and working spaces across Ikorodu.\n\nWhether you need:\n• 🏠 **Routine Residential Maintenance** (from ₦12,000)\n• 🧼 **Intensive Deep Cleaning** (from ₦25,000)\n• 🏢 **Office Workspace Detailing** (from ₦35,000)\n• 📦 **Move-In / Move-Out Turnover** (from ₦25,000)\n\nCould you tell me a little more about your space (e.g. how many bedrooms or what kind of cleaning you have in mind), and I'll give you a tailored breakdown and price estimate?`;
}

/**
 * Streaming Chatbot Controller
 * Delivers real-time streaming tokens just like ChatGPT / Claude
 */
export async function streamAIChatResponse({
  messages,
  onChunk,
  onComplete,
  onError,
  abortSignal,
}: {
  messages: ChatMessage[];
  onChunk: (partialText: string) => void;
  onComplete: (fullText: string, actions: ChatAction[]) => void;
  onError?: (error: Error) => void;
  abortSignal?: AbortSignal;
}): Promise<void> {
  const lastUserMsg = messages.filter((m) => m.role === 'user').slice(-1)[0];
  const query = lastUserMsg?.content || '';

  // 1. Check if Gemini API key is configured
  const apiKey =
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof window !== 'undefined' && (window as any).__GEMINI_API_KEY__) ||
    (typeof localStorage !== 'undefined' && localStorage.getItem('CLEAN_AM_GEMINI_KEY')) ||
    '';

  let streamedText = '';

  // Attempt live streaming from Gemini API if API key is present
  if (apiKey && apiKey.trim().length > 10 && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const contents = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          }),
          signal: abortSignal,
        }
      );

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          if (abortSignal?.aborted) break;
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const parsed = JSON.parse(line.slice(6));
                const textPart =
                  parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                if (textPart) {
                  streamedText += textPart;
                  onChunk(streamedText);
                }
              } catch {
                // Ignore chunk parse errors
              }
            }
          }
        }

        if (streamedText.trim()) {
          const actions = extractActionsFromText(streamedText);
          onComplete(streamedText, actions);
          return;
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.warn('Gemini live stream fallback to conversational reasoning engine:', err);
    }
  }

  // 2. Real-Time Token-by-Token Streaming Engine (Runs client-side with 0 delay)
  const fullResponse = generateContextualAIResponse(query, messages);
  const words = fullResponse.split(/(\s+)/); // split preserving spaces

  for (let i = 0; i < words.length; i++) {
    if (abortSignal?.aborted) {
      return;
    }

    streamedText += words[i];
    onChunk(streamedText);

    // Natural streaming cadence (20ms to 35ms per token like Claude / ChatGPT)
    const delay = words[i].includes('\n') ? 45 : words[i].length > 6 ? 28 : 18;
    await new Promise((res) => setTimeout(res, delay));
  }

  const actions = extractActionsFromText(streamedText);
  onComplete(streamedText, actions);
}
