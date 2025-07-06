import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8">
      {/* Navigation Bar */}
      <nav className="flex justify-center gap-6 mb-10">
        <Link href="/" className="hover:underline text-blue-200 font-semibold">Home</Link>
        <Link href="/blog" className="hover:underline text-blue-200 font-semibold">Blog</Link>
        <Link href="/project" className="hover:underline text-blue-200 font-semibold">Projects</Link>
        <Link href="/resume" className="hover:underline text-blue-200 font-semibold">Resume</Link>
        <Link href="/contact" className="hover:underline text-blue-200 font-semibold">Contact</Link>
      </nav>
      <main className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="bg-blue-800/60 rounded-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Image src="/ProfileAvatar.png" alt="My Avatar" width={120} height={120} className="rounded-full border-4 border-blue-400 shadow-lg" />
            <div>
              <p className="text-lg font-semibold">Hey! I’m Alex, a passionate adolescent software engineer who’s obsessed with blockchain, open source, and building cool stuff for the future 🚀</p>
              <p className="mt-2 text-base text-blue-100">I love learning, sharing, and collaborating with other devs. I believe tech should be fun, creative, and make the world better for everyone!</p>
            </div>
          </div>
        </div>
        <section className="bg-blue-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">Skills & Tech</h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">Next.js</li>
            <li className="bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">TypeScript</li>
            <li className="bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">Solidity</li>
            <li className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">React</li>
            <li className="bg-pink-100 dark:bg-pink-900 px-3 py-1 rounded-full">Node.js</li>
            <li className="bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full">Tailwind CSS</li>
            <li className="bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">Web3.js</li>
          </ul>
        </section>
        <section className="bg-blue-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">Fun Facts</h2>
          <ul className="list-disc ml-6 text-base space-y-1">
            <li>I built my first smart contract at 15!</li>
            <li>I love hackathons, memes, and pizza 🍕</li>
            <li>My dream: launch a blockchain game that goes viral</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
