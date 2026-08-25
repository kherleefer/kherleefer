"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { homePageSectionsData } from "@/lib/portfolioData";
import {
  AboutContent,
  ProjectsContent,
  SkillsContent,
  RemarksContent,
} from "@components/HomepageContent";

export default function Home() {
  const about = homePageSectionsData.find((section) => section.id === "about");
  const projects = homePageSectionsData.find(
    (section) => section.id === "projects",
  );
  const skills = homePageSectionsData.find(
    (section) => section.id === "skills",
  );
  const remarks = homePageSectionsData.find(
    (section) => section.id === "remarks",
  );

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <section className="grid gap-10 border-b border-black/10 py-16 sm:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="muted mb-5 text-sm font-semibold uppercase tracking-[0.2em]">
            Software engineer / builder
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Digital products with a point of view.
          </h1>
        </motion.div>
        <motion.div
          className="max-w-sm lg:justify-self-end"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
        >
          <p className="muted text-lg leading-8">
            I design and build fast, dependable web, mobile, and blockchain
            experiences from idea to launch.
          </p>
          <Link
            href="/project"
            className="mt-7 inline-flex items-center gap-2 border-b-2 border-black pb-2 text-sm font-bold hover:border-zinc-400 hover:text-zinc-500"
          >
            Explore selected work <ArrowUpRight size={17} />
          </Link>
        </motion.div>
      </section>

      {about && (
        <motion.section
          className="border-b border-black/10 py-10 sm:py-14"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
        >
          <AboutContent {...about.data} />
        </motion.section>
      )}
      {projects && (
        <motion.section
          className="border-b border-black/10 py-10 sm:py-14"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-3xl font-black tracking-tight">
              Selected work
            </h2>
          </div>
          <ProjectsContent projects={projects.data} />
        </motion.section>
      )}
      {skills && (
        <motion.section
          className="border-b border-black/10 py-10 sm:py-14"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
        >
          <SkillsContent skills={skills.data} />
        </motion.section>
      )}
      {remarks && (
        <motion.section
          className="py-10 sm:py-14"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
        >
          <RemarksContent remarks={remarks.data} />
        </motion.section>
      )}
    </div>
  );
}
