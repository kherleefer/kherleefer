import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8">
      {/* Navigation Bar */}
      <nav className="flex justify-center gap-6 mb-10">
        <Link href="/" className="hover:underline text-blue-200 font-semibold">Home</Link>
        <Link href="/about" className="hover:underline text-blue-200 font-semibold">About</Link>
        <Link href="/blog" className="hover:underline text-blue-200 font-semibold">Blog</Link>
        <Link href="/project" className="hover:underline text-blue-200 font-semibold">Projects</Link>
        <Link href="/resume" className="hover:underline text-blue-200 font-semibold">Resume</Link>
      </nav>
      <main className="max-w-xl mx-auto flex flex-col gap-8">
        <div className="bg-blue-800/60 rounded-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
        </div>
        <form className="flex flex-col gap-4 bg-blue-700 rounded-xl shadow p-6">
          <label className="font-semibold">Name
            <input type="text" className="mt-1 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" placeholder="Your name" required />
          </label>
          <label className="font-semibold">Email
            <input type="email" className="mt-1 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" placeholder="you@email.com" required />
          </label>
          <label className="font-semibold">Message
            <textarea className="mt-1 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" rows={4} placeholder="Say hi!" required />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition">Send Message</button>
        </form>
        <div className="flex gap-4 justify-center mt-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-400">GitHub</a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-400">Twitter</a>
          <a href="mailto:you@email.com" className="text-blue-200 hover:text-blue-400">Email</a>
        </div>
      </main>
    </div>
  );
}
