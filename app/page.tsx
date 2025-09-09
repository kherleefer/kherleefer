"use client";

import Image from "next/image";
import TerminalWindow from "@components/TerminalWindow";
import { Github, Send, Twitter, Mail as MailIcon } from "lucide-react";

const sections = [
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
            <div className="flex gap-4 mt-2 justify-center md:justify-start">
              <a href="https://github.com/kherleefer" className="flex items-center gap-1 hover:text-green-200"><Github size={16} /> GitHub</a>
              <a href="https://x.com/kherleefer_kk" className="flex items-center gap-1 hover:text-green-200"><Twitter size={16} /> Twitter</a>
              <a href="https://t.me/Encryptoknight" className="flex items-center gap-1 hover:text-green-200"><Send size={16} /> Telegram</a>
              <a href="mailto:mahmudkalifa6@gmail.com" className="flex items-center gap-1 hover:text-green-200"><MailIcon size={16} /> Email</a>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Gloxx Chain", description: "Web app with Ionic Vue and Supabase", link: "https://t.me/gloxx_chain/20" },
          { title: "Gloxx Chain API", description: "API for crypto mining phase", link: "#" },
          { title: "Email Filter App", description: "Detecting Spam & Phishing Emails", link: "https://thinkdoit.infy.uk" },
        ].map((p, idx) => (
          <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600/50">
            <h3 className="font-bold text-green-300">{p.title}</h3>
            <p className="text-green-200 text-sm mt-1">{p.description}</p>
            <a href={p.link} className="text-green-300 text-xs hover:underline mt-2 inline-block">View Project &rarr;</a>
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
        {["Ionic", "Vue.js", "TypeScript", "React", "NextJs", "ExpressJs", "RUST", "TACT", "Solidity", "Python", "Go"].map((skill) => (
          <span key={skill} className="bg-zinc-900 px-3 py-1 rounded-full text-sm border border-green-600/50 text-green-300">{skill}</span>
        ))}
      </div>
    ),
  },
  {
    id: "remarks",
    title: "Others Remarks",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "selvuc(Zik)", description: "\"Exceptional developer with rare creativity and technical skill.\"" },
          { title: "Michael Ofori", description: "\"Command over ExpressJS and Rust smart contracts is inspiring.\"" },
          { title: "Rose Adam", description: "\"Professional, innovative, highly motivated.\"" },
        ].map((r, idx) => (
          <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600/50">
            <h3 className="font-bold text-green-300">{r.title}</h3>
            <p className="text-green-200 text-sm mt-1 italic">{r.description}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Home() {
  return (
    <TerminalWindow title="user@portfolio: ~">
        <div className="animate-pulse-fast mb-4">
            <span className="text-green-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="ml-2">./run-portfolio.sh</span>
        </div>
        
        <div className="space-y-10">
            {sections.map(section => (
                <section key={section.id} id={section.id}>
                    <div className="flex items-center mb-4">
                        <span className="text-green-400">user@portfolio</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~/{section.title.toLowerCase()}</span>
                        <span className="text-white">$ </span>
                        <h2 className="text-xl font-bold text-green-300 ml-2">cat {section.title.toLowerCase()}.md</h2>
                    </div>
                    <div className="pl-4 border-l-2 border-green-500/20">
                        {section.content}
                    </div>
                </section>
            ))}
        </div>

        <div className="mt-8 flex items-center">
            <span className="text-green-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
        </div>
    </TerminalWindow>
  );
}
