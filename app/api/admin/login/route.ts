import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/adminAuth";
import { getServerEnv } from "@/lib/serverEnv";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const expected = getServerEnv("ADMIN_PASSWORD");
  if (!expected || password !== expected)
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set("course_admin_session", createAdminSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
