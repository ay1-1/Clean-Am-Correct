import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#06101e] text-slate-400 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          {/* LEFT: Logo + Business Descriptor matching Reference Screenshot 8 */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left mb-6 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-xl bg-[#38b6ff] flex items-center justify-center p-1.5 text-white shadow-md border border-sky-400/40 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 500 380" className="w-full h-full" fill="none">
                  <path d="M 226 80 Q 226 95 212 95 Q 226 95 226 110 Q 226 95 240 95 Q 226 95 226 80 Z" fill="#ffffff" />
                  <path d="M 288 116 Q 288 127 278 127 Q 288 127 288 138 Q 288 127 298 127 Q 288 127 288 116 Z" fill="#ffffff" />
                  <path d="M 240 100 C 172 105 130 142 130 184 C 130 228 185 258 260 258 C 312 258 358 244 374 223 C 381 213 382 202 376 191 C 366 176 341 163 304 154 L 297 173 C 332 182 357 194 361 206 C 363 216 352 226 322 233 C 284 243 228 245 177 232 C 145 225 143 203 151 189 C 162 168 199 143 253 128 L 255 99 Z" fill="#ffffff" />
                  <rect x="252" y="20" width="18" height="118" rx="9" fill="#ffffff" />
                  <path d="M 240 136 C 240 128 246 123 261 123 C 277 123 283 128 283 136 L 295 161 L 228 161 Z" fill="#ffffff" />
                  <path d="M 234 168 L 289 168 L 305 203 C 307 210 302 218 295 218 L 213 218 C 196 218 178 215 184 205 Z" fill="#ffffff" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-brand font-bold text-xl tracking-tight text-white leading-tight">
                  Clean Am
                </span>
                <span className="font-script-brand font-bold text-lg text-[#38b6ff] leading-none -mt-1">
                  Correct
                </span>
              </div>
            </button>

            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              Reliable residential, office, deep cleaning and move-in services in Ikorodu, Lagos. We help you keep your home and workspace clean, fresh and comfortable.
            </p>
          </div>

          {/* MIDDLE: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* SERVICES LIST (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-left hover:text-white transition-colors"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Direct Contact Details matching Screenshot 8 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
              Contact
            </h4>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-[#38b6ff] shrink-0 mt-0.5" />
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="hover:text-white transition-colors font-medium"
              >
                +234 704 697 5466
              </a>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4 text-[#38b6ff] shrink-0 mt-0.5" />
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-medium text-[#38b6ff]"
              >
                WhatsApp Us
              </a>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#38b6ff] shrink-0 mt-0.5" />
              <span>Ikorodu, Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Clean Am Correct. All rights reserved.</p>
          <p className="text-slate-600">Premium Cleaning Services • Ikorodu, Lagos</p>
        </div>
      </div>
    </footer>
  );
};
