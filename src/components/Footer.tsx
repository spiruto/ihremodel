// -------------------------------------------------------------
// File: app/[locale]/(site)/components/Footer.tsx
'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tHeader = useTranslations('Header');
  const tCommon = useTranslations('Common');
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--brand-ink)] text-[var(--brand-cloud)]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t('aboutTitle', { brandName: tCommon("brand") })}</h3>
            <p className="text-[var(--brand-cloud)]/85">{t('aboutText')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="#services">{tHeader('links.services')}</a></li>
              <li><a className="hover:underline" href="#projects">{t('links.testimonials')}</a></li>
              <li><a className="hover:underline" href="#contact">{tHeader('links.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="#">{t('links.privacy')}</a></li>
              <li><a className="hover:underline" href="#">{t('links.terms')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('connect')}</h3>
            <div className="flex space-x-4">
              <a aria-label="Facebook" className="hover:opacity-80" href="#"><svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12A10 10 0 1010.9 22v-7h-2.1v-3h2.1V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12H17l-.5 3h-2v7A10 10 0 0022 12z" /></svg></a>
              <a aria-label="Instagram" className="hover:opacity-80" href="#"><svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-1.7-1.3-3-3-3H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11 1.5a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10z" /></svg></a>
              <a aria-label="LinkedIn" className="hover:opacity-80" href="#"><svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.3 2.5-2.7 5.1-2.7 5.4 0 6.4 3.6 6.4 8.3V24h-5v-7.3c0-1.7 0-3.8-2.3-3.8-2.3 0-2.7 1.8-2.7 3.7V24H8V8z" /></svg></a>
              <a aria-label="TikTok" className="hover:opacity-80" href="#"><svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M21 8.5a6.6 6.6 0 01-4.1-1.4l-.2-.2v7.1a5.98 5.98 0 11-5.1-5.9v2.9a3.06 3.06 0 00-1-.2 3 3 0 103 3V2h2.5a6.6 6.6 0 004.9 2v2.5z" /></svg></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10 pt-8 text-center text-[var(--brand-cloud)]/80">
        <p>{t('copyright', { year: year, brandName: tCommon("brand") })}</p>
      </div>
    </footer>
  );
}
