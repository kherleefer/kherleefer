"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, MessageSquareText, Send, Sparkles } from "lucide-react";
import { type Course } from "@/lib/portfolioData";
import Markdown from "@/components/Markdown";

type ChatMessage = { role: "user" | "assistant"; content: string };

type ProviderChoice =
  | "auto"
  | "gemini"
  | "groq"
  | "mistral"
  | "openrouter"
  | "cloudflare"
  | "huggingface";

type LastAnswer = { provider: string; model: string; ms: number };

type Props = {
  course: Course;
  variant?: "inline" | "drawer";
};

const PROVIDER_CHOICES: { value: ProviderChoice; label: string }[] = [
  { value: "auto", label: "Automatic (default)" },
  { value: "gemini", label: "Gemini" },
  { value: "groq", label: "Groq" },
  { value: "mistral", label: "Mistral" },
  { value: "openrouter", label: "Openrouter" },
  { value: "cloudflare", label: "Cloudflare Workers AI" },
  { value: "huggingface", label: "Hugging Face" },
];

const SUGGESTIONS = [
  "What will I learn in this course?",
  "Is this course beginner friendly?",
  "How do I get started?",
];

export default function CourseAiChat({ course, variant = "inline" }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm here to help you understand this course and get started. Ask me what you'll learn, whether it fits your level, or where to begin.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [provider, setProvider] = useState<ProviderChoice>("auto");
  const [lastAnswer, setLastAnswer] = useState<LastAnswer | null>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || sending) return;

    setMessages((current) => [...current, { role: "user", content: trimmed }]);
    setInput("");
    setError("");
    setSending(true);
    const startedAt = Date.now();
    try {
      const response = await fetch(
        `/api/courses/${encodeURIComponent(course.slug)}/ai`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: messagesRef.current,
            provider: provider === "auto" ? undefined : provider,
            course: {
              title: course.title,
              description: course.description,
              category: course.category,
              level: course.level,
              price: course.price,
              currency: course.currency,
            },
          }),
        },
      );
      const data = await response.json().catch(() => null);
      if (response.status === 429) {
        setError(
          data?.error ||
            "You have used your free questions for now. Try again later.",
        );
        setRemaining(0);
        return;
      }
      if (response.status === 503) {
        setError(
          data?.error ||
            "The course assistant isn't available for this course right now.",
        );
        return;
      }
      if (!response.ok) {
        throw new Error(
          data?.error || "The assistant could not reply right now.",
        );
      }
      setRemaining(typeof data?.remaining === "number" ? data.remaining : null);
      setLastAnswer({
        provider: typeof data?.provider === "string" ? data.provider : "auto",
        model: typeof data?.model === "string" ? data.model : "",
        ms: Date.now() - startedAt,
      });
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data?.reply || "" },
      ]);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "The assistant could not reply right now.",
      );
    } finally {
      setSending(false);
    }
  }

  function onSuggestionClick(suggestion: string) {
    void ask(suggestion);
  }

  const exhausted = remaining !== null && remaining <= 0;

  return (
    <section
      className={
        variant === "drawer"
          ? "flex h-full flex-col bg-[var(--background)]"
          : "surface interactive-line flex flex-col rounded-xl p-6 sm:p-8"
      }
      aria-label="Ask the course assistant"
    >
      {/* ─── Header (always visible) ─────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-md font-black tracking-tight sm:text-2xl">
          <Sparkles size={22} /> Ask AI assistant
        </h2>
      </div>

      {variant === "inline" && (
        <p className="muted mt-3 shrink-0 text-sm leading-6">
          Understand the course, its topics and your learning path before you
          buy. Free preview questions are rate-limited.
        </p>
      )}

      <div className="mt-4 flex shrink-0 flex-nowrap items-center justify-between gap-3">
        <label className="muted flex shrink-0 items-center gap-2 text-xs font-bold">
          Model
          <select
            value={provider}
            onChange={(event) =>
              setProvider(event.target.value as ProviderChoice)
            }
            disabled={sending}
            aria-label="AI model / provider"
            className="rounded-md border bg-transparent px-2 py-1.5 text-xs outline-none focus:border-[var(--foreground)] disabled:opacity-50"
          >
            {PROVIDER_CHOICES.map((choice) => (
              <option
                key={choice.value}
                value={choice.value}
                className="bg-gray-900 text-white"
              >
                {choice.label}
              </option>
            ))}
          </select>
        </label>

        <span
          className="muted inline-flex min-w-0 items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
          role="status"
        >
          <Sparkles size={12} className="shrink-0" />
          <span
            className="truncate"
            title={
              lastAnswer
                ? `${lastAnswer.provider}${lastAnswer.model ? ` · ${lastAnswer.model}` : ""} · ${lastAnswer.ms}ms`
                : undefined
            }
          >
            {sending
              ? "Asking…"
              : lastAnswer
                ? `${lastAnswer.provider}${lastAnswer.model ? ` · ${lastAnswer.model}` : ""} · ${lastAnswer.ms}ms`
                : "Ready"}
          </span>
        </span>
      </div>

      {/* ─── Message list (the ONLY scrolling region) ────────── */}
      <div
        className={
          variant === "drawer"
            ? "mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto rounded-lg p-4"
            : "mt-5 max-h-[60vh] space-y-4 overflow-y-auto rounded-lg p-4 lg:max-h-[520px]"
        }
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={`inline-block max-w-[85%] rounded-lg px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "surface border border-gray-600"
              }`}
            >
              {message.role === "assistant" ? (
                <Markdown>{message.content}</Markdown>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {sending && (
          <div className="text-left">
            <div className="surface inline-block rounded-lg border px-4 py-3 text-sm">
              <LoaderCircle className="mr-2 inline animate-spin" size={16} />
              Thinking&hellip;
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ─── Footer (always visible) ─────────────────────────── */}
      <div className="shrink-0">
        {messages.length === 1 && !error && (
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={sending}
                onClick={() => onSuggestionClick(suggestion)}
                className="rounded-full border px-3 py-2 text-xs font-bold disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm font-semibold" role="alert">
            {error}
          </p>
        )}

        <form
          className="mt-5 flex items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void ask(input);
          }}
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void ask(input);
              }
            }}
            rows={1}
            disabled={sending || exhausted}
            placeholder={
              exhausted
                ? "Free preview questions used. Try again later."
                : "Ask about the course..."
            }
            aria-label="Ask about the course"
            className="line max-h-40 min-h-[44px] flex-1 resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={sending || exhausted || !input.trim()}
            aria-label="Send question"
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[var(--foreground)] px-5 text-sm font-bold text-[var(--background)] disabled:opacity-50"
          >
            <Send size={16} />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>

        {remaining !== null && (
          <p className="muted mt-3 flex items-center gap-2 text-xs">
            <MessageSquareText size={14} />
            {remaining > 0
              ? `${remaining} free question${remaining === 1 ? "" : "s"} left this window.`
              : "No free questions left this window. Try again in a few minutes."}
          </p>
        )}
      </div>
    </section>
  );
}
