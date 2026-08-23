"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
      <Image
        src={profileImageSrc}
        alt={`${name} profile`}
        width={128}
        height={128}
        className="h-28 w-28 rounded-full border border-black object-cover dark:border-white"
      />
      <div>
        <h3 className="text-2xl font-black tracking-tight">
          {name} <span className="muted text-sm font-normal">({nickname})</span>
        </h3>
        <p className="muted mt-1">{role}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <a href={githubUrl} className="flex items-center gap-1 hover:underline"><Github size={16} /> GitHub</a>
          <a href={twitterUrl} className="flex items-center gap-1 hover:underline"><Twitter size={16} /> Twitter</a>
          <a href={telegramUrl} className="flex items-center gap-1 hover:underline"><Send size={16} /> Telegram</a>
          <a href={email} className="flex items-center gap-1 hover:underline"><MailIcon size={16} /> Email</a>
        </div>
      </div>
      <p className="muted max-w-3xl text-base leading-8 md:col-span-2">
        {description}
      </p>
    </div>
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
              <motion.div key={idx} className="interactive-line border-t py-5" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.06 }}>
                      <h3 className="font-black">{p.title}</h3>
                      <p className="muted mt-2 max-w-2xl text-sm leading-6">{p.description}</p>
                      <a href={p.link} className="mt-3 inline-block text-sm font-bold underline underline-offset-4">View project <span aria-hidden="true">&rarr;</span></a>
                </motion.div>
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
                <span key={skill} className="soft-surface line border px-4 py-2 text-sm font-semibold">{skill}</span>
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
              <motion.div key={idx} className="interactive-line border-l-2 p-4" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.07 }}>
                  <h3 className="font-bold">{r.title}</h3>
                  <p className="muted mt-1 text-sm italic leading-6">{r.description}</p>
                </motion.div>
            ))}
        </div>
    );
}

interface FunFactsContentProps {
    funFacts: string[];
}

export function FunFactsContent({ funFacts }: FunFactsContentProps) {
    return (
        <ul className="muted list-inside list-disc space-y-1">
            {funFacts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
        </ul>
    );
}
