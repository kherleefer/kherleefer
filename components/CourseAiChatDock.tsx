"use client";

import { useEffect, useState } from "react";
import { MessageSquareText, X } from "lucide-react";
import { type Course } from "@/lib/portfolioData";
import CourseAiChat from "@components/CourseAiChat";

type Props = {
  course: Course;
  variant: "inline" | "drawer";
};

export default function CourseAiChatDock({ course, variant }: Props) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open
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
      {/* Floating action button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask about this course"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg transition-transform active:scale-95"
      >
        <MessageSquareText size={22} />
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative z-10 h-full w-full max-w-md overflow-y-auto bg-[var(--background)] shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-black uppercase tracking-[0.14em]">
                Course assistant
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="muted p-1"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <CourseAiChat course={course} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}