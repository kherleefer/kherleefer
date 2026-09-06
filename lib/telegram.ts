import { getServerEnv } from "@/lib/serverEnv";

export function escapeTelegramHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] || character,
  );
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
) {
  const botToken = getServerEnv("TELEGRAM_BOT_TOKEN");
  if (!botToken) throw new Error("TELEGRAM_BOT_TOKEN is missing.");

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    },
  );
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.ok) {
    throw new Error(data?.description || "Telegram message failed.");
  }
  return data;
}

export function getTelegramAnnouncementChat() {
  return getServerEnv("TELEGRAM_CHANNEL_USERNAME");
}
