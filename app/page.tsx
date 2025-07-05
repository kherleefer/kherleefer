"use client";
import Image from "next/image";
//import Link from "next/link";
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
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Image
              src="/img/profileImage.png"
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full"
            />
          </motion.div>
          <h1 className="text-4xl font-bold mt-4">
            Kherleefer
            <p><small>(Encryptoknight)</small></p>
          </h1>
          <p className="text-lg text-blue-200">Software Engineer</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://github.com/kherleefer">
              <Github className="h-6 w-6 hover:text-white" />
            </a>
            <a href="https://x.com/kherleefer_kk">
              <Twitter className="h-6 w-6 hover:text-white" />
            </a>
            <a href="https://t.me/Encryptoknight">
              <Send className="h-6 w-6 hover:text-white" />
            </a>
            <a mailto:"mahmudkalifa6@gmail.com">
              <Mail className="h-6 w-6 hover:text-white" />
            </a>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Gloxx Chain",
                description:
                  "Developing a web application with Ionic Vue and Supabase PostgreSQL",
                link: "#",
              },
              {
                title: "API UI",
                description:
                  "Creating a user interface for an Express API using Vue.js",
                link: "#",
              },
              {
                title: "GetFintigration",
                description:
                  "Adding Telegram Mini Apps Analytics to a React application",
                link: "#",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-blue-700 p-4 rounded-2xl"
              >
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
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
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {["Ionic", "Vue.js", "TypeScript", "React"].map((skill) => (
              <span
                key={skill}
                className="bg-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <form className="bg-blue-700 p-6 rounded-2xl">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 rounded-md text-black"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 rounded-md text-black"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full p-2 mb-4 rounded-md text-black"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </motion.section>
      </div>
    </motion.div>
  );
}
