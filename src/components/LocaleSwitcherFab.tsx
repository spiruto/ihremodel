// app/[locale]/(site)/components/LocaleSwitcherFab.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

type LocaleCode = 'en' | 'es';

const LOCALES: { code: LocaleCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
];

export default function LocaleSwitcherFab() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const currentLocale = useLocale() as LocaleCode;
  const rawPathname = usePathname() || '/';
  const pathname = useMemo(() => rawPathname.replace(/^\/(en|es)(?=\/|$)/, ''), [rawPathname]);
  const searchParams = useSearchParams();

  // Close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const switchTo = (nextLocale: LocaleCode) => {
    const qs = searchParams.toString();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const base = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const href = qs ? `${base}?${qs}${hash}` : `${base}${hash}`;
    router.replace(href, { locale: nextLocale });
    setOpen(false);
  };

  const active = LOCALES.find(l => l.code === currentLocale);

  return (
    <div ref={containerRef} className="fixed left-4 bottom-4 z-[70]">
      <div className="relative">
        {/* FAB */}
        <button
          onClick={() => setOpen(v => !v)}
          className="rounded-full shadow-lg px-4 py-3 text-sm font-semibold
                     bg-[var(--brand-gold)] text-[var(--brand-ink)]
                     hover:brightness-95 active:scale-[0.98] transition
                     flex items-center gap-2"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span aria-hidden className="text-base leading-none">{active?.flag ?? '🌐'}</span>
          <span>{(active?.code ?? 'en').toUpperCase()}</span>
        </button>

        {/* Drop-up menu */}
        {open && (
          <div
            role="menu"
            className="absolute left-0 bottom-full mb-2 w-48 rounded-xl overflow-hidden
                       border border-black/10 bg-white/95 backdrop-blur-md shadow-xl z-[90]
                       motion-safe:animate-localeFadeUp"
          >
            {LOCALES.map((l) => {
              const isActive = l.code === currentLocale;
              return (
                <button
                  key={l.code}
                  onClick={() => switchTo(l.code)}
                  role="menuitemradio"
                  aria-checked={isActive}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left
                              hover:bg-black/5 focus:outline-none
                              ${isActive ? 'bg-black/[0.04]' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg leading-none" aria-hidden>{l.flag}</span>
                    <span className="text-sm text-[var(--brand-ink)]">{l.label}</span>
                  </span>
                  {isActive && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
                      aria-hidden className="text-[var(--brand-teal)]">
                      <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
