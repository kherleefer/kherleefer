import { NextResponse } from "next/server";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { courses } from "@/lib/portfolioData";

function isValidTelegramLogin(user: Record<string, unknown>, botToken: string) {
  const receivedHash = typeof user.hash === "string" ? user.hash : "";
  const values = Object.entries(user)
    .filter(([key]) => key !== "hash")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secret = createHash("sha256").update(botToken).digest();
  const expectedHash = createHmac("sha256", secret)
    .update(values)
    .digest("hex");
  return (
    receivedHash.length === expectedHash.length &&
    timingSafeEqual(Buffer.from(receivedHash), Buffer.from(expectedHash))
  );
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channel = process.env.TELEGRAM_CHANNEL_USERNAME;
  if (!botToken || !channel)
    return NextResponse.json(
      { error: "Telegram access is not configured yet." },
      { status: 503 },
    );

  const body = await request.json().catch(() => null);
  const course = courses.find((item) => item.id === body?.courseId);
  const user = body?.telegramUser as Record<string, unknown> | undefined;
  if (!course || !user || !isValidTelegramLogin(user, botToken)) {
    return NextResponse.json(
      { error: "Telegram identity could not be verified." },
      { status: 401 },
    );
  }

  const authDate = Number(user.auth_date);
  if (!authDate || Math.floor(Date.now() / 1000) - authDate > 86400) {
    return NextResponse.json(
      { error: "Telegram login has expired. Please sign in again." },
      { status: 401 },
    );
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${encodeURIComponent(channel)}&user_id=${encodeURIComponent(String(user.id))}`,
  );
  const telegramData = await telegramResponse.json();
  const member = telegramData?.result;
  const allowed =
    telegramData?.ok &&
    member &&
    ["creator", "administrator", "member"].includes(member.status);
  if (!allowed)
    return NextResponse.json(
      { error: "Join the Telegram channel before accessing this material." },
      { status: 403 },
    );

  return NextResponse.json({ materialUrl: course.materialUrl });
}
