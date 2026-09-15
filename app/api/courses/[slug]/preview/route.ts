import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { getCourseBySlug } from "@/lib/courseData";
import { readCourseMaterialFile } from "@/lib/supabaseAdmin";

// Roughly one sixth of the material's pages are exposed publicly as a preview.
const PREVIEW_PAGE_DIVISOR = 6;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);
    if (!course)
      return NextResponse.json(
        { error: "Course not found." },
        { status: 404 },
      );

    if (!/\.pdf$/i.test(course.material_path)) {
      return NextResponse.json(
        { error: "A preview is only available for PDF materials." },
        { status: 415 },
      );
    }

    const materialResponse = await readCourseMaterialFile(course.material_path);
    if (!materialResponse.ok) throw new Error("Material could not be read.");

    const source = await PDFDocument.load(
      await materialResponse.arrayBuffer(),
    );
    const totalPages = source.getPageCount();
    if (totalPages === 0) {
      return NextResponse.json(
        { error: "This material has no pages to preview." },
        { status: 404 },
      );
    }

    const previewPageCount = Math.max(
      1,
      Math.ceil(totalPages / PREVIEW_PAGE_DIVISOR),
    );

    const preview = await PDFDocument.create();
    const pages = await preview.copyPages(
      source,
      Array.from({ length: previewPageCount }, (_, index) => index),
    );
    pages.forEach((page) => preview.addPage(page));

    const bytes = await preview.save();
    const pdfBytes = new Uint8Array(bytes);
    return new NextResponse(
      new Blob([pdfBytes], { type: "application/pdf" }),
      {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="preview-${slug}.pdf"`,
          "Cache-Control": "public, max-age=300",
          "Content-Length": String(pdfBytes.byteLength),
          "X-Preview-Pages": String(previewPageCount),
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Preview is temporarily unavailable." },
      { status: 500 },
    );
  }
}

