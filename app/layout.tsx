import type { Metadata } from "next";
import "./globals.css";
import DesktopOnly from "@components/DesktopOnly";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Kherleefer | Software Engineer Portfolio",
  description: "Showcasing my work in web, app, and blockchain development projects.",
  
  // Canonical URL
  metadataBase: new URL("https://kherleefer.vercel.app"),
  alternates: {
    canonical: "https://kherleefer.vercel.app",
  },

  // Open Graph for social sharing
  openGraph: {
    title: "Kherleefer | Software Engineer & IT Consultant",
    description: "Showcasing my work in WebApp, Mobile App, and Blockchain development projects.",
    url: "https://kherleefer.vercel.app",
    type: "website",
    images: [
      {
        url: "https://kherleefer.vercel.app/img/profile_image.png",
        width: 1200,
        height: 630,
        alt: "Kherleefer Portfolio Preview",
      },
    ],
  },

  // Twitter card
  twitter: {
    card: "summary_large_image",
    title: "Kherleefer | Software Engineer & IT Consultant",
    description: "Showcasing my work in WebApp, Mobile App, and Blockchain development projects.",
    images: ["https://kherleefer.vercel.app/img/profile_image.png"],
    site: "@kherleefer_kk",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<head>
<Script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kherleefer",
    "url": "https://kherleefer.vercel.app",
    "image": "https://kherleefer.vercel.app/img/profile_image.png",
    "jobTitle": "Software Engineer & Web Developer",
    "description": "Software engineer specializing in web, mobile, and blockchain development.",
    "knowsAbout": [
      "Next.js",
"Vue.js", 
      "React",
"React Native",
"Ionic Framework",
      "Solidity",
      "Firebase",
      "Blockchain Development",
      "Full Stack Web Development",
"JavaScript TypeScript",
"Rust"
    ],
    "sameAs": [
      "https://github.com/kherleefer",
      "https://www.linkedin.com/in/kherleefer",
      "https://twitter.com/kherleefer_kk"
    ]
  })
}} />
</head>
      <body className="antialiased text-zinc-100 font-mono relative min-h-screen">
         <DesktopOnly>
          
          <div
            className="fixed inset-0 -z-10"
            style={{
              backgroundImage: 'url("/img/linux4.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
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

