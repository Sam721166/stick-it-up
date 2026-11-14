import { getDb } from "./db";

export interface SponsorSubmissionRecord {
  id?: number;
  brandName: string;
  productUrl: string;
  logoUrl?: string;
  tag?: string;
  description: string;
  contactEmail: string;
  sessionId?: string;
  paymentId?: string;
  amountCents?: number;
  currency?: string;
  status: "pending" | "paid" | "active";
}

let tableEnsured = false;

async function ensureTable(sql: any) {
  if (tableEnsured) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS sponsor_submissions (
        id SERIAL PRIMARY KEY,
        brand_name TEXT NOT NULL,
        product_url TEXT NOT NULL,
        logo_url TEXT,
        tag TEXT DEFAULT 'Partner',
        description TEXT NOT NULL,
        contact_email TEXT NOT NULL,
        session_id TEXT UNIQUE,
        payment_id TEXT,
        amount_cents INTEGER DEFAULT 4999,
        currency TEXT DEFAULT 'USD',
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        paid_at TIMESTAMP WITH TIME ZONE
      );
    `;
    tableEnsured = true;
  } catch (err) {
    console.warn("Could not ensure sponsor_submissions table:", err);
  }
}

export async function createSponsorSubmission(data: {
  brandName: string;
  productUrl: string;
  logoUrl?: string;
  tag?: string;
  description: string;
  contactEmail: string;
  sessionId?: string;
}) {
  try {
    const sql = getDb();
    await ensureTable(sql);
    const result = await sql`
      INSERT INTO sponsor_submissions (
        brand_name,
        product_url,
        logo_url,
        tag,
        description,
        contact_email,
        session_id,
        status
      ) VALUES (
        ${data.brandName},
        ${data.productUrl},
        ${data.logoUrl || null},
        ${data.tag || 'Partner'},
        ${data.description},
        ${data.contactEmail},
        ${data.sessionId || null},
        'pending'
      )
      RETURNING id, brand_name, product_url, contact_email, session_id, status;
    `;
    return result[0];
  } catch (err) {
    console.error("Error creating sponsor submission in DB:", err);
    return null;
  }
}

export async function markSponsorSubmissionPaid(data: {
  paymentId: string;
  sessionId?: string;
  amountCents?: number;
  currency?: string;
  brandName?: string;
  contactEmail?: string;
  productUrl?: string;
  logoUrl?: string;
  description?: string;
}) {
  try {
    const sql = getDb();
    await ensureTable(sql);

    // If matching by session_id
    if (data.sessionId) {
      const updated = await sql`
        UPDATE sponsor_submissions
        SET status = 'paid',
            payment_id = ${data.paymentId},
            amount_cents = ${data.amountCents ?? 4999},
            currency = ${data.currency ?? 'USD'},
            paid_at = NOW()
        WHERE session_id = ${data.sessionId}
        RETURNING *;
      `;
      if (updated.length > 0) return updated[0];
    }

    // Fallback: If not found or no sessionId, insert as directly paid
    const fallback = await sql`
      INSERT INTO sponsor_submissions (
        brand_name,
        product_url,
        logo_url,
        tag,
        description,
        contact_email,
        session_id,
        payment_id,
        amount_cents,
        currency,
        status,
        paid_at
      ) VALUES (
        ${data.brandName || 'Sponsor Partner'},
        ${data.productUrl || 'https://stickitupx.com'},
        ${data.logoUrl || null},
        'Partner',
        ${data.description || 'Verified sponsor'},
        ${data.contactEmail || 'unknown@example.com'},
        ${data.sessionId || null},
        ${data.paymentId},
        ${data.amountCents ?? 4999},
        ${data.currency ?? 'USD'},
        'paid',
        NOW()
      )
      RETURNING *;
    `;
    return fallback[0];
  } catch (err) {
    console.error("Error marking sponsor submission paid in DB:", err);
    return null;
  }
}

