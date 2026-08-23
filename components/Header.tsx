import Link from "next/link";
export default function Header() {
  return (
    <header className="line sticky top-0 z-20 border-b bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <Link href="/" className="text-lg font-black tracking-[-0.06em]">KHERLEEFER<span className="muted">.</span></Link>
        <nav className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-sm font-semibold">
          <Link href="/" className="muted transition-colors hover:text-[var(--foreground)]">Home</Link>
          <Link href="/project" className="muted transition-colors hover:text-[var(--foreground)]">Projects</Link>
          <Link href="/about" className="muted transition-colors hover:text-[var(--foreground)]">About</Link>
          <Link href="/contact" className="muted transition-colors hover:text-[var(--foreground)]">Contact</Link>
          <Link href="/resume" className="muted transition-colors hover:text-[var(--foreground)]">Resume</Link>
      </nav>
      </div>
    </header>
  );
}
