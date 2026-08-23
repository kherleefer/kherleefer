import { NextResponse } from "next/server";
import { courses } from "@/lib/portfolioData";

export async function GET(request: Request) {
  const secretKey = process.env.FLW_SECRET_KEY;
  const transactionId = new URL(request.url).searchParams.get("transaction_id");
  if (!secretKey || !transactionId) return NextResponse.json({ error: "Payment verification details are missing." }, { status: 400 });

  const response = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`, {
    headers: { Authorization: `Bearer ${secretKey}` },
    cache: "no-store",
  });
  const data = await response.json();
  const transaction = data?.data;
  const course = courses.find((item) => item.id === transaction?.meta?.courseId);
  const isValid = response.ok && data.status === "success" && transaction?.status === "successful" && course && transaction.amount >= course.price && transaction.currency === course.currency;

  if (!isValid) return NextResponse.json({ error: "Payment could not be verified. Please contact support with your payment reference." }, { status: 400 });
  return NextResponse.json({ materialUrl: course.materialUrl, courseTitle: course.title });
}
