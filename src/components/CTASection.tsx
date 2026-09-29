import React from 'react';
import { MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#032b69] text-white relative overflow-hidden bg-grid-dots">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#38b6ff]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#38b6ff] bg-white/10 px-4 py-1.5 rounded-full border border-white/10 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Ikorodu & Lagos Cleaners
        </span>

        {/* Large Editorial Typography */}
        <h2 className="font-editorial-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-white tracking-tight leading-[1.02] text-balance">
          Ready for a{' '}
          <span className="font-serif-brand font-bold italic tracking-normal lowercase block text-[#38b6ff] text-5xl sm:text-7xl lg:text-8xl mt-1">
            cleaner space?
          </span>
        </h2>

        <p className="mt-6 text-sm sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto text-balance">
          Book Clean Am Correct for your next cleaning service. Step into a fresh, spotless, and comfortable environment today.
        </p>

        {/* CTAs matching Reference */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-[#032b69] bg-white hover:bg-slate-100 active:scale-95 transition-all shadow-xl whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-[#38b6ff]" />
            <span>Book an Appointment</span>
          </a>

          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-white/10 hover:bg-white/15 border border-white/25 active:scale-95 transition-all whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 text-[#38b6ff]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
