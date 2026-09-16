import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/courseData";
import {
  askCourseAi,
  buildCourseAiSystemPrompt,
  isAiConfigured,
  type AiChatMessage,
  type CourseAiContext,
} from "@/lib/aiProvider";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY = 6;
const COURSE_LOOKUP_TIMEOUT_MS = 8000;


const rateLimitStore = new Map<string, number[]>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "";
  return (
    ip ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitStore.set(ip, timestamps);
    return {
      allowed: false as const,
      remaining: 0,
      resetAt: timestamps[0] + WINDOW_MS,
    };
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return {
    allowed: true as const,
    remaining: MAX_REQUESTS_PER_WINDOW - timestamps.length,
    resetAt: null,
  };
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error("Course lookup timed out.")),
          ms,
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function readCourseContext(body: unknown) {
  const record =
    typeof body === "object" && body ? (body as Record<string, unknown>) : {};
  const course =
    typeof record.course === "object" && record.course
      ? (record.course as Record<string, unknown>)
      : {};
  const title =
    typeof course.title === "string" && course.title.trim()
      ? course.title.trim()
      : "";
  const description =
    typeof course.description === "string" && course.description.trim()
      ? course.description.trim()
      : "";
  const category =
    typeof course.category === "string" && course.category.trim()
      ? course.category.trim()
      : "";
  const level =
    typeof course.level === "string" && course.level.trim()
      ? course.level.trim()
      : "";
  const currency =
    typeof course.currency === "string" && course.currency.trim()
      ? course.currency.trim()
      : "";
  const price =
    typeof course.price === "number" && Number.isFinite(course.price)
      ? course.price
      : 0;
  if (!title || !description) return null;
  return { title, description, category, level, price, currency };
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const body = await request.json().catch(() => null);
    const message =
      typeof body?.message === "string"
        ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH)
        : "";
    if (!message)
      return NextResponse.json(
        { error: "Ask a question first." },
        { status: 400 },
      );

    if (!isAiConfigured()) {
      return NextResponse.json(
        {
          error: "The course assistant isn't configured yet. Check back soon.",
        },
        { status: 503 },
      );
    }

    const ip = getClientIp(request);
    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `You have used your ${MAX_REQUESTS_PER_WINDOW} free questions for now. Try again in a few minutes.`,
          remaining: 0,
          resetAt: limit.resetAt,
        },
        { status: 429 },
      );
    }

    // Prefer the database record, but fall back to the course summary the
    // visitor is already viewing when the database is slow or unreachable.
    let context: CourseAiContext | null = null;
    try {
      const course = await withTimeout(
        getCourseBySlug(slug),
        COURSE_LOOKUP_TIMEOUT_MS,
      );
      if (course) {
        context = {
          title: course.title,
          description: course.description,
          category: course.category,
          level: course.level,
          price: course.price,
          currency: course.currency,
        };
      }
    } catch {
      context = null;
    }
    if (!context) context = readCourseContext(body);
    if (!context) {
      return NextResponse.json(
        {
          error:
            "Course details are unavailable right now. Try again in a moment.",
        },
        { status: 422 },
      );
    }

    const rawHistory: unknown[] = Array.isArray(body?.history)
      ? body.history
      : [];
    const history: AiChatMessage[] = rawHistory
      .filter((item): item is AiChatMessage => {
        if (!item || typeof item !== "object") return false;
        const record = item as Record<string, unknown>;
        return (
          (record.role === "user" || record.role === "assistant") &&
          typeof record.content === "string"
        );
      })
      .slice(-MAX_HISTORY);

    // Optional client-side provider preference. askCourseAi validates it and
    // silently falls back to the default order when unknown.
    const override =
      typeof body?.provider === "string" || typeof body?.model === "string"
        ? {
            provider:
              typeof body?.provider === "string" ? body.provider : undefined,
            model: typeof body?.model === "string" ? body.model : undefined,
          }
        : undefined;

    const reply = await askCourseAi(
      buildCourseAiSystemPrompt(context),
      [...history, { role: "user", content: message }],
      override,
    );

    return NextResponse.json({
      reply: reply.text,
      provider: reply.provider,
      model: reply.model,
      remaining: limit.remaining,
      limit: MAX_REQUESTS_PER_WINDOW,
    });
  } catch (error) {
    console.error("Course AI request failed:", error);
    const detail =
      error instanceof Error && error.message ? ` (${error.message})` : "";
    return NextResponse.json(
      {
        error: `The assistant couldn't reply${detail}. Please try again.`,
      },
      { status: 502 },
    );
  }
}