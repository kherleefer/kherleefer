import { NextResponse } from "next/server";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { getStoredCourse } from "@/lib/courseData";
import { createCourseMaterialUrl } from "@/lib/supabaseAdmin";

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
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const channel = process.env.TELEGRAM_CHANNEL_USERNAME;
    if (!botToken || !channel)
      return NextResponse.json(
        {
          error:
            "Free Telegram access is temporarily unavailable. Please try again later or choose paid access.",
        },
        { status: 503 },
      );

    const body = await request.json().catch(() => null);
    const course =
      typeof body?.courseId === "string"
        ? await getStoredCourse(body.courseId)
        : undefined;
    const user = body?.telegramUser as Record<string, unknown> | undefined;
    if (!course || !user || !isValidTelegramLogin(user, botToken)) {
      return NextResponse.json(
        {
          error:
            "We could not confirm your Telegram account. Please sign in with Telegram again.",
        },
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
    if (!telegramResponse.ok || !telegramData.ok) {
      console.error("Telegram getChatMember failed", telegramData);
      return NextResponse.json(
        {
          error:
            "We could not check your channel membership right now. Please try again in a moment.",
        },
        { status: 502 },
      );
    }
    const member = telegramData?.result;
    const allowed =
      member &&
      (["creator", "administrator", "member"].includes(member.status) ||
        (member.status === "restricted" && member.is_member === true));
    if (!allowed)
      return NextResponse.json(
        { error: "Join the Telegram channel before accessing this material." },
        { status: 403 },
      );

    return NextResponse.json({
      materialUrl: await createCourseMaterialUrl(course.material_path),
    });
  } catch (error) {
    console.error("Telegram course access failed", error);
    return NextResponse.json(
      {
        error: "We could not unlock this material right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
