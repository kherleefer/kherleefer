'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import TerminalWindow from '@/components/TerminalWindow';
import { allProjects, ProjectsByTech } from '@/lib/portfolioData';

export default function ProjectPage() {
  const params = useParams();
  const tech = Array.isArray(params.tech) ? params.tech[0] : params.tech;

  // Handle cases where the 'tech' parameter is missing from the URL
  if (!tech) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-5 py-12 sm:px-8">
        <div className="text-center">
            <p className="text-lg font-bold">Technology not specified.</p>
             <div className="mt-8 text-center">
                <Link href="/project" className="font-bold underline underline-offset-4">Return to projects</Link>
            </div>
        </div>
    </div>
    );
  }

  const projects = (allProjects as ProjectsByTech)[tech] || [];
  const techName = tech.charAt(0).toUpperCase() + tech.slice(1);

  return (
    <TerminalWindow title={`${techName} projects`}>
      <div className="mx-auto max-w-4xl">
        <p className="muted text-sm font-bold uppercase tracking-[0.2em]">Technology</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{techName} projects</h1>
            {projects.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {projects.map((p, idx) => (
              <div key={idx} className="line border-t pt-5">
                <h2 className="text-xl font-bold">{p.title}</h2>
                <p className="muted mt-2 text-sm leading-7">{p.description}</p>
                <a href={p.link} className="mt-3 inline-block text-sm font-bold underline underline-offset-4">Launch project &rarr;</a>
                        </div>
                    ))}
                </div>
            ) : (
          <p className="muted mt-10">No projects found for {techName}. Check back later.</p>
            )}
        <Link href="/project" className="mt-10 inline-block text-sm font-bold underline underline-offset-4">Back to all projects</Link>
      </div>
    </TerminalWindow>
  );
}
