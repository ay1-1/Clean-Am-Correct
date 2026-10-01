import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowUpRight } from 'lucide-react';
import { siteImages } from '../data/images';
import { siteConfig } from '../data/siteConfig';

export const WhatWeCleanGallery: React.FC = () => {
  const items = siteImages.whatWeClean;
  const [activeCard, setActiveCard] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    setActiveCard((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    setActiveCard((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
              Room By Room
            </span>
            <h2 className="font-editorial-heading text-4xl sm:text-6xl font-extrabold text-[#032b69] tracking-tight uppercase leading-none">
              What We{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase text-[#38b6ff]">
                clean
              </span>
            </h2>
            <div className="w-20 h-1 bg-[#38b6ff] mt-4 rounded-full" />
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-slate-300 hover:border-[#032b69] hover:bg-[#032b69] text-slate-700 hover:text-white transition-all flex items-center justify-center active:scale-95 shadow-xs"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-slate-300 hover:border-[#032b69] hover:bg-[#032b69] text-slate-700 hover:text-white transition-all flex items-center justify-center active:scale-95 shadow-xs"
              aria-label="Next item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Overlapping Gallery Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory"
        >
          {items.map((item, idx) => {
            const isHighlighted = idx === activeCard;
            return (
              <div
                key={idx}
                onClick={() => setActiveCard(idx)}
                className={`shrink-0 w-[290px] sm:w-[360px] md:w-[390px] h-[440px] sm:h-[480px] rounded-[32px] overflow-hidden relative group cursor-pointer transition-all duration-500 snap-center border ${
                  isHighlighted
                    ? 'border-[#38b6ff] ring-2 ring-sky-300 shadow-card-stack scale-[1.02]'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-md'
                }`}
              >
                {/* Background Image with Hover Zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isHighlighted
                      ? 'bg-gradient-to-t from-[#032b69]/90 via-[#032b69]/40 to-transparent'
                      : 'bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-black/20 group-hover:from-[#032b69]/85'
                  }`}
                />

                {/* Top Category Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Center / Bottom Card Content */}
                <div className="absolute inset-x-6 bottom-6 z-10 text-white flex flex-col justify-end">
                  <span className="text-[10px] font-mono tracking-widest text-[#38b6ff] uppercase mb-1">
                    {item.itemsCount}
                  </span>

                  <h3 className="font-editorial-heading text-2xl font-bold uppercase tracking-tight text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-200 font-normal leading-relaxed mb-5 line-clamp-2">
                    {item.description}
                  </p>

                  <a
                    href={`https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
                      `Hello Clean Am Correct, I would like to book a cleaning for my ${item.title} in Ikorodu.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                      isHighlighted
                        ? 'bg-white text-[#032b69] hover:bg-[#38b6ff] hover:text-white'
                        : 'bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-[#032b69]'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
