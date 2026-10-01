import React, { useState } from 'react';
import { siteConfig, createWhatsAppBookingUrl } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { MapPin, Phone, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: servicesData[0]?.title || 'Residential Cleaning',
    preferredDate: '',
    preferredTime: 'Morning (8:00 AM - 12:00 PM)',
    locationArea: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    const whatsappUrl = createWhatsAppBookingUrl({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      preferredDate: formData.preferredDate || 'Flexible / Next Available',
      preferredTime: formData.preferredTime,
      locationArea: formData.locationArea || 'Ikorodu, Lagos',
      message: formData.message,
    });

    setSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0284c7] block mb-3">
            Contact & Booking
          </span>
          <h2 className="font-editorial-heading text-4xl sm:text-6xl font-extrabold text-[#032b69] tracking-tight uppercase leading-none">
            Book An{' '}
            <span className="font-serif-brand font-bold italic tracking-normal lowercase text-[#38b6ff] block sm:inline-block">
              appointment
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            Fill in your details below to send a WhatsApp booking request, or call our Ikorodu team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* LEFT: Business Info Card in Deep Blue */}
          <div className="lg:col-span-5 bg-[#032b69] text-white rounded-[32px] p-8 sm:p-10 shadow-xl relative overflow-hidden bg-grid-dots">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38b6ff] block mb-2">
                Clean Am Correct
              </span>
              <h3 className="font-editorial-heading text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3">
                Ikorodu, Lagos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-8">
                Professional cleaning services designed to give your home or business a fresher, cleaner, and more comfortable environment.
              </p>

              <div className="space-y-6 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#38b6ff] shrink-0 border border-white/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-sky-200 font-bold tracking-wider block">Areas Covered</span>
                    <p className="font-semibold text-white mt-0.5">Ikorodu, Lagos, Nigeria</p>
                    <p className="text-[11px] text-slate-300 mt-0.5">Ebute, Agric, Ogolonto, Igbogbo, Town & Lagos Mainland</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#38b6ff] shrink-0 border border-white/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-sky-200 font-bold tracking-wider block">Call or WhatsApp</span>
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="font-bold text-white text-base hover:text-[#38b6ff] transition-colors mt-0.5 block"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#38b6ff] shrink-0 border border-white/10">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-sky-200 font-bold tracking-wider block">Working Hours</span>
                    <p className="font-medium text-white mt-0.5">{siteConfig.operatingHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="mt-10 pt-8 border-t border-white/15">
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-bold uppercase tracking-wider text-xs text-[#032b69] bg-white hover:bg-slate-100 active:scale-95 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#38b6ff]" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-10 border border-slate-200/90 shadow-lg">
            <h3 className="font-editorial-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#032b69] mb-1">
              Tell Us What You Need Cleaned
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-6">
              When you click <strong className="text-[#032b69]">Send via WhatsApp</strong>, it opens WhatsApp with your details so we can give you a quick quote and schedule your clean.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold">Opening WhatsApp...</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your appointment message has been prepared. If WhatsApp didn't open automatically,{' '}
                    <a
                      href={siteConfig.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold"
                    >
                      click here to open WhatsApp directly
                    </a>.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="e.g. Adebayo Ogunlesi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="e.g. 08012345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Custom Cleaning Request">Custom Cleaning Request</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="locationArea" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Area / Estate in Ikorodu
                  </label>
                  <input
                    type="text"
                    id="locationArea"
                    placeholder="e.g. Ebute, Agric, Ogolonto, Town"
                    value={formData.locationArea}
                    onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Time of Day
                  </label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all"
                  >
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Flexible">Flexible / Anytime</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Anything Specific? (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="e.g. 3-bedroom flat, tiled kitchen needs extra scrubbing, or sofas need vacuuming..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#032b69] hover:bg-[#021d45] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#38b6ff]" />
                  <span>Send Booking Request via WhatsApp</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2 font-normal">
                  No online payment needed here. We will chat with you directly on WhatsApp to confirm details.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
