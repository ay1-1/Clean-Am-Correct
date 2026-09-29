import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { siteImages } from '../data/images';

interface ComparisonPair {
  id: string;
  title: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  image: string;
}

export const BeforeAfterSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activePair, setActivePair] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const pairs: ComparisonPair[] = [
    {
      id: 'living',
      title: 'Living Room',
      beforeLabel: 'Dusty, Dull & Cluttered',
      afterLabel: 'Deep Cleaned & Sanitized',
      description:
        'Sofa vacuuming, dust elimination from light cornices, sanitized touchpoints, and polished wooden flooring.',
      image: siteImages.heroLiving.src,
    },
    {
      id: 'kitchen',
      title: 'Kitchen Backsplash & Counters',
      beforeLabel: 'Cooking Residue & Grease',
      afterLabel: 'Sparkling Quartz & Tile',
      description:
        'Intensive stovetop degreasing, descaled stainless sink, sanitized counters, and spotless tile surfaces.',
      image: siteImages.kitchen.src,
    },
    {
      id: 'bathroom',
      title: 'Luxury Bathroom Detailing',
      beforeLabel: 'Limescale & Water Spots',
      afterLabel: 'Crystal Clear Marble & Glass',
      description:
        'Descaling glass shower screens, scrubbing grout lines, toilet disinfection, and gleaming chrome fixtures.',
      image: siteImages.bathroom.src,
    },
    {
      id: 'rugs',
      title: 'Carpet & Rug Restoration',
      beforeLabel: 'Trapped Dust & Pet Dander',
      afterLabel: 'HEPA Extracted & Revitalized',
      description:
        'Commercial vacuum extraction removing deep embedded fibers, grit, allergens, and refreshing fiber luster.',
      image: siteImages.vacuumCleaner.src,
    },
    {
      id: 'office',
      title: 'Corporate Executive Office',
      beforeLabel: 'Fingerprints & Clutter',
      afterLabel: 'Pristine Meeting Readiness',
      description:
        'Streak-free glass doors, sanitized keyboards, dusted monitors, and immaculate reception flooring.',
      image: siteImages.commercial.src,
    },
  ];

  const currentPair = pairs[activePair];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
            Proof of Craftsmanship
          </span>
          <h2 className="font-editorial-heading text-4xl sm:text-6xl font-extrabold text-[#032b69] tracking-tight uppercase leading-none">
            Before &{' '}
            <span className="font-serif-brand font-bold italic tracking-normal lowercase text-[#38b6ff] block sm:inline-block">
              after
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            Drag the comparison divider to experience the transformative power of the Clean Am Correct method.
          </p>
        </div>

        {/* Scene Selection Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {pairs.map((pair, idx) => (
            <button
              key={pair.id}
              onClick={() => {
                setActivePair(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activePair === idx
                  ? 'bg-[#032b69] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pair.title}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl aspect-[16/10] sm:aspect-[16/9] select-none cursor-ew-resize bg-slate-900 border-4 border-slate-100"
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* AFTER IMAGE (Base layer: full clarity Clean Am Correct) */}
            <img
              src={currentPair.image}
              alt={`${currentPair.title} - After cleaning`}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* BEFORE IMAGE (Clipped overlay: dimmed, dusty, desaturated) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentPair.image}
                alt={`${currentPair.title} - Before cleaning`}
                referrerPolicy="no-referrer"
                className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none filter brightness-75 contrast-75 sepia-[0.35] blur-[0.6px]"
                style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
              />

              {/* BEFORE LABEL */}
              <div className="absolute top-6 left-6 bg-black/75 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                BEFORE
              </div>
            </div>

            {/* AFTER LABEL */}
            <div className="absolute top-6 right-6 bg-[#032b69]/85 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-sky-400/40 flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#38b6ff]" />
              <span>AFTER</span>
            </div>

            {/* DRAGGABLE DIVIDER */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-11 h-11 rounded-full bg-[#38b6ff] text-white shadow-2xl border-2 border-white flex items-center justify-center -ml-0.5">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>

            {/* Instruction tooltip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-medium text-white pointer-events-none flex items-center gap-1.5">
              <span>Drag divider left or right</span>
            </div>
          </div>

          {/* Description Caption */}
          <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
            <span className="font-bold uppercase tracking-wider text-[#032b69]">
              {currentPair.title}:
            </span>
            <span className="font-normal">{currentPair.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
