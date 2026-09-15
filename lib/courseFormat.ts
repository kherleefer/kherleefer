import type { Course } from "@/lib/portfolioData";

export function formatCoursePrice(
  course: Pick<Course, "price" | "currency">,
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: course.currency,
    maximumFractionDigits: 0,
  }).format(course.price);
}