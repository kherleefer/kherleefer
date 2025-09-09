"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wifi, Battery, Clock } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every min
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between 
                       bg-zinc-900 text-zinc-100 h-10 px-4 font-mono text-sm">
      {/* Left - Fake Linux Menu */}
      <div className="flex items-center gap-4">
        <span className="font-bold cursor-pointer hover:text-green-400">🟢 Menu</span>
      </div>

      {/* Center - Navigation */}
      <nav className="flex gap-6">
        <Link href="/" className="hover:text-green-400">Home</Link>
        <Link href="/projects" className="hover:text-green-400">Projects</Link>
        <Link href="/about" className="hover:text-green-400">About</Link>
        <Link href="/contact" className="hover:text-green-400">Contact</Link>
      </nav>

      {/* Right - Fake system tray */}
      <div className="flex items-center gap-3">
        <Wifi size={16} />
        <Battery size={16} />
        <span>{time}</span>
      </div>
    </header>
  );
}
