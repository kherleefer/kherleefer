"use client";

import Image from "next/image";
import { Github, Send, Twitter, Mail } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-12">
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 rounded-2xl p-4 md:p-6">
        {/* Profile Image on the left */}
        <div className="flex-shrink-0">
          <Image
            src="/img/profileImage.png"
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-4 border-blue-700 shadow-lg"
          />
        </div>

        {/* Text and Socials on the right */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right flex-1 min-w-[200px]">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
            Kherleefer{" "}
            <span className="text-blue-200 text-base sm:text-lg">
              (Encryptoknight)
            </span>
          </h3>
          <p className="text-base sm:text-lg text-blue-200 mt-2">
            Software Engineer
          </p>
          <div className="flex gap-4 mt-4 flex-wrap justify-center md:justify-end">
            <a href="https://github.com/kherleefer">
              <Github className="h-6 w-6 hover:text-white" />
            </a>
            <a href="https://x.com/kherleefer_kk">
              <Twitter className="h-6 w-6 hover:text-white" />
            </a>
            <a href="https://t.me/Encryptoknight">
              <Send className="h-6 w-6 hover:text-white" />
            </a>
            <a href="mailto:mahmudkalifa6@gmail.com">
              <Mail className="h-6 w-6 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
