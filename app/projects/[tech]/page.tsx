"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import TerminalWindow from '@components/TerminalWindow';


// --- Placeholder Project Data ---
// You can replace this with your actual project data, maybe from a CMS or a local JSON file.
const allProjects = {
  react: [
    { title: "React Project One", description: "A cool app built with React and Tailwind CSS.", link: "#" },
    { title: "React E-commerce Site", description: "An online store powered by React.", link: "#" },
  ],
  nextjs: [
    { title: "Next.js Portfolio", description: "The very portfolio you are looking at!", link: "/" },
    { title: "Next.js Blog", description: "A content-heavy blog with SSG.", link: "#" },
  ],
  ionic: [
    { title: "Ionic Fitness App", description: "A cross-platform mobile app for tracking workouts.", link: "#" },
  ],
  typescript: [
    { title: "TypeScript Data Visualizer", description: "A tool for visualizing complex datasets.", link: "#" },
  ],
  rust: [
    { title: "Rust Blockchain CLI", description: "A command-line interface for a custom blockchain.", link: "#" },
  ],
  aws: [],
  vercel: [],
};

// Type definition for the project data
type Project = { title: string; description: string; link: string };
type ProjectsByTech = Record<string, Project[]>;

// --- The Page Component ---
export default function ProjectPage() {
  const params = useParams();
  const tech = Array.isArray(params.tech) ? params.tech[0] : params.tech;

  // Handle cases where the 'tech' parameter is missing from the URL
  if (!tech) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-green-400 font-mono">
        <div className="w-full max-w-4xl h-[80vh] bg-black/70 backdrop-blur-sm rounded-lg shadow-2xl border border-green-500/30 flex flex-col items-center justify-center">
            <p className="text-yellow-400">Technology not specified.</p>
             <div className="mt-8 text-center">
                <Link href="/" className="text-green-400 hover:underline">-- Return to Home --</Link>
            </div>
        </div>
    </div>
    );
  }

  const projects = (allProjects as ProjectsByTech)[tech] || [];
  const techName = tech.charAt(0).toUpperCase() + tech.slice(1);

  return (
    <TerminalWindow title={`user@portfolio: ~/projects/${tech}`}>
        {/* Initial Command */}
        <div className="mb-4">
            <span className="text-green-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/projects/{tech}</span>
            <span className="text-white">$ </span>
            <span className="ml-2">ls -l</span>
        </div>
        
        {/* Project List */}
        {projects.length > 0 ? (
            <div className="space-y-4">
                {projects.map((p, idx) => (
                    <div key={idx} className="bg-zinc-900/50 p-4 rounded-md border border-green-600/30">
                        <h3 className="font-bold text-green-300">{p.title}</h3>
                        <p className="text-green-200 text-sm mt-1">{p.description}</p>
                        <a href={p.link} className="text-green-300 text-xs hover:underline mt-2 inline-block">Launch Project &rarr;</a>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-yellow-400">No projects found for '{techName}'. Check back later!</p>
        )}

        {/* Command Prompt */}
        <div className="mt-8 flex items-center">
            <span className="text-green-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/projects/{tech}</span>
            <span className="text-white">$ </span>
            <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
        </div>

         <div className="mt-8 text-center">
            <Link href="/" className="text-green-400 hover:underline">-- Return to Home --</Link>
        </div>
    </TerminalWindow>
  );
}