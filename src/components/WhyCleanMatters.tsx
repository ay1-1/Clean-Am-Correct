import React from 'react';
import { Wind, Calendar, Sparkles } from 'lucide-react';
import { siteImages } from '../data/images';

export const WhyCleanMatters: React.FC = () => {
  const points = [
    {
      icon: Wind,
      title: 'WHY DOES DUST BUILD UP SO QUICKLY?',
      desc: 'With road dust, open windows, daily foot traffic and dry season breeze in Lagos, homes and furniture gather dust faster than we expect. Regular vacuuming and dusting keep the air in your rooms fresh.',
    },
    {
      icon: Calendar,
      title: 'HOW OFTEN SHOULD YOU CLEAN?',
      desc: 'The right cleaning routine depends on how many people use the space, children, dust levels and your daily schedule. A weekly or bi-weekly routine helps maintain order without overwhelming your weekends.',
    },
    {
      icon: Sparkles,
      title: 'WHY IS DEEP CLEANING IMPORTANT?',
      desc: 'Some areas need more attention than everyday sweeping and mopping. Deep cleaning tackles the areas that are often missed—behind the fridge, under the sofa, tile grout lines, and bathroom scale.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Photograph of clean Nigerian bedroom */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-100 aspect-[4/3] bg-slate-100">
              <img
                src={siteImages.bedroom.src}
                alt="Clean, tidy Nigerian bedroom in Lagos apartment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Ambient accent badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#032b69] text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-xs border border-white/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#38b6ff] block mb-1">
                Healthy Living
              </span>
              <p className="text-xs text-slate-200 leading-snug">
                A clean, dust-free bedroom makes resting after a long Lagos day so much easier.
              </p>
            </div>
          </div>

          {/* RIGHT: Practical Educational Points */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
              Cleaning Tips & Routine
            </span>

            <h2 className="font-editorial-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-[#032b69] tracking-tight leading-[1.05] mb-6">
              Why a clean space{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block sm:inline-block text-[#38b6ff]">
                matters
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8">
              Keeping your space clean is about more than just appearance. It reduces indoor dust, prevents mould in damp bathrooms, and helps you relax properly when you get home from work.
            </p>

            {/* 3 Practical Points */}
            <div className="space-y-6">
              {points.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#38b6ff] shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-xs sm:text-sm tracking-wider uppercase text-[#032b69]">
                        {pt.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-1">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
