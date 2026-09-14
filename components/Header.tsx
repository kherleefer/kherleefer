"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignJustify, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/project", label: "Projects" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Close on Escape or when clicking/tapping outside the open drawer.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !(target as HTMLElement | null)?.closest?.("[data-mobile-menu-toggle]")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
    };
  }, [menuOpen]);

  // Close the drawer automatically when resizing up to the desktop layout.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <header className="line sticky top-0 z-20 border-b bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-black tracking-[-0.06em]">
            KHERLEEFER<span className="muted">.</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            data-mobile-menu-toggle
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <AlignJustify />}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-wrap justify-end gap-x-5 gap-y-2 text-sm font-semibold">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="muted transition-colors hover:text-[var(--foreground)]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile menu: drawer that slides in from the right */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="line fixed inset-y-0 right-0 z-40 flex w-80 max-w-[85vw] flex-col overflow-y-auto border-l bg-[color-mix(in_srgb,var(--background)_92%,transparent)] px-5 py-6 backdrop-blur-xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <span className="muted text-xs font-bold uppercase tracking-[0.2em]">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                className="muted transition-colors hover:text-[var(--foreground)]"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </button>
            </div>

            <nav className="mt-4 flex flex-col items-end text-right text-sm font-semibold">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="muted border-b border-[var(--line)] py-4 transition-colors last:border-b-0 hover:text-[var(--foreground)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
