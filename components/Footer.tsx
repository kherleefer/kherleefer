"use client";

import { Home, BookOpen, Code, User, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const icons = [
    { icon: <Home />, href: "#about", label: "About" },
    { icon: <BookOpen />, href: "#projects", label: "Projects" },
    { icon: <Code />, href: "#skills", label: "Skills" },
    { icon: <User />, href: "#remarks", label: "Remarks" },
    { icon: <Mail />, href: "#contact", label: "Contact" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-green-400 p-2 flex justify-center gap-6 z-50">
      {icons.map((item, idx) => (
        <Link key={idx} href={item.href} scroll={false}>
          <div className="flex flex-col items-center text-green-400 hover:text-green-200 cursor-pointer">
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
