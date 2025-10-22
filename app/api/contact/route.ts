import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const payload = Object.fromEntries(formData.entries());
    console.log("Contact message", payload);
    // In production, integrate email provider (Resend, SES) or Slack webhook
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
