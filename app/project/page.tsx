"use client";

import Image from "next/image";
import TerminalWindow from "@/components/TerminalWindow";
import { generalProjects } from "@/lib/portfolioData";

export default function ProjectsPage() {
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
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-green-500/30 shadow-md hover:shadow-lg transition-all bg-zinc-900/50 p-4 flex flex-col gap-3 hover:border-green-400/80"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={200}
                className="rounded-lg object-cover w-full h-40 border border-green-600/50"
              />
            )}
            
            <h3 className="text-xl font-bold text-green-300">{project.title}</h3>
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
          </a>
        ))}
      </div>

      <div className="mt-8 flex items-center">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/projects</span>
        <span className="text-white">$ </span>
        <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
      </div>
    </TerminalWindow>
  );
}
