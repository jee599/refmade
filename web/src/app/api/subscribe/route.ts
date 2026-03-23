import { google } from "googleapis";
import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function getAuth() {
  const encoded = process.env.GOOGLE_CREDENTIALS;
  if (!encoded) throw new Error("GOOGLE_CREDENTIALS not set");

  const credentials = JSON.parse(Buffer.from(encoded, "base64").toString());

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    scopes: SCOPES,
  });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip, "subscribe", 3, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "waitlist!A:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, new Date().toISOString(), source || "generate"]],
      },
    });

    return Response.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Subscribe error:", message);
    return Response.json({ error: "Subscription failed. Please try again later." }, { status: 500 });
  }
}
