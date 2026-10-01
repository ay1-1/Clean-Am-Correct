import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { siteImages } from '../data/images';
import { getServiceWhatsAppUrl } from '../data/services';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
              What We Offer
            </span>
            <h2 className="font-editorial-heading text-4xl sm:text-6xl font-extrabold text-[#032b69] tracking-tight uppercase leading-none">
              Clean By{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase text-[#38b6ff] block sm:inline-block">
                category
              </span>
            </h2>
            <div className="w-20 h-1 bg-[#38b6ff] mt-4 rounded-full" />
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              From family flats and duplexes to offices and stores around Ikorodu, choose the cleaning service that matches your space.
            </p>
          </div>
        </div>

        {/* Asymmetrical Grid matching Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* ================= LEFT: 1 LARGE TALL HERO CARD ================= */}
          <div className="lg:col-span-7 group relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[460px] sm:min-h-[580px] shadow-lg border border-slate-200/80 bg-slate-900 flex flex-col justify-between p-6 sm:p-10">
            <img
              src={siteImages.residential.src}
              alt="Residential Cleaning in Nigerian home by Clean Am Correct"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#032b69]/95 via-[#032b69]/40 to-black/20" />

            {/* Top Pill Badge */}
            <div className="relative z-10 flex justify-end">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/20">
                Homes & Flats
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 text-white max-w-lg">
              <h3 className="font-editorial-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-2">
                Residential Cleaning
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed mb-6">
                Give your home the proper clean it deserves. We handle the dust, tiled floor mopping, parlour vacuuming, and everyday mess so you can enjoy a fresher space.
              </p>

              <a
                href={getServiceWhatsAppUrl('Residential Cleaning')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#032b69] hover:bg-[#38b6ff] hover:text-white transition-all shadow-md group/btn"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#38b6ff] group-hover/btn:text-white transition-colors" />
                <span>Book This Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ================= RIGHT: 2 STACKED CARDS ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            {/* Top Right Card: Deep Cleaning */}
            <div className="group relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[260px] sm:min-h-[275px] shadow-lg border border-slate-200/80 bg-slate-900 flex flex-col justify-between p-6 sm:p-8 flex-1">
              <img
                src={siteImages.kitchen.src}
                alt="Deep Cleaning for Nigerian tiled kitchen"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032b69]/95 via-[#032b69]/40 to-black/20" />

              <div className="relative z-10 flex justify-end">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/20">
                  Thorough Clean
                </span>
              </div>

              <div className="relative z-10 text-white">
                <h3 className="font-editorial-heading text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-1.5">
                  Deep Cleaning
                </h3>
                <p className="text-xs text-slate-200 mb-4 line-clamp-2">
                  When your space needs more than a quick clean, we take our time to clean the areas that are often missed.
                </p>
                <a
                  href={getServiceWhatsAppUrl('Deep Cleaning')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38b6ff] hover:text-white transition-colors"
                >
                  <span>Book Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom Right Card: Office Cleaning */}
            <div className="group relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[260px] sm:min-h-[275px] shadow-lg border border-slate-200/80 bg-slate-900 flex flex-col justify-between p-6 sm:p-8 flex-1">
              <img
                src={siteImages.commercial.src}
                alt="Office Cleaning in Lagos Nigeria"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#032b69]/95 via-[#032b69]/40 to-black/20" />

              <div className="relative z-10 flex justify-end">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/20">
                  Offices & Shops
                </span>
              </div>

              <div className="relative z-10 text-white">
                <h3 className="font-editorial-heading text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white mb-1.5">
                  Office Cleaning
                </h3>
                <p className="text-xs text-slate-200 mb-4 line-clamp-2">
                  Keep your workplace clean, comfortable and ready for the day without getting in the way of business.
                </p>
                <a
                  href={getServiceWhatsAppUrl('Office Cleaning')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38b6ff] hover:text-white transition-colors"
                >
                  <span>Book Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FULL-WIDTH PANORAMIC CARD ================= */}
        <div className="mt-6 sm:mt-8">
          <div className="group relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[280px] sm:min-h-[340px] shadow-lg border border-slate-200/80 bg-slate-900 flex flex-col justify-between p-6 sm:p-10">
            <img
              src={siteImages.floorMop.src}
              alt="Move-In and Move-Out Cleaning for Nigerian homes"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#032b69]/95 via-[#032b69]/30 to-black/20" />

            <div className="relative z-10 flex justify-end">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/20">
                Moving Day
              </span>
            </div>

            <div className="relative z-10 text-white max-w-2xl">
              <h3 className="font-editorial-heading text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-2">
                Move-In / Move-Out Cleaning
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed mb-5">
                Moving into a new flat or handing over a rented space in Ikorodu? We'll help get it properly cleaned and ready. We clean inside cupboards, scrub floors, and make sure everything is fresh for you or the next tenant.
              </p>

              <a
                href={getServiceWhatsAppUrl('Move-In / Move-Out Cleaning')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#032b69] hover:bg-[#38b6ff] hover:text-white transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#38b6ff]" />
                <span>Get Move-In Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
