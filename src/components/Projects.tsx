// app/[locale]/(site)/components/Projects.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTR } from '@/hooks/useTR';
import Image from 'next/image';

type Slide = { image: string; alt?: string; caption?: string };
type ProjectItem = {
  title?: string;
  caption: string;
  desc?: string;
  slides?: Slide[];
  tags?: string[];
};

export default function Projects() {
  const { t, tr } = useTR('Projects');
  const items = tr<ProjectItem[]>('items');

  const projects = useMemo(() => {
    return items.map((it, i) => {
      const fallback = `https://picsum.photos/seed/project-${i}/1600/1200`;
      const slides = it.slides?.length
        ? it.slides
        : [{ image: fallback, alt: it.caption, caption: it.caption }];
      return {
        title: it.title ?? it.caption,
        caption: it.caption,
        desc: it.desc ?? it.caption,
        slides,
        tags: it.tags ?? []
      };
    });
  }, [items]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const openModal = (projectIndex: number, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setActiveProject(projectIndex);
    setActiveSlide(0);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setActiveProject(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'ArrowRight') { nextSlide(); return; }
      if (e.key === 'ArrowLeft') { prevSlide(); return; }
      if (e.key === 'Home') { setActiveSlide(0); return; }
      if (e.key === 'End') {
        const total = projects[activeProject!].slides.length;
        setActiveSlide(total - 1);
        return;
      }
      if (e.key === 'Tab') trapFocus(e);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);

    // initial focus into modal (avoid expression-only line)
    const closeBtn = dialogRef.current?.querySelector<HTMLButtonElement>('[data-close]');
    if (closeBtn) closeBtn.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeProject, projects]);

  const trapFocus = (e: KeyboardEvent) => {
    const root = dialogRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
    if (focusables.length === 0) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
  };

  const nextSlide = () => {
    if (activeProject == null) return;
    const total = projects[activeProject].slides.length;
    setActiveSlide((s) => (s + 1) % total);
  };
  const prevSlide = () => {
    if (activeProject == null) return;
    const total = projects[activeProject].slides.length;
    setActiveSlide((s) => (s - 1 + total) % total);
  };

  const startX = useRef(0);
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };
  const onTileKey = (i: number) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(i, e.currentTarget); }
  };

  useEffect(() => {
    if (!isOpen || activeProject == null) return;
    const thumbs = thumbsRef.current;
    if (!thumbs) return;
    const el = thumbs.querySelector<HTMLButtonElement>(`[data-thumb-idx="${activeSlide}"]`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const tr = thumbs.getBoundingClientRect();
    if (r.left < tr.left || r.right > tr.right) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeSlide, isOpen, activeProject]);

  const Chevron = ({ dir = 'left' as 'left' | 'right' }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {dir === 'left'
        ? <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        : <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />}
    </svg>
  );

  return (
    <section id="projects" className="section-padding bg-[var(--brand-cloud)] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(900px 400px at 10% -10%, rgba(226,192,68,.14), transparent 60%), radial-gradient(800px 300px at 100% 0%, rgba(88,123,127,.10), transparent 60%)'
        }}
      />

      <div className="container mx-auto relative">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">{t('title')}</h2>
          <p className="text-lg text-[var(--brand-char)] mt-4 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <figure
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Open project: ${p.title}`}
              onKeyDown={onTileKey(i)}
              onClick={(e) => openModal(i, e.currentTarget as HTMLElement)}
              className="group relative overflow-hidden rounded-2xl border border-[var(--brand-char)]/10 bg-white/80 backdrop-blur-sm
                         shadow-sm hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-[var(--brand-teal)]/30"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-teal)] to-[var(--brand-gold)] opacity-90" />
              <div
                className="w-full aspect-square bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${p.slides[0].image})` }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-semibold drop-shadow">{p.caption}</span>
                  <span className="inline-flex items-center gap-1 text-xs bg-white/90 text-[var(--brand-ink)] px-2 py-1 rounded-full shadow">
                    <Chevron dir="right" />
                    View gallery
                  </span>
                </div>
                {p.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((tag, k) => (
                      <span key={k} className="text-[10px] tracking-wide uppercase bg-black/50 text-white/90 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {isOpen && activeProject !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} aria-hidden="true" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="relative z-[81] max-w-6xl w-[94vw] md:w-[88vw] bg-white rounded-2xl shadow-xl border border-[var(--brand-char)]/10 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-[var(--brand-char)]/10">
              <div className="min-w-0">
                <h3 id="project-title" className="text-xl md:text-2xl font-bold text-[var(--brand-ink)] truncate">
                  {projects[activeProject].title}
                </h3>
                <p className="text-sm text-[var(--brand-char)] truncate">{projects[activeProject].desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm text-[var(--brand-char)]">
                  {activeSlide + 1} / {projects[activeProject].slides.length}
                </span>
                <button
                  type="button"
                  data-close
                  onClick={closeModal}
                  className="rounded-md p-2 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
                  aria-label="Close dialog"
                  title="Close"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative bg-[var(--brand-cloud)]">
              <div className="relative w-full aspect-video">
                {projects[activeProject].slides.map((s, idx) => (
                  <div
                    key={idx}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} of ${projects[activeProject].slides.length}`}
                    className={`absolute inset-0 transition-opacity duration-300 ${idx === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  >
                    <Image
                      src={s.image}
                      alt={s.alt || projects[activeProject].title || 'Project image'}
                      fill
                      sizes="(max-width: 768px) 94vw, 88vw"
                      className="object-cover pointer-events-none"
                      priority={idx === activeSlide}
                    />
                  </div>
                ))}

                <div className="absolute inset-0 z-10" onPointerDown={onPointerDown} onPointerUp={onPointerUp} aria-hidden="true" />
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 border border-black/10 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)] z-20"
                  aria-label="Previous image"
                  title="Previous"
                >
                  <Chevron dir="left" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 border border-black/10 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)] z-20"
                  aria-label="Next image"
                  title="Next"
                >
                  <Chevron dir="right" />
                </button>
              </div>

              {projects[activeProject].slides[activeSlide]?.caption && (
                <div className="px-4 py-3 md:px-6 md:py-4 text-[var(--brand-char)] border-t border-[var(--brand-char)]/10">
                  {projects[activeProject].slides[activeSlide].caption}
                </div>
              )}

              <div
                ref={thumbsRef}
                className="flex items-center gap-3 overflow-x-auto px-4 pb-4 md:px-6 md:pb-5
                           [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Project thumbnails"
              >
                {projects[activeProject].slides.map((s, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={idx === activeSlide}
                    aria-label={`View image ${idx + 1}`}
                    data-thumb-idx={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`relative h-16 w-24 rounded-md overflow-hidden border transition
                      ${idx === activeSlide ? 'border-[var(--brand-teal)] ring-2 ring-[var(--brand-teal)]/30' : 'border-black/10 hover:border-black/30'}`}
                  >
                    <Image src={s.image} alt={s.alt || `Thumbnail ${idx + 1}`} fill sizes="96px" className="object-cover" />
                    {idx === activeSlide && (
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-teal)]/15 to-transparent" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 px-4 pb-5">
                {projects[activeProject].slides.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`h-2.5 w-2.5 rounded-full ${idx === activeSlide ? 'bg-[var(--brand-teal)]' : 'bg-black/20 hover:bg-black/30'}`}
                    onClick={() => setActiveSlide(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="px-4 py-3 md:px-6 md:py-4 border-t border-[var(--brand-char)]/10 flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="btn btn-secondary">Close</button>
              <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
