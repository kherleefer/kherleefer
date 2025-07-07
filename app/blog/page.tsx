"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8">

      {/* Navigation Bar */}
      <motion.nav 
        className="flex justify-center gap-6 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/project", label: "Projects" },
          { href: "/resume", label: "Resume" },
          { href: "/contact", label: "Contact" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:underline text-blue-200 font-semibold"
          >
            {link.label}
          </Link>
        ))}
      </motion.nav>

      <main className="max-w-2xl mx-auto flex flex-col gap-8">

        <motion.div 
          className="rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
        </motion.div>

        {[{
          title: "Why I Love Blockchain (And You Should Too!)",
          content: "Blockchain isn’t just about crypto it’s about freedom, creativity, and building a better internet. Here’s why I’m obsessed, and how you can get started as a teen dev!",
          link: "#"
        }, {
          title: "My First Hackathon: Lessons, Fails, and Pizza",
          content: "I joined my first hackathon at a program organised by the Federal Government, built the Email spam filtering app, and learned more in 48 hours than a month of school. Here’s my story!",
          link: "#"
        }].map((post, index) => (
          <motion.article
            key={index}
            className="bg-blue-700 rounded-2xl shadow p-6 flex flex-col gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
            <a href={post.link} className="text-blue-500 hover:underline">Read more</a>
          </motion.article>
        ))}

        <motion.div
          className="text-center text-blue-200 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          More posts coming soon! 🚧
        </motion.div>

      </main>

    </div>
  );
}
