import React from 'react';
import { Wind, ShieldAlert, Sparkles, Droplets } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const HealthEducationSection: React.FC = () => {
  const points = [
    {
      icon: Wind,
      title: 'Indoor Air Quality',
      desc: 'Closed rooms accumulate fine particulate matter, outdoor road dust, and stagnant microscopic debris over time. Routine dusting and vacuuming help circulate cleaner, fresher indoor air.',
    },
    {
      icon: ShieldAlert,
      title: 'Dust Mites & Common Allergens',
      desc: 'Fabrics, upholstery, and carpets naturally collect dust mites, pollen, and pet dander. Thorough surface extraction reduces triggers that can aggravate seasonal allergies and sneezing.',
    },
    {
      icon: Droplets,
      title: 'Moisture & Mould Awareness',
      desc: 'In humid environments like Lagos, bathrooms, kitchen sink under-counters, and damp corners can foster mould spores. Regular sanitation helps keep damp zones clean and dry.',
    },
    {
      icon: Sparkles,
      title: 'Mental Comfort & Productivity',
      desc: 'An organized, clean home or workplace reduces sensory overwhelm, creates a tranquil headspace, and fosters focus and restful sleep after long days.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Wellness & Environment"
          title="Why Regular Cleaning Matters"
          subtitle="A clean space is more than visual beauty. Proper sanitation supports healthy indoor environments for children, adults, and workplace staff."
        />

        {/* Factual Information Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-white border border-sky-200/80 shadow-xs">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center text-balance">
            Accumulated dust, pet dander, mould spores, and poor ventilation can contribute to indoor air-quality problems and may aggravate allergies or respiratory symptoms in susceptible people. Consistent, systematic cleaning removes these particles from high-traffic living areas and workspaces.
          </p>
        </div>

        {/* 4 Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#38b6ff]" />
                  </div>
                  <h3 className="font-serif-brand text-base sm:text-lg font-bold text-[#032b69] mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
