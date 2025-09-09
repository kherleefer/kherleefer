
import type { Metadata } from "next";
import "./globals.css";
import DesktopOnly from "@components/DesktopOnly";
import Header from "@components/Header"; // 👈 import the Linux-style header

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcasing my work in a Linux desktop–style UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-100 font-mono">
        <DesktopOnly>
          {/* Top bar stays fixed like a Linux desktop header */}
          <Header />

          {/* Main content pushed below header height */}
          <main className="pt-10">{children}</main>
        </DesktopOnly>
      </body>
    </html>
  );
}







