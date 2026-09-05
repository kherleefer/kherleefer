import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getServerEnv } from "@/lib/serverEnv";

const COOKIE_NAME = "course_admin_session";

function signature(value: string) {
  const secret = getServerEnv("ADMIN_SESSION_SECRET");
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is missing.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSession() {
  const timestamp = String(Date.now());
  const value = `${timestamp}.${signature(timestamp)}`;
  return value;
}

export function isValidAdminSession(value: string | undefined) {
  if (!value) return false;
  const [timestamp, provided] = value.split(".");
  if (
    !timestamp ||
    !provided ||
    Date.now() - Number(timestamp) > 1000 * 60 * 60 * 24 * 7
  )
    return false;
  const expected = signature(timestamp);
  return (
    provided.length === expected.length &&
    timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
  );
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(COOKIE_NAME)?.value))
    throw new Error("Unauthorized");
}

export { COOKIE_NAME };
