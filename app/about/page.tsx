import Image from "next/image";

export default function About() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 inline-block">About Me</h1>
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <Image src="/avatar.png" alt="My Avatar" width={120} height={120} className="rounded-full border-4 border-blue-400 shadow-lg" />
        <div>
          <p className="text-lg font-semibold">Hey! I’m Alex, a passionate adolescent software engineer who’s obsessed with blockchain, open source, and building cool stuff for the future 🚀</p>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">I love learning, sharing, and collaborating with other devs. I believe tech should be fun, creative, and make the world better for everyone!</p>
        </div>
      </div>
      <section>
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
      <section>
        <h2 className="text-2xl font-bold mb-2">Fun Facts</h2>
        <ul className="list-disc ml-6 text-base space-y-1">
          <li>I built my first smart contract at 15!</li>
          <li>I love hackathons, memes, and pizza 🍕</li>
          <li>My dream: launch a blockchain game that goes viral</li>
        </ul>
      </section>
    </main>
  );
}
