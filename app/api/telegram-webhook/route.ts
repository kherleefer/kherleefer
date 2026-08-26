import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return NextResponse.json({ error: "No bot token" }, { status: 500 });

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
        const chatId = chatMemberUpdate.chat.id; // The channel's internal broadcast ID

        
        const welcomeText = `*Welcome to the community, ${firstName}!* \n\n` +
                            `Great to have you here. If you joined to unlock our premium portfolio courses for free, head back over to our website portal to verify your account!\n\n` +
                            `*Happy learning and coding!*`;
 
        const telegramApiUrl = `https://telegram.org{botToken}/sendMessage`;

        await fetch(telegramApiUrl, {
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
    return NextResponse.json({ ok: true }); 
  }
}
