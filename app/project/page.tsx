"use client";

import Image from "next/image";
import TerminalWindow from "@/components/TerminalWindow";
import { generalProjects } from "@/lib/portfolioData";
import { useState } from "react";

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <TerminalWindow title="user@portfolio: ~/projects">
      <div className="mb-4">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/projects</span>
        <span className="text-white">$</span>
        <h2 className="text-xl font-bold text-green-300 ml-2">ls -l --featured</h2>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {generalProjects.map((project) => (
          <div key={project.title} className="rounded-xl border border-green-500/30 shadow-md hover:shadow-lg transition-all bg-zinc-900/50 p-4 flex flex-col gap-3 hover:border-green-400/80">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={200}
                className="rounded-lg object-cover w-full h-40 border border-green-600/50 cursor-pointer"
                onClick={() => setSelectedImage(project.image || null)}
              />
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold text-green-300">{project.title}</h3>
            </a>
            <p className="text-base text-green-200">{project.description}</p>
            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-zinc-800 px-2 py-0.5 rounded-full text-xs text-green-300 border border-green-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Expanded Image"
              width={800}
              height={600}
              className="rounded-lg object-contain max-h-[90vh] w-auto h-auto"
            />
            <button className="absolute top-4 right-4 bg-red text-white text-2xl" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/projects</span>
        <span className="text-white">$ </span>
        <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
      </div>
    </TerminalWindow >
  );
}
