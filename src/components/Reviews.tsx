// -------------------------------------------------------------
// File: app/[locale]/(site)/components/Reviews.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTR } from '@/hooks/useTR';

type Review = { name: string; location: string; quote: string };

export default function Reviews() {
  const { t, tr } = useTR('Reviews');
  const reviews = tr<Review[]>('list');

  const initials = (fullName: string) =>
    fullName.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

  // --- Mobile carousel state ---
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const snapTo = (idx: number) => {
    const el = trackRef.current?.children[idx] as HTMLElement | undefined;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActive(idx);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const { scrollLeft, clientWidth } = track;
      const center = scrollLeft + clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const r = (child as HTMLElement).getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        const childCenter = r.left - trackRect.left + r.width / 2 + scrollLeft;
        const d = Math.abs(childCenter - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActive(bestIdx);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); snapTo(Math.min(active + 1, reviews.length - 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); snapTo(Math.max(active - 1, 0)); }
  };

  return (
    <section id="reviews" className="section-padding bg-white relative overflow-hidden">
      {/* Soft background aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(800px 400px at 10% -10%, rgba(226,192,68,.18), transparent 60%), radial-gradient(700px 300px at 90% 10%, rgba(88,123,127,.12), transparent 60%)'
        }}
      />

      <div className="container mx-auto relative">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[var(--brand-ink)]">{t('title')}</h2>
          <p className="text-lg text-[var(--brand-char)] mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* --- Mobile carousel (sm) --- */}
        <div className="md:hidden relative">
          {/* Track (scrollbar hidden via Tailwind arbitrary variants; no styled-jsx) */}
          <div
            ref={trackRef}
            role="listbox"
            aria-label={t('title')}
            tabIndex={0}
            onKeyDown={onKey}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 pb-2
                       [scrollbar-width:none] [-ms-overflow-style:none]
                       [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: 'smooth' }}
          >
            {reviews.map((r, i) => (
              <article
                key={`${r.name}-${i}`}
                role="option"
                aria-selected={active === i}
                className="group relative min-w-[85%] snap-center rounded-2xl border border-[var(--brand-char)]/10
                           bg-[var(--brand-cloud)]/60 backdrop-blur-sm shadow-sm hover:shadow-lg
                           transition-all duration-300"
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-teal)] to-[var(--brand-gold)] opacity-80" />
                <div className="p-6">
                  <header className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-teal)]/15 text-[var(--brand-teal)] font-bold">
                      {initials(r.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--brand-ink)] truncate">{r.name}</p>
                      <p className="flex items-center gap-1 text-sm text-[var(--brand-char)]/90">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--brand-teal)]/80 shrink-0" aria-hidden="true">
                          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                        </svg>
                        <span className="truncate">{r.location}</span>
                      </p>
                    </div>
                  </header>

                  <blockquote className="relative text-[var(--brand-ink)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="absolute -left-1 -top-1 text-[var(--brand-gold)] opacity-70" aria-hidden="true">
                      <path d="M7.2 11C5.4 11 4 9.6 4 7.8S5.4 4.6 7.2 4.6 10.3 6 10.3 7.8c0 1-.5 1.9-1.3 2.4.8.5 1.3 1.4 1.3 2.4 0 1.8-1.4 3.2-3.1 3.2C5.4 15.8 4 14.4 4 12.6h2.4c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9zM16.8 11c-1.8 0-3.2-1.4-3.2-3.2S15 4.6 16.8 4.6s3.1 1.4 3.1 3.2c0 1-.5 1.9-1.3 2.4.8.5 1.3 1.4 1.3 2.4 0 1.8-1.4 3.2-3.1 3.2-1.8 0-3.2-1.4-3.2-3.2h2.4c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9z" />
                    </svg>
                    {/* use <q> instead of a template literal with smart quotes */}
                    <p className="pl-6 leading-relaxed"><q>{r.quote}</q></p>
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-char)]/15 to-transparent" />
                  </blockquote>

                  <div className="mt-4 flex items-center gap-1 text-[var(--brand-gold)]/90" aria-hidden="true">
                    {[...Array(5)].map((_, k) => (
                      <svg key={k} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Dots & Arrows (mobile only) */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => snapTo(Math.max(active - 1, 0))}
              className="rounded-full bg-white/80 border border-black/10 px-3 py-1.5 text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
              aria-label="Previous review"
            >
              ‹
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => snapTo(i)}
                  className={`h-2.5 w-2.5 rounded-full ${i === active ? 'bg-[var(--brand-teal)]' : 'bg-black/20 hover:bg-black/30'}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => snapTo(Math.min(active + 1, reviews.length - 1))}
              className="rounded-full bg-white/80 border border-black/10 px-3 py-1.5 text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
              aria-label="Next review"
            >
              ›
            </button>
          </div>
        </div>

        {/* --- Desktop grid (md+) --- */}
        <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={`${r.name}-${i}`}
              className="group relative rounded-2xl border border-[var(--brand-char)]/10 bg-[var(--brand-cloud)]/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-teal)] to-[var(--brand-gold)] opacity-80" />
              <div className="p-6">
                <header className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-teal)]/15 text-[var(--brand-teal)] font-bold">
                    {initials(r.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--brand-ink)] truncate">{r.name}</p>
                    <p className="flex items-center gap-1 text-sm text-[var(--brand-char)]/90">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--brand-teal)]/80 shrink-0" aria-hidden="true">
                        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                      </svg>
                      <span className="truncate">{r.location}</span>
                    </p>
                  </div>
                </header>

                <blockquote className="relative text-[var(--brand-ink)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="absolute -left-1 -top-1 text-[var(--brand-gold)] opacity-70" aria-hidden="true">
                    <path d="M7.2 11C5.4 11 4 9.6 4 7.8S5.4 4.6 7.2 4.6 10.3 6 10.3 7.8c0 1-.5 1.9-1.3 2.4.8.5 1.3 1.4 1.3 2.4 0 1.8-1.4 3.2-3.1 3.2-1.8 0-3.2-1.4-3.2-3.2h2.4c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9zM16.8 11c-1.8 0-3.2-1.4-3.2-3.2S15 4.6 16.8 4.6s3.1 1.4 3.1 3.2c0 1-.5 1.9-1.3 2.4.8.5 1.3 1.4 1.3 2.4 0 1.8-1.4 3.2-3.1 3.2-1.8 0-3.2-1.4-3.2-3.2h2.4c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9z" />
                  </svg>
                  <p className="pl-6 leading-relaxed"><q>{r.quote}</q></p>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-char)]/15 to-transparent" />
                </blockquote>

                <div className="mt-4 flex items-center gap-1 text-[var(--brand-gold)]/90" aria-hidden="true">
                  {[...Array(5)].map((_, k) => (
                    <svg key={k} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
