import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Menu, X, Phone, CreditCard } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  darkHero?: boolean;
  onOpenPayment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, darkHero = true, onOpenPayment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Nav colors based on hero theme & scroll state
  const isNavDark = !scrolled && darkHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
          : isNavDark
          ? 'bg-[#032b69]/90 backdrop-blur-sm border-b border-white/10 py-5'
          : 'bg-white border-b border-slate-100 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LEFT: Clean Am Correct official brand identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl group"
            aria-label="Clean Am Correct Home"
          >
            {/* Logo Emblem */}
            <div className="w-10 h-10 rounded-xl bg-[#38b6ff] flex items-center justify-center p-1.5 text-white shadow-md border border-sky-300/40 group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 500 380" className="w-full h-full" fill="none">
                <path d="M 226 80 Q 226 95 212 95 Q 226 95 226 110 Q 226 95 240 95 Q 226 95 226 80 Z" fill="#ffffff" />
                <path d="M 288 116 Q 288 127 278 127 Q 288 127 288 138 Q 288 127 298 127 Q 288 127 288 116 Z" fill="#ffffff" />
                <path d="M 240 100 C 172 105 130 142 130 184 C 130 228 185 258 260 258 C 312 258 358 244 374 223 C 381 213 382 202 376 191 C 366 176 341 163 304 154 L 297 173 C 332 182 357 194 361 206 C 363 216 352 226 322 233 C 284 243 228 245 177 232 C 145 225 143 203 151 189 C 162 168 199 143 253 128 L 255 99 Z" fill="#ffffff" />
                <rect x="252" y="20" width="18" height="118" rx="9" fill="#ffffff" />
                <path d="M 240 136 C 240 128 246 123 261 123 C 277 123 283 128 283 136 L 295 161 L 228 161 Z" fill="#ffffff" />
                <path d="M 234 168 L 289 168 L 305 203 C 307 210 302 218 295 218 L 213 218 C 196 218 178 215 184 205 Z" fill="#ffffff" />
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <span
                className={`font-serif-brand font-bold text-lg sm:text-xl tracking-tight leading-tight ${
                  isNavDark ? 'text-white' : 'text-[#032b69]'
                }`}
              >
                Clean Am
              </span>
              <span className="font-script-brand font-bold text-base sm:text-lg text-[#38b6ff] leading-none -mt-1">
                Correct
              </span>
            </div>
          </button>

          {/* CENTER: Navigation Links (Clean, uppercase spaced out like reference) */}
          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-bold tracking-widest uppercase transition-colors relative py-1 ${
                    isNavDark
                      ? isActive
                        ? 'text-white font-extrabold'
                        : 'text-slate-300 hover:text-white'
                      : isActive
                      ? 'text-[#032b69] font-extrabold'
                      : 'text-slate-600 hover:text-[#032b69]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38b6ff] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: CTA buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Pay Now button */}
            {onOpenPayment && (
              <button
                id="navbar-pay-now"
                onClick={onOpenPayment}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all border-2 ${
                  isNavDark
                    ? 'border-[#38b6ff] text-[#38b6ff] hover:bg-[#38b6ff] hover:text-white'
                    : 'border-[#38b6ff] text-[#0284c7] hover:bg-[#38b6ff] hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay Now</span>
              </button>
            )}
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm ${
                isNavDark
                  ? 'bg-white text-[#032b69] hover:bg-slate-100'
                  : 'bg-[#032b69] text-white hover:bg-[#021d45]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#38b6ff]" />
              <span>Book an Appointment</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                isNavDark ? 'bg-white text-[#032b69]' : 'bg-[#032b69] text-white'
              }`}
              aria-label="Book on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#38b6ff]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isNavDark ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-5 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-colors ${
                  activeSection === item.id
                    ? 'bg-sky-50 text-[#032b69]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {onOpenPayment && (
                <button
                  id="mobile-pay-now"
                  onClick={() => { onOpenPayment(); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#0284c7] to-[#38b6ff] shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Now</span>
                </button>
              )}
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#032b69] shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#38b6ff]" />
                <span>Book an Appointment</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full text-xs font-semibold text-slate-700 bg-slate-100"
              >
                <Phone className="w-3.5 h-3.5 text-[#38b6ff]" />
                <span>Call {siteConfig.phoneDisplay} (Ikorodu)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
