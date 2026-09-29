import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, MapPin } from 'lucide-react';

export const TopTrustBar: React.FC = () => {
  const items = [
    {
      icon: ShieldCheck,
      text: 'PROFESSIONAL SERVICE',
      sub: 'Trained & Vetted Cleaners',
    },
    {
      icon: Sparkles,
      text: 'RELIABLE CLEANING',
      sub: 'Consistent Standards',
    },
    {
      icon: CheckCircle2,
      text: 'ATTENTION TO DETAIL',
      sub: 'Every Corner Cleaned',
    },
    {
      icon: MapPin,
      text: 'IKORODU • LAGOS',
      sub: 'Active Neighborhood Coverage',
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-100 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-between">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 sm:gap-4 justify-start sm:justify-center group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#032b69] shrink-0 group-hover:bg-sky-50 group-hover:text-[#38b6ff] group-hover:border-sky-200 transition-colors">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#032b69] uppercase leading-tight font-sans">
                    {item.text}
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal mt-0.5 hidden sm:inline-block">
                    {item.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
