// -------------------------------------------------------------
// File: app/[locale]/(site)/components/Process.tsx
'use client';

import React from 'react';
import { useTR } from '@/hooks/useTR';

type Step = { n: string; title: string; desc: string };

export default function Process() {
  const { t, tr } = useTR('Process');
  const steps = tr<Step[]>('steps');

  const Icon = ({ idx }: { idx: number }) => {
    const i = idx % 4;
    if (i === 0) return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l7 6v12H5V8l7-6zm0 2.2L7 8h10l-5-3.8z" />
      </svg>
    );
    if (i === 1) return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3H5a2 2 0 00-2 2v12a2 2 0 002 2h5l2 2 2-2h5a2 2 0 002-2V5a2 2 0 00-2-2zm-2 9H7v-2h10v2z" />
      </svg>
    );
    if (i === 2) return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5 4h14v2H5V4zm1 4h12l-1.2 10.1a2 2 0 01-2 1.9H9.2a2 2 0 01-2-1.9L6 8zm3 2v6h2v-6H9zm4 0v6h2v-6h-2z" />
      </svg>
    );
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
      </svg>
    );
  };

  const Card = ({ step, idx }: { step: Step; idx: number }) => (
    <article
      tabIndex={0}
      className="group relative rounded-2xl border border-[var(--brand-char)]/10 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-[var(--brand-teal)]/20"
    >
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-teal)] to-[var(--brand-gold)] opacity-85" />
      <div className="p-6">
        <header className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-gold)]/20 text-[var(--brand-ink)] font-extrabold text-lg">
            {step.n}
          </span>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
              <Icon idx={idx} />
            </span>
            {step.title}
          </h3>
        </header>
        <p className="text-[var(--brand-char)] mt-3 leading-relaxed">{step.desc}</p>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-2 h-2 rounded-full blur-sm opacity-40"
        style={{ background: 'linear-gradient(90deg, rgba(226,192,68,.45), rgba(88,123,127,.35))' }}
      />
    </article>
  );

  return (
    <section id="process" className="section-padding bg-white relative overflow-hidden">
      {/* Soft decorative aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(800px 350px at 15% -10%, rgba(226,192,68,.16), transparent 60%), radial-gradient(700px 300px at 85% 0%, rgba(88,123,127,.12), transparent 60%)'
        }}
      />

      <div className="container mx-auto relative">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">{t('title')}</h2>
          <p className="text-lg text-[var(--brand-char)] mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* MOBILE: single column list (only mobile) */}
        <div className="md:hidden space-y-6">
          {steps.map((s, i) => (
            <Card key={`m-${i}`} step={s} idx={i} />
          ))}
        </div>

        {/* DESKTOP: alternating timeline (only md+) */}
        <div className="hidden md:block relative mt-4">
          {/* center connector */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-full w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(0,0,0,.08) 15%, rgba(0,0,0,.08) 85%, transparent)'
            }}
          />
          <ol className="space-y-16">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li key={`d-${i}`} className="relative grid grid-cols-2 gap-10 items-start">
                  {/* connector dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 top-6 h-4 w-4 rounded-full bg-[var(--brand-gold)] ring-4 ring-white"
                  />
                  <div className={left ? 'pr-10' : 'opacity-0 pointer-events-none h-0'}>{left && <Card step={s} idx={i} />}</div>
                  <div className={!left ? 'pl-10' : 'opacity-0 pointer-events-none h-0'}>{!left && <Card step={s} idx={i} />}</div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
