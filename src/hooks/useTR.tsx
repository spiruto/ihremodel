
// -------------------------------------------------------------
// File: app/[locale]/(site)/components/_intl.tsx
'use client';
import { useTranslations } from 'next-intl';

export function useTR(namespace: string) {
  const t = useTranslations(namespace);
  const tr = <T,>(key: string) => t.raw(key) as T;
  return { t, tr };
}
