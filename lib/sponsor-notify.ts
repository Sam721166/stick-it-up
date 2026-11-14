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
}

export async function sendSponsorNotificationEmail(payload: SponsorNotificationPayload) {
  const targetEmail = process.env.SPONSOR_NOTIFICATION_EMAIL || "sam.de.721166@gmail.com";
  const amountFormatted = `$${((payload.amountCents ?? 4999) / 100).toFixed(2)} ${payload.currency ?? "USD"}`;

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

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 16px; background-color: #ffffff;">
          <div style="margin-bottom: 20px;">
            <span style="background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; border: 1px solid #a7f3d0;">
              Payment Received · ${amountFormatted}
            </span>
            <h2 style="font-size: 24px; font-weight: 700; color: #18181b; margin: 12px 0 6px 0;">
              🎉 New Sponsor Submission
            </h2>
            <p style="color: #71717a; font-size: 14px; margin: 0;">
              A new sponsor has completed payment for Stick It Up!
            </p>
          </div>

          <div style="background-color: #f4f4f5; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="color: #71717a; padding: 6px 0; width: 140px;"><strong>Product Name:</strong></td>
                <td style="color: #18181b; padding: 6px 0;"><strong>${payload.brandName}</strong></td>
              </tr>
              <tr>
                <td style="color: #71717a; padding: 6px 0;"><strong>Product Website:</strong></td>
                <td style="color: #2563eb; padding: 6px 0;"><a href="${payload.productUrl}" target="_blank" style="color: #2563eb; text-decoration: underline;">${payload.productUrl}</a></td>
              </tr>
              <tr>
                <td style="color: #71717a; padding: 6px 0;"><strong>Category / Tag:</strong></td>
                <td style="color: #18181b; padding: 6px 0;">${payload.tag || "Partner"}</td>
              </tr>
              <tr>
                <td style="color: #71717a; padding: 6px 0;"><strong>Logo URL:</strong></td>
                <td style="color: #18181b; padding: 6px 0;">
                  ${payload.logoUrl ? `<a href="${payload.logoUrl}" target="_blank" style="color: #2563eb;">View Logo</a>` : "None provided"}
                </td>
              </tr>
              <tr>
                <td style="color: #71717a; padding: 6px 0;"><strong>Contact Email:</strong></td>
                <td style="color: #18181b; padding: 6px 0;">${payload.contactEmail}</td>
              </tr>
              <tr>
                <td style="color: #71717a; padding: 6px 0;"><strong>Payment ID:</strong></td>
                <td style="color: #71717a; padding: 6px 0; font-family: monospace;">${payload.paymentId}</td>
              </tr>
              <tr>
                <td style="color: #71717a; padding: 6px 0;"><strong>Amount Paid:</strong></td>
                <td style="color: #047857; padding: 6px 0; font-weight: 600;">${amountFormatted}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin: 0 0 8px 0;">
              Product Description / Pitch:
            </h4>
            <blockquote style="margin: 0; padding: 12px 16px; background-color: #fafafa; border-left: 3px solid #18181b; border-radius: 4px; color: #27272a; font-size: 14px; line-height: 1.5;">
              "${payload.description}"
            </blockquote>
          </div>

          <div style="border-top: 1px solid #e4e4e7; padding-top: 16px; font-size: 12px; color: #a1a1aa; text-align: center;">
            Stick It Up Automatic Sponsorship Dispatcher · Dodo Payments
          </div>
        </div>
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
          subject: `🎉 New Sponsor Paid: ${payload.brandName} (${amountFormatted})`,
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

