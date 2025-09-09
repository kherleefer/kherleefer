"use client";
import TerminalWindow from "@/components/TerminalWindow";
import { experience, education } from "@/lib/portfolioData";

export default function Resume() {
  return (
    <TerminalWindow title="user@portfolio: ~/resume">
      <div className="mb-4">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/resume</span>
        <span className="text-white">$</span>
        <h2 className="text-xl font-bold text-green-300 ml-2">cat resume.txt</h2>
      </div>
      
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="p-2 mb-6">
          <h1 className="text-3xl font-bold text-green-300 mb-4">Resume</h1>
        </div>
        <section className="bg-zinc-900/50 rounded-lg p-6 border border-green-600/50">
          <h2 className="text-xl font-bold text-green-300 mb-2">Experience Timeline</h2>
          <ul className="border-l-2 border-green-500/20 pl-6 space-y-4 text-green-200 text-sm">
            {experience.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.title}</span> {item.details.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-zinc-900/50 rounded-lg p-6 border border-green-600/50">
          <h2 className="text-xl font-bold text-green-300 mb-2">Education</h2>
          <ul className="list-disc ml-6 text-green-200 text-sm">
            {education.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.title}</span> {item.details.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <a
          href="/resume.pdf"
          className="mt-6 inline-block bg-green-500/20 text-green-300 px-6 py-2 rounded-full font-semibold shadow hover:bg-green-500/30 transition border border-green-600/50 text-center"
          download
        >
          Download PDF
        </a>
      </div>

      <div className="mt-8 flex items-center">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/resume</span>
        <span className="text-white">$ </span>
        <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
      </div>
    </TerminalWindow>
  );
}