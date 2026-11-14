import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { markSponsorSubmissionPaid } from "../../../../lib/sponsor-db";
import { sendSponsorNotificationEmail } from "../../../../lib/sponsor-notify";

function verifyStandardWebhook(
  rawBody: string,
  headers: { id?: string | null; timestamp?: string | null; signature?: string | null },
  secret: string,
): boolean {
  if (!headers.id || !headers.timestamp || !headers.signature) {
    return false;
  }

  try {
    // 1. Strip 'whsec_' prefix and decode base64 secret bytes
    const secretKey = secret.startsWith("whsec_") ? secret.slice(6) : secret;
    const secretBytes = Buffer.from(secretKey, "base64");

    // 2. Format: <id>.<timestamp>.<body-string>
    const signedContent = `${headers.id}.${headers.timestamp}.${rawBody}`;

    // 3. Compute HMAC-SHA256
    const expectedSignature = crypto
      .createHmac("sha256", secretBytes)
      .update(signedContent)
      .digest("base64");

    // 4. Split incoming signatures by space (format: v1,<sig1> v1,<sig2>)
    const signatures = headers.signature.split(" ");
    for (const versionedSig of signatures) {
      const [version, sig] = versionedSig.split(",");
      if (version === "v1" && sig) {
        const sigBuf = Buffer.from(sig);
        const expectedBuf = Buffer.from(expectedSignature);
        if (sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf)) {
          return true;
        }
      }
    }
  } catch (err) {
    console.error("Webhook signature verification exception:", err);
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_KEY || "whsec_UVCihnLqpWW5s/gcf8kbIFpwWlTO63fj";

    const id = req.headers.get("webhook-id") || req.headers.get("svix-id");
    const timestamp = req.headers.get("webhook-timestamp") || req.headers.get("svix-timestamp");
    const signature = req.headers.get("webhook-signature") || req.headers.get("svix-signature");

    // Verify signature
    const isValid = verifyStandardWebhook(rawBody, { id, timestamp, signature }, webhookSecret);

    if (!isValid) {
      console.warn("⚠️ Invalid Dodo Payments webhook signature");
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    console.log(`🔔 Verified Dodo Payments Webhook event: ${event.type}`);

    if (event.type === "payment.succeeded") {
      const data = event.data || {};
      const metadata = data.metadata || {};

      const brandName = metadata.brand_name || data.customer?.name || "New Sponsor";
      const productUrl = metadata.product_url || "";
      const logoUrl = metadata.logo_url || "";
      const tag = metadata.tag || "Partner";
      const description = metadata.description || "";
      const contactEmail = metadata.contact_email || data.customer?.email || "";
      const paymentId = data.payment_id || event.event_id || `pay_${Date.now()}`;
      // Dodo Payments provides total_amount (or amount) in smallest currency unit (cents) after all discounts/coupons
      const amountCents =
        typeof data.total_amount === "number"
          ? data.total_amount
          : typeof data.amount === "number"
          ? data.amount
          : 4999;
      const currency = (data.currency || "USD").toUpperCase();
      const sessionId = data.session_id || metadata.session_id;

      // Extract coupon/discount info if applied
      let discountSummary: string | undefined;
      if (Array.isArray(data.discounts) && data.discounts.length > 0) {
        discountSummary = data.discounts
          .map((d: any) => d.code || d.name || d.discount_id || "Coupon")
          .filter(Boolean)
          .join(", ");
      } else if (data.discount_id) {
        discountSummary = String(data.discount_id);
      }

      // 1. Mark as paid in database
      await markSponsorSubmissionPaid({
        paymentId,
        sessionId,
        amountCents,
        currency,
        brandName,
        contactEmail,
        productUrl,
        logoUrl,
        description,
      });

      // 2. Dispatch notification email to sam.de.721166@gmail.com
      await sendSponsorNotificationEmail({
        brandName,
        productUrl,
        logoUrl,
        tag,
        description,
        contactEmail,
        paymentId,
        amountCents,
        currency,
        sessionId,
        discountSummary,
      });

      console.log(`✅ Sponsor payment processed & notified for: ${brandName} (${contactEmail})`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error processing Dodo Payments webhook:", error);
    return NextResponse.json({ error: error.message || "Webhook handling error" }, { status: 500 });
  }
}

