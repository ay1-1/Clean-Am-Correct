import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const EditorialIntro: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: Eyebrow + Huge Heading */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-4">
              Clean Am Correct • Ikorodu, Lagos
            </span>
            <h2 className="font-editorial-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#032b69] tracking-tight leading-[1.02] uppercase text-balance">
              Fresh spaces.{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block text-[#38b6ff] mt-1 sm:mt-2 text-5xl sm:text-7xl lg:text-8xl">
                handled correctly.
              </span>
            </h2>
          </div>

          {/* RIGHT: Asymmetrical Paragraph + CTA with generous whitespace */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2 lg:pt-8 space-y-6">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal text-balance">
              Clean Am Correct exists to bring calm, cleanliness, and peace of mind to homeowners and commercial enterprises across Ikorodu and Lagos. We replace the stress of domestic chores with disciplined, detailed, and hygienic care.
            </p>

            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              From routine apartment maintenance to intensive pre-move sanitization and corporate offices, our trained team arrives prepared with commercial equipment to leave every room immaculate.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#032b69] hover:text-[#38b6ff] group transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#38b6ff]" />
                <span className="border-b-2 border-[#032b69] group-hover:border-[#38b6ff] pb-0.5">
                  Book an Appointment on WhatsApp
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
