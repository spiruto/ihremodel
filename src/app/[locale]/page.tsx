// File: app/[locale]/(site)/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Header from "@/components/Header";
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import Projects from '@/components/Projects';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Areas from '@/components/Areas';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LocaleSwitcherFab from '@/components/LocaleSwitcherFab';

export default function Page() {
  const tCommon = useTranslations('Common');

  useEffect(() => {
    // Smooth scroll respecting reduced motion
    const links = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
    const handlers = links.map((a) => {
      const h = (e: Event) => {
        const id = a.getAttribute('href');
        if (!id || id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        e.preventDefault();
        el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      };
      a.addEventListener('click', h);
      return [a, h] as const;
    });
    return () => handlers.forEach(([a, h]) => a.removeEventListener('click', h as EventListener));
  }, []);

  return (
    <div className="bg-[var(--brand-cloud)] text-[var(--brand-ink)] overflow-x-clip">
      <a href="#main" className="skip-link">{tCommon('skipToContent')}</a>
      <Header />
      <main id="main">
        <Hero />
        <TrustBadges />
        <Services />
        <WhyUs />
        <Process />
        <Projects />
        <Reviews />
        <FAQ />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <LocaleSwitcherFab />
    </div>
  );
}
