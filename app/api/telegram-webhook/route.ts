import { NextResponse } from "next/server";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken)
    return NextResponse.json({ error: "No bot token" }, { status: 500 });

  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: true });

    const chatMemberUpdate = body.chat_member_updated || body.chat_member;

    if (chatMemberUpdate) {
      const newStatus = chatMemberUpdate.new_chat_member?.status;
      const oldStatus = chatMemberUpdate.old_chat_member?.status;

      const isNewJoin =
        ["member", "administrator", "creator"].includes(newStatus) &&
        !["member", "administrator", "creator"].includes(oldStatus);

      if (isNewJoin) {
        const user = chatMemberUpdate.new_chat_member.user;
        const firstName = user.first_name || "Developer";
        const chatId = chatMemberUpdate.chat.id;

        const welcomeText = `<b>Welcome to the community, ${escapeTelegramHtml(firstName)}!</b>\n\nIf you joined to unlock course materials for free, return to the website and verify your membership.\n\nHappy learning and coding!`;
        await sendTelegramMessage(chatId, welcomeText);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ ok: true });
  }
}
