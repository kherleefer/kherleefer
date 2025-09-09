
import type { Metadata } from "next";
import "./globals.css";
import DesktopOnly from "@components/DesktopOnly";
import Header from "@components/Header";
import Footer from "@components/Footer";
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
      <body className="antialiased text-zinc-100 font-mono relative min-h-screen">
        <DesktopOnly>
          {/* Global background image */}
          <div
            className="fixed inset-0 -z-10"
            style={{
              backgroundImage: 'url("/img/arch_background.arch_background.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Optional dark overlay for readability */}
          <div className="fixed inset-0 bg-black/40 -z-5" />

          {/* Top bar stays fixed like a Linux desktop header */}
          <Header />

          {/* Main content pushed below header height */}
          <main className="pt-10 relative z-10">{children}</main>
       <Footer />
        </DesktopOnly>
      </body>
    </html>
  );
}



.



