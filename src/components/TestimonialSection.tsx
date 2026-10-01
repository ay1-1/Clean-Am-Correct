import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

// CLIENT REVIEWS (PLACEHOLDER DATA)
// Replace these with actual customer feedback as your business grows.
interface StoryItem {
  id: string;
  name: string;
  location: string;
  quote: string;
}

const clientStories: StoryItem[] = [
  {
    id: 'story-1',
    name: 'Chioma Adeyemi',
    location: 'Ebute, Ikorodu',
    quote:
      'The deep cleaning for our 3-bedroom flat was very well done. The living room tiles look very fresh and the kitchen is sparkling. The cleaners were polite, punctual, and completed everything without rushing.',
  },
  {
    id: 'story-2',
    name: 'Babatunde Oladipo',
    location: 'Agric / Ipakodo, Ikorodu',
    quote:
      'Clean Am Correct handled our commercial office cleaning in Agric after some minor renovation work. They wiped all the glass doors without streaks and vacuumed the rugs properly. Very reliable team.',
  },
  {
    id: 'story-3',
    name: 'Aisha Mohammed',
    location: 'Ikorodu Town',
    quote:
      'I have called them twice to clean my flat and both times they did a thorough job. They moved chairs, vacuumed behind the TV console, and left the whole house smelling clean and fresh.',
  },
];

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
            What Customers Say
          </span>
          <h2 className="font-editorial-heading text-4xl sm:text-6xl font-extrabold text-[#032b69] tracking-tight uppercase leading-none">
            Trusted by{' '}
            <span className="font-serif-brand font-bold italic tracking-normal lowercase text-[#38b6ff] block sm:inline-block">
              happy clients
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            Read what homeowners and business managers in Ikorodu say about our cleaning service.
          </p>
        </div>

        {/* 3 Large Editorial Cards matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {clientStories.map((story) => (
            <div
              key={story.id}
              className="rounded-[32px] bg-white border border-slate-200/80 p-8 sm:p-10 shadow-xs hover:shadow-clean-hover hover:border-sky-300 transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1.5 text-[#032b69] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#032b69] text-[#032b69]" />
                  ))}
                </div>

                {/* Quotation watermark and Quote */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-sky-100 absolute -top-4 -left-2 pointer-events-none group-hover:text-sky-200 transition-colors" />
                  <p className="text-sm sm:text-base text-slate-700 italic font-normal leading-relaxed relative z-10">
                    "{story.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Client Info */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-[#032b69]">
                    {story.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#38b6ff]" />
                    <span>{story.location}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
