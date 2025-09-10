"use client";

import Image from "next/image";
import { Github, Send, Twitter, Mail as MailIcon } from "lucide-react";

interface AboutContentProps {
  profileImageSrc: string;
  name: string;
  nickname: string;
  role: string;
  description: string;
  githubUrl: string;
  twitterUrl: string;
  telegramUrl: string;
  email: string;
}

export function AboutContent({
  profileImageSrc,
  name,
  nickname,
  role,
  description,
  githubUrl,
  twitterUrl,
  telegramUrl,
  email,
}: AboutContentProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Image
          src={profileImageSrc}
          alt="Profile Picture"
          width={100}
          height={70}
          className="rounded-full border-2 border-green-400"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold">
            {name} <span className="text-green-300 text-sm">({nickname})</span>
          </h3>
          <p className="mt-1 text-green-300">{role}</p>
          <div className="flex gap-4 mt-2 justify-center md:justify-start">
            <a href={githubUrl} className="flex items-center gap-1 hover:text-green-200"><Github size={16} /> GitHub</a>
            <a href={twitterUrl} className="flex items-center gap-1 hover:text-green-200"><Twitter size={16} /> Twitter</a>
            <a href={telegramUrl} className="flex items-center gap-1 hover:text-green-200"><Send size={16} /> Telegram</a>
            <a href={email} className="flex items-center gap-1 hover:text-green-200"><MailIcon size={16} /> Email</a>
          </div>
        </div>
      </div>
      <p className="mt-4 text-green-200 text-sm">
        {description}
      </p>
    </>
  );
}

interface ProjectsContentProps {
    projects: {
        title: string;
        description: string;
        link: string;
    }[];
}

export function ProjectsContent({ projects }: ProjectsContentProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {projects.map((p, idx) => (
                <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600/50">
                    <h3 className="font-bold text-green-300">{p.title}</h3>
                    <p className="text-green-200 text-sm mt-1">{p.description}</p>
                    <a href={p.link} className="text-green-300 text-xs hover:underline mt-2 inline-block">View Project &rarr;</a>
                </div>
            ))}
        </div>
    );
}

interface SkillsContentProps {
    skills: string[];
}

export function SkillsContent({ skills }: SkillsContentProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
                <span key={skill} className="bg-zinc-900 px-3 py-1 rounded-full text-sm border border-green-600/50 text-green-300">{skill}</span>
            ))}
        </div>
    );
}

interface RemarksContentProps {
    remarks: { title: string; description: string; }[];
}

export function RemarksContent({ remarks }: RemarksContentProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remarks.map((r, idx) => (
                <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600/50">
                    <h3 className="font-bold text-green-300">{r.title}</h3>
                    <p className="text-green-200 text-sm mt-1 italic">{r.description}</p>
                </div>
            ))}
        </div>
    );
}

interface FunFactsContentProps {
    funFacts: string[];
}

export function FunFactsContent({ funFacts }: FunFactsContentProps) {
    return (
        <ul className="list-disc list-inside text-green-200 space-y-1">
            {funFacts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
        </ul>
    );
}
