// app/[locale]/(site)/components/TrustBadges.tsx
'use client';
import React from 'react';
import { useTR } from '@/hooks/useTR';
import Image from 'next/image';
import Link from 'next/link';

export default function TrustBadges() {
  const { t } = useTR('Header');
  const title = t('badgeRowTitle');
  // const badges = tr<string[]>('badges');

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-xs font-bold text-[var(--brand-char)] uppercase tracking-[0.2em] mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-8 items-center justify-items-center  opacity-90">
          {/* {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-[var(--brand-char)]">
              <span className="inline-block w-8 h-8 bg-[var(--brand-gold)] rounded-full" />
              <span className="font-semibold">{b}</span>
            </div>
          ))} */}
          {/* Yelp Badge */}
          <Link
            href="https://www.yelp.com/biz/imperial-home-remodeling-midland-park"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See our Yelp reviews"
            className="flex items-center gap-2"
          >
            <Image
              src="/yelp-badge.png" // Add official badge in public/
              alt="Yelp"
              width={96}
              height={96}
            />
          </Link>

          {/* Google Customer Reviews Badge */}
          <Link
            href="https://www.google.com/search?q=Imperial+Home+Remodeling+Midland+Park"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See our Google reviews"
            className="flex items-center gap-2"
          >
            <Image
              src="/google-badge.png" // Use Google Customer Reviews badge
              alt="Google Reviews"
              width={96}
              height={96}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
