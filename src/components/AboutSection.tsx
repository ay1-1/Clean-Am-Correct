import React from 'react';
import { Sparkles, Shield, Heart } from 'lucide-react';
import { siteImages } from '../data/images';
import { CleanAmCorrectLogo } from './CleanAmCorrectLogo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* LEFT: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 text-slate-600 font-normal leading-relaxed text-sm sm:text-base">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block">
              About Clean Am Correct
            </span>

            <h2 className="font-editorial-heading text-4xl sm:text-6xl font-extrabold uppercase text-[#032b69] tracking-tight leading-[1.02]">
              Our Story &{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block text-[#38b6ff] text-5xl sm:text-7xl">
                philosophy
              </span>
            </h2>

            <p>
              In our fast-moving communities across Lagos, finding time to maintain an immaculate living space or office can be taxing. Between long commutes, demanding careers, and family priorities, routine domestic scrubbing often becomes a burden.
            </p>

            <p>
              Clean Am Correct was born out of a clear, disciplined philosophy: to provide reliable, high-standard cleaning services that bring calm, hygiene, and freshness to residential and commercial environments throughout Ikorodu.
            </p>

            {/* Micro Feature Callouts */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider text-[#032b69] mb-1.5">
                  <Shield className="w-4 h-4 text-[#38b6ff]" />
                  <span>Vetted & Disciplined</span>
                </div>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Honest, background-checked personnel who respect your home, property, and privacy.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider text-[#032b69] mb-1.5">
                  <Heart className="w-4 h-4 text-[#38b6ff]" />
                  <span>Client Satisfaction</span>
                </div>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  We walk through your checklist to ensure no corners or difficult surfaces are missed.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Photography with Layered Logo Emblem */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-[36px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900">
              <img
                src={siteImages.equipment.src}
                alt="Clean Am Correct professional cleaning gear"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Official Clean Am Correct badge overlay */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 hidden sm:block">
              <CleanAmCorrectLogo size="md" variant="blue-badge" showSubtitle />
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
          <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38b6ff] block mb-2">
              01 • Systematic
            </span>
            <h3 className="font-editorial-heading text-xl font-bold uppercase text-[#032b69] mb-3">
              Meticulous Method
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              From high ceiling cobweb extraction to deep baseboard sanitizing, every team member follows standardized hygienic checklists suited for each floor type.
            </p>
          </div>

          <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38b6ff] block mb-2">
              02 • Punctual
            </span>
            <h3 className="font-editorial-heading text-xl font-bold uppercase text-[#032b69] mb-3">
              Absolute Reliability
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              We value your schedule. Our team arrives promptly at your chosen appointment time with complete commercial tools ready to execute without delay.
            </p>
          </div>

          <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38b6ff] block mb-2">
              03 • Local Care
            </span>
            <h3 className="font-editorial-heading text-xl font-bold uppercase text-[#032b69] mb-3">
              Ikorodu Roots
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Centrally based in Ikorodu, Lagos, we understand the local climate, dust accumulation, and road realities, allowing responsive same-day inquiries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
