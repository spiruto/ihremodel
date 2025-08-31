// -------------------------------------------------------------
// File: app/[locale]/(site)/components/Services.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTR } from '@/hooks/useTR';

type Card = { title: string; desc: string; cta: string; img: string };

export default function Services() {
  const { t, tr } = useTR('Services');
  const cards = tr<Card[]>('cards');

  // --- Crisp: open chat with prefilled message ---
  const openCrispFor = (service: string) => {
    const msg = `Hi! I'm interested in ${service}. Can I get a free consultation and quote?`;
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:open']);
      (window as any).$crisp.push(['do', 'message:send', ['text', msg]]);
      return;
    }
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onKey = (service: string, e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCrispFor(service);
    }
  };

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
      let bestIdx = 0, bestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const r = (child as HTMLElement).getBoundingClientRect();
        const tr = track.getBoundingClientRect();
        const childCenter = r.left - tr.left + r.width / 2 + scrollLeft;
        const d = Math.abs(childCenter - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActive(bestIdx);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const onKeyTrack = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); snapTo(Math.min(active + 1, cards.length - 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); snapTo(Math.max(active - 1, 0)); }
  };

  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* soft aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        // style={{
        //   background:
        //     'radial-gradient(900px 400px at 0% -10%, rgba(226,192,68,.16), transparent 60%), radial-gradient(700px 300px at 100% 0%, rgba(88,123,127,.12), transparent 60%)'
        // }}
      />

      <div className="container mx-auto relative">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">{t('title')}</h2>
          <p className="text-lg text-[var(--brand-char)] mt-4 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* --- Mobile carousel (sm) --- */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            role="listbox"
            aria-label={t('title')}
            tabIndex={0}
            onKeyDown={onKeyTrack}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 pb-2
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: 'smooth' }}
          >
            {cards.map((c, i) => (
              <article
                key={i}
                role="option"
                aria-selected={active === i}
                onClick={() => openCrispFor(c.title)}
                onKeyDown={(e) => onKey(c.title, e)}
                tabIndex={0}
                className="group relative min-w-[85%] snap-center rounded-2xl overflow-hidden cursor-pointer
                           border border-[var(--brand-char)]/10 bg-white shadow-sm hover:shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-[var(--brand-teal)]/30"
                aria-label={`Open chat about ${c.title}`}
              >
                {/* top accent */}
                {/* <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-teal)] to-[var(--brand-gold)] opacity-80" /> */}
                {/* media */}
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                  style={{ backgroundImage: `url(${c.img})` }} /* <- no window usage */
                  aria-hidden="true"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    {/* icon */}
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l7 6v12H5V8l7-6zm0 2.2L7 8h10l-5-3.8z" />
                      </svg>
                    </span>
                    {c.title}
                  </h3>
                  <p className="text-[var(--brand-char)] mb-4">{c.desc}</p>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); openCrispFor(c.title); }}
                    className="inline-flex items-center font-bold text-[var(--brand-teal)] hover:underline"
                    aria-label={`Chat about ${c.title}`}
                  >
                    {c.cta}
                   
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Dots & arrows */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => snapTo(Math.max(active - 1, 0))}
              className="rounded-full bg-white/80 border border-black/10 px-3 py-1.5 text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
              aria-label="Previous service"
            >
              ‹
            </button>
            <div className="flex items-center gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to service ${i + 1}`}
                  onClick={() => snapTo(i)}
                  className={`h-2.5 w-2.5 rounded-full ${i === active ? 'bg-[var(--brand-teal)]' : 'bg-black/20 hover:bg-black/30'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => snapTo(Math.min(active + 1, cards.length - 1))}
              className="rounded-full bg-white/80 border border-black/10 px-3 py-1.5 text-sm shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
              aria-label="Next service"
            >
              ›
            </button>
          </div>
        </div>

        {/* --- Desktop grid (md+) --- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <article
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => openCrispFor(c.title)}
              onKeyDown={(e) => onKey(c.title, e)}
              className="group bg-white rounded-2xl overflow-hidden border border-[var(--brand-char)]/10 shadow-sm hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-[var(--brand-teal)]/30"
              aria-label={`Open chat about ${c.title}`}
            >
              {/* <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-teal)] to-[var(--brand-gold)] opacity-80" /> */}
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                style={{ backgroundImage: `url(${c.img})` }}
                aria-hidden="true"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l7 6v12H5V8l7-6zm0 2.2L7 8h10l-5-3.8z" />
                    </svg>
                  </span>
                  {c.title}
                </h3>
                <p className="text-[var(--brand-char)] mb-4">{c.desc}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); openCrispFor(c.title); }}
                  className="inline-flex items-center font-bold text-[var(--brand-teal)] hover:underline"
                  aria-label={`Chat about ${c.title}`}
                >
                  {c.cta}

                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
