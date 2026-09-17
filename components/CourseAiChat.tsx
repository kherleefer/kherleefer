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

// "auto" lets the server use its default provider order; the other entries pin
// a specific provider — the server still falls back if that one is unreachable.
const PROVIDER_CHOICES: { value: ProviderChoice; label: string }[] = [
  { value: "auto", label: "Automatic (default)" },
  { value: "gemini", label: "Gemini" },
  { value: "groq", label: "Groq" },
  { value: "mistral", label: "Mistral" },
  { value: "openrouter", label: "Openrouter" },
  { value: "cloudflare", label: "Cloudflare Workers AI" },
  { value: "huggingface", label: "Huggung-Face" },
];

const SUGGESTIONS = [
  "What will I learn in this course?",
  "Is this course beginner friendly?",
  "How do I get started?",
];

export default function CourseAiChat({ course }: { course: Course }) {
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
    className="surface interactive-line p-6 sm:p-8" 
    aria-label="Ask the course assistant" 
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-2xl font-black tracking-tight">
          <Sparkles size={22} /> Ask about this course
        </h2>
        <span className="muted hidden text-xs font-bold uppercase tracking-[0.14em] sm:inline">
          AI assistant
        </span>
      </div>
      <p className="muted mt-3 text-sm leading-6">
        Understand the course, its topics and your learning path before you buy.
        Free preview questions are rate-limited.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="muted flex items-center gap-2 text-xs font-bold">
          Model
          <select
            value={provider}
            onChange={(event) =>
              setProvider(event.target.value as ProviderChoice)
            }
            disabled={sending}
            aria-label="AI model / provider"
            className="border bg-transparent px-2 py-1.5 text-xs outline-none focus:border-[var(--foreground)] disabled:opacity-50"
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
          className="muted inline-flex items-center gap-1.5 border px-2 py-1 text-xs"
          role="status"
        >
          <Sparkles size={12} />
          {sending
            ? "Asking…"
            : lastAnswer
              ? `${lastAnswer.provider}${lastAnswer.model ? ` · ${lastAnswer.model}` : ""} · ${lastAnswer.ms}ms`
              : "Ready"}
        </span>
      </div>

      <div className="mt-5 max-h-[60vh] space-y-4 overflow-y-auto rounded-lg p-4 lg:max-h-[520px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={`gray-400 inline-block max-w-[85%]  rounded-lg px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "surface"
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
            <div className="surface inline-block border px-4 py-3 text-sm">
              <LoaderCircle className="mr-2 inline animate-spin" size={16} />
              Thinking&hellip;
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && !error && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={sending}
              onClick={() => onSuggestionClick(suggestion)}
              className="border px-3 py-2 text-xs font-bold disabled:opacity-50"
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
        className="mt-5 flex gap-3"
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
          rows={2}
          disabled={sending || exhausted}
          placeholder={
            exhausted
              ? "Free preview questions used. Try again later."
              : "Ask about the course..."
          }
          aria-label="Ask about the course"
          className="line flex-1 border bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={sending || exhausted || !input.trim()}
          aria-label="Send question"
          className="flex items-center gap-2 bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] disabled:opacity-50"
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
    </section>
  );
}
