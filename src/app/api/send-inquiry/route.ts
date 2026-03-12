import { NextResponse } from "next/server";

interface InquiryPayload {
  name: string;
  email: string;
  interestedIn: string;
  message: string;
  gdprConsent?: boolean;
}

export async function POST(request: Request) {
  try {
    const data: InquiryPayload = await request.json();

    const { name, email, interestedIn, message, gdprConsent } = data;

    // basic validation
    if (
      !name ||
      !email ||
      !interestedIn ||
      !message ||
      gdprConsent !== true
    ) {
      return NextResponse.json(
        { error: "Invalid input or GDPR consent not given" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const payload = {
      name,
      email,
      interestedIn,
      message,
      source: "website",
    };

    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Webhook error", resp.status, text);
      return NextResponse.json(
        { error: "Failed to forward inquiry" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error in send-inquiry route", err);
    return NextResponse.json({ error: "Invalid JSON or server error" }, { status: 400 });
  }
}
