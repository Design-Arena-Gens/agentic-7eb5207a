import { NextRequest, NextResponse } from "next/server";
import { readContent, writeContent, defaultContent } from "../../../lib/content";

export async function GET() {
  try {
    const content = await readContent();
    return NextResponse.json(content, { status: 200 });
  } catch (e) {
    return NextResponse.json(defaultContent, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await writeContent(data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
