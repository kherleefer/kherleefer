import type { Metadata } from "next";
import "./globals.css";
import DesktopOnly from "@components/DesktopOnly";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Software Engineer, Full-Stack Developer,  Web & Blockchain Developer",
  description:
    "Portfolio of Kherleefer — a full-stack software engineer specializing in React ecosystem, Next.js, Vue.js, Ionic, and Solidity development for scalable web and blockchain applications.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "Blockchain Developer",
    "Next.js",
    "React",
    "Vue.js",
    "Ionic Framework",
    "Solidity",
    "OpenZeppelin",
    "BNB Chain",
    "TypeScript",
    "Rust",
    "Express.js",
    "Fastify",
    "Full Stack Developer",
 "Frontend Developer",
 "Backend Developer",
    "IT Consultant",
    "Nigeria",
    "in Nigeria",
  ],

  metadataBase: new URL("https://kherleefer.vercel.app"),
  alternates: { canonical: "https://kherleefer.vercel.app" },

  openGraph: {
    title: "Software Engineer, Full-Stack Developer, Web & Blockchain Developer",
    description:
      "Explore web and blockchain projects built with React, Next.js, Vue.js, Solidity, and BNB Chain by Kherleefer — a full-stack developer passionate about secure and scalable apps.",
    url: "https://kherleefer.vercel.app",
    type: "website",
    images: [
      {
        url: "https://kherleefer.vercel.app/img/profile_image.png",
        width: 1000,
        height: 1000,
        alt: "Kherleefer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Software Engineer, Full-Stack Developer, Web & Blockchain Developer",
    description:
      "Software engineer specializing in web, mobile, and blockchain development using React, Ionic, Next.js, Vue.js, and Solidity.",
    images: ["https://kherleefer.vercel.app/img/profile_image.png"],
    site: "@kherleefer_kk",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  verification: {
    google: "IoUr8PAUnnfvqJGU-42XOecfb1dlc8Bmem0yxbo3jlY",
  },

  other: {
    "og:image:width": "1000",
    "og:image:height": "1000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* JSON-LD Schema */}
      <Script
  id="schema-data"
  type="application/ld+json"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Kherleefer",
        "url": "https://kherleefer.vercel.app",
        "image": "https://kherleefer.vercel.app/img/profile_image.png",
        "jobTitle": "Software Engineer, FullStack, Frontend, Backend & Blockchain Developer",
        "description":
          "Software engineer specializing in React, Ionic, Next.js, Vue.js, and Solidity development for web, mobile, and blockchain systems.",
        "knowsAbout": [
          "Next.js",
          "React",
          "Vue.js",
          "Ionic Framework",
          "Solidity",
          "OpenZeppelin",
          "BNB Chain",
          "Rust",
          "TypeScript",
          "Express.js",
          "Fastify",
          "Full Stack Web Development",
          "Blockchain Engineering",
        ],
        "sameAs": [
          "https://github.com/kherleefer",
          "https://www.linkedin.com/in/kherleefer",
          "https://twitter.com/kherleefer_kk",
          "https://t.me/Encryptoknight",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kherleefer Portfolio",
        "url": "https://kherleefer.vercel.app",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://kherleefer.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Kherleefer Projects",
        "creator": { "@type": "Person", "name": "Kherleefer" },
        "about": [
          "Next.js Development",
          "Vue.js Applications",
          "Solidity Smart Contracts",
          "BNB Chain Projects",
        ],
      },
    ]),
  }}
/>
      <body className="antialiased text-zinc-100 font-mono relative min-h-screen">
        <DesktopOnly>
          <div
            className="fixed inset-0 -z-10"
            style={{
              backgroundImage: 'url("/img/linux4.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <Header />
          <main className="pt-10 relative z-10">{children}</main>
          <Footer />
        </DesktopOnly>
      </body>
    </html>
  );
}