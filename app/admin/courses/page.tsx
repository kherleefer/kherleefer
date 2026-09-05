"use client";

import { FormEvent, useState } from "react";

export default function CourseAdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

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
    setStatus("");
  }

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setStatus(data.error || "Could not upload the course.");
      return;
    }
    event.currentTarget.reset();
    setStatus("Course uploaded and published.");
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
              The file is stored in a private Supabase bucket. Learners receive
              a short-lived signed link after payment or membership
              verification.
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
      {status && (
        <p className="mt-5 text-sm font-semibold" role="status">
          {status}
        </p>
      )}
    </main>
  );
}
