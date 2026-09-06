import { getServerEnv } from "@/lib/serverEnv";

function config() {
  const url = getServerEnv("SUPABASE_URL");
  const key = getServerEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key)
    throw new Error("Supabase server configuration is missing.");
  return { url: url.replace(/\/$/, ""), key };
}

export async function supabaseRequest<T>(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const response = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok)
    throw new Error(
      data?.message || data?.error_description || "Supabase request failed.",
    );
  return data as T;
}

export async function uploadCourseFile(path: string, file: File) {
  const { url, key } = config();
  const response = await fetch(
    `${url}/storage/v1/object/course-materials/${path}`,
    {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "false",
      },
      body: await file.arrayBuffer(),
    },
  );
  if (!response.ok) throw new Error("Course file upload failed.");
}

export async function deleteCourseFile(path: string) {
  await supabaseRequest("/storage/v1/object/remove", {
    method: "POST",
    body: JSON.stringify({ prefixes: [`course-materials/${path}`] }),
  });
}

export async function createCourseMaterialUrl(path: string) {
  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  const data = await supabaseRequest<{ signedURL: string }>(
    `/storage/v1/object/sign/course-materials/${encodedPath}`,
    { method: "POST", body: JSON.stringify({ expiresIn: 900 }) },
  );
  if (!data?.signedURL || typeof data.signedURL !== "string") {
    throw new Error("Supabase did not return a signed material URL.");
  }

  if (/^https?:\/\//i.test(data.signedURL)) return data.signedURL;
  if (data.signedURL.startsWith("/")) {
    return `${config().url}/storage/v1${data.signedURL}`;
  }
  return `${config().url}/storage/v1/${data.signedURL}`;
}
