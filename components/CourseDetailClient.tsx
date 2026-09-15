"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Send, Share2 } from "lucide-react";
import { type Course } from "@/lib/portfolioData";
import { formatCoursePrice } from "@/lib/courseFormat";
import { copyToClipboard, getCourseShareUrl } from "@/lib/courseShare";
import CourseAccessDialog from "@components/CourseAccessDialog";

export default function CourseDetailClient({ course }: { course: Course }) {
  const [accessOpen, setAccessOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewState, setPreviewState] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;
    fetch(`/api/courses/${encodeURIComponent(course.slug)}/preview`)
      .then(async (response) => {
        const contentType = response.headers.get("content-type") || "";
        if (!response.ok || !/application\/pdf/i.test(contentType)) {
          throw new Error("Preview is not available for this material.");
        }
        objectUrl = URL.createObjectURL(await response.blob());
        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          return;
        }
        setPreviewUrl(objectUrl);
        setPreviewState("ready");
      })
      .catch(() => {
        if (!cancelled) setPreviewState("error");
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [course.slug]);

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
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight">Course preview</h2>
          <a
            href={`/api/courses/${encodeURIComponent(course.slug)}/preview`}
            target="_blank"
            rel="noopener noreferrer"
            className="muted text-sm font-bold underline underline-offset-4"
          >
            Open preview
          </a>
        </div>
        <p className="muted mt-3 text-sm leading-6">
          Few Pages Preview the of the material. The complete course unlocks
          after payment or verified Telegram membership.
        </p>
        {previewState === "loading" && (
          <div className="mt-6 border p-16 text-center">
            <p className="muted text-sm">Loading preview&hellip;</p>
          </div>
        )}
        {previewState === "ready" && previewUrl && (
          <div className="surface mt-6 p-2 sm:p-4">
            <iframe
              src={previewUrl}
              title={`Preview of ${course.title}`}
              className="h-[560px] w-full sm:h-[680px]"
            />
          </div>
        )}
        {previewState === "error" && (
          <div className="mt-6 border p-10">
            <p className="muted text-sm leading-7">
              A preview is only available for PDF materials. This course may use
              another file format, or the preview could not be loaded.
            </p>
          </div>
        )}
      </section>

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
