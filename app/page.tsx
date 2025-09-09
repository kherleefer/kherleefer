"use client";

import Image from "next/image";
import { Github, Send, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Gloxx Chain",
    description: "Developing a web application with Ionic Vue and Supabase PostgreSQL, Thanks to capacitor",
    link: "https://t.me/gloxx_chain/20",
  },
  {
    title: "Gloxx Chain API",
    description: "Create an API for Gloxx chain Crypto mining phase using ExpressJS and PostgreSQL on Supabase. I am currently building the Blockchain and smart contract using Rust.",
    link: "#",
  },
  {
    title: "Email Filter App",
    description: "Develop Email filter app for detecting Spam and Phishing Emails using HTML5, PHP, and Python for ML implementation. The project is currently in progress.",
    link: "https://thinkdoit.infy.uk",
  },
];

const skills = ["Ionic", "Vue.js", "TypeScript", "React", "NextJs", "ExpressJs", "RUST", "TACT", "etc"];

const remarks = [
  {
    title: "selvuc(Zik)",
    description: "Kherleefer is an exceptional developer with a rare blend of creativity and technical skill. Highly recommend working with him!",
  },
  {
    title: "Michael Ofori",
    description: "His command over ExpressJS and dedication to exploring Rust smart contracts is inspiring. Always willing to learn and go the extra mile.",
  },
  {
    title: "Rose Adam",
    description: "Professional, innovative, and highly motivated. Able to combine HTML, PHP, and ML with Python to tackle real-world problems.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-green-400 font-mono">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* About / Profile Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-green-400 rounded-lg p-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Image
              src="/img/profileImage.png"
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-2 border-green-400"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold">Kherleefer <span className="text-green-300 text-sm">(Encryptoknight)</span></h3>
              <p className="mt-1 text-green-300">Software Engineer</p>
              <div className="flex gap-3 mt-2 justify-center md:justify-start">
                <a href="https://github.com/kherleefer"><Github /></a>
                <a href="https://x.com/kherleefer_kk"><Twitter /></a>
                <a href="https://t.me/Encryptoknight"><Send /></a>
                <a href="mailto:mahmudkalifa6@gmail.com"><Mail /></a>
              </div>
            </div>
          </div>
          <p className="mt-4 text-green-200 text-sm">
            I am a software engineer specializing in Rust, Tact, Javascript/Typescript and frameworks like NextJs, VueJs. I build Mobile applications with Ionic Capacitor. I have developed Gloxx Chain Mobile App using the mentioned tools, designed the UI for an Express-based API, and integrated Telegram Mini Apps Analytics into GetFI, a React-based Telegram Web App.
          </p>
        </motion.div>

        {/* Projects Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-green-400 rounded-lg p-6 shadow-lg"
        >
          <h2 className="font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600">
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-green-200 text-sm mt-1">{project.description}</p>
                <a href={project.link} className="text-green-300 text-sm hover:underline mt-1 inline-block">View Project</a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-green-400 rounded-lg p-6 shadow-lg"
        >
          <h2 className="font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-zinc-900 px-3 py-1 rounded-full text-sm border border-green-600">{skill}</span>
            ))}
          </div>
        </motion.div>

        {/* Remarks Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-green-400 rounded-lg p-6 shadow-lg"
        >
          <h2 className="font-bold mb-4">Others Remarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {remarks.map((r, idx) => (
              <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-green-600">
                <h3 className="font-bold">{r.title}</h3>
                <p className="text-green-200 text-sm mt-1">{r.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
