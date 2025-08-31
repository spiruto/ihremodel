// src/lib/mail/renderCustomerConfirmEmail.ts
type ConfirmPayload = {
  fullName: string;
  email: string;
  phone?: string;
  workType: string;
  submittedAt: string; // human-readable
  brand: string;       // "Imperial Home Remodeling"
  siteUrl: string;     // e.g., https://imperialremodel.com
};

export function renderCustomerConfirmEmail(p: ConfirmPayload) {
  const esc = (s: string) =>
    s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));

  const brand = esc(p.brand);
  const name = esc(p.fullName || 'there');
  const workType = esc(p.workType);
  const submittedAt = esc(p.submittedAt);
  const siteUrl = esc(p.siteUrl);
  const phone = p.phone ? esc(p.phone) : '';

  return `
<!doctype html>
<html lang="en">
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>${brand} — Inquiry Received</title>
  <style>
    /* Basic, accessible, email-safe styles */
    body { margin:0; padding:0; background:#f6f7f9; color:#111; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; }
    .wrapper { width:100%; background:#f6f7f9; padding:24px 0; }
    .container { max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e6e7eb; border-radius:12px; overflow:hidden; }
    .header { padding:20px 24px; background:#0c0d0e; color:#d4af37; font-weight:800; font-size:20px; }
    .content { padding:24px; line-height:1.55; }
    .h1 { font-size:20px; font-weight:700; margin:0 0 12px; color:#111; }
    .muted { color:#5f666d; }
    .hr { height:1px; background:#eceef1; border:0; margin:20px 0; }
    .callout { background:#fafafa; border:1px solid #eceef1; border-radius:10px; padding:16px; }
    .kdl { margin: 0; padding: 0; list-style: none; }
    .kdl li { margin: 6px 0; }
    .footer { padding:16px 24px; background:#0c0d0e; color:#d4af37; font-size:12px; text-align:center; }
    a { color:#2b7a78; text-decoration:none; }
    .strong { font-weight:600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">${brand}</div>
      <div class="content">
        <p class="h1">We received your inquiry — thank you, ${name}!</p>
        <p class="muted">Submitted: ${submittedAt}</p>

        <div class="callout" role="region" aria-label="Summary of your request">
          <p style="margin:0 0 8px;"><span class="strong">Service:</span> ${workType}</p>
          ${phone ? `<p style="margin:0;"><span class="strong">Phone:</span> ${phone}</p>` : ''}
        </div>

        <hr class="hr" />

        <p>
          A project specialist will review your request and reach out by email or phone within
          <span class="strong">24 hours</span> (often sooner) to discuss next steps and schedule your free consultation.
        </p>

        <p class="muted">What happens next?</p>
        <ul class="kdl">
          <li>We confirm your goals, timeline, and budget.</li>
          <li>We propose options and a clear, itemized quote.</li>
          <li>We coordinate a convenient time for an on-site visit if needed.</li>
        </ul>

        <p>If you need to add details or correct anything, simply reply to this email and our team will update your request.</p>

        <p class="muted">Visit us: <a href="${siteUrl}">${siteUrl}</a></p>
      </div>
      <div class="footer">© ${new Date().getFullYear()} ${brand}. All rights reserved.</div>
    </div>
  </div>
</body>
</html>
`.trim();
}
