// -------------------------------------------------------------
// File: app/[locale]/(site)/components/Financing.tsx
'use client';
import React from 'react';
import { useTR } from '@/hooks/useTR';

export default function Financing() {
  const { t } = useTR('Financing');
  return (
    <section id="financing" className="section-padding text-[var(--brand-ink)]" style={{ background: 'linear-gradient(180deg, var(--brand-teal), var(--brand-char))' }}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <p className="text-lg text-white/85 mt-4 mb-8 max-w-2xl mx-auto">{t('subtitle')}</p>
        <a className="btn bg-white text-[var(--brand-ink)] hover:opacity-95 px-8 py-4 text-lg" href="#contact">{t('cta')}</a>
      </div>
    </section>
  );
}
