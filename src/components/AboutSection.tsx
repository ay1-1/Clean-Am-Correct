import React from 'react';
import { Shield, Heart } from 'lucide-react';
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
              Who We{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block text-[#38b6ff] text-5xl sm:text-7xl">
                are
              </span>
            </h2>

            <p>
              In a busy city like Lagos, keeping a home or workplace spotless is not always easy. Between long commutes, work, school runs, and family commitments, weekends are meant for rest—not spending hours scrubbing tile floors and dusting windows.
            </p>

            <p>
              Clean Am Correct was started right here in Ikorodu to help families, professionals, and business owners enjoy clean, fresh, and comfortable spaces without the stress. We don't cut corners or rush through the work. We clean properly, reliably, and treat your property with complete respect.
            </p>

            {/* Micro Feature Callouts */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider text-[#032b69] mb-1.5">
                  <Shield className="w-4 h-4 text-[#38b6ff]" />
                  <span>Vetted & Trustworthy</span>
                </div>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Honest, verified cleaners you can comfortably welcome into your home or office.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider text-[#032b69] mb-1.5">
                  <Heart className="w-4 h-4 text-[#38b6ff]" />
                  <span>Customer Satisfaction</span>
                </div>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  We check through your rooms with you to ensure you are happy with the job.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Authentic Nigerian Cleaning Photography with Layered Logo Emblem */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-[36px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900">
              <img
                src={siteImages.cleanerSofa.src}
                alt="Clean Am Correct professional cleaner at work in a Nigerian home"
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
              01 • Proper Care
            </span>
            <h3 className="font-editorial-heading text-xl font-bold uppercase text-[#032b69] mb-3">
              We Don't Rush
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              From removing cobwebs on high ceilings to washing bathroom tiles and cleaning behind the sofa, we do a thorough job every time.
            </p>
          </div>

          <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38b6ff] block mb-2">
              02 • Punctual
            </span>
            <h3 className="font-editorial-heading text-xl font-bold uppercase text-[#032b69] mb-3">
              We Show Up On Time
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              We respect your time. Our cleaners arrive promptly at your scheduled time with all equipment and detergents ready to work.
            </p>
          </div>

          <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38b6ff] block mb-2">
              03 • Based in Ikorodu
            </span>
            <h3 className="font-editorial-heading text-xl font-bold uppercase text-[#032b69] mb-3">
              Local & Accessible
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Based in Ikorodu, Lagos, we are close to your neighbourhood and can respond quickly for scheduled or urgent cleaning appointments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
