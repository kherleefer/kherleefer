"use client";

import { useEffect, useState } from "react";

type CoursePreviewProps = {
  course: { slug: string; title: string };
};

export default function CoursePreview({ course }: CoursePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewPageCount, setPreviewPageCount] = useState<number | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;
    fetch(`/api/courses/${encodeURIComponent(course.slug)}/preview`)
      .then(async (response) => {
        const contentType = response.headers.get("content-type") || "";
        if (!response.ok || !/application\/pdf/i.test(contentType)) {
          throw new Error("Preview is not available for this material.");
        }
        const previewPages = response.headers.get("x-preview-pages");
        if (previewPages) {
          const parsed = Number(previewPages);
          if (Number.isFinite(parsed) && parsed > 0) {
            setPreviewPageCount(parsed);
          }
        }
        objectUrl = URL.createObjectURL(await response.blob());
        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          return;
        }
        setPreviewUrl(objectUrl);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [course.slug]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-black uppercase tracking-[0.14em]">
          Course preview
        </h3>
        <a
          href={`/api/courses/${encodeURIComponent(course.slug)}/preview`}
          target="_blank"
          rel="noopener noreferrer"
          className="muted text-xs font-bold underline underline-offset-4"
        >
          Open preview
        </a>
      </div>
      <p className="muted mt-3 text-sm leading-6">
        {previewPageCount
          ? `Preview about the material free (the first ${previewPageCount} page${previewPageCount === 1 ? "" : "s"}). `
          : "Preview a few pages of the material free. "}
        The complete course unlocks after payment or verified Telegram
        membership.
      </p>
      {state === "loading" && (
        <div className="mt-4 border p-12 text-center">
          <p className="muted text-sm">Loading preview&hellip;</p>
        </div>
      )}
      {state === "ready" && previewUrl && (
        <div className="surface mt-4 p-2">
          <iframe
            src={previewUrl}
            title={`Preview of ${course.title}`}
            className="h-[560px] w-full sm:h-[680px] lg:h-[760px]"
          />
        </div>
      )}
      {state === "error" && (
        <div className="mt-4 border p-8">
          <p className="muted text-sm leading-7">
            A preview is only available for PDF materials. This course may
            use another file format, or the preview could not be loaded.
          </p>
        </div>
      )}
    </div>
  );
}