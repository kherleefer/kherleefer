import Image from "next/image"; import Link from "next/link"; import { motion } from "framer-motion";

export default function About() { return ( <motion.div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} > {/* Navigation Bar */} <nav className="flex justify-center gap-6 mb-10"> {[ { href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { href: "/project", label: "Projects" }, { href: "/resume", label: "Resume" }, { href: "/contact", label: "Contact" }, ].map((link, index) => ( <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} > <Link
href={link.href}
className="hover:underline text-blue-200 font-semibold"
> {link.label} </Link> </motion.div> ))} </nav>

<main className="max-w-2xl mx-auto flex flex-col gap-8">

    <motion.div
      className="bg-blue-800/60 rounded-2xl p-8 mb-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold mb-4">About Me</h1>
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/img/profileAvatar.png"
            alt="My Avatar"
            width={120}
            height={100}
            className="rounded-full border-4 border-blue-400 shadow-lg"
          />
        </motion.div>
        <div>
          <p className="text-lg font-semibold">
            Hey! I’m Kherleefer, a passionate adolescent software engineer who’s obsessed with blockchain, open source, and building cool stuff for the future 🚀
          </p>
          <p className="mt-2 text-base text-blue-100">
            I love learning, sharing, and collaborating with other devs. I believe tech should be fun, creative, and make the world better for everyone!
          </p>
        </div>
      </div>
    </motion.div>

    <motion.section
      className="bg-blue-700 rounded-2xl p-6"
      initial={{ x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-2">Skills & Tech</h2>
      <ul className="flex flex-wrap gap-3 text-sm">
        {[
          "Next.js",
          "TypeScript",
          "Solidity",
          "React",
          "Node.js",
          "Tailwind CSS",
          "Web3.js",
        ].map((tech, index) => (
          <motion.li
            key={index}
            className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {tech}
          </motion.li>
        ))}
      </ul>
    </motion.section>

    <motion.section
      className="bg-blue-700 rounded-2xl p-6"
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-2">Fun Facts</h2>
      <motion.ul
        className="list-disc ml-6 text-base space-y-1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {["I built my first smart contract at 15!", "I love hackathons, memes, and pizza 🍕", "My dream: launch a blockchain game that goes viral"].map((fact, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {fact}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>

  </main>

  <footer className="mt-12 text-center text-sm text-blue-300">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      © 2025 Alex's Portfolio. Built with ❤️ and Next.js.
    </motion.p>
  </footer>

</motion.div>

); }

