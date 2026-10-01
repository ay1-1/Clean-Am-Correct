import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { siteImages } from '../data/images';
import { siteConfig } from '../data/siteConfig';

export const BespokeConsultation: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Container matching Reference */}
        <div className="rounded-[32px] sm:rounded-[40px] border border-slate-200/90 overflow-hidden shadow-xl bg-white grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* LEFT: Full-Bleed Photograph of clean Nigerian home */}
          <div className="lg:col-span-6 h-[340px] sm:h-[460px] lg:h-[540px] relative overflow-hidden bg-slate-900">
            <img
              src={siteImages.heroLiving.src}
              alt="Clean Nigerian home living room by Clean Am Correct"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* RIGHT: Friendly, direct copy */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
              Need Something Specific?
            </span>

            <h2 className="font-editorial-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-[#032b69] tracking-tight leading-[1.05] mb-6">
              Custom{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block sm:inline-block text-[#38b6ff]">
                cleaning plans
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg mb-8">
              Whether you have a 4-bedroom duplex, a busy commercial office, or a compound in Ikorodu that needs a special touch, we can arrange a custom cleaning package for you. Talk directly with our team and let us know what you need.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#032b69] hover:bg-[#021d45] active:scale-95 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-[#38b6ff]" />
                <span>Request a Quote on WhatsApp</span>
              </a>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Call or WhatsApp
                </span>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="font-bold text-slate-800 text-sm sm:text-base hover:text-[#032b69] transition-colors"
                >
                  +234 704 697 5466
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
