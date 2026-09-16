"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Send, Share2 } from "lucide-react";
import { type Course } from "@/lib/portfolioData";
import { formatCoursePrice } from "@/lib/courseFormat";
import { copyToClipboard, getCourseShareUrl } from "@/lib/courseShare";
import CourseAccessDialog from "@components/CourseAccessDialog";
import CoursePreview from "@components/CoursePreview";
import CourseAiChat from "@components/CourseAiChat";

export default function CourseDetailClient({ course }: { course: Course }) {
  const [accessOpen, setAccessOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  async function copyLink() {
    const copied = await copyToClipboard(getCourseShareUrl(course.slug));
    if (!copied) return;
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2000);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/courses"
        className="muted text-sm font-bold underline underline-offset-4"
      >
        &larr; All courses
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
          {course.category} &middot; {course.level}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
          {course.title}
        </h1>
        <p className="muted mt-6 text-lg leading-8">{course.description}</p>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-2xl font-black">{formatCoursePrice(course)}</span>
        <span className="muted text-sm">
          Pay once for lifetime access &middot; free for Telegram channel
          members.
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setAccessOpen(true)}
          className="flex items-center gap-2 bg-[var(--foreground)] px-6 py-3 text-sm font-bold text-[var(--background)]"
        >
          Unlock this course <ArrowUpRight size={18} />
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center gap-2 border px-6 py-3 text-sm font-bold"
        >
          {linkCopied ? <Check size={16} /> : <Share2 size={16} />}
          {linkCopied ? "Link copied" : "Copy share link"}
        </button>
      </div>

      <section className="mt-14" aria-label="Course preview">
        <CoursePreview course={course} />
      </section>

      <CourseAiChat course={course} />

      <p className="muted mt-12 flex items-center gap-2 text-sm">
        <Send size={16} /> Telegram members can access the material for free.
      </p>

      {accessOpen && (
        <CourseAccessDialog
          course={course}
          onClose={() => setAccessOpen(false)}
        />
      )}
    </main>
  );
}
