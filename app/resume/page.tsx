"use client";
import TerminalWindow from "@/components/TerminalWindow";
import { experience, education } from "@/lib/portfolioData";

export default function Resume() {
  return (
    <TerminalWindow title="user@portfolio: ~/resume">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="mb-6">
          <p className="muted text-sm font-bold uppercase tracking-[0.2em]">Experience</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Resume</h1>
        </div>
        <section className="line border-t pt-6">
          <h2 className="mb-4 text-xl font-bold">Experience timeline</h2>
          <ul className="muted space-y-4 border-l-2 border-current pl-6 text-sm">
            {experience.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.title}</span> {item.details.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <section className="line border-t pt-6">
          <h2 className="mb-4 text-xl font-bold">Education</h2>
          <ul className="muted ml-6 list-disc text-sm">
            {education.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.title}</span> {item.details.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <a
          href="/resume.pdf"
          className="line mt-6 inline-block border px-6 py-3 text-center font-semibold transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          download
        >
          Download PDF
        </a>
      </div>

    </TerminalWindow>
  );
}