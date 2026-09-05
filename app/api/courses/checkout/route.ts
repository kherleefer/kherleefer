import { NextResponse } from "next/server";
import { getStoredCourse } from "@/lib/courseData";

export async function POST(request: Request) {
  const secretKey = process.env.FLW_SECRET_KEY;
  if (!secretKey)
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 },
    );

  const body = await request.json().catch(() => null);
  const course =
    typeof body?.courseId === "string"
      ? await getStoredCourse(body.courseId)
      : undefined;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!course || !email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Choose a course and provide a valid email." },
      { status: 400 },
    );
  }

  const reference = `course-${course.id}-${crypto.randomUUID()}`;
  const response = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: reference,
      amount: course.price,
      currency: course.currency,
      redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin}/courses/payment-complete`,
      customer: { email },
      customizations: {
        title: course.title,
        description: `Course material: ${course.title}`,
      },
      meta: { courseId: course.id },
    }),
  });
  const data = await response.json();
  if (!response.ok || data.status !== "success" || !data.data?.link) {
    return NextResponse.json(
      { error: "Flutterwave could not start checkout." },
      { status: 502 },
    );
  }

  return NextResponse.json({ paymentLink: data.data.link });
}
