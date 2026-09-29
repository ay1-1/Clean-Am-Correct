import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TopTrustBar } from './components/TopTrustBar';
import { EditorialIntro } from './components/EditorialIntro';
import { ServicesSection } from './components/ServicesSection';
import { WhatWeCleanGallery } from './components/WhatWeCleanGallery';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { BespokeConsultation } from './components/BespokeConsultation';
import { WhyCleanMatters } from './components/WhyCleanMatters';
import { OurApproach } from './components/OurApproach';
import { WhyCleanAmCorrect } from './components/WhyCleanAmCorrect';
import { TestimonialSection } from './components/TestimonialSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Subtle, restrained AOS setup matching high-end editorial agency standards
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-[#38b6ff] selection:text-white">
      {/* Editorial Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} darkHero={true} />

      <main className="flex-grow">
        {/* ================= 1. HERO SECTION WITH 3D LAYERED CAROUSEL ================= */}
        <div id="home">
          <Hero
            onExploreServices={() => handleNavigate('services')}
            onOpenBooking={() => handleNavigate('contact')}
          />
        </div>

        {/* ================= 2. TOP TRUST INFORMATION STRIP (SCREENSHOT 2) ================= */}
        <TopTrustBar />

        {/* ================= 3. EDITORIAL ASYMMETRIC INTRODUCTION ================= */}
        <div data-aos="fade-up">
          <EditorialIntro />
        </div>

        {/* ================= 4. CURATED SERVICES ASYMMETRIC GRID (SCREENSHOTS 2, 3, 4) ================= */}
        <div data-aos="fade-up">
          <ServicesSection />
        </div>

        {/* ================= 5. WHAT WE CLEAN HORIZONTAL GALLERY CAROUSEL (SCREENSHOT 5) ================= */}
        <div data-aos="fade-up">
          <WhatWeCleanGallery />
        </div>

        {/* ================= 6. INTERACTIVE BEFORE & AFTER COMPARISON SLIDER ================= */}
        <div data-aos="fade-up">
          <BeforeAfterSection />
        </div>

        {/* ================= 7. BESPOKE CONSULTATION CALLOUT (SCREENSHOT 7) ================= */}
        <div data-aos="fade-up">
          <BespokeConsultation />
        </div>

        {/* ================= 8. WHY A CLEAN SPACE MATTERS (WELLNESS & SCIENCE) ================= */}
        <div data-aos="fade-up">
          <WhyCleanMatters />
        </div>

        {/* ================= 9. OUR APPROACH (01, 02, 03, 04 STAGGERED WORKFLOW) ================= */}
        <div data-aos="fade-up">
          <OurApproach />
        </div>

        {/* ================= 10. WHY CLEAN AM CORRECT (LARGE TYPOGRAPHY PILLARS) ================= */}
        <div data-aos="fade-up">
          <WhyCleanAmCorrect />
        </div>

        {/* ================= 11. CLIENT STORIES / TESTIMONIALS (SCREENSHOT 6) ================= */}
        <div data-aos="fade-up">
          <TestimonialSection />
        </div>

        {/* ================= 12. ABOUT US (STORY & PHILOSOPHY) ================= */}
        <div data-aos="fade-up">
          <AboutSection />
        </div>

        {/* ================= 13. DIRECT DISPATCH & WHATSAPP BOOKING FORM ================= */}
        <div data-aos="fade-up">
          <ContactSection />
        </div>

        {/* ================= 14. DRAMATIC FINAL CALL TO ACTION ================= */}
        <div data-aos="fade-up">
          <CTASection />
        </div>
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Dark Luxury Footer (Screenshot 8) */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
