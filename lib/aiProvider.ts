import { getServerEnv } from "@/lib/serverEnv";

export type AiChatMessage = { role: "user" | "assistant"; content: string };

export type CourseAiContext = {
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  currency: string;
};

export function buildCourseAiSystemPrompt(course: CourseAiContext) {
  return [
    `You are the AI course assistant for "${course.title}" on Kherleefer's learning platform.`,
    `Course level: ${course.level}. Category: ${course.category}.`,
    `Official description: ${course.description}`,
    `Price: ${course.price} ${course.currency} paid once, or free for verified Telegram channel members.`,
    "",
    "Help learners understand what this course covers, what they will be able to do afterwards, and how to get started. Answer questions about the course topics, prerequisites, level, and related learning paths.",
    "Be concise (2-4 short paragraphs or bullet points), encouraging, and honest. If the answer is not available from the course information, say so and point them to useful starting points.",
    "Never claim to provide or summarize the full paid material. Never share private course files, never reveal you model and never ask learners for payment credentials.",
  ].join("\n");
}

type Provider = "gemini" | "groq" | "cerebras" | "cloudflare";

type ProviderConfig = { provider: Provider; model: string };

const PROVIDER_PRIORITY: Provider[] = [
  "gemini",
  "groq",
  "cerebras",
  "cloudflare",
];

function resolveModelFor(provider: Provider, override: string): string {
  switch (provider) {
    case "gemini":
      return getServerEnv("AI_GEMINI_MODEL")?.trim() || override || "gemini-3.6-flash";
    case "groq":
      return getServerEnv("AI_GROQ_MODEL")?.trim() || override || "openai/gpt-oss-20b";
    case "cerebras":
      return getServerEnv("AI_CEREBRAS_MODEL")?.trim() || override || "qwen-3.8-27b";
    case "cloudflare":
      return (
        getServerEnv("AI_CLOUDFLARE_MODEL")?.trim() || override ||
        "@cf/meta/llama-3.1-8b-instruct"
      );
  }
}

export function getConfiguredAiProviders(): ProviderConfig[] {
  const override = (getServerEnv("AI_MODEL") || "").trim();
  const preferred = (getServerEnv("AI_PROVIDER") || "")
    .trim()
    .toLowerCase() as Provider;
  const ordered: Provider[] = PROVIDER_PRIORITY.includes(preferred)
    ? [preferred, ...PROVIDER_PRIORITY.filter((item) => item !== preferred)]
    : [...PROVIDER_PRIORITY];
  const has = (names: string[]) =>
    names.every((name) => getServerEnv(name));

  const providers: ProviderConfig[] = [];
  for (const provider of ordered) {
    const ready =
      provider === "gemini"
        ? has(["GEMINI_API_KEY"])
        : provider === "groq"
          ? has(["GROQ_API_KEY"])
          : provider === "cerebras"
            ? has(["CEREBRAS_API_KEY"])
            : has(["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID"]);
    if (!ready) continue;

    providers.push({
      provider,
      // Legacy AI_MODEL applies only to an explicitly preferred provider.
      // Never reuse one provider's model ID for the fallback providers.
      model: resolveModelFor(provider, provider === preferred ? override : ""),
    });
  }
  return providers;
}

export function getConfiguredAiProvider(): ProviderConfig | null {
  return getConfiguredAiProviders()[0] || null;
}

export function isAiConfigured() {
  return getConfiguredAiProviders().length > 0;
}

const PROVIDER_TIMEOUT_MS =
  Number(getServerEnv("AI_TIMEOUT_MS")) || 45000;

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  ms = PROVIDER_TIMEOUT_MS,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `AI provider request timed out after ${Math.round(ms / 1000)}s.`,
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAiCompatible(
  baseUrl: string,
  apiKey: string,
  model: string,
  system: string,
  messages: AiChatMessage[],
) {
  const response = await fetchWithTimeout(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, ...messages],
      temperature: 0.6,
      max_tokens: 600,
      // Keep the short course-answer budget for output rather than reasoning.
      ...(baseUrl === "https://api.cerebras.ai" && model === "qwen-3.8-27b"
        ? { reasoning_effort: "none" }
        : {}),
    }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.error?.message || `AI request failed (${response.status}).`,
    );
  }
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim())
    throw new Error("The AI provider returned an empty response.");
  return text.trim();
}

async function callGemini(
  apiKey: string,
  model: string,
  system: string,
  messages: AiChatMessage[],
) {
  const response = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content }],
        })),
        generationConfig: { temperature: 0.6, maxOutputTokens: 600 },
      }),
    },
  );
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.error?.message || `Gemini request failed (${response.status}).`,
    );
  }
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text)
    .join("");
  if (typeof text !== "string" || !text.trim())
    throw new Error("Gemini returned an empty response.");
  return text.trim();
}

async function callCloudflare(
  apiToken: string,
  accountId: string,
  model: string,
  system: string,
  messages: AiChatMessage[],
) {
  if (!/^@[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(model)) {
    throw new Error("Invalid Workers AI model ID. Use a catalog ID such as @cf/meta/llama-3.1-8b-instruct.");
  }
  const response = await fetchWithTimeout(
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId.trim())}/ai/run/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: system }, ...messages],
      }),
    },
  );
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.success === false) {
    throw new Error(
      data?.errors?.[0]?.message ||
        `Workers AI request failed (${response.status}).`,
    );
  }
  const text =
    typeof data?.result?.response === "string" ? data.result.response : null;
  if (typeof text !== "string" || !text.trim())
    throw new Error("Workers AI returned an empty response.");
  return text.trim();
}

async function callProvider(
  config: ProviderConfig,
  system: string,
  messages: AiChatMessage[],
) {
  switch (config.provider) {
    case "gemini":
      return callGemini(
        getServerEnv("GEMINI_API_KEY")!,
        config.model,
        system,
        messages,
      );
    case "groq":
      return callOpenAiCompatible(
        "https://api.groq.com/openai",
        getServerEnv("GROQ_API_KEY")!,
        config.model,
        system,
        messages,
      );
    case "cerebras":
      return callOpenAiCompatible(
        "https://api.cerebras.ai",
        getServerEnv("CEREBRAS_API_KEY")!,
        config.model,
        system,
        messages,
      );
    case "cloudflare":
      return callCloudflare(
        getServerEnv("CLOUDFLARE_API_TOKEN")!,
        getServerEnv("CLOUDFLARE_ACCOUNT_ID")!,
        config.model,
        system,
        messages,
      );
  }
  throw new Error("Unsupported AI provider.");
}

export type AiProviderOverride = {
  provider?: string;
  model?: string;
};

export type AiReply = {
  text: string;
  provider: Provider;
  model: string;
};

function isProvider(value: unknown): value is Provider {
  return (
    value === "gemini" ||
    value === "groq" ||
    value === "cerebras" ||
    value === "cloudflare"
  );
}

export async function askCourseAi(
  system: string,
  messages: AiChatMessage[],
  override?: AiProviderOverride,
): Promise<AiReply> {
  let providers = getConfiguredAiProviders();
  if (providers.length === 0) throw new Error("No AI provider is configured.");

  // When the client picks a provider (and optionally a model), try that one
  // first. Fall back to the remaining configured providers if it fails.
  const requestedProvider = isProvider(override?.provider)
    ? override?.provider
    : null;
  if (requestedProvider) {
    const requested = providers.find(
      (config) => config.provider === requestedProvider,
    );
    if (requested) {
      const model =
        typeof override?.model === "string" && override.model.trim()
          ? override.model.trim()
          : requested.model;
      providers = [
        { provider: requested.provider, model },
        ...providers.filter(
          (config) => config.provider !== requestedProvider,
        ),
      ];
    }
  }

  // Try every configured provider in priority order so a single provider
  // outage or network timeout does not break the assistant.
  let lastError: unknown = null;
  for (const config of providers) {
    try {
      const text = await callProvider(config, system, messages);
      return { text, provider: config.provider, model: config.model };
    } catch (error) {
      lastError = error;
      console.error(`AI provider "${config.provider}" failed`, error);
    }
  }
  if (lastError instanceof Error) throw lastError;
  throw new Error("All AI providers failed.");
}