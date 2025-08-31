// app/[locale]/(site)/components/Contact.tsx
'use client';

import React from 'react';
import { useTR } from '@/hooks/useTR';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, CONTACT_SERVICES } from '@/lib/schemas/contact';
import { z } from 'zod';

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t, tr } = useTR('Contact');
  const [status, setStatus] = React.useState<'idle' | 'ok' | 'error'>('idle');

  // Services list from messages (fallback to CONTACT_SERVICES)
  const services = React.useMemo(() => {
    const list = tr<string[]>('form.services');
    return Array.isArray(list) && list.length ? list : CONTACT_SERVICES;
  }, [tr]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',     // optional in schema, safe as empty string
      zip: '',
      workType: undefined,
      message: '',
      consent: false,
      company: ''    // honeypot (optional in schema)
    }
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus('idle');
    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('ok');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-[var(--brand-cloud)]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: business info */}
          <div>
            <h2 className="text-4xl font-bold">{t('title')}</h2>
            <p className="text-lg text-[var(--brand-char)] mt-4 mb-8 max-w-md">{t('subtitle')}</p>
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-lg">
                <span className="text-[var(--brand-teal)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.3 15.3 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2c1.2.5 2.5.8 3.9.8a1 1 0 011 1v3.5a1 1 0 01-1 1C10.1 22.4 1.6 13.9 1.6 3a1 1 0 011-1H6a1 1 0 011 1c0 1.4.3 2.7.8 3.9a1 1 0 01-.2 1.1L6.6 10.8z" /></svg>
                </span>
                <a href="tel:12015460083">(201) 546-0083</a> &nbsp;|&nbsp; <a href="tel:12144679319">(214) 467-9319</a>
              </p>
              <p className="flex items-center gap-3 text-lg">
                <span className="text-[var(--brand-teal)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7 2 3 6 3 11c0 7 9 11 9 11s9-4 9-11c0-5-4-9-9-9zm0 11.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" /></svg>
                </span>
                420 Godwin Ave, Midland Park, NJ 07432, USA
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-[var(--brand-char)]/10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Honeypot */}
              <input
                type="text"
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...register('company')}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium" htmlFor="fullName">{t('form.name')}</label>
                  <input
                    id="fullName"
                    {...register('fullName')}
                    required
                    autoComplete="name"
                    className="mt-1 block w-full rounded-md border-[var(--brand-char)]/20 shadow-sm focus:border-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium" htmlFor="phone">{t('form.phone')}</label>
                  <input
                    id="phone"
                    {...register('phone')}
                    autoComplete="tel"
                    className="mt-1 block w-full rounded-md border-[var(--brand-char)]/20 shadow-sm focus:border-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium" htmlFor="email">{t('form.email')}</label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    {...register('email')}
                    className="mt-1 block w-full rounded-md border-[var(--brand-char)]/20 shadow-sm focus:border-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium" htmlFor="zip">{t('form.zip')}</label>
                  <input
                    id="zip"
                    required
                    inputMode="numeric"
                    {...register('zip')}
                    className="mt-1 block w-full rounded-md border-[var(--brand-char)]/20 shadow-sm focus:border-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
                  />
                  {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium" htmlFor="workType">{t('form.service')}</label>
                  <select
                    id="workType"
                    required
                    {...register('workType')}
                    className="mt-1 block w-full rounded-md border-[var(--brand-char)]/20 shadow-sm focus:border-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
                  >
                    <option value="">{t('form.servicePlaceholder')}</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.workType && <p className="mt-1 text-sm text-red-600">{errors.workType.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium" htmlFor="message">{t('form.message')}</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    {...register('message')}
                    className="mt-1 block w-full rounded-md border-[var(--brand-char)]/20 shadow-sm focus:border-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  {...register('consent')}
                  className="mt-1 rounded border-[var(--brand-char)]/30 text-[var(--brand-teal)] focus:ring-[var(--brand-teal)]"
                />
                <span className="text-sm text-[var(--brand-char)]">{t('form.consent')}</span>
              </label>
              {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </button>

              <p className="mt-2 text-sm" role="status" aria-live="polite">
                {status === 'ok' && <span className="text-green-700">{t('form.success')}</span>}
                {status === 'error' && <span className="text-red-700">{t('form.error')}</span>}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
