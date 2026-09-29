import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How do I book a cleaning appointment with Clean Am Correct?',
      answer:
        'Booking is seamless! Click any "Book an Appointment" button on our website or text us directly on WhatsApp at 07046975466. Provide your property type, preferred date, and location in Ikorodu, and we will immediately confirm availability and send you a custom quote.',
    },
    {
      question: 'Do I need to provide cleaning equipment or detergents?',
      answer:
        'No, our team arrives fully equipped with commercial-grade vacuum cleaners, hygienic mops, microfiber cloths, degreasers, bathroom sanitizers, and glass cleaners. If you have specialized surfaces or preferred natural solutions, you are welcome to inform us.',
    },
    {
      question: 'How do you calculate your service quotes?',
      answer:
        'We do not use generic fake flat rates because every space has unique needs. Pricing is transparent and based on your property size (e.g. 2-bedroom flat, duplex, or office square footage), current condition, and whether you require routine maintenance or an intensive deep clean.',
    },
    {
      question: 'Which locations in Ikorodu and Lagos do you serve?',
      answer:
        'We operate actively across Ikorodu including Ebute, Agric, Ogolonto, Igbogbo, Bayeku, Owutu, Haruna, Majidun, and Ikorodu Central, as well as nearby mainland areas upon request.',
    },
    {
      question: 'Are your cleaners trustworthy and vetted?',
      answer:
        'Yes. Every member of the Clean Am Correct team undergoes background verification and intensive training in domestic and commercial hygiene etiquette. We prioritize client safety, confidentiality, and respect for personal belongings.',
    },
    {
      question: 'Can I book recurring weekly or bi-weekly cleaning?',
      answer:
        'Absolutely. Many of our residential and commercial clients retain us on scheduled weekly, bi-weekly, or monthly intervals. Recurring clients enjoy consistent appointment priority and dedicated team assignments.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Clear answers about our cleaning standards, scheduling, equipment, and booking process."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-brand font-bold text-base sm:text-lg text-[#032b69]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-sky-100 text-[#0284c7]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support helper */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">
            Have a question not listed here? Chat directly with our manager on WhatsApp.
          </p>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-[#032b69] hover:text-[#38b6ff] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#38b6ff]" />
            <span>Ask on WhatsApp ({siteConfig.phoneDisplay})</span>
          </a>
        </div>
      </div>
    </section>
  );
};
