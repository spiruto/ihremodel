// -------------------------------------------------------------
// File: src/lib/mail/renderContactEmailText.ts
type EmailData = {
  fullName: string;
  email: string;
  phone?: string;
  zip: string;
  workType: string;
  message?: string;
  submittedAt?: string;
  brand?: string;
};

export function renderContactEmailText({
  fullName,
  email,
  phone,
  zip,
  workType,
  message,
  submittedAt,
  brand = 'Imperial Home Remodeling'
}: EmailData) {
  const L = (k: string, v?: string) => (v ? `${k}: ${v}` : undefined);
  const lines = [
    `${brand} — New Quote Request`,
    submittedAt ? `Submitted: ${submittedAt}` : undefined,
    '',
    'Lead • Website',
    `ZIP ${zip}`,
    '------------------------------------------------------------',
    L('Full Name', fullName),
    L('Email', email),
    L('Phone', phone),
    L('ZIP', zip),
    L('Service', workType),
    '------------------------------------------------------------',
    message && message.trim() ? 'Project Notes:' : undefined,
    message && message.trim() ? message.trim() : undefined,
    message && message.trim() ? '------------------------------------------------------------' : undefined,
    'Quick Checklist:',
    '• Confirm preferred contact time',
    '• Measurements/photos (if available)',
    '• Timeline, budget, permits, materials',
    '',
    'You can reply directly to this email.',
    `© ${new Date().getFullYear()} ${brand}`
  ].filter(Boolean) as string[];

  return lines.join('\r\n');
}
