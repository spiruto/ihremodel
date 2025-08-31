import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactSchema, type ContactPayload } from '@/lib/schemas/contact';
import { renderContactEmail } from '@/lib/mail/renderContactEmail';
import { renderContactEmailText } from '@/lib/mail/renderContactEmailText';
import { renderCustomerConfirmEmail } from '@/lib/mail/rendercustomerConfirmEmail';
import { renderCustomerConfirmEmailText } from '@/lib/mail/renderCustomerConfirmText';

// (Optional) lightweight in-memory rate limit for dev (resets on deploy)
const buckets = new Map<string, { hits: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_HITS = 10;

function rateLimit(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip) ?? { hits: 0, ts: now };
  if (now - b.ts > WINDOW_MS) {
    buckets.set(ip, { hits: 1, ts: now });
    return false;
  }
  b.hits += 1;
  buckets.set(ip, b);
  return b.hits > MAX_HITS;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    (req as unknown as { ip?: string }).ip ||
    'unknown';

  if (rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parse = contactSchema.safeParse(json);
  if (!parse.success) {
    const flat = parse.error.flatten();
    return NextResponse.json({ error: 'Validation failed', details: flat.fieldErrors }, { status: 422 });
  }

  const { fullName, email, message, workType, phone, zip } = parse.data as ContactPayload;

  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER as string,
      pass: process.env.MAIL_PASS as string
    }
  });

  const submittedAt = new Date().toLocaleString();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ihremodel.com';
  const brand = 'Imperial Home Remodeling';

  try {
    // 1) Send internal notification to your team
    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: process.env.MAIL_USER as string,
      subject: `${fullName} wants a quote for '${workType}'`,
      html: renderContactEmail({
        fullName,
        email,
        phone,
        zip,
        workType,
        message,
        submittedAt,
        brand,
      }),
      text: renderContactEmailText({
        fullName,
        email,
        phone,
        zip,
        workType,
        message,
        submittedAt,
        brand
      })
    });

    // 2) Send confirmation to the customer
    await transporter.sendMail({
      from: `"${brand}" <${process.env.MAIL_USER as string}>`,
      to: email,
      replyTo: process.env.MAIL_USER as string,
      subject: `We received your request — ${brand}`,
      html: renderCustomerConfirmEmail({
        fullName,
        email,
        phone,
        workType,
        submittedAt,
        brand,
        siteUrl
      }),
      text: renderCustomerConfirmEmailText({
        fullName,
        phone,
        workType,
        submittedAt,
        brand,
        siteUrl
      })
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}
