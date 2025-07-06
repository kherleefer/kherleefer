import Link from "next/link";

export default function Resume() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8">
      {/* Navigation Bar */}
      <nav className="flex justify-center gap-6 mb-10">
        <Link href="/" className="hover:underline text-blue-200 font-semibold">Home</Link>
        <Link href="/about" className="hover:underline text-blue-200 font-semibold">About</Link>
        <Link href="/blog" className="hover:underline text-blue-200 font-semibold">Blog</Link>
        <Link href="/project" className="hover:underline text-blue-200 font-semibold">Projects</Link>
        <Link href="/contact" className="hover:underline text-blue-200 font-semibold">Contact</Link>
      </nav>
      <main className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="bg-blue-800/60 rounded-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold mb-4">Resume</h1>
        </div>
        <section className="bg-blue-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">Experience Timeline</h2>
          <ul className="border-l-2 border-blue-400 pl-6 space-y-4">
            <li>
              <span className="font-semibold">2024–Present:</span> Blockchain Developer @ TeenDAO
            </li>
            <li>
              <span className="font-semibold">2023–2024:</span> Full Stack Intern @ CryptoQuest
            </li>
            <li>
              <span className="font-semibold">2022–2023:</span> Open Source Contributor @ Various Web3 Projects
            </li>
          </ul>
        </section>
        <section className="bg-blue-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">Education</h2>
          <ul className="list-disc ml-6">
            <li>High School Diploma (STEM Focus), 2025</li>
            <li>Self-taught Solidity, Next.js, and Blockchain Fundamentals</li>
          </ul>
        </section>
        <a
          href="/resume.pdf"
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition"
          download
        >
          Download PDF
        </a>
      </main>
    </div>
  );
}
