// eslint.config.ts
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Next.js recommended presets
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Your overrides go last so they win
  {
    rules: {
      // Choose one:
      '@typescript-eslint/no-explicit-any': 'off',   // fully disable
      // '@typescript-eslint/no-explicit-any': 'warn', // or only warn
    },
  },
];
