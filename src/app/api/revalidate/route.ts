import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SITE_TAG } from "../../../../services/setup";

// The API calls this after the staff change something (products, prices,
// categories, the menu, settings…) or after a new order: the site drops its
// cached pages and data, and makes each page again on its next visit. Only
// with the secret both sides share (REVALIDATE_SECRET here, the same in the
// admin under Settings → Company details).
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, message: "REVALIDATE_SECRET is not set" }, { status: 503 });
  }
  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ ok: false, message: "Wrong secret" }, { status: 401 });
  }
  revalidateTag(SITE_TAG);
  return NextResponse.json({ ok: true, revalidated: SITE_TAG, at: new Date().toISOString() });
}
