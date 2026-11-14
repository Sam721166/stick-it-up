import { NextRequest, NextResponse } from "next/server";
import { createSponsorSubmission } from "../../../../lib/sponsor-db";

const DODO_API_URL = "https://live.dodopayments.com/checkouts";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, any>;
    const { brandName, productUrl, logoUrl, tag, description, email } = body;

    // Validation
    if (!brandName || typeof brandName !== "string" || !brandName.trim()) {
      return NextResponse.json({ error: "Product / Brand name is required" }, { status: 400 });
    }
    if (!productUrl || typeof productUrl !== "string" || !productUrl.trim()) {
      return NextResponse.json({ error: "Valid product URL is required" }, { status: 400 });
    }
    if (!description || typeof description !== "string" || !description.trim()) {
      return NextResponse.json({ error: "Short description is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid contact email is required" }, { status: 400 });
    }

    const cleanBrandName = brandName.trim();
    let cleanProductUrl = productUrl.trim();
    if (!cleanProductUrl.startsWith("http://") && !cleanProductUrl.startsWith("https://")) {
      cleanProductUrl = `https://${cleanProductUrl}`;
    }
    const cleanLogoUrl = logoUrl ? logoUrl.trim() : "";
    const cleanTag = tag ? tag.trim() : "Partner";
    const cleanDescription = description.trim();
    const cleanEmail = email.trim().toLowerCase();

    const apiKey = process.env.DODO_PAYMENTS_API_KEY || "dodo_live_O8Vnk4tocT2TGZxt.hAcb9Mepn-E-LTB-IEEruuYRMSWkJ8v3LSkJg6FgqgNYjmw4";
    const productId = process.env.DODO_PAYMENTS_PRODUCT_ID || "pdt_0NruPI9554agIOJBXl7vJ";

    // Determine return URL (returns back to home page with success popup)
    const origin = req.headers.get("origin") || req.nextUrl.origin || "https://stickitupx.com";
    const returnUrl = `${origin}/?sponsor_success=true`;

    const payload = {
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email: cleanEmail,
        name: cleanBrandName,
      },
      return_url: returnUrl,
      metadata: {
        brand_name: cleanBrandName.slice(0, 40),
        product_url: cleanProductUrl.slice(0, 200),
        logo_url: cleanLogoUrl.slice(0, 200),
        tag: cleanTag.slice(0, 40),
        description: cleanDescription.slice(0, 400),
        contact_email: cleanEmail.slice(0, 100),
      },
    };

    const dodoRes = await fetch(DODO_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!dodoRes.ok) {
      const errText = await dodoRes.text();
      console.error("Dodo Payments checkout creation error:", dodoRes.status, errText);
      return NextResponse.json(
        { error: "Failed to create payment session with Dodo Payments", details: errText },
        { status: 502 },
      );
    }

    const session = (await dodoRes.json()) as Record<string, any>;
    const checkoutUrl = session.checkout_url || session.url;
    const sessionId = session.session_id || session.id;

    if (!checkoutUrl) {
      console.error("Dodo Payments returned no checkout_url:", session);
      return NextResponse.json({ error: "Invalid response from payment provider" }, { status: 502 });
    }

    // Save pending submission to DB
    await createSponsorSubmission({
      brandName: cleanBrandName,
      productUrl: cleanProductUrl,
      logoUrl: cleanLogoUrl,
      tag: cleanTag,
      description: cleanDescription,
      contactEmail: cleanEmail,
      sessionId,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl,
      sessionId,
    });
  } catch (error: any) {
    console.error("Sponsor checkout API route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
