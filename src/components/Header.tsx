


// -------------------------------------------------------------
// File: app/[locale]/(site)/components/Header.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const tCommon = useTranslations('Common');
  const tHeader = useTranslations('Header');
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
  }, [open]);

  const links = [
    { href: '#services', label: tHeader('links.services') },
    { href: '#why-us', label: tHeader('links.whyUs') },
    { href: '#process', label: tHeader('links.process') },
    { href: '#projects', label: tHeader('links.projects') },
    { href: '#reviews', label: tHeader('links.reviews') }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 header-blur shadow-sm ">
      <nav className="container mx-auto flex items-center justify-between px-6 py-3 ">
        <Link
          aria-label={tCommon('aria.home')}
          href="/"
          className="flex items-center gap-3"
        >
          <div className="relative sm:h-20 h-12 w-30 rounded-md border border-black/80 ">   {/* explicit size */}
            <Image
              alt="Imperial Home Remodeling Logo"
              src="/logo.webp"
              fill
              sizes="160px"                      // or a responsive sizes string
              className="object-contain bg-black/80 p-1"
              priority
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} className="text-base font-medium hover:text-[var(--brand-teal)]" href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <Link href="#contact" className="btn btn-primary hidden lg:inline-flex">{tCommon('cta.primary')}</Link>

        <button
          aria-expanded={open}
          aria-controls="mobileNav"
          aria-label={open ? tCommon('aria.closeMenu') : tCommon('aria.openMenu')}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-[var(--brand-ink)] z-[51] p-2 rounded-md"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      <div
        id="mobileNav"
        ref={navRef}
        data-open={open}
        className="lg:hidden absolute inset-x-0 top-full z-50 border-t border-[var(--brand-char)]/10 bg-white shadow-md
        origin-top scale-y-0 opacity-0 pointer-events-none
        transition-transform duration-200 ease-out data-[open=true]:scale-y-100 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto"
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-2" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}

        </div>
      </div>
    </header>
  );
}
