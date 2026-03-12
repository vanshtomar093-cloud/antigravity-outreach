import { NextResponse } from "next/server";

interface UnsubscribePayload {
  email: string;
}

export async function POST(request: Request) {
  try {
    const data: UnsubscribePayload = await request.json();
    const { email } = data;

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
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
      email,
      action: "unsubscribe",
      source: "website",
      timestamp: new Date().toISOString(),
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
        { error: "Failed to process unsubscribe request" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error in unsubscribe route", err);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}
