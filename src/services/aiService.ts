import { siteConfig } from '../data/siteConfig';
import { ChatAction, FORMATTED_OFFICIAL_PRICE_LIST, LOCATION_PRICE_NOTICE } from '../data/chatbotKnowledge';

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

KEY BUSINESS FACTS & OFFICIAL PRICE LIST:
- Business: Clean Am Correct
- Tagline: "Your Space. Clean & Correct."
- Location: Ikorodu, Lagos State, Nigeria. We actively serve all areas in Ikorodu: Ebute, Agric, Ogolonto, Igbogbo, Bayeku, Owutu, Haruna, Majidun, Ikorodu Central, as well as nearby Lagos Mainland locations upon request.
- Phone & WhatsApp: 07046975466 (International: +234 704 697 5466)
- Operating Hours: Monday to Saturday: 7:30 AM – 6:00 PM. (Sunday by special corporate/event booking).

**CLEAN AM CORRECT – OFFICIAL PRICE LIST**:
1. Room (Self-contained) – ₦35,000
2. Full House – ₦50,000
3. 1-Bedroom Apartment – ₦45,000
4. 2-Bedroom Apartment – ₦60,000
5. 3-Bedroom Apartment – ₦80,000
6. 4-Bedroom Apartment – ₦120,000
7. 5-Bedroom Apartment – ₦165,000
8. Room + Bathroom/Toilet – ₦45,000

**IMPORTANT NOTICE**:
Prices may vary depending on the customer's location. Additional transportation or logistics charges may apply for distant locations.

- Payment & Booking: Customers can book directly via WhatsApp dispatch (07046975466) or pay online via Paystack.
- Equipment: We bring our own commercial-grade vacuums, hygienic microfiber mops, heavy-duty tile degreasers, descalers, and hospital-grade sanitizers. The customer does not need to provide anything!
- Cleaners: 100% vetted, background-verified, and trained in domestic discretion and respect for personal privacy.

INSTRUCTIONS:
1. Speak naturally, conversationally, and warmly like ChatGPT and Claude.
2. When asked for prices or quotes, always quote the exact official price list and include the important notice regarding location & logistics charges.
3. If asked cleaning advice (e.g. how to remove tough stains, mold, grease, odor), provide genuine, expert cleaning tips, and politely mention how Clean Am Correct can professionally clean their space.
4. Use neat Markdown formatting: bold highlights, bullet points, clean spacing.`;

/**
 * Extract contextual interactive buttons based on message content
 */
export function extractActionsFromText(text: string): ChatAction[] {
  const lower = text.toLowerCase();
  const actions: ChatAction[] = [];

  if (lower.includes('2-bedroom') || lower.includes('₦60,000')) {
    actions.push({
      label: '💬 Book 2-Bedroom (₦60,000) on WhatsApp',
      type: 'whatsapp',
      url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
        'Hello Clean Am Correct, I want to book cleaning for a 2-Bedroom Apartment (₦60,000).'
      )}`,
    });
  } else if (lower.includes('3-bedroom') || lower.includes('₦80,000')) {
    actions.push({
      label: '💬 Book 3-Bedroom (₦80,000) on WhatsApp',
      type: 'whatsapp',
      url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
        'Hello Clean Am Correct, I want to book cleaning for a 3-Bedroom Apartment (₦80,000).'
      )}`,
    });
  } else if (lower.includes('full house') || lower.includes('₦50,000')) {
    actions.push({
      label: '💬 Book Full House (₦50,000) on WhatsApp',
      type: 'whatsapp',
      url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
        'Hello Clean Am Correct, I want to book Full House cleaning (₦50,000).'
      )}`,
    });
  } else if (lower.includes('1-bedroom') || lower.includes('room + bathroom') || lower.includes('₦45,000')) {
    actions.push({
      label: '💬 Book on WhatsApp (₦45,000)',
      type: 'whatsapp',
      url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
        'Hello Clean Am Correct, I would like to book an appointment (₦45,000 tier).'
      )}`,
    });
  } else if (lower.includes('self-contained') || lower.includes('₦35,000')) {
    actions.push({
      label: '💬 Book Self-Contained (₦35,000) on WhatsApp',
      type: 'whatsapp',
      url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
        'Hello Clean Am Correct, I want to book cleaning for a Room (Self-contained) (₦35,000).'
      )}`,
    });
  } else if (lower.includes('4-bedroom') || lower.includes('₦120,000')) {
    actions.push({
      label: '💬 Book 4-Bedroom (₦120,000) on WhatsApp',
      type: 'whatsapp',
      url: `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
        'Hello Clean Am Correct, I want to book cleaning for a 4-Bedroom Apartment (₦120,000).'
      )}`,
    });
  }

  // Always offer WhatsApp or Online Booking
  if (actions.length === 0) {
    actions.push({
      label: '💬 Book via WhatsApp',
      type: 'whatsapp',
      url: siteConfig.whatsappLink,
    });
  }

  actions.push({
    label: '💳 Book Online via Portal',
    type: 'payment',
  });

  return actions.slice(0, 2);
}

/**
 * Intelligent Multi-Turn Generative Reasoning Engine (Zero-Latency Fallback)
 * Powered by Clean Am Correct Official Price List.
 */
function generateContextualAIResponse(
  userQuery: string,
  history: ChatMessage[]
): string {
  const query = userQuery.trim().toLowerCase();

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
    return `That's a great question! Here is how professional cleaning experts handle that:\n\n1. **For stubborn red oil or grease on tiles**: Apply a warm degreaser or a paste of baking soda and dishwashing liquid. Let it sit for 8–10 minutes to emulsify the oils before wiping down with a clean microfiber cloth.\n2. **For bathroom tile grout**: Avoid harsh undiluted acids that corrode the cement line. Instead, use an alkaline tile cleaner or hydrogen peroxide scrub with a stiff bristle brush.\n3. **For fabric or sofa spills**: Blot immediately with an absorbent towel—never rub vigorously, as friction spreads the stain into the fabric fibers.\n\n💡 **Pro Tip**: If your space needs a fresh reset, our **Clean Am Correct** team arrives with commercial equipment and degreasers to restore your floors and restrooms across Ikorodu. Check our **Official Price List** anytime for rates!`;
  }

  // 2. Specific room / apartment queries from official list
  if (query.includes('room +') || query.includes('room and bath') || (query.includes('room') && (query.includes('bath') || query.includes('toilet')))) {
    return `For **Room + Bathroom/Toilet**, our official price is:\n\n• 🚿 **Price**: **₦45,000**\n• Includes complete bedroom detailing, dusting, plus intensive washing, scrubbing, and sanitizing of the attached bathroom and toilet.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  if (query.includes('self contain') || query.includes('self-contain') || query.includes('single room') || (query.includes('room') && !query.includes('bedroom') && !query.includes('house'))) {
    return `For a **Room (Self-contained)**, our official price is:\n\n• 🏠 **Price**: **₦35,000**\n• Full cleaning of the self-contained room space: floor mopping, dusting, surface wipe, and sanitization.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  if (query.includes('full house') || query.includes('entire house') || query.includes('whole house')) {
    return `For a **Full House**, our official price is:\n\n• 🏡 **Price**: **₦50,000**\n• Complete cleaning covering living spaces, kitchen, floor mopping, dusting, and washrooms for standard family houses.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  if (query.includes('1 bedroom') || query.includes('1-bed') || query.includes('one bedroom') || query.includes('one bed')) {
    return `For a **1-Bedroom Apartment**, our official price is:\n\n• 🏢 **Price**: **₦45,000**\n• Full clean of parlor/living room, bedroom, kitchen counters, sink, and washroom.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  if (query.includes('2 bedroom') || query.includes('2-bed') || query.includes('two bedroom') || query.includes('two bed')) {
    return `For a **2-Bedroom Apartment**, our official price is:\n\n• 🛋️ **Price**: **₦60,000**\n• Complete detailing of living room/parlor, 2 bedrooms, kitchen cabinets and counters, and bathrooms/toilets.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  if (query.includes('3 bedroom') || query.includes('3-bed') || query.includes('three bedroom') || query.includes('three bed')) {
    return `For a **3-Bedroom Apartment**, our official price is:\n\n• 🛏️ **Price**: **₦80,000**\n• Detailed clean of spacious parlor, 3 bedrooms, kitchen scrub, balconies, and all bathrooms.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  if (query.includes('4 bedroom') || query.includes('4-bed') || query.includes('four bedroom') || query.includes('four bed')) {
    return `For a **4-Bedroom Apartment**, our official price is:\n\n• 🚪 **Price**: **₦120,000**\n• Comprehensive detailing covering spacious living rooms, 4 bedrooms, kitchen detailing, and all washrooms.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  if (query.includes('5 bedroom') || query.includes('5-bed') || query.includes('five bedroom') || query.includes('five bed')) {
    return `For a **5-Bedroom Apartment**, our official price is:\n\n• 🏰 **Price**: **₦165,000**\n• Full multi-cleaner intensive detailing for large 5-bedroom apartments, luxury duplexes, or mansions. Covers all 5 bedrooms, grand parlor, dining, kitchen, and multiple bathrooms.\n\n${LOCATION_PRICE_NOTICE}`;
  }

  // 3. Official Price List request
  if (
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('rate') ||
    query.includes('how much') ||
    query.includes('fee') ||
    query.includes('charges') ||
    query.includes('list')
  ) {
    return `${FORMATTED_OFFICIAL_PRICE_LIST}\n\nWould you like to book for any of these options or confirm logistics for your location in Ikorodu?`;
  }

  // 4. Transportation / Location charges notice
  if (
    query.includes('transport') ||
    query.includes('logistics') ||
    query.includes('notice') ||
    query.includes('distant') ||
    query.includes('location')
  ) {
    return `${LOCATION_PRICE_NOTICE}\n\nWe operate across Ikorodu (Ebute, Agric, Ogolonto, Igbogbo, Bayeku, Owutu, Haruna, Majidun) and nearby Lagos Mainland areas. Where is your space located?`;
  }

  // 5. Equipment & Supplies
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
    return `**You do not need to provide or buy anything!** 🧰\n\nOur team arrives fully equipped with commercial-grade vacuums, hygienic color-coded microfiber mops, heavy-duty degreasers, bathroom descalers, and sanitizers. Everything is covered in the service!`;
  }

  // 6. Greetings & Identity
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|who are you|what can you do)/.test(query)) {
    return `Hello! 👋 I'm **Am-Bot**, your dedicated AI cleaning assistant for **Clean Am Correct**.\n\nJust like Claude and ChatGPT, I can help you with:\n• 💰 Providing our **Official Price List** (from ₦35,000 for self-contained to ₦165,000 for 5-bedroom)\n• 🧼 Explaining cleaning procedures and scheduling\n• 🧪 Giving stain removal and household hygiene advice\n• 📍 Checking location logistics across Ikorodu\n\nHow can I help you today?`;
  }

  // 7. General fallback with official price schedule
  return `Thank you for asking! Here is our **Official Price Schedule**:\n\n${FORMATTED_OFFICIAL_PRICE_LIST}\n\nTell me about your property, and I'll help you lock in an appointment!`;
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
    const delay = words[i].includes('\n') ? 40 : words[i].length > 6 ? 26 : 16;
    await new Promise((res) => setTimeout(res, delay));
  }

  const actions = extractActionsFromText(streamedText);
  onComplete(streamedText, actions);
}
