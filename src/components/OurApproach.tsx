import React from 'react';

export const OurApproach: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'BOOK',
      subtitle: 'Effortless WhatsApp Scheduling',
      description:
        'Share your location in Ikorodu, property type, and preferred time window. We confirm your appointment and provide an upfront quote.',
    },
    {
      step: '02',
      title: 'WE ARRIVE',
      subtitle: 'Punctual & Prepared',
      description:
        'Our vetted team arrives on schedule equipped with commercial vacuum cleaners, sanitized microfiber cloths, and safe cleaning solutions.',
    },
    {
      step: '03',
      title: 'WE CLEAN',
      subtitle: 'Thorough & Attentive',
      description:
        'We clean room by room: dusting cornices, mopping tiles, scrubbing bathrooms, degreasing kitchen areas, and vacuuming upholstery.',
    },
    {
      step: '04',
      title: 'YOU ENJOY',
      subtitle: 'Relax & Enjoy Your Space',
      description:
        'Walk into your fresh, properly cleaned home or office. Relax in a comfortable and hygienic environment without lifting a finger.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
            How It Works
          </span>
          <h2 className="font-editorial-heading text-4xl sm:text-6xl font-extrabold text-[#032b69] tracking-tight uppercase leading-none">
            Our{' '}
            <span className="font-serif-brand font-bold italic tracking-normal lowercase text-[#38b6ff] block sm:inline-block">
              approach
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            A simple, straightforward process to get your space properly cleaned and refreshed.
          </p>
        </div>

        {/* Staggered Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[32px] bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-clean-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="font-editorial-heading text-5xl sm:text-6xl font-extrabold text-slate-200 group-hover:text-[#38b6ff] transition-colors block mb-4">
                  {item.step}
                </span>

                <h3 className="font-editorial-heading text-xl font-bold uppercase tracking-tight text-[#032b69] mb-1">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-[#0284c7] uppercase tracking-wider mb-4">
                  {item.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="w-8 h-1 bg-slate-100 group-hover:bg-[#38b6ff] mt-6 rounded-full transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
