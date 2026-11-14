export interface SponsorNotificationPayload {
  brandName: string;
  productUrl: string;
  logoUrl?: string;
  tag?: string;
  description: string;
  contactEmail: string;
  paymentId: string;
  amountCents?: number;
  currency?: string;
  sessionId?: string;
  discountSummary?: string;
}

export async function sendSponsorNotificationEmail(payload: SponsorNotificationPayload) {
  const targetEmail =
    process.env.SPONSOR_NOTIFICATION_EMAIL ||
    (process.env as any).SPONSOR_NOTIFICATION_EMAI ||
    "sam.de.721166@gmail.com";
  const currencyCode = (payload.currency ?? "USD").toUpperCase();
  const rawAmount = typeof payload.amountCents === "number" ? payload.amountCents / 100 : 49.99;
  const amountFormatted = `$${rawAmount.toFixed(2)} ${currencyCode}`;

  console.log("--------------------------------------------------");
  console.log("✨ [SPONSOR PAYMENT NOTIFICATION]");
  console.log(`To: ${targetEmail}`);
  console.log(`Brand: ${payload.brandName}`);
  console.log(`Product URL: ${payload.productUrl}`);
  console.log(`Logo URL: ${payload.logoUrl || "None"}`);
  console.log(`Description: ${payload.description}`);
  console.log(`Contact: ${payload.contactEmail}`);
  console.log(`Payment ID: ${payload.paymentId}`);
  console.log(`Amount: ${amountFormatted}`);
  console.log("--------------------------------------------------");

  const cleanProductUrl = payload.productUrl.startsWith("http")
    ? payload.productUrl
    : `https://${payload.productUrl}`;

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Received</title>
  <style>
    @media only screen and (max-width: 600px) {
      .outer-body { padding: 16px 8px !important; }
      .email-card { border-radius: 16px !important; }
      .header-pad { padding: 24px 18px 20px 18px !important; }
      .body-pad { padding: 20px 18px !important; }
      .footer-pad { padding: 16px 18px !important; }
      .hero-amount { font-size: 32px !important; }
      .btn-table { width: 100% !important; }
      .btn-td { display: block !important; width: 100% !important; padding-right: 0 !important; padding-bottom: 8px !important; }
      .btn-link { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
      .meta-td-label { width: 85px !important; font-size: 12px !important; }
      .meta-td-value { font-size: 12.5px !important; }
    }
  </style>
</head>
<body class="outer-body" style="margin: 0; padding: 32px 12px; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <div class="email-card" style="max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 20px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.03);">
    
    <!-- Top Celebration & Hero -->
    <div class="header-pad" style="text-align: center; padding: 32px 28px 24px 28px; border-bottom: 1px solid #f4f4f5;">
      <div style="margin-bottom: 10px;">
        <span style="display: inline-block; font-size: 11px; font-weight: 600; color: #047857; background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 3px 10px; border-radius: 9999px;">
          💸 Payment Succeeded
        </span>
      </div>

      <div class="hero-amount" style="font-size: 36px; font-weight: 800; color: #09090b; letter-spacing: -0.03em; line-height: 1.15; margin: 4px 0 6px 0;">
        +${amountFormatted}
      </div>

      <p style="margin: 0; font-size: 14px; color: #71717a; line-height: 1.5;">
        <strong style="color: #09090b;">${payload.brandName}</strong> just sponsored Stick It Up ✨
      </p>

      <!-- Quick Action Buttons -->
      <div style="margin-top: 20px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn-table" style="margin: 0 auto;">
          <tr>
            <td class="btn-td" style="padding-right: 8px;">
              <a href="${cleanProductUrl}" target="_blank" rel="noopener noreferrer" class="btn-link" style="display: inline-block; background-color: #09090b; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 10px;">
                Open Website &rarr;
              </a>
            </td>
            <td class="btn-td">
              <a href="mailto:${payload.contactEmail}?subject=Thank%20you%20for%20sponsoring%20Stick%20It%20Up!%20-%20${encodeURIComponent(payload.brandName)}" class="btn-link" style="display: inline-block; background-color: #ffffff; color: #18181b; font-size: 13px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 10px; border: 1px solid #e4e4e7;">
                Say Thanks 👋
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Details Card -->
    <div class="body-pad" style="padding: 24px 28px;">
      <h3 style="margin: 0 0 10px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #a1a1aa;">
        Details
      </h3>

      <div style="background-color: #fafafa; border: 1px solid #f4f4f5; border-radius: 12px; padding: 14px 16px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.6;">
          <tr>
            <td class="meta-td-label" style="color: #71717a; padding: 5px 0; width: 100px;">Product</td>
            <td class="meta-td-value" style="color: #09090b; padding: 5px 0; font-weight: 600;">${payload.brandName}</td>
          </tr>
          <tr>
            <td class="meta-td-label" style="color: #71717a; padding: 5px 0;">Website</td>
            <td class="meta-td-value" style="padding: 5px 0; word-break: break-all;">
              <a href="${cleanProductUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: none; font-weight: 500;">
                ${payload.productUrl}
              </a>
            </td>
          </tr>
          <tr>
            <td class="meta-td-label" style="color: #71717a; padding: 5px 0;">Email</td>
            <td class="meta-td-value" style="padding: 5px 0; word-break: break-all;">
              <a href="mailto:${payload.contactEmail}" style="color: #09090b; text-decoration: underline; font-weight: 500;">
                ${payload.contactEmail}
              </a>
            </td>
          </tr>
          <tr>
            <td class="meta-td-label" style="color: #71717a; padding: 5px 0;">Amount</td>
            <td class="meta-td-value" style="color: #059669; padding: 5px 0; font-weight: 700;">
              ${amountFormatted}
              ${payload.discountSummary ? `<span style="display: inline-block; margin-left: 6px; font-size: 11px; font-weight: 500; color: #52525b; background-color: #f4f4f5; border: 1px solid #e4e4e7; padding: 1px 7px; border-radius: 9999px;">🎟️ ${payload.discountSummary}</span>` : ""}
            </td>
          </tr>
          <tr>
            <td class="meta-td-label" style="color: #71717a; padding: 5px 0;">Payment ID</td>
            <td class="meta-td-value" style="color: #71717a; padding: 5px 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; word-break: break-all;">
              ${payload.paymentId}
            </td>
          </tr>
        </table>
      </div>

      <!-- Description Pitch Box -->
      <div style="margin-top: 18px;">
        <h3 style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #a1a1aa;">
          Description
        </h3>
        <div style="background-color: #fafafa; border: 1px solid #f4f4f5; border-left: 3px solid #10b981; border-radius: 8px; padding: 12px 14px; font-size: 13px; line-height: 1.6; color: #27272a; word-break: break-word;">
          ${(payload.description || "No description provided").replace(/\n/g, "<br/>")}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-pad" style="padding: 16px 28px; background-color: #fbfbfb; border-top: 1px solid #f4f4f5; text-align: center; font-size: 11.5px; color: #71717a;">
      <div>Another one in the bag! Keep building cool stuff ✌️✨</div>
      <div style="margin-top: 3px; font-size: 10.5px; color: #a1a1aa;">Stick It Up &middot; Powered by Dodo Payments</div>
    </div>

  </div>
</body>
</html>
      `;

      const fromEmail = process.env.RESEND_FROM_EMAIL || "Stick It Up <onboarding@resend.dev>";

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [targetEmail],
          reply_to: payload.contactEmail || undefined,
          subject: `💸 Cha-ching! You got paid ${amountFormatted} from ${payload.brandName} 🎉`,
          html: emailHtml,
        }),
      });

      const resData = await res.json();
      console.log("Resend notification response:", resData);
      return { success: true, resend: resData };
    } catch (err) {
      console.error("Failed to send notification via Resend:", err);
    }
  }

  return { success: true, logged: true };
}

