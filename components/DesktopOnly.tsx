"use client";

//import { useEffect, useState } from "react";

export default function DesktopOnly({ children }: { children: React.ReactNode }) {
  {/*
  const [isDesktop, setIsDesktop] = useState(true);
  const [typedText, setTypedText] = useState("");

  const terminalText = '$ echo "Desktop required ⚠️"';

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isDesktop) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText((prev) => prev + terminalText[i]);
        i++;
        if (i >= terminalText.length) clearInterval(interval);
      }, 50); // typing speed
      return () => clearInterval(interval);
    }
  }, [isDesktop]);
*/
    {/*
  if (!isDesktop) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black font-mono text-green-400 p-6 overflow-hidden">
        <div className="bg-black border border-green-400 rounded-lg p-6 shadow-lg max-w-md w-full">
          
          <pre className="whitespace-pre-wrap break-words text-green-400">
            {typedText}
            <span className="inline-block animate-blink">█</span>
          </pre>
          <p className="text-sm text-green-200 mt-4">
            ⚠️ Desktop screens only.
            <br />
            Please open it on a larger device to view My Portfolio.
          </p>
        </div>
      </div>
    );
  }
*/}
  return <>{children}</>;
}
