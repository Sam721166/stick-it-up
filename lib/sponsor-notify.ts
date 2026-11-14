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

  const currencySymbols: Record<string, string> = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    CAD: "CA$",
    AUD: "A$",
  };
  const currencyCode = (payload.currency ?? "USD").toUpperCase();
  const currencySymbol = currencySymbols[currencyCode] || `${currencyCode} `;
  const rawAmount = typeof payload.amountCents === "number" ? payload.amountCents / 100 : 49.99;
  const amountFormatted = `${currencySymbol}${rawAmount.toFixed(2)}`;
  const amountWithCurrency = `${amountFormatted} ${currencyCode}`;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  console.log("--------------------------------------------------");
  console.log("✨ [SPONSOR PAYMENT NOTIFICATION]");
  console.log(`To: ${targetEmail}`);
  console.log(`Brand: ${payload.brandName}`);
  console.log(`Product URL: ${payload.productUrl}`);
  console.log(`Logo URL: ${payload.logoUrl || "None"}`);
  console.log(`Description: ${payload.description}`);
  console.log(`Contact: ${payload.contactEmail}`);
  console.log(`Payment ID: ${payload.paymentId}`);
  console.log(`Amount: ${amountWithCurrency}`);
  console.log("--------------------------------------------------");

  const cleanProductUrl = payload.productUrl.startsWith("http")
    ? payload.productUrl
    : `https://${payload.productUrl}`;
  const cleanDisplayUrl = payload.productUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") || payload.productUrl;

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const emailHtml = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>New sponsor on Stick It Up</title>
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  a { text-decoration:none; }
  @media only screen and (max-width:600px) {
    .wrap { padding:20px 12px !important; }
    .card-pad { padding:28px 22px !important; }
    .amount { font-size:40px !important; }
    .btn-cell { display:block !important; width:100% !important; padding:0 0 10px 0 !important; }
    .btn { display:block !important; text-align:center !important; }
    .lbl { width:96px !important; }
  }
  :root { color-scheme: light only; supported-color-schemes: light only; }
</style>
</head>
<body class="bg" style="margin:0;padding:0;background-color:#f5f5f7;">

<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
  ${payload.brandName} just sponsored Stick It Up — payment received.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg" style="background-color:#f5f5f7;">
<tr><td align="center" class="wrap" style="padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <!-- Brand -->
  <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;">
    <tr>
      <td style="padding:0 4px 16px 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="width:26px;height:26px;background-color:#09090b;border-radius:8px;text-align:center;color:#ffffff;font-size:13px;font-weight:700;line-height:26px;" width="26" height="26">S</td>
          <td class="t-main" style="padding-left:10px;font-size:14px;font-weight:600;color:#09090b;letter-spacing:-0.01em;">Stick It Up</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <!-- Card -->
  <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" class="card" style="max-width:520px;width:100%;background-color:#ffffff;border:1px solid #e8e8ec;border-radius:20px;">
    <tr>
      <td class="card-pad" style="padding:36px 32px 28px 32px;">

        <!-- Status -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border:1px solid #0f9d58;border-radius:8px;"><tr>
          <td style="background-color:#0f9d58;border-radius:7px 0 0 7px;padding:6px 12px;font-size:12px;font-weight:600;color:#ffffff;letter-spacing:0.01em;line-height:1;">
            &#129297; Payment received
          </td>
          <td style="background-color:#ffffff;border-radius:0 7px 7px 0;padding:6px 12px;font-size:12px;font-weight:500;color:#0b7a45;line-height:1;">
            ${formattedDate}
          </td>
        </tr></table>

        <!-- Amount -->
        <div class="amount t-main" style="margin:18px 0 6px 0;font-size:46px;font-weight:700;letter-spacing:-0.04em;line-height:1.05;color:#09090b;">
          ${amountFormatted}
        </div>
        <div class="t-sub" style="font-size:15px;line-height:1.55;color:#6b6b76;">
          <strong class="t-main" style="color:#09090b;font-weight:600;">${payload.brandName}</strong> just sponsored <strong class="t-main" style="color:#09090b;font-weight:600;">Stick It Up</strong>. 🎉
        </div>

        <!-- Buttons -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;"><tr>
          <td class="btn-cell" style="padding-right:8px;" width="50%">
            <a href="${cleanProductUrl}" target="_blank" class="btn btn-primary" style="display:block;text-align:center;background-color:#09090b;color:#ffffff;font-size:14px;font-weight:600;padding:12px 18px;border-radius:12px;">Visit website &rarr;</a>
          </td>
          <td class="btn-cell" style="padding-left:8px;" width="50%">
            <a href="mailto:${payload.contactEmail}?subject=Thank%20you%20for%20sponsoring%20Stick%20It%20Up!%20-%20${encodeURIComponent(payload.brandName)}" class="btn btn-ghost" style="display:block;text-align:center;background-color:#ffffff;color:#09090b;font-size:14px;font-weight:600;padding:11px 18px;border-radius:12px;border:1px solid #e0e0e6;">Say thanks</a>
          </td>
        </tr></table>

        <!-- Divider -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 22px 0;"><tr>
          <td class="divider" style="border-top:1px solid #efeff2;font-size:0;line-height:0;">&nbsp;</td>
        </tr></table>

        <!-- Details -->
        <div class="t-sub" style="margin-bottom:10px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#9a9aa5;">Details</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;line-height:1.5;">
          <tr>
            <td class="lbl t-sub" style="width:110px;padding:9px 0;color:#6b6b76;">Sponsor</td>
            <td class="t-main" style="padding:9px 0;color:#09090b;font-weight:600;">${payload.brandName}</td>
          </tr>
          <tr>
            <td class="lbl t-sub divider" style="padding:9px 0;color:#6b6b76;border-top:1px solid #f3f3f6;">Website</td>
            <td class="divider" style="padding:9px 0;border-top:1px solid #f3f3f6;word-break:break-all;"><a href="${cleanProductUrl}" target="_blank" style="color:#2563eb;font-weight:500;">${cleanDisplayUrl}</a></td>
          </tr>
          <tr>
            <td class="lbl t-sub divider" style="padding:9px 0;color:#6b6b76;border-top:1px solid #f3f3f6;">Email</td>
            <td class="divider" style="padding:9px 0;border-top:1px solid #f3f3f6;word-break:break-all;"><a href="mailto:${payload.contactEmail}" class="t-main" style="color:#09090b;font-weight:500;">${payload.contactEmail}</a></td>
          </tr>
          <tr>
            <td class="lbl t-sub divider" style="padding:9px 0;color:#6b6b76;border-top:1px solid #f3f3f6;">Amount</td>
            <td class="t-main divider" style="padding:9px 0;color:#09090b;font-weight:600;border-top:1px solid #f3f3f6;">
              ${amountWithCurrency}
              ${payload.discountSummary ? `<span class="panel t-sub" style="display:inline-block;margin-left:8px;padding:2px 8px;font-size:11px;font-weight:600;color:#52525b;background-color:#f4f4f6;border:1px solid #e6e6ea;border-radius:999px;letter-spacing:0.02em;">${payload.discountSummary}</span>` : ""}
            </td>
          </tr>
          <tr>
            <td class="lbl t-sub divider" style="padding:9px 0;color:#6b6b76;border-top:1px solid #f3f3f6;">Payment ID</td>
            <td class="t-sub divider" style="padding:9px 0;color:#6b6b76;border-top:1px solid #f3f3f6;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;word-break:break-all;">${payload.paymentId}</td>
          </tr>
        </table>

        <!-- Message -->
        <div class="t-sub" style="margin:22px 0 8px 0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#9a9aa5;">Message</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td class="panel t-main" style="background-color:#f8f8fa;border:1px solid #efeff2;border-left:3px solid #12b76a;border-radius:10px;padding:13px 16px;font-size:14px;line-height:1.6;color:#27272a;word-break:break-word;">
            ${(payload.description || "No message provided").replace(/\n/g, "<br/>")}
          </td>
        </tr></table>

      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;">
    <tr>
      <td align="center" class="t-sub" style="padding:20px 8px 0 8px;font-size:12px;line-height:1.6;color:#9a9aa5;">
        Another one in the bag. Keep building. ✌️<br>
        Stick It Up &middot; Powered by Dodo Payments
      </td>
    </tr>
  </table>

</td></tr>
</table>
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
          subject: `💸 ${payload.brandName} just sponsored Stick It Up (${amountWithCurrency}) 🎉`,
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

