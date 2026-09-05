"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, LockKeyhole, Send } from "lucide-react";
import { courses, type Course } from "@/lib/portfolioData";

type TelegramAuth = {
  id: number;
  first_name: string;
  username?: string;
  auth_date: number;
  hash: string;
};

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramAuth) => void;
  }
}

function formatPrice(course: Course) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: course.currency,
    maximumFractionDigits: 0,
  }).format(course.price);
}

export default function CoursesClient() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [accessMode, setAccessMode] = useState<"paid" | "free">("paid");
  const [telegramUser, setTelegramUser] = useState<TelegramAuth | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string>("");
  const [telegramWidgetState, setTelegramWidgetState] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [telegramWidgetAttempt, setTelegramWidgetAttempt] = useState(0);
  const [loading, setLoading] = useState(false);

  const telegramBotUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  const telegramChannelUrl =
    process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL ||
    "https://t.me/duniyar_computer";

  useEffect(() => {
    window.onTelegramAuth = (user) => {
      setTelegramUser(user);
      setTelegramWidgetState("ready");
      setStatus(
        "Telegram account connected. Verify your channel membership to continue.",
      );
    };
    return () => {
      delete window.onTelegramAuth;
    };
  }, []);

  useEffect(() => {
    if (!selectedCourse || telegramUser || !telegramBotUsername) return;

    setTelegramWidgetState("loading");
    const container = document.getElementById("telegram-login");
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", telegramBotUsername);
    script.setAttribute("data-size", "medium");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    const timeout = window.setTimeout(() => {
      if (!container?.querySelector("iframe")) {
        setTelegramWidgetState("error");
        setStatus(
          "Telegram did not display its sign-in button. Check the bot username, BotFather domain, or browser ad blockers.",
        );
      }
    }, 6000);
    script.addEventListener("load", () => setTelegramWidgetState("ready"));
    script.addEventListener("error", () => {
      window.clearTimeout(timeout);
      setTelegramWidgetState("error");
      setStatus(
        "Telegram login could not load. Disable ad blockers and confirm the bot username and domain in BotFather.",
      );
    });
    if (container) container.replaceChildren(script);

    return () => {
      window.clearTimeout(timeout);
      script.remove();
    };
  }, [
    selectedCourse,
    telegramUser,
    telegramBotUsername,
    telegramWidgetAttempt,
  ]);

  async function startPayment(course: Course) {
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch("/api/courses/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, email }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to start checkout.");
      window.location.href = data.paymentLink;
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unable to start checkout.",
      );
      setLoading(false);
    }
  }

  async function verifyTelegramAccess() {
    if (!selectedCourse || !telegramUser) return;
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch("/api/courses/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: selectedCourse.id, telegramUser }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Membership could not be verified.");
      window.location.href = data.materialUrl;
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Membership could not be verified.",
      );
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-2xl">
        <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
          Learn with Kherleefer
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
          Build skills that ship.
        </h1>
        <p className="muted mt-6 text-lg leading-8">
          Practical course material for developers who want to make real
          products, from their first interface to their first blockchain system.
        </p>
      </header>

      <section
        className="mt-14 grid gap-5 md:grid-cols-3 "
        aria-label="Available courses"
      >
        {courses.map((course) => (
          <article
            key={course.id}
            className="surface interactive-line flex flex-col border p-6 rounded-lg"
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em]">
              <span className="muted">{course.level}</span>
              <span>{formatPrice(course)}</span>
            </div>
            <h2 className="mt-12 text-2xl font-black tracking-tight">
              {course.title}
            </h2>
            <p className="muted mt-4 flex-1 text-sm leading-7">
              {course.description}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCourse(course);
                setAccessMode("paid");
                setStatus("");
              }}
              className="mt-8 flex items-center justify-between border-t pt-4 text-left text-sm font-bold"
            >
              Choose course <ArrowUpRight size={18} />
            </button>
          </article>
        ))}
      </section>

      <p className="muted mt-12 flex items-center gap-2 text-sm">
        <Send size={16} /> Telegram members can access the material for free.
      </p>

      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-dialog-title"
        >
          <div className="surface w-full max-w-lg border p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="muted text-xs font-bold uppercase tracking-[0.16em]">
                  Selected course
                </p>
                <h2
                  id="course-dialog-title"
                  className="mt-2 text-2xl font-black"
                >
                  {selectedCourse.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close course options"
                onClick={() => setSelectedCourse(null)}
                className="text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="mt-8">
              <div
                className="grid grid-cols-2 border-b"
                role="tablist"
                aria-label="Course access options"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={accessMode === "paid"}
                  onClick={() => {
                    setAccessMode("paid");
                    setStatus("");
                  }}
                  className={`border-b-2 px-3 pb-3 text-left text-sm font-bold ${accessMode === "paid" ? "border-[var(--foreground)]" : "muted border-transparent"}`}
                >
                  Pay with Flutterwave
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={accessMode === "free"}
                  onClick={() => {
                    setAccessMode("free");
                    setStatus("");
                  }}
                  className={`border-b-2 px-3 pb-3 text-left text-sm font-bold ${accessMode === "free" ? "border-[var(--foreground)]" : "muted border-transparent"}`}
                >
                  Free Telegram access
                </button>
              </div>

              {accessMode === "paid" ? (
                <div className="mt-6 grid gap-3" role="tabpanel">
                  <p className="muted text-sm leading-6">
                    Pay once and open the course material after Flutterwave
                    confirms your transaction.
                  </p>
                  <label
                    className="muted text-sm font-semibold"
                    htmlFor="course-email"
                  >
                    Email for your receipt
                  </label>
                  <input
                    id="course-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="line border bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
                  />
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => startPayment(selectedCourse)}
                    className="flex items-center justify-between bg-[var(--foreground)] px-4 py-3 text-left text-sm font-bold text-[var(--background)] disabled:opacity-50"
                  >
                    <span>
                      <LockKeyhole className="mr-2 inline" size={16} /> Pay{" "}
                      {formatPrice(selectedCourse)} with Flutterwave
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="mt-6" role="tabpanel">
                  <div className="flex items-center gap-3">
                    <Send size={18} />
                    <h3 className="text-sm font-bold">
                      Free access for channel members
                    </h3>
                  </div>
                  <p className="muted mt-2 text-sm leading-6">
                    Join the channel, then use the Telegram button below to
                    identify your account. We check your membership securely
                    before opening the material.
                  </p>
                  <a
                    href={telegramChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-bold underline underline-offset-4"
                  >
                    Join the Telegram channel
                  </a>
                  {!telegramBotUsername ? (
                    <p className="muted mt-4 text-xs">
                      Telegram login is not configured yet. You can still pay
                      for this course.
                    </p>
                  ) : telegramUser ? (
                    <div className="mt-4">
                      <p className="text-sm font-bold">
                        <Check className="mr-1 inline" size={16} /> Signed in as{" "}
                        {telegramUser.first_name}
                      </p>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={verifyTelegramAccess}
                        className="mt-3 border px-4 py-3 text-sm font-bold disabled:opacity-50"
                      >
                        Verify channel membership
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5 border p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em]">
                        Step 2: Sign in
                      </p>
                      <div
                        id="telegram-login"
                        className="mt-3 min-h-10"
                        aria-live="polite"
                      />
                      {telegramWidgetState === "loading" && (
                        <p className="muted mt-2 text-xs">
                          Loading secure Telegram sign-in...
                        </p>
                      )}
                      {telegramWidgetState === "error" && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold">
                            The Telegram button could not load.
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              setTelegramWidgetAttempt((attempt) => attempt + 1)
                            }
                            className="mt-3 border px-3 py-2 text-xs font-bold"
                          >
                            Try again
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {status && (
              <p className="mt-5 text-sm font-semibold" role="alert">
                {status}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
