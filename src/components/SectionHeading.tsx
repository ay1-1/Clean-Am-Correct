import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'
      } ${className}`}
    >
      {kicker && (
        <p className="text-xs font-semibold tracking-wider text-[#0284c7] uppercase mb-2">
          {kicker}
        </p>
      )}
      <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#032b69] tracking-tight leading-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
};
