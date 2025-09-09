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
      <div className="w-screen h-screen flex items-center justify-center bg-zinc-950 font-mono text-green-400 p-6">
        <div className="bg-black border border-green-400 rounded-lg p-6 shadow-lg max-w-md text-center">
          <p className="mb-4">$ echo &quot;Desktop required ⚠️&quot;</p>
          <p className="text-sm text-green-200">
           ⚠️ Desktop screens only.
            <br />
            Please open it on a larger device to view My PortFolio.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
