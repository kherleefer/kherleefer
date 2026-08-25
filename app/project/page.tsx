"use client";

import Image from "next/image";
import TerminalWindow from "@/components/TerminalWindow";
import { generalProjects } from "@/lib/portfolioData";
import { useState } from "react";

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <TerminalWindow title="Selected projects">
      <div className="mx-auto max-w-5xl">
        <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
          Portfolio
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Selected projects
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {generalProjects.map((project) => (
            <article
              key={project.title}
              className="line flex flex-col gap-4 border-t pt-5"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="surface aspect-[2/1] w-full cursor-pointer object-cover"
                  onClick={() => setSelectedImage(project.image || null)}
                />
              )}
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <h2 className="text-2xl font-black hover:underline">
                  {project.title}
                </h2>
              </a>
              <p className="muted leading-7">{project.description}</p>
              {project.tech && (
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="soft-surface line border px-2 py-1 text-xs font-semibold"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      {selectedImage && (
        <button
          type="button"
          aria-label="Close image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Expanded project preview"
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto object-contain"
          />
        </button>
      )}
    </TerminalWindow>
  );
}
