import Link from "next/link";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8">
      {/* Navigation Bar */}
      <nav className="flex justify-center gap-6 mb-10">
        <Link href="/" className="hover:underline text-blue-200 font-semibold">Home</Link>
        <Link href="/about" className="hover:underline text-blue-200 font-semibold">About</Link>
        <Link href="/project" className="hover:underline text-blue-200 font-semibold">Projects</Link>
        <Link href="/resume" className="hover:underline text-blue-200 font-semibold">Resume</Link>
        <Link href="/contact" className="hover:underline text-blue-200 font-semibold">Contact</Link>
      </nav>
      <main className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="bg-blue-800/60 rounded-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
        </div>
        <article className="bg-blue-700 rounded-2xl shadow p-6 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Why I Love Blockchain (And You Should Too!)</h2>
          <p className="text-gray-700 dark:text-gray-300">Blockchain isn’t just about crypto—it’s about freedom, creativity, and building a better internet. Here’s why I’m obsessed, and how you can get started as a teen dev!</p>
          <a href="#" className="text-blue-500 hover:underline">Read more</a>
        </article>
        <article className="bg-blue-700 rounded-2xl shadow p-6 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">My First Hackathon: Lessons, Fails, and Pizza</h2>
          <p className="text-gray-700 dark:text-gray-300">I joined my first hackathon at 16, built a blockchain voting app, and learned more in 48 hours than a month of school. Here’s my story!</p>
          <a href="#" className="text-blue-500 hover:underline">Read more</a>
        </article>
        <div className="text-center text-blue-200 mt-8">More posts coming soon! 🚧</div>
      </main>
    </div>
  );
}
