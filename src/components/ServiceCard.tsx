import React from 'react';
import { Check, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ServiceItem, getServiceWhatsAppUrl } from '../data/services';

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  const whatsappUrl = getServiceWhatsAppUrl(service.title);

  return (
    <article
      className={`group flex flex-col rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
        featured
          ? 'border-sky-300 ring-1 ring-sky-300 shadow-md'
          : 'border-slate-200 hover:border-sky-200 hover:shadow-clean-hover'
      }`}
    >
      {/* Service Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.imageAlt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

        {/* Popular / Category indicator */}
        <div className="absolute top-3 left-3">
          {service.popular ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#38b6ff] text-white shadow-sm">
              Most Requested
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 backdrop-blur-sm text-[#032b69]">
              Specialized Care
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#032b69] tracking-tight group-hover:text-[#38b6ff] transition-colors">
            {service.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Key Deliverables */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              What's Included:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {service.benefits.slice(0, 3).map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#38b6ff] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing Notice & Booking Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Rate</span>
            <span className="font-semibold text-slate-800">Contact us for a quote</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#032b69] hover:bg-[#021f4a] active:bg-[#011430] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#38b6ff]" />
            <span>Book This Service</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-70" />
          </a>
        </div>
      </div>
    </article>
  );
};
