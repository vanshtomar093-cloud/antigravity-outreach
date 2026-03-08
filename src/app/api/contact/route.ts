import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, interest, message, gdpr, type, source } = body;

    // Server-side validation
    if (!name || !email || !gdpr) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const n8nUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nUrl) {
      console.error('N8N_WEBHOOK_URL is not defined in environment variables');
      // For development, we'll return a 200 even if the URL is missing but log the error
      return NextResponse.json(
        { success: true, message: 'Simulation: Webhook URL missing, but form submitted successfully.' },
        { status: 200 }
      );
    }

    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        interest,
        message,
        gdpr,
        type: type || 'contact',
        source: source || 'jenkins-group-landing',
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing inquiry' },
      { status: 500 }
    );
  }
}
