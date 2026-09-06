"use client";

import { FormEvent, useState } from "react";

type AdminCourse = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  currency: string;
  material_path: string;
};

export default function CourseAdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [courses, setCourses] = useState<AdminCourse[]>([]);

  async function loadCourses() {
    const response = await fetch("/api/admin/courses");
    const data = await response.json();
    if (response.ok) setCourses(data);
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!response.ok) {
      setStatus("That password is not correct.");
      return;
    }
    setAuthenticated(true);
    await loadCourses();
    setStatus("");
  }

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setStatus("");
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      body: new FormData(form),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Could not upload the course.");
      return;
    }
    form.reset();
    await loadCourses();
    setStatus("Course uploaded successfully and is now published.");
  }

  async function updateCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const response = await fetch("/api/admin/courses", {
      method: "PATCH",
      body: new FormData(event.currentTarget),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Could not update the course.");
      return;
    }
    await loadCourses();
    setStatus("Course updated successfully.");
  }

  async function deleteCourse(id: string) {
    if (!window.confirm("Delete this course and its uploaded material?"))
      return;
    setBusy(true);
    setStatus("");
    const response = await fetch(
      `/api/admin/courses?id=${encodeURIComponent(id)}`,
      { method: "DELETE" },
    );
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Could not delete the course.");
      return;
    }
    await loadCourses();
    setStatus("Course deleted successfully.");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
        Private workspace
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
        Course library
      </h1>
      {!authenticated ? (
        <form
          onSubmit={login}
          className="surface mt-10 grid max-w-md gap-4 border p-6"
        >
          <label className="text-sm font-semibold" htmlFor="admin-password">
            Admin password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="line border bg-transparent px-4 py-3 outline-none"
            required
          />
          <button
            disabled={busy}
            className="bg-[var(--foreground)] px-4 py-3 text-sm font-bold text-[var(--background)] disabled:opacity-50"
          >
            Unlock workspace
          </button>
        </form>
      ) : (
        <form
          onSubmit={upload}
          className="surface mt-10 grid gap-5 border p-6 sm:p-8"
        >
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="title">
              Course title
            </label>
            <input
              id="title"
              name="title"
              required
              className="line border bg-transparent px-4 py-3 outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="line border bg-transparent px-4 py-3 outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="category">
                Category
              </label>
              <input
                id="category"
                name="category"
                placeholder="Programming"
                required
                className="line border bg-transparent px-4 py-3 outline-none"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="level">
                Level
              </label>
              <input
                id="level"
                name="level"
                placeholder="Beginner"
                required
                className="line border bg-transparent px-4 py-3 outline-none"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                required
                className="line border bg-transparent px-4 py-3 outline-none"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="currency">
                Currency
              </label>
              <input
                id="currency"
                name="currency"
                defaultValue="NGN"
                required
                className="line border bg-transparent px-4 py-3 uppercase outline-none"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="file">
              Course material
            </label>
            <input
              id="file"
              name="file"
              type="file"
              required
              className="line border p-3 text-sm"
            />
            <p className="muted text-xs">
              Upload the complete course file here. It will be stored privately
              and delivered only after access is verified.
            </p>
          </div>
          <button
            disabled={busy}
            className="bg-[var(--foreground)] px-4 py-3 text-sm font-bold text-[var(--background)] disabled:opacity-50"
          >
            {busy ? "Uploading..." : "Upload and publish course"}
          </button>
        </form>
      )}
      {authenticated && (
        <section className="mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-black">Published courses</h2>
            <span className="muted text-sm">
              {courses.length} course{courses.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-5 grid gap-5">
            {courses.map((course) => (
              <form
                key={course.id}
                onSubmit={updateCourse}
                className="surface grid gap-4 border p-5"
              >
                <input type="hidden" name="id" value={course.id} />
                <div className="grid gap-4 sm:grid-cols-[1fr_1fr_0.6fr_0.5fr]">
                  <input
                    name="title"
                    defaultValue={course.title}
                    required
                    className="line border bg-transparent px-3 py-2 text-sm"
                    aria-label="Course title"
                  />
                  <input
                    name="category"
                    defaultValue={course.category}
                    required
                    className="line border bg-transparent px-3 py-2 text-sm"
                    aria-label="Course category"
                  />
                  <input
                    name="level"
                    defaultValue={course.level}
                    required
                    className="line border bg-transparent px-3 py-2 text-sm"
                    aria-label="Course level"
                  />
                  <input
                    name="price"
                    type="number"
                    min="0"
                    defaultValue={course.price}
                    required
                    className="line border bg-transparent px-3 py-2 text-sm"
                    aria-label="Course price"
                  />
                  <input
                    name="currency"
                    defaultValue={course.currency}
                    required
                    className="line border bg-transparent px-3 py-2 text-sm uppercase"
                    aria-label="Course currency"
                  />
                </div>
                <textarea
                  name="description"
                  defaultValue={course.description}
                  required
                  rows={2}
                  className="line border bg-transparent px-3 py-2 text-sm"
                  aria-label="Course description"
                />
                <input
                  name="file"
                  type="file"
                  className="line border p-2 text-sm"
                  aria-label="Replace course material"
                />
                <p className="muted truncate text-xs">
                  Current file: {course.material_path}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    disabled={busy}
                    className="bg-[var(--foreground)] px-4 py-2 text-sm font-bold text-[var(--background)] disabled:opacity-50"
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => deleteCourse(course.id)}
                    className="border px-4 py-2 text-sm font-bold disabled:opacity-50"
                  >
                    Delete course
                  </button>
                </div>
              </form>
            ))}
            {courses.length === 0 && (
              <p className="muted text-sm">
                No courses have been uploaded yet.
              </p>
            )}
          </div>
        </section>
      )}
      {status && (
        <p className="mt-5 text-sm font-semibold" role="status">
          {status}
        </p>
      )}
    </main>
  );
}
