"use client";
import { useState } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import {
  certificates,
  education,
  experience,
  generalProjects,
} from "@/lib/portfolioData";

export default function Resume() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const { generateResumePdf } = await import("@/lib/resumePdf");
      await generateResumePdf();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <TerminalWindow title="user@portfolio: ~/resume">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="mb-6">
          <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
            Experience
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Resume</h1>
        </div>
        <section className="line border-t pt-6">
          <h2 className="mb-4 text-xl font-bold">Experience timeline</h2>
          <ul className="muted space-y-4 border-l-2 border-current pl-6 text-sm">
            {experience.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.title}</span>{" "}
                {item.details.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <section className="line border-t pt-6">
          <h2 className="mb-4 text-xl font-bold">Education</h2>
          <ul className="muted ml-6 list-disc text-sm">
            {education.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.title}</span> <br />
                {item.details.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <section className="line border-t pt-6">
          <h2 className="mb-4 text-xl font-bold">Certificates</h2>
          <ul className="muted ml-6 list-disc text-sm">
            {certificates.map((cert, idx) => (
              <li key={idx}>
                <span className="font-semibold">{cert.title}</span> —{" "}
                {cert.issuer}{" "}
                <span className="text-xs">({cert.year})</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="line border-t pt-6">
          <h2 className="mb-4 text-xl font-bold">Projects</h2>
          <ul className="muted space-y-4 border-l-2 border-current pl-6 text-sm">
            {generalProjects.map((project, idx) => (
              <li key={idx}>
                <span className="font-semibold">{project.title}</span>
                <br />
                {project.description}{" "}
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-bold underline underline-offset-4"
                  >
                    Visit
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="line mt-6 inline-block border px-6 py-3 text-center font-semibold transition hover:bg-black hover:text-white disabled:opacity-60 dark:hover:bg-white dark:hover:text-black"
        >
          {downloading ? "Preparing PDF…" : "Download PDF"}
        </button>
      </div>
    </TerminalWindow>
  );
}
