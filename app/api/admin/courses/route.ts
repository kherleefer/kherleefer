import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  deleteCourseFile,
  supabaseRequest,
  uploadCourseFile,
} from "@/lib/supabaseAdmin";
import {
  escapeTelegramHtml,
  getTelegramAnnouncementChat,
  sendTelegramMessage,
} from "@/lib/telegram";
import { getServerEnv } from "@/lib/serverEnv";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const form = await request.formData();
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const category = String(form.get("category") || "Programming").trim();
    const level = String(form.get("level") || "").trim();
    const currency = String(form.get("currency") || "NGN")
      .trim()
      .toUpperCase();
    const price = Number(form.get("price"));
    const file = form.get("file");
    if (
      !title ||
      !description ||
      !level ||
      !category ||
      !Number.isFinite(price) ||
      price < 0 ||
      !(file instanceof File) ||
      file.size === 0
    ) {
      return NextResponse.json(
        { error: "Complete every field and select a course file." },
        { status: 400 },
      );
    }

    const slug = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;
    const materialPath = `${slug}/${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    await uploadCourseFile(materialPath, file);
    const rows = await supabaseRequest<Record<string, unknown>[]>(
      "/rest/v1/courses",
      {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          slug,
          title,
          description,
          category,
          level,
          price: Math.round(price),
          currency,
          material_path: materialPath,
        }),
      },
    );
    const channel = getTelegramAnnouncementChat();
    if (channel) {
      const courseUrl = `${getServerEnv("NEXT_PUBLIC_SITE_URL") || new URL(request.url).origin}/courses`;
      await sendTelegramMessage(
        channel,
        `<b>New course material available</b>\n\n<b>${escapeTelegramHtml(title)}</b>\n${escapeTelegramHtml(description)}\n\nCategory: ${escapeTelegramHtml(category)}\nLevel: ${escapeTelegramHtml(level)}\n\n<a href="${courseUrl}">View the course</a>`,
      ).catch((error) => console.error("Course announcement failed", error));
    }
    return NextResponse.json({ course: rows?.[0] || rows }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error && error.message === "Unauthorized"
        ? "Unauthorized"
        : "Could not save the course.";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const courses = await supabaseRequest<Record<string, unknown>[]>(
      "/rest/v1/courses?select=*&order=created_at.desc",
    );
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message === "Unauthorized"
            ? "Unauthorized"
            : "Could not load courses.",
      },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 500,
      },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const form = await request.formData();
    const id = String(form.get("id") || "");
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const category = String(form.get("category") || "Programming").trim();
    const level = String(form.get("level") || "").trim();
    const currency = String(form.get("currency") || "NGN")
      .trim()
      .toUpperCase();
    const price = Number(form.get("price"));
    if (
      !id ||
      !title ||
      !description ||
      !level ||
      !category ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return NextResponse.json(
        { error: "Complete every course field." },
        { status: 400 },
      );
    }
    const existing = await supabaseRequest<Record<string, unknown>[]>(
      `/rest/v1/courses?id=eq.${encodeURIComponent(id)}&select=*`,
    );
    const course = existing[0];
    if (!course)
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    let materialPath = String(course.material_path);
    const file = form.get("file");
    if (file instanceof File && file.size > 0) {
      materialPath = `${course.slug}/${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
      await uploadCourseFile(materialPath, file);
    }
    const rows = await supabaseRequest<Record<string, unknown>[]>(
      `/rest/v1/courses?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          title,
          description,
          category,
          level,
          price: Math.round(price),
          currency,
          material_path: materialPath,
          updated_at: new Date().toISOString(),
        }),
      },
    );
    if (materialPath !== course.material_path)
      await deleteCourseFile(String(course.material_path));
    return NextResponse.json({ course: rows[0] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message === "Unauthorized"
            ? "Unauthorized"
            : "Could not update the course.",
      },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 500,
      },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const id = new URL(request.url).searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { error: "Course id is required." },
        { status: 400 },
      );
    const existing = await supabaseRequest<Record<string, unknown>[]>(
      `/rest/v1/courses?id=eq.${encodeURIComponent(id)}&select=material_path`,
    );
    if (!existing[0])
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    await supabaseRequest(`/rest/v1/courses?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    await deleteCourseFile(String(existing[0].material_path));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message === "Unauthorized"
            ? "Unauthorized"
            : "Could not delete the course.",
      },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 500,
      },
    );
  }
}
