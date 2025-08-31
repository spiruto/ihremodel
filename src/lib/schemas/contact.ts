// lib/schemas/contact.ts
import { z } from 'zod';

export const CONTACT_SERVICES = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Windows & Doors',
  'Roofing',
  'Siding',
  'Exterior Painting'
] as const;

export type ContactWorkType = (typeof CONTACT_SERVICES)[number];

export const contactSchema = z.object({
  fullName: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Enter a valid email' }),

  // optional phone: allow omitted or empty, but if present, at least 7 chars
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v === '' || v.length >= 7, { message: 'Phone number looks too short' }),

  zip: z.string().regex(/^\d{5}$/, { message: 'Enter a 5-digit ZIP' }),

  // NOTE: no second param (no errorMap) — matches your zod version
  workType: z.enum(CONTACT_SERVICES),

  message: z
    .string()
    .min(10, { message: 'Please add a few details (10+ chars)' })
    .max(3000, { message: 'Message is too long' }),

  // consent must be true
  consent: z.boolean().refine((v) => v === true, { message: 'Consent is required' }),

  // Honeypot must be empty or undefined
  company: z.string().optional().refine((v) => !v || v === '', { message: 'Invalid' })
});

// Optional: add a custom message for workType if you want
// export const contactSchema = contactSchema.superRefine((data, ctx) => {
//   if (!CONTACT_SERVICES.includes(data.workType as any)) {
//     ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['workType'], message: 'Please select a service' });
//   }
// });

export type ContactPayload = z.infer<typeof contactSchema>;
