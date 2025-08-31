// -------------------------------------------------------------
// File: app/[locale]/(site)/components/WhyUs.tsx
'use client';
import React from 'react';
import { useTR } from '@/hooks/useTR';

export default function WhyUs() {
  const { t, tr } = useTR('WhyUs');
  const features = tr<{ title: string; desc: string }[]>('features');
  const stats = tr<{
    years: { value: string; label: string };
    projects: { value: string; label: string };
    rating: { value: string; label: string };
  }>('stats');

  const Icon = ({ i }: { i: number }) => {
    const n = i % 4;
    const common = 'w-6 h-6';
    if (n === 0) {
      // Shield
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l8 4v6c0 5.2-3.8 8.2-8 10-4.2-1.8-8-4.8-8-10V6l8-4z" />
        </svg>
      );
    }
    if (n === 1) {
      // Clock
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1010 10A10.012 10.012 0 00112 2zm1 5h-2v6l5 3 .9-1.8-3.9-2.3z" />
        </svg>
      );
    }
    if (n === 2) {
      // User
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-4.1 0-8 2.1-8 6v2h16v-2c0-3.9-3.9-6-8-6z" />
        </svg>
      );
    }
    // List
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 6h16v2H4zm0 5h12v2H4zm0 5h16v2H4z" />
      </svg>
    );
  };

  const Stat = ({ value, label }: { value: string; label: string }) => (
    <div className="rounded-2xl border border-[var(--brand-char)]/10 bg-white shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-teal)] to-[var(--brand-gold)] rounded-t-2xl" />
      <div className="p-6 text-center">
        <p className="text-4xl sm:text-5xl font-black text-[var(--brand-gold)] leading-none">{value}</p>
        <p className="text-base sm:text-lg font-medium text-[var(--brand-char)] mt-2">{label}</p>
      </div>
    </div>
  );

  return (
    <section id="why-us" className="section-padding bg-[var(--brand-cloud)]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--brand-ink)]">{t('title')}</h2>
          <p className="text-lg text-[var(--brand-char)] mt-4">{t('subtitle')}</p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={`${f.title}-${i}`}
              className="group rounded-2xl border border-[var(--brand-char)]/10 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-teal)]/12 text-[var(--brand-teal)]">
                    <Icon i={i} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-[var(--brand-ink)]">{f.title}</h3>
                    <p className="mt-1 text-[var(--brand-char)] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat value={stats.years.value} label={stats.years.label} />
          <Stat value={stats.projects.value} label={stats.projects.label} />
          <Stat value={stats.rating.value} label={stats.rating.label} />
        </div>
      </div>
    </section>
  );
}
