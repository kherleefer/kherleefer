"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Send, Share2 } from "lucide-react";
import { type Course } from "@/lib/portfolioData";
import { readApiResponse } from "@/lib/api";
import { formatCoursePrice } from "@/lib/courseFormat";
import { copyToClipboard, getCourseShareUrl } from "@/lib/courseShare";
import CourseAccessDialog from "@components/CourseAccessDialog";

export default function CoursesClient() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [sharedSlug, setSharedSlug] = useState<string | null>(null);
  const pageSize = 12;
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (search.trim()) query.set("search", search.trim());
    if (category) query.set("category", category);
    if (level) query.set("level", level);
    fetch(`/api/courses?${query.toString()}`)
      .then(async (response) => {
        const data = await readApiResponse<{
          courses: Course[];
          total: number;
        }>(response);
        if (!response.ok)
          throw new Error(data.error || "Courses are unavailable.");
        setCourses(data.courses || []);
        setTotalCourses(data.total || 0);
      })
      .catch((error: Error) => setStatus(error.message));
  }, [page, search, category, level]);

  const totalPages = Math.max(1, Math.ceil(totalCourses / pageSize));

  async function shareCourse(course: Course) {
    const copied = await copyToClipboard(getCourseShareUrl(course.slug));
    if (!copied) return;
    setSharedSlug(course.slug);
    window.setTimeout(
      () =>
        setSharedSlug((current) =>
          current === course.slug ? null : current,
        ),
      2000,
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-2xl">
        <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
          Learn with Kherleefer
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
          Build skills that ship.
        </h1>
        <p className="muted mt-6 text-lg leading-8">
          Practical course material for developers who want to make real
          products, from their first interface to their first blockchain system.
        </p>
      </header>

      <div className="mt-12 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search courses..."
          className="line border bg-transparent px-4 py-3 text-sm outline-none"
          aria-label="Search courses"
        />
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setPage(1);
          }}
          className="line border bg-transparent px-4 py-3 text-sm"
          aria-label="Filter by category"
        >
          <option value="" className="bg-gray-900 text-white">All categories</option>
          <option value="Programming" className="bg-gray-900 text-white">Programming</option>
          <option value="Office & Productivity" className="bg-gray-900 text-white">
            Office &amp; Productivity
          </option>
          <option value="Data & Analytics" className="bg-gray-900 text-white">Data &amp; Analytics</option>
          <option value="Creative & AI" className="bg-gray-900 text-white">Creative &amp; AI</option>
        </select>
        <select
          value={level}
          onChange={(event) => {
            setLevel(event.target.value);
            setPage(1);
          }}
          className="line border bg-transparent px-4 py-3 text-sm"
          aria-label="Filter by level"
        >
          <option value="" className="bg-gray-900 text-white">All levels</option>
          <option value="Beginner" className="bg-gray-900 text-white">Beginner</option>
          <option value="Intermediate" className="bg-gray-900 text-white">Intermediate</option>
          <option value="Advanced" className="bg-gray-900 text-white">Advanced</option>
        </select>
      </div>

      <section
        className="mt-14 grid gap-5 md:grid-cols-3 "
        aria-label="Available courses"
      >
        {courses.map((course) => (
          <article
            key={course.id}
            className="surface interactive-line flex flex-col border p-6 rounded-lg"
          >
            <span className="text-sm font-bold border-b py-2">{course.category}</span>

            <div className=" pt-2  flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em]">
              <span className="muted ">{course.level}</span>
              <span>{formatCoursePrice(course)}</span>
            </div>
            <h2 className="mt-12 text-2xl font-black tracking-tight">
              {course.title}
            </h2>
            <p className="muted mt-4 flex-1 text-sm leading-7">
              {course.description}
            </p>
            <div className="mt-8 flex items-center justify-between border-t pt-4">
              <button
                type="button"
                onClick={() => setSelectedCourse(course)}
                className="flex items-center gap-1 text-left text-sm font-bold"
              >
                Choose course <ArrowUpRight size={18} />
              </button>
              <button
                type="button"
                aria-label={`Copy link to ${course.title}`}
                title="Copy course share link"
                onClick={() => shareCourse(course)}
                className="flex items-center gap-1 border px-2.5 py-2 text-xs font-bold"
              >
                {sharedSlug === course.slug ? (
                  <Check size={14} />
                ) : (
                  <Share2 size={14} />
                )}
                {sharedSlug === course.slug ? "Link copied" : "Share"}
              </button>
            </div>
          </article>
        ))}
      </section>

      {status && (
        <p className="mt-8 text-sm font-semibold" role="alert">
          {status}
        </p>
      )}

      <nav
        className="mt-10 flex items-center justify-between"
        aria-label="Course pages"
      >
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((current) => current - 1)}
          className="border px-4 py-2 text-sm font-bold disabled:opacity-40"
        >
          Previous
        </button>
        <span className="muted text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((current) => current + 1)}
          className="border px-4 py-2 text-sm font-bold disabled:opacity-40"
        >
          Next
        </button>
      </nav>

      <p className="muted mt-12 flex items-center gap-2 text-sm">
        <Send size={16} /> Telegram members can access the material for free.
      </p>

      {selectedCourse && (
        <CourseAccessDialog
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </main>
  );
}
