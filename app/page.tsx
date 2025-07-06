"use client";
import Image from "next/image";
//import Link from "next/link";
import Link from "next/link";
import { Github, Send, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8"
    >
      {/* Navigation Bar */}
      <nav className="flex justify-center gap-6 mb-10">
        <Link
          href="/about"
          className="hover:underline text-blue-200 font-semibold"
        >
          About
        </Link>
        <Link
          href="/blog"
          className="hover:underline text-blue-200 font-semibold"
        >
          Blog
        </Link>
        <Link
          href="/project"
          className="hover:underline text-blue-200 font-semibold"
        >
          Projects
        </Link>
        <Link
          href="/resume"
          className="hover:underline text-blue-200 font-semibold"
        >
          Resume
        </Link>
        <Link
          href="/contact"
          className="hover:underline text-blue-200 font-semibold"
        >
          Contact
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-blue-800/60 rounded-2xl p-4 md:p-6">
            {/* Profile Image on the left */}
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <Image
                src="/img/profileImage.png"
                alt="Profile Picture"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            {/* Text and Socials on the right */}
            <div className="text-center md:text-left w-full">
              <h1 className="text-4xl font-bold">
                Kherleefer
                <p>
                  <small>(Encryptoknight)</small>
                </p>
              </h1>
              <p className="text-lg text-blue-200 mt-2">Software Engineer</p>
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <a href="https://github.com/kherleefer">
                  <Github className="h-6 w-6 hover:text-white" />
                </a>
                <a href="https://x.com/kherleefer_kk">
                  <Twitter className="h-6 w-6 hover:text-white" />
                </a>
                <a href="https://t.me/Encryptoknight">
                  <Send className="h-6 w-6 hover:text-white" />
                </a>
                <a href="mailto:mahmudkalifa6@gmail.com">
                  <Mail className="h-6 w-6 hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </header>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-blue-700 rounded-2xl p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-blue-100">
            I am a software engineer specializing in Rust, Tact,
            Javascript/Typescript and frameworks like nextJs, VueJs i build
            Mobile applications with Ionic Capacitor. I have developed Gloxx
            Chain Mobile App using the mentioned tool, designed the UI for an
            Express-based API, and also integrated Telegram Mini Apps Analytics
            into GetFI, a React-based Telegram Web App.
          </p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                title: "Gloxx Chain",
                description:
                  "Developing a web application with Ionic Vue and Supabase PostgreSQL, Thanks to capacitor",
                link: "https://t.me/gloxx_chain/20",
              },
              {
                title: "Gloxx Chain API",
                description:
                  "Create an API for Gloxx chain Crypto mining phase using ExpressJS and PostgreSQL on Supabase. I am currently bulding the Blockcahan anssmart contract using Rust.",
                link: "#",
              },
              {
                title: "Email Filter App",
                description:
                  " develop Email filter app for Detecting Spam and Phishing Emails using HTML5, PHP, and Python for ML implementation. the project is currently in progress or rather on hold.",
                link: "https://thinkdoit.infy.uk",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
                className="bg-blue-700 p-4 rounded-2xl"
              >
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-bold mb-2"
                >
                  {project.title}
                </motion.h3>
                <p className="text-blue-100 text-sm mb-4">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="text-blue-300 hover:underline text-sm"
                >
                  View Project
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {["Ionic", "Vue.js", "TypeScript", "React", "NextJs", "ExpressJs", "RUST", "TACT", "etc"].map((skill) => (
              <span
                key={skill}
                className="bg-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Leave A Remark</h2>
          <form className="bg-blue-700 p-6 rounded-2xl">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 rounded-md text-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 rounded-md text-white"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full p-2 mb-4 rounded-md text-white"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Others Remarks</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                title: "Zik Stane",
                description:
                  "Developing a web application with Ionic Vue and Supabase PostgreSQL, Thanks to capacitor",
                link: "https://t.me/gloxx_chain/20",
              },
              {
                title: "Mehmad",
                description:
                  "Create an API for Gloxx chain Crypto mining phase using ExpressJS and PostgreSQL on Supabase. I am currently bulding the Blockcahan anssmart contract using Rust.",
                link: "#",
              },
              {
                title: "Rose Adam",
                description:
                  " develop Email filter app for Detecting Spam and Phishing Emails using HTML5, PHP, and Python for ML implementation. the project is currently in progress or rather on hold.",
                link: "https://thinkdoit.infy.uk",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
                className="bg-blue-700 p-4 rounded-2xl"
              >
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-bold mb-2"
                >
                  {project.title}
                </motion.h3>
                <p className="text-blue-100 text-sm mb-4">
                  {project.description}
                </p>
                
              </motion.div>
            ))}
          </motion.div>
         </motion.section> 
      </div>
    </motion.div>
  );
}
