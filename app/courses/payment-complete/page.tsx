"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentCompletePage() {
  const [message, setMessage] = useState("Confirming your payment...");
  const [materialUrl, setMaterialUrl] = useState<string | null>(null);

  useEffect(() => {
    const transactionId = new URLSearchParams(window.location.search).get(
      "transaction_id",
    );
    if (!transactionId) {
      setMessage("No payment reference was found.");
      return;
    }
    fetch(
      `/api/courses/verify?transaction_id=${encodeURIComponent(transactionId)}`,
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Payment verification failed.");
        setMaterialUrl(data.materialUrl);
        setMessage(`${data.courseTitle} is ready.`);
      })
      .catch((error: Error) => setMessage(error.message));
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
        Flutterwave
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
        Payment received.
      </h1>
      <p className="muted mx-auto mt-6 max-w-xl leading-8">{message}</p>
      {materialUrl && (
        <a
          href={materialUrl}
          className="mt-8 inline-block bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)]"
        >
          Open course material
        </a>
      )}
      <Link
        href="/courses"
        className="mt-10 inline-block border px-5 py-3 text-sm font-bold"
      >
        Back to courses
      </Link>
    </main>
  );
}
