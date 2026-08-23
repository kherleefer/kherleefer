"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>Building thoughtful digital products.</span>
        <div className="flex gap-4">
          <Link href="https://github.com/kherleefer" className="hover:text-black">GitHub</Link>
          <Link href="/contact" className="hover:text-black">Get in touch</Link>
        </div>
      </div>
    </footer>
  );
}
