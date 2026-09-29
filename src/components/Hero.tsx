import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { siteImages } from '../data/images';

interface HeroProps {
  onExploreServices: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onOpenBooking }) => {
  const slides = siteImages.heroSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Helper indices for the 3-card stack
  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen bg-[#032b69] text-white overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-grid-dots"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient gradient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#38b6ff]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN: EDITORIAL TYPOGRAPHY & CTAs ================= */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            {/* Eyebrow badge matching reference */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#38b6ff] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                Premium Cleaning Service • Ikorodu
              </span>
            </div>

            {/* Oversized Editorial Heading */}
            <h1 className="font-editorial-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.98] text-balance">
              Cleaner Spaces,{' '}
              <span className="font-serif-brand font-bold italic tracking-normal lowercase block text-[#38b6ff] mt-1 sm:mt-2 text-5xl sm:text-7xl xl:text-8xl">
                better living.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-lg text-balance">
              Professional cleaning services for homes and businesses in Ikorodu, Lagos. Handled with meticulous care, hygienic precision, and reliable staff.
            </p>

            {/* Editorial CTAs (Pill style matching reference) */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-[#032b69] bg-white hover:bg-slate-100 active:scale-95 transition-all shadow-xl hover:shadow-2xl whitespace-nowrap"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#38b6ff]" />
              </a>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-white/5 hover:bg-white/10 border border-white/25 active:scale-95 transition-all whitespace-nowrap"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Trust highlights micro-bar */}
            <div className="mt-10 pt-6 border-t border-white/10 w-full flex items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38b6ff]" />
                <span className="font-medium">Direct WhatsApp Quote</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38b6ff]" />
                <span className="font-medium">Vetted Local Cleaners</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: LAYERED 3D OVERLAPPING CAROUSEL ================= */}
          <div
            className="lg:col-span-6 relative w-full flex flex-col items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* The 3-Card Overlapping Stage */}
            <div className="relative w-full max-w-[500px] h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
              {/* LEFT BEHIND CARD */}
              <div
                onClick={prevSlide}
                className="cursor-pointer absolute left-0 w-[55%] sm:w-[58%] h-[80%] sm:h-[84%] rounded-[24px] sm:rounded-[30px] overflow-hidden border-2 border-white/40 shadow-xl opacity-60 transform -translate-x-6 sm:-translate-x-10 scale-90 -rotate-3 transition-all duration-500 hover:opacity-80 z-10"
              >
                <img
                  src={slides[leftIndex].src}
                  alt={slides[leftIndex].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-[#032b69]/40" />
              </div>

              {/* RIGHT BEHIND CARD */}
              <div
                onClick={nextSlide}
                className="cursor-pointer absolute right-0 w-[55%] sm:w-[58%] h-[80%] sm:h-[84%] rounded-[24px] sm:rounded-[30px] overflow-hidden border-2 border-white/40 shadow-xl opacity-60 transform translate-x-6 sm:translate-x-10 scale-90 rotate-3 transition-all duration-500 hover:opacity-80 z-10"
              >
                <img
                  src={slides[rightIndex].src}
                  alt={slides[rightIndex].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-[#032b69]/40" />
              </div>

              {/* CENTER ACTIVE CARD (Prominent, crisp white border, shadow-2xl) */}
              <div className="relative w-[72%] sm:w-[76%] h-[92%] sm:h-[95%] rounded-[28px] sm:rounded-[34px] overflow-hidden border-4 border-white shadow-2xl z-20 transition-all duration-500 bg-slate-900 group">
                <img
                  key={activeIndex}
                  src={slides[activeIndex].src}
                  alt={slides[activeIndex].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#032b69]/90 via-[#032b69]/20 to-transparent" />

                {/* Top Pill Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/90 text-[#032b69] backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#38b6ff]" />
                    {slides[activeIndex].tag}
                  </span>
                  <span className="text-[11px] font-mono text-white/80 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    {slides[activeIndex].badge}
                  </span>
                </div>

                {/* Bottom Slide Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white z-30">
                  <h3 className="font-editorial-heading text-lg sm:text-xl font-bold text-white uppercase leading-snug">
                    {slides[activeIndex].title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-200 line-clamp-2 font-normal">
                    {slides[activeIndex].subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Controls Below Stack */}
            <div className="mt-6 flex items-center justify-between w-full max-w-[420px] px-2">
              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#032b69] border border-white/20 transition-all flex items-center justify-center active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#032b69] border border-white/20 transition-all flex items-center justify-center active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slide Dots */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-7 bg-[#38b6ff]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Current Slide Number Indicator */}
              <span className="text-xs font-mono tracking-wider text-slate-300">
                0{activeIndex + 1} / 0{total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
