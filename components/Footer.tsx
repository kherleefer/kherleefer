"use client";

import Image from "next/image";
import Link from "next/link";

const techIcons = [
  { src: "/icons/nextjs.png", href: "/projects/nextjs", label: "Next.js" },
  { src: "/icons/react.png", href: "/projects/react", label: "React" },
  { src: "/icons/ionic.png", href: "/projects/ionic", label: "Ionic" },
  { src: "/icons/typescript.png", href: "/projects/typescript", label: "TypeScript" },
  { src: "/icons/rust.png", href: "/projects/rust", label: "Rust" },
  { src: "/icons/aws.png", href: "/projects/aws", label: "AWS" },
  { src: "/icons/vercel.svg", href: "/projects/vercel", label: "Vercel" },
];

export default function Footer() {
  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-gray-900/70 backdrop-blur-md border border-green-500/30 rounded-full shadow-2xl">
        {techIcons.map((item) => (
          <Link 
            key={item.label} 
            href={item.href} 
            aria-label={item.label}
            className="px-2 rounded-full hover:bg-green-400/20 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <Image
              src={item.src}
              alt={item.label}
              width={24}
              height={24}
              className="grayscale hover:grayscale-0 transition-all"
            />
          </Link>
        ))}
      </div>
    </footer>
  );
}
