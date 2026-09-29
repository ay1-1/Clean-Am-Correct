import React from 'react';
import { ShieldCheck, Eye, Clock, Calendar, HeartHandshake } from 'lucide-react';

export const WhyCleanAmCorrect: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'ATTENTION TO DETAIL',
      desc: 'We clean behind appliances, inside frame crevices, and beneath cushions where ordinary cleaners leave dust behind.',
    },
    {
      icon: ShieldCheck,
      title: 'RELIABLE SERVICE',
      desc: 'Disciplined, trustworthy local personnel vetted for your safety, privacy, and peace of mind.',
    },
    {
      icon: Clock,
      title: 'PROFESSIONAL APPROACH',
      desc: 'Equipped with commercial vacuum systems, clean microfiber sets, and safe, effective surface agents.',
    },
    {
      icon: Calendar,
      title: 'FLEXIBLE BOOKING',
      desc: 'Morning, afternoon, weekend, or recurring weekly and monthly slots scheduled effortlessly via WhatsApp.',
    },
    {
      icon: HeartHandshake,
      title: 'CUSTOMER-FOCUSED',
      desc: 'Transparent pricing with no unexpected hidden fees, and dedicated follow-through to ensure complete satisfaction.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Massive Editorial Heading */}
          <div className="lg:col-span-5 sticky top-28">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
              The Clean Standard
            </span>

            <h2 className="font-editorial-heading text-5xl sm:text-7xl font-extrabold uppercase text-[#032b69] tracking-tight leading-[0.95]">
              Why{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block text-[#38b6ff] text-6xl sm:text-8xl">
                clean am
              </span>
              correct?
            </h2>

            <p className="mt-6 text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-sm">
              We hold ourselves to an uncompromising benchmark of cleanliness. Here is what separates our service in Ikorodu.
            </p>
          </div>

          {/* RIGHT: Editorial Pillar Cards */}
          <div className="lg:col-span-7 space-y-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-[28px] bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-sky-300 hover:shadow-clean-hover transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#032b69] group-hover:bg-[#38b6ff] group-hover:text-white group-hover:border-sky-400 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-editorial-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-[#032b69] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
