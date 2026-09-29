import React from 'react';
import { ShieldCheck, Eye, Users, CalendarCheck, Sparkles, HeartHandshake } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Professional Service',
      desc: 'Trained, vetted cleaners with disciplined work ethics and standard hygienic protocol.',
    },
    {
      icon: Eye,
      title: 'Attention to Detail',
      desc: 'We clean behind appliances, inside crevices, and along baseboards where dust conceals itself.',
    },
    {
      icon: Users,
      title: 'Reliable Team',
      desc: 'Punctual arrival and trustworthy staff who respect your privacy, family, and workplace property.',
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Booking',
      desc: 'Easily schedule morning, afternoon, weekend, or recurring weekly and monthly sessions via WhatsApp.',
    },
    {
      icon: Sparkles,
      title: 'Fresh & Clean Spaces',
      desc: 'We leave every room visibly revitalized, smelling delightfully clean, and pleasant to inhabit.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-Focused Service',
      desc: 'Direct communication, transparent quote estimates, and immediate follow-through on specific requests.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="The Clean Am Correct Standard"
          title="Why Clients Choose Clean Am Correct"
          subtitle="We take pride in turning cluttered, dusty spaces into sparkling sanctuaries. Here is why homeowners and businesses in Ikorodu rely on our cleaning service."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-clean hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-5 border border-sky-100">
                    <Icon className="w-5 h-5 text-[#38b6ff]" />
                  </div>
                  <h3 className="font-serif-brand text-lg font-bold text-[#032b69]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
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
