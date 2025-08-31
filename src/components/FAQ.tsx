// -------------------------------------------------------------
// File: app/[locale]/(site)/components/FAQ.tsx
'use client';
import React, { useMemo, useRef, useState } from 'react';
import { useTR } from '@/hooks/useTR';
import { useTranslations } from 'next-intl';

type QA = { q: string; a: string };
type Category = { name: string; items: QA[] };

export default function FAQ() {
  const { t, tr } = useTR('FAQ');
  const cta = useTranslations('Common.cta');

  // Backward compatible data: support either FAQ.categories[] or FAQ.items[]
  const categories = tr<Category[] | undefined>('categories');
  const flatItems = tr<QA[] | undefined>('items');

  const data: Category[] = useMemo(() => {
    if (Array.isArray(categories) && categories.length) return categories;
    if (Array.isArray(flatItems) && flatItems.length) {
      return [{ name: 'General', items: flatItems }]; // fallback grouping
    }
    return [];
  }, [categories, flatItems]);

  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const slug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);

  // const copyLink = (id: string) => {
  //   try {
  //     const url = new URL(window.location.href);
  //     url.hash = id;
  //     navigator.clipboard.writeText(url.toString());
  //   } catch { }
  // };

  const setAll = (open: boolean) => {
    const root = listRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLDetailsElement>('details').forEach((d) => (d.open = open));
  };

  const openChat = (q?: string) => {
    const text = q
      ? `Hi! I have a question about: "${q}"`
      : 'Hi! I have a question about your remodeling services.';
    const anyWindow = window as any;
    if (anyWindow?.$crisp) {
      anyWindow.$crisp.push(['do', 'chat:open']);
      anyWindow.$crisp.push(['do', 'message:send', ['text', text]]);
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter across categories
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [data, query]);

  return (
    <section id="faq" className="section-padding bg-[var(--brand-cloud)]">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[var(--brand-ink)]">{t('title')}</h2>
          <p className="mt-3 text-[var(--brand-char)]">
            Browse by topic or{' '}
            <button
              type="button"
              onClick={() => openChat()}
              className="font-semibold text-[var(--brand-teal)] underline-offset-2 hover:underline"
            >
              {cta('chat')}
            </button>
            .
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs…"
              className="w-full rounded-lg border border-[var(--brand-char)]/20 bg-white py-2.5 pl-10 pr-3 text-[var(--brand-ink)] shadow-sm focus:border-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
              aria-label="Search FAQs"
              type="search"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
              width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            >
              <path d="M10 2a8 8 0 015.29 13.71l4 4-1.42 1.42-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
            </svg>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAll(true)}
              className="rounded-lg border border-[var(--brand-char)]/20 bg-white px-3 py-2 text-sm font-medium hover:bg-black/5"
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={() => setAll(false)}
              className="rounded-lg border border-[var(--brand-char)]/20 bg-white px-3 py-2 text-sm font-medium hover:bg-black/5"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Categories & Items */}
        <div ref={listRef} className="space-y-6">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-[var(--brand-char)]/15 bg-white p-6 text-center">
              <p className="text-[var(--brand-char)] mb-3">
                No results for “<span className="font-semibold">{query}</span>”.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="rounded-lg border border-[var(--brand-char)]/20 bg-white px-3 py-2 text-sm font-medium hover:bg-black/5"
                >
                  Clear search
                </button>
                <button type="button" onClick={() => openChat()} className="btn btn-primary text-sm">
                  {cta('chat')}
                </button>
              </div>
            </div>
          )}

          {filtered.map((cat, ci) => {
            const catId = `faq-cat-${slug(cat.name)}-${ci}`;
            return (
              <details key={catId} id={catId} className="group rounded-2xl border border-[var(--brand-char)]/15 bg-white shadow-sm open:shadow-md transition">
                <summary className="flex items-center justify-between cursor-pointer list-none px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 px-3 items-center justify-center rounded-full bg-[var(--brand-teal)]/12 text-[var(--brand-teal)] text-sm font-semibold">
                      {cat.name}
                    </span>
                    <span className="text-sm text-[var(--brand-char)]/80">({cat.items.length})</span>
                  </div>
                  <span className="text-[var(--brand-teal)] transition-transform duration-300 group-open:rotate-180" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                  </span>
                </summary>

                <div className="px-5 pb-5 -mt-1 space-y-4">
                  {cat.items.map((it, i) => {
                    const id = `${catId}-${slug(it.q)}-${i}`;
                    return (
                      <details key={id} id={id} className="group rounded-xl border border-[var(--brand-char)]/10 bg-white/90 shadow-sm">
                        <summary className="flex items-start justify-between cursor-pointer list-none px-4 py-3 gap-3">
                          <span className="text-[var(--brand-ink)] font-medium">{it.q}</span>
                          <div className="flex items-center gap-2">

                            <span
                              className="text-[var(--brand-teal)] transition-transform duration-300 group-open:rotate-180"
                              aria-hidden="true"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                            </span>
                          </div>
                        </summary>
                        <div className="px-4 pb-4 -mt-1">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-char)]/10 to-transparent mb-3" />
                          <p className="text-[var(--brand-char)] leading-relaxed">{it.a}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button type="button" onClick={() => openChat(it.q)} className="btn btn-secondary">
                              {cta('chat')}
                            </button>
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
