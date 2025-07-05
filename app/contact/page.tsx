export default function Contact() {
  return (
    <main className="max-w-xl mx-auto py-16 px-4 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-green-400 to-blue-500 inline-block">Contact</h1>
      <form className="flex flex-col gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
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
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">GitHub</a>
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Twitter</a>
        <a href="mailto:you@email.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Email</a>
      </div>
    </main>
  );
}
