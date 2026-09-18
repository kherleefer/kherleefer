"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { type Course } from "@/lib/portfolioData";
import CourseAiChat from "@components/CourseAiChat";

type Props = {
  course: Course;
  variant: "inline" | "drawer";
};

export default function CourseAiChatDock({ course, variant }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "drawer" || !open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [variant, open]);

  if (variant === "inline") {
    return <CourseAiChat course={course} />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask about this course"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg transition-transform active:scale-95"
      >
        <Sparkles size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[var(--background)] shadow-2xl">
            <CourseAiChat
              course={course}
              variant="drawer"
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}