// components/DesktopOnly.tsx
"use client";

import { useEffect, useState } from "react";

export default function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white text-center p-6 font-mono">
        <div>
          <h1 className="text-2xl mb-4">⚠️ Desktop Required</h1>
          <p>
            This portfolio is designed to look like a Linux desktop.
            <br />
            Please open it on a larger screen for the full experience.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
