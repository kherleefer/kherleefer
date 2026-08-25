import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return NextResponse.json({ error: "No bot token" }, { status: 500 });

  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: true });

    // Look for a chat event where a new member joins the group/channel
    const chatMemberUpdate = body.chat_member;
    
    if (chatMemberUpdate) {
      const newStatus = chatMemberUpdate.new_chat_member?.status;
      const oldStatus = chatMemberUpdate.old_chat_member?.status;

      // Check if the user went from NOT a member to being a MEMBER/ADMINISTRATOR
      const isNewJoin = 
        ["member", "administrator", "creator"].includes(newStatus) && 
        !["member", "administrator", "creator"].includes(oldStatus);

      if (isNewJoin) {
        const user = chatMemberUpdate.new_chat_member.user;
        const firstName = user.first_name || "Developer";
        const chatId = chatMemberUpdate.chat.id; // The channel's internal ID

        // The welcome message template
        const welcomeText = ` *Welcome to the community, ${firstName}!* \n\n` +
                            `Great to have you here. If you joined to unlock our premium portfolio courses for free, head back over to our website portal to verify your account!\n\n` +
                            ` *Happy learning and coding!*`;

        // Send the message directly into the channel feed
        await fetch(`https://telegram.org{botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeText,
            parse_mode: "Markdown",
          }),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ ok: true }); // Always return 200 OK so Telegram doesn't retry infinitely
  }
}
