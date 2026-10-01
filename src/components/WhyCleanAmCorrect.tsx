import React from 'react';
import { Eye, ShieldCheck, Sparkles, Calendar, HeartHandshake } from 'lucide-react';

export const WhyCleanAmCorrect: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'WE PAY ATTENTION',
      desc: "We don't rush through the job. We pay attention to the areas that need proper cleaning—corners, baseboards, beneath sofas, and behind appliances.",
    },
    {
      icon: ShieldCheck,
      title: 'RELIABLE SERVICE',
      desc: 'We show up on time, do the work properly, and treat your home, property, and family with respect and care.',
    },
    {
      icon: Sparkles,
      title: 'PROPER CLEANING',
      desc: "We clean beyond what you can see. We remove the hidden dust, scrub the tough stains, and make sure your entire space feels fresh.",
    },
    {
      icon: Calendar,
      title: 'FLEXIBLE BOOKING',
      desc: "Need a cleaning appointment? Contact us on WhatsApp and let's arrange a day and time that works best for your schedule.",
    },
    {
      icon: HeartHandshake,
      title: 'GOOD CUSTOMER SERVICE',
      desc: 'We listen to what you need, explain the process clearly, and make sure you are 100% happy with the finished service.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Massive Editorial Heading */}
          <div className="lg:col-span-5 sticky top-28">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
              Why Choose Us
            </span>

            <h2 className="font-editorial-heading text-5xl sm:text-7xl font-extrabold uppercase text-[#032b69] tracking-tight leading-[0.95]">
              Why{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block text-[#38b6ff] text-6xl sm:text-8xl">
                clean am
              </span>
              correct?
            </h2>

            <p className="mt-6 text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-sm">
              We take cleaning seriously. Here is why homeowners and businesses around Ikorodu and Lagos trust our team.
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
