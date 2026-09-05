import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseRequest, uploadCourseFile } from "@/lib/supabaseAdmin";

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
    const rows = await supabaseRequest("/rest/v1/courses", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        slug,
        title,
        description,
        level,
        price: Math.round(price),
        currency,
        material_path: materialPath,
      }),
    });
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
