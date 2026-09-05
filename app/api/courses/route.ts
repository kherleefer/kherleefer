import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabaseAdmin";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  price: number;
  currency: string;
  material_path: string;
};

export async function GET() {
  try {
    const rows = await supabaseRequest<CourseRow[]>(
      "/rest/v1/courses?select=*&order=created_at.desc",
    );
    return NextResponse.json(
      rows.map(({ material_path, ...course }) => ({
        ...course,
        materialUrl: material_path,
      })),
    );
  } catch {
    return NextResponse.json(
      { error: "Courses are temporarily unavailable." },
      { status: 503 },
    );
  }
}
