import { NextResponse } from "next/server";
/** GET /api/health — basic health check */
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
