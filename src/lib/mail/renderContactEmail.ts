// -------------------------------------------------------------
// File: src/lib/mail/renderContactEmail.ts
type EmailData = {
  fullName: string;
  email: string;
  phone?: string;
  zip: string;
  workType: string;
  message?: string;
  submittedAt?: string;            // e.g. new Date().toLocaleString()
  brand?: string;
};

export function renderContactEmail({
  fullName,
  email,
  phone,
  zip,
  workType,
  message,
  submittedAt,
  brand = 'Imperial Home Remodeling'
}: EmailData) {
  // Email-safe palette
  const bg = '#F7F7F9';
  const card = '#FFFFFF';
  const ink = '#0F172A';           // slate-900
  const sub = '#475569';           // slate-600
  const line = '#E5E7EB';          // gray-200
  const pillGold = '#E2C044';
  const pillTeal = '#587B7F';

  // Tiny helper to conditionally render rows
  const row = (label: string, value?: string) =>
    value
      ? `
        <tr>
          <td style="padding:12px 0;color:${sub};font-weight:600;width:140px;vertical-align:top;">${label}</td>
          <td style="padding:12px 0;color:${ink};word-break:break-word;">${escapeHtml(value)}</td>
        </tr>`
      : '';

  return `
  <!doctype html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>New Quote Request</title>
      <style>
        /* Prevent iOS blue links */
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
      </style>
    </head>
    <body style="margin:0;padding:24px;background:${bg};font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji';">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;">
        <tr>
          <td>
            <!-- Header -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
              <tr>
                <td style="font-size:20px;font-weight:800;color:${ink};">${escapeHtml(brand)}</td>
                <td style="text-align:right;">
                  <span style="display:inline-block;background:${pillTeal};color:#fff;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:700;">
                    ${escapeHtml(workType)}
                  </span>
                </td>
              </tr>
            </table>

            <!-- Card -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${card};border:1px solid ${line};border-radius:12px;overflow:hidden;">
              <!-- Title -->
              <tr>
                <td style="padding:20px;border-bottom:1px solid ${line};">
                  <div style="font-size:22px;line-height:28px;font-weight:800;color:${ink};">New Quote Request</div>
                  ${submittedAt
      ? `<div style="margin-top:6px;color:${sub};font-size:13px;">Submitted ${escapeHtml(submittedAt)}</div>`
      : ''
    }
                  <div style="margin-top:12px;">
                    <span style="display:inline-block;background:${pillGold};color:#1f2937;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:700;margin-right:8px;">
                      Lead • Website
                    </span>
                    <span style="display:inline-block;background:${pillTeal};color:#fff;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:700;">
                      ZIP ${escapeHtml(zip)}
                    </span>
                  </div>
                </td>
              </tr>

              <!-- Details -->
              <tr>
                <td style="padding:16px 20px 4px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                    ${row('Full Name', fullName)}
                    ${row('Email', email)}
                    ${row('Phone', phone)}
                    ${row('ZIP', zip)}
                    ${row('Service', workType)}
                  </table>
                </td>
              </tr>

              ${message && message.trim()
      ? `
              <!-- Notes -->
              <tr>
                <td style="padding:8px 20px 20px 20px;">
                  <div style="font-weight:800;color:${ink};margin:14px 0 8px 0;">Project Notes</div>
                  <div style="background:${bg};border:1px solid ${line};border-radius:10px;padding:14px;color:${ink};white-space:pre-wrap;">
                    ${escapeHtml(message)}
                  </div>
                </td>
              </tr>`
      : ''
    }

              <!-- Next steps -->
              <tr>
                <td style="padding:10px 20px 20px 20px;border-top:1px solid ${line};">
                  <div style="font-weight:800;color:${ink};margin-bottom:6px;">Quick Checklist</div>
                  <ul style="margin:0;padding-left:18px;color:${sub};font-size:14px;line-height:1.6;">
                    <li>Confirm preferred contact time.</li>
                    <li>Gather measurements/photos if available.</li>
                    <li>Discuss timeline, budget, permits, and materials.</li>
                  </ul>
                  <div style="color:${sub};font-size:12px;margin-top:12px;">
                    Tip: You can reply directly to this email to contact the lead.
                  </div>
                </td>
              </tr>
            </table>

            <!-- Footer note -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
              <tr>
                <td style="text-align:center;color:${sub};font-size:12px;">
                  © ${new Date().getFullYear()} ${escapeHtml(brand)}
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
