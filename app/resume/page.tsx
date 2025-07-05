export default function Resume() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-blue-500 inline-block">Resume</h1>
      <section>
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
      <section>
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
  );
}
