import React from 'react';

interface CleanAmCorrectLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'blue-badge' | 'transparent-white' | 'transparent-dark' | 'horizontal';
  showSubtitle?: boolean;
}

export const CleanAmCorrectLogo: React.FC<CleanAmCorrectLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'blue-badge',
  showSubtitle = false,
}) => {
  // Dimensions
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const scriptSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  // Reusable SVG Emblem Mark
  const Emblem = ({ fill = '#ffffff', strokeBg = '#38b6ff' }: { fill?: string; strokeBg?: string }) => (
    <svg viewBox="0 0 500 380" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sparkles */}
      <path
        d="M 226 80 Q 226 95 212 95 Q 226 95 226 110 Q 226 95 240 95 Q 226 95 226 80 Z"
        fill={fill}
      />
      <path
        d="M 198 152 Q 198 162 188 162 Q 198 162 198 172 Q 198 162 208 162 Q 198 162 198 152 Z"
        fill={fill}
      />
      <path
        d="M 288 116 Q 288 127 278 127 Q 288 127 288 138 Q 288 127 298 127 Q 288 127 288 116 Z"
        fill={fill}
      />
      <path
        d="M 314 152 Q 314 163 303 163 Q 314 163 314 174 Q 314 163 325 163 Q 314 163 314 152 Z"
        fill={fill}
      />

      {/* Orbital Ring Swoosh */}
      <path
        d="M 240 100 C 172 105 130 142 130 184 C 130 228 185 258 260 258 C 312 258 358 244 374 223 C 381 213 382 202 376 191 C 366 176 341 163 304 154 C 303 160 300 167 297 173 C 332 182 357 194 361 206 C 363 216 352 226 322 233 C 284 243 228 245 177 232 C 145 225 143 203 151 189 C 162 168 199 143 253 128 C 254 117 254 107 255 99 C 250 99 245 100 240 100 Z"
        fill={fill}
      />

      {/* Sweeping lower flourish tail on ring */}
      <path
        d="M 270 248 C 285 254 296 256 305 259 L 296 244 C 286 245 278 247 270 248 Z"
        fill={fill}
      />

      {/* Broom Handle */}
      <rect x="252" y="20" width="18" height="118" rx="9" fill={fill} />

      {/* Broom Collar */}
      <path
        d="M 240 136 C 240 128 246 123 261 123 C 277 123 283 128 283 136 L 295 161 C 295 163 291 166 286 166 L 236 166 C 231 166 228 163 228 161 Z"
        fill={fill}
      />

      {/* Broom Head Bristles with clean angled spread */}
      <path
        d="M 234 168 L 289 168 L 305 203 C 307 210 302 218 295 218 L 290 218 C 286 214 281 208 275 218 L 255 218 C 250 209 245 210 239 218 L 213 218 C 196 218 178 215 184 205 Z"
        fill={fill}
      />

      {/* Bristle grooves for texture */}
      <path
        d="M 222 193 L 230 217 M 249 186 L 254 217 M 271 186 L 273 217 M 287 193 L 286 217"
        stroke={strokeBg}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Sky-Blue Emblem Badge */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#38b6ff] p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-sky-400/40">
          <Emblem fill="#ffffff" strokeBg="#38b6ff" />
        </div>

        {/* Wordmark */}
        <div className="flex flex-col leading-none">
          <span className="font-serif-brand font-bold text-lg sm:text-xl tracking-tight text-[#032b69]">
            Clean Am
          </span>
          <span className="font-script-brand font-bold text-lg sm:text-xl text-[#38b6ff] -mt-1 tracking-wide">
            Correct
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'transparent-white') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className={sizeMap[size]}>
          <Emblem fill="#ffffff" strokeBg="#032b69" />
        </div>
        <div className="mt-1 flex flex-col items-center leading-none">
          <span className={`font-serif-brand font-bold ${textSizes[size]} text-white tracking-tight`}>
            Clean Am
          </span>
          <span className={`font-script-brand font-bold ${scriptSizes[size]} text-white -mt-0.5`}>
            Correct
          </span>
        </div>
        {showSubtitle && (
          <span className="text-xs text-sky-100/90 mt-1 font-medium tracking-wide">
            Ikorodu, Lagos
          </span>
        )}
      </div>
    );
  }

  if (variant === 'transparent-dark') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className={sizeMap[size]}>
          <Emblem fill="#032b69" strokeBg="#ffffff" />
        </div>
        <div className="mt-1 flex flex-col items-center leading-none">
          <span className={`font-serif-brand font-bold ${textSizes[size]} text-[#032b69] tracking-tight`}>
            Clean Am
          </span>
          <span className={`font-script-brand font-bold ${scriptSizes[size]} text-[#38b6ff] -mt-0.5`}>
            Correct
          </span>
        </div>
        {showSubtitle && (
          <span className="text-xs text-slate-500 mt-1 font-medium tracking-wide">
            Ikorodu, Lagos
          </span>
        )}
      </div>
    );
  }

  // Default: Official Brand Sky-Blue Card Badge matching the exact flyer/logo identity
  return (
    <div
      className={`rounded-2xl bg-[#38b6ff] text-white p-3 flex flex-col items-center justify-center shadow-md border border-sky-400/50 ${className}`}
    >
      <div className={sizeMap[size]}>
        <Emblem fill="#ffffff" strokeBg="#38b6ff" />
      </div>
      <div className="flex flex-col items-center leading-none mt-1">
        <span className={`font-serif-brand font-extrabold ${textSizes[size]} tracking-tight text-white drop-shadow-sm`}>
          Clean Am
        </span>
        <span className={`font-script-brand font-bold ${scriptSizes[size]} text-white -mt-0.5 drop-shadow-sm`}>
          Correct
        </span>
      </div>
      {showSubtitle && (
        <span className="text-[10px] sm:text-xs text-white/90 font-medium tracking-wider uppercase mt-1">
          Ikorodu, Lagos
        </span>
      )}
    </div>
  );
};
