"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignJustify } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="line sticky top-0 z-20 border-b bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <Link href="/" className="text-xl font-black tracking-[-0.06em]">
          KHERLEEFER<span className="muted">.</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <AlignJustify />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-wrap justify-end gap-x-5 gap-y-2 text-sm font-semibold">
          <Link
            href="/"
            className="muted transition-colors hover:text-[var(--foreground)]"
          >
            Home
          </Link>
          <Link
            href="/project"
            className="muted transition-colors hover:text-[var(--foreground)]"
          >
            Projects
          </Link>
          <Link
            href="/courses"
            className="muted transition-colors hover:text-[var(--foreground)]"
          >
            Courses
          </Link>
          <Link
            href="/about"
            className="muted transition-colors hover:text-[var(--foreground)]"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="muted transition-colors hover:text-[var(--foreground)]"
          >
            Contact
          </Link>
          <Link
            href="/resume"
            className="muted transition-colors hover:text-[var(--foreground)]"
          >
            Resume
          </Link>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-16 left-12 right-0 bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl border-b px-6 py-4 md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <nav className="flex flex-col gap-1 py-4 text-sm font-semibold">
                <Link
                  href="/"
                  className="muted transition-colors py-4 hover:text-[var(--foreground)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/project"
                  className="muted transition-colors py-4 hover:text-[var(--foreground)]"
                >
                  Projects
                </Link>
                <Link
                  href="/courses"
                  className="muted transition-colors py-4 hover:text-[var(--foreground)]"
                >
                  Courses
                </Link>
                <Link
                  href="/about"
                  className="muted transition-colors py-4 hover:text-[var(--foreground)]"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="muted transition-colors py-4 hover:text-[var(--foreground)]"
                >
                  Contact
                </Link>
                <Link
                  href="/resume"
                  className="muted transition-colors py-4 hover:text-[var(--foreground)]"
                >
                  Resume
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
