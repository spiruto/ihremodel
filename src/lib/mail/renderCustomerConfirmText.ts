// src/lib/mail/renderCustomerConfirmEmailText.ts
type ConfirmPayload = {
  fullName: string;
  phone?: string;
  workType: string;
  submittedAt: string;
  brand: string;
  siteUrl: string;
};

export function renderCustomerConfirmEmailText(p: ConfirmPayload) {
  return [
    `${p.brand} — Inquiry Received`,
    ``,
    `Hi ${p.fullName || 'there'},`,
    ``,
    `Thanks for reaching out! We received your request on ${p.submittedAt}.`,
    ``,
    `Service: ${p.workType}`,
    p.phone ? `Phone: ${p.phone}` : undefined,
    ``,
    `A project specialist will contact you by email or phone within 24 hours (often sooner).`,
    `Next steps:`,
    `• Confirm goals, timeline, and budget`,
    `• Share options and an itemized quote`,
    `• Schedule a convenient on-site visit if needed`,
    ``,
    `Need to add or correct anything? Reply to this email and we’ll update your request.`,
    ``,
    `Visit us: ${p.siteUrl}`,
    ``,
    `— ${p.brand}`,
  ].filter(Boolean).join('\n');
}
