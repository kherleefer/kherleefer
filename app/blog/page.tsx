"use client";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/TerminalWindow";
import { blogPosts } from "@/lib/portfolioData";

export default function Blog() {
  return (
    <TerminalWindow title="user@portfolio: ~/blog">
      <div className="mb-4">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/blog</span>
        <span className="text-white">$</span>
        <h2 className="text-xl font-bold text-green-300 ml-2">ls -l</h2>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        <motion.div 
          className="p-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-green-300 mb-4">Blog Posts</h1>
        </motion.div>

        {blogPosts.map((post, index) => (
          <motion.article
            key={index}
            className="bg-zinc-900/50 rounded-lg shadow p-6 flex flex-col gap-2 border border-green-600/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-green-300">{post.title}</h2>
            <p className="text-green-200 text-sm">{post.content}</p>
            <a href={post.link} className="text-green-400 hover:underline text-xs">Read more &rarr;</a>
          </motion.article>
        ))}

        <motion.div
          className="text-center text-green-300 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          More posts coming soon! 🚧
        </motion.div>

      </div>

      <div className="mt-8 flex items-center">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/blog</span>
        <span className="text-white">$ </span>
        <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
      </div>
    </TerminalWindow>
  );
}