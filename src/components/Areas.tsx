// -------------------------------------------------------------
// File: app/[locale]/(site)/components/Areas.tsx
'use client';

import React from 'react';
import { useTR } from '@/hooks/useTR';

type StateItem = {
  name: string;
  blurb?: string;
  highlights?: string[];
  examples?: string[];
  counties?: string[];
  servicesFocus?: string[];
  responseTime?: string;
  warranties?: string;
};

export default function Areas() {
  const { t, tr } = useTR('Areas');

  // Safe getters
  const intro = (() => { try { return t('intro'); } catch { return undefined; } })();
  const seoParas = (() => { try { return tr<string[]>('seoParagraphs') || []; } catch { return []; } })();
  const states = (() => { try { return tr<StateItem[]>('states') || []; } catch { return []; } })();

  const openChat = (prefill?: string) => {
    const msg = t('chatPrefill', { area: prefill || t('statesCombined') });
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:open']);
      (window as any).$crisp.push(['do', 'message:send', ['text', msg]]);
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-4xl font-bold">{t('title')}</h2>
          <p className="text-lg text-[var(--brand-char)] mt-4">{t('subtitle')}</p>
          {intro && <p className="mt-3 text-[var(--brand-char)]/90">{intro}</p>}
        </header>

        {/* SEO paragraphs */}
        {seoParas.length > 0 && (
          <div className="mx-auto max-w-5xl rounded-2xl border border-[var(--brand-char)]/10 bg-[var(--brand-cloud)]/60 p-6 md:p-8 mb-10 space-y-4">
            {seoParas.map((p, i) => (
              <p key={i} className="text-[var(--brand-char)] leading-relaxed">{p}</p>
            ))}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button type="button" onClick={() => openChat()} className="btn btn-secondary">
                {t('cta.checkAvailability')}
              </button>
              <a href="#contact" className="btn btn-primary">{t('cta.freeQuote')}</a>
            </div>
          </div>
        )}

        {/* States grid */}
        {states.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {states.map((s, i) => (
              <article
                key={`${s.name}-${i}`}
                className="rounded-2xl border border-[var(--brand-char)]/10 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 p-6 border-b border-[var(--brand-char)]/10">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)]" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" /></svg>
                  </span>
                  <h3 className="text-2xl font-bold">{s.name}</h3>
                </div>

                <div className="p-6 space-y-6">
                  {s.blurb && <p className="text-[var(--brand-char)] leading-relaxed">{s.blurb}</p>}

                  {(s.highlights?.length || s.servicesFocus?.length) ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      {s.highlights?.length ? (
                        <div>
                          <div className="text-sm font-semibold text-[var(--brand-ink)]/90 mb-2">{t('labels.favoritesTitle')}</div>
                          <ul className="grid gap-2">
                            {s.highlights.map((h, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[var(--brand-ink)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 text-[var(--brand-teal)]" aria-hidden="true">
                                  <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l12-12-1.5-1.5z" />
                                </svg>
                                <span className="text-[var(--brand-char)]">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {s.servicesFocus?.length ? (
                        <div>
                          <div className="text-sm font-semibold text-[var(--brand-ink)]/90 mb-2">{t('labels.focusTitle')}</div>
                          <ul className="grid gap-2">
                            {s.servicesFocus.map((h, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[var(--brand-ink)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 text-[var(--brand-gold)]" aria-hidden="true">
                                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                <span className="text-[var(--brand-char)]">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {s.examples?.length ? (
                    <div>
                      <div className="text-sm font-semibold text-[var(--brand-ink)]/90 mb-2">{t('labels.examplesTitle')}</div>
                      <div className="flex flex-wrap gap-2">
                        {s.examples.map((ex, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => openChat(ex)}
                            className="rounded-full border border-[var(--brand-char)]/20 bg-[var(--brand-cloud)]/60 px-3 py-1.5 text-sm text-[var(--brand-ink)] hover:bg-[var(--brand-cloud)]"
                            title={t('aria.askAboutArea', { area: ex })}
                            aria-label={t('aria.askAboutArea', { area: ex })}
                          >
                            {ex}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {s.counties?.length ? (
                    <div>
                      <div className="text-sm font-semibold text-[var(--brand-ink)]/90 mb-2">{t('labels.countiesTitle')}</div>
                      <div className="flex flex-wrap gap-2">
                        {s.counties.map((cName, idx) => (
                          <span key={idx} className="rounded-full border border-[var(--brand-char)]/15 bg-white px-3 py-1.5 text-sm text-[var(--brand-char)]">
                            {cName}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {(s.responseTime || s.warranties) && (
                    <div className="grid gap-3 md:grid-cols-2 bg-[var(--brand-cloud)]/50 rounded-xl p-4 border border-[var(--brand-char)]/10">
                      {s.responseTime && (
                        <p className="text-[var(--brand-ink)]">
                          <strong className="font-semibold">{t('labels.responseTime')} </strong>{s.responseTime}
                        </p>
                      )}

                    </div>
                  )}

                  <div className="pt-2 flex justify-center">
                    <button type="button" onClick={() => openChat(s.name)} className="btn btn-secondary">
                      {t('cta.askAboutState', { state: s.name })}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}


      </div>
    </section>
  );
}
