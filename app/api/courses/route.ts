import { NextResponse } from "next/server";
import { supabaseRequestWithMeta } from "@/lib/supabaseAdmin";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  currency: string;
  material_path: string;
};

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const pageSize = Math.min(
      24,
      Math.max(1, Number(searchParams.get("pageSize") || "12")),
    );
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const level = searchParams.get("level")?.trim() || "";
    const filters = [
      search
        ? `or=(title.ilike.*${encodeURIComponent(search)}*,description.ilike.*${encodeURIComponent(search)}*)`
        : "",
      category ? `category=eq.${encodeURIComponent(category)}` : "",
      level ? `level=eq.${encodeURIComponent(level)}` : "",
    ]
      .filter(Boolean)
      .join("&");
    const query = `/rest/v1/courses?select=id,slug,title,description,category,level,price,currency&order=created_at.desc&limit=${pageSize}&offset=${(page - 1) * pageSize}${filters ? `&${filters}` : ""}`;
    const result = await supabaseRequestWithMeta<CourseRow[]>(query, {
      headers: { Prefer: "count=exact" },
    });
    const rows = result.data;
    const total = Number(
      result.headers.get("content-range")?.split("/")[1] || rows.length,
    );
    return NextResponse.json({ courses: rows, total, page, pageSize });
  } catch {
    return NextResponse.json(
      { error: "Courses are temporarily unavailable." },
      { status: 503 },
    );
  }
}
