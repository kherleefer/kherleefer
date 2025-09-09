"use client";

import Image from "next/image";
import { Github, Send, Twitter, Mail as MailIcon } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@components/Footer";
import { useState } from "react";

const windowsData = [
  {
    id: "about",
    title: "About Me",
    content: (
      <>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image
            src="/img/profileImage.png"
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-2 border-green-400"
          />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold">
              Kherleefer <span className="text-green-300 text-sm">(Encryptoknight)</span>
            </h3>
            <p className="mt-1 text-green-300">Software Engineer</p>
            <div className="flex gap-3 mt-2 justify-center md:justify-start">
              <a href="https://github.com/kherleefer"><Github /></a>
              <a href="https://x.com/kherleefer_kk"><Twitter /></a>
              <a href="https://t.me/Encryptoknight"><Send /></a>
              <a href="mailto:mahmudkalifa6@gmail.com"><MailIcon /></a>
            </div>
          </div>
        </div>
        <p className="mt-4 text-green-200 text-sm">
          I am a software engineer specializing in Rust, Tact, Javascript/Typescript, NextJs, VueJs, and Mobile apps with Ionic Capacitor. I developed Gloxx Chain Mobile App, designed an Express-based API UI, and integrated Telegram Mini Apps Analytics into GetFI.
        </p>
      </>
    ),
  },
  {
    id: "projects",
    title: "Projects",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Gloxx Chain", description: "Web app with Ionic Vue and Supabase", link: "https://t.me/gloxx_chain/20" },
          { title: "Gloxx Chain API", description: "API for crypto mining phase", link: "#" },
          { title: "Email Filter App", description: "Detecting Spam & Phishing Emails", link: "https://thinkdoit.infy.uk" },
        ].map((p, idx) => (
          <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600">
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-green-200 text-sm mt-1">{p.description}</p>
            <a href={p.link} className="text-green-300 text-sm hover:underline mt-1 inline-block">View Project</a>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "skills",
    title: "Skills",
    content: (
      <div className="flex flex-wrap gap-2">
        {["Ionic", "Vue.js", "TypeScript", "React", "NextJs", "ExpressJs", "RUST", "TACT", "etc"].map((skill) => (
          <span key={skill} className="bg-zinc-900 px-3 py-1 rounded-full text-sm border border-green-600">{skill}</span>
        ))}
      </div>
    ),
  },
  {
    id: "remarks",
    title: "Others Remarks",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "selvuc(Zik)", description: "Exceptional developer with rare creativity and technical skill." },
          { title: "Michael Ofori", description: "Command over ExpressJS and Rust smart contracts is inspiring." },
          { title: "Rose Adam", description: "Professional, innovative, highly motivated." },
        ].map((r, idx) => (
          <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600">
            <h3 className="font-bold">{r.title}</h3>
            <p className="text-green-200 text-sm mt-1">{r.description}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Home() {
  const [zIndex, setZIndex] = useState(1);
  const [windowZ, setWindowZ] = useState<Record<string, number>>({});
  const [maximized, setMaximized] = useState<Record<string, boolean>>({});

  const bringToFront = (id: string) => {
    const newZ = zIndex + 1;
    setWindowZ({ ...windowZ, [id]: newZ });
    setZIndex(newZ);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-green-400 font-mono relative overflow-hidden">
      {windowsData.map((win, index) => {
        const isMax = maximized[win.id] || false;
        return (
          <motion.div
  key={win.id}
  drag={!isMax}
  dragMomentum={false}
  onDragStart={() => bringToFront(win.id)}
  style={{
    zIndex: windowZ[win.id] || 1,
    top: isMax ? 0 : 40 + index * 30,
    left: isMax ? 0 : 40 + index * 30,
    position: 'absolute',
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={{
    opacity: 1,
    y: 0,
    width: isMax ? '100%' : 320, // animate width
    height: isMax ? '100%' : 'auto', // animate height
  }}
  transition={{ duration: 0.4 }}
  className="bg-black border border-green-400 rounded-lg shadow-lg cursor-move p-6"
>
  <div className="flex justify-between items-center mb-2">
    <h2 className="font-bold cursor-grab">{win.title}</h2>
    <button
      className="text-green-300 hover:text-green-100 text-sm"
      onClick={() =>
        setMaximized({ ...maximized, [win.id]: !maximized[win.id] })
      }
    >
      {isMax ? "🗗" : "🗖"}
    </button>
  </div>
  <div className={`${isMax ? 'h-full overflow-auto' : ''}`}>
    {win.content}
  </div>
</motion.div>
        );
      })}
      <Footer />
    </div>
  );
      }
