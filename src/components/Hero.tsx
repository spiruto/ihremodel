// app/[locale]/(site)/components/Hero.tsx
'use client';
import React from 'react';
import { useTR } from '@/hooks/useTR';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const { t } = useTR('Hero');
  const ctas = useTranslations('Common.cta');
  const states = t('states');

  const openCrisp = () => {
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:open']);
      (window as any).$crisp.push([
        'do',
        'message:send',
        ['text', 'Hi, I am interested in your services.']
      ]);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop)'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(30,32,25,.65), rgba(57,62,65,.55))'
        }}
      />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tight text-white">
          {t('heading')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-[var(--brand-cloud)]/95 mb-8">
          {t('subheading', { states })}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={openCrisp}
            className="btn btn-primary px-8 py-4 text-lg"
          >
            {ctas('chat')}
          </button>
          <a
            className="btn btn-secondary px-8 py-4 text-lg"
            href="#projects"
          >
            {ctas('secondary')}
          </a>
        </div>
      </div>
    </section>
  );
} 
