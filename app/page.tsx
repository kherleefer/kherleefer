"use client";

import TerminalWindow from "@/components/TerminalWindow";
import { homePageSectionsData } from "@/lib/portfolioData";
import { AboutContent, ProjectsContent, SkillsContent, RemarksContent } from "@components/HomepageContent";

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
            {homePageSectionsData.map(section => (
                <section key={section.id} id={section.id}>
                    <div className="flex items-center mb-4">
                        <span className="text-green-400">user@portfolio</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~/{section.title.toLowerCase()}</span>
                        <span className="text-white">$ </span>
                        <h2 className="text-xl font-bold text-green-300 ml-2">cat {section.title.toLowerCase()}.md</h2>
                    </div>
                    <div className="pl-4 border-l-2 border-green-500/20">
                        {section.id === "about" && <AboutContent {...section.data} />}
                        {section.id === "projects" && <ProjectsContent projects={section.data} />}
                        {section.id === "skills" && <SkillsContent skills={section.data} />}
                        {section.id === "remarks" && <RemarksContent remarks={section.data} />}
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
