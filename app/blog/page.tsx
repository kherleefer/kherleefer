export default function Blog() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-pink-400 to-yellow-500 inline-block">Blog</h1>
      <article className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Why I Love Blockchain (And You Should Too!)</h2>
        <p className="text-gray-700 dark:text-gray-300">Blockchain isn’t just about crypto—it’s about freedom, creativity, and building a better internet. Here’s why I’m obsessed, and how you can get started as a teen dev!</p>
        <a href="#" className="text-blue-500 hover:underline">Read more</a>
      </article>
      <article className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">My First Hackathon: Lessons, Fails, and Pizza</h2>
        <p className="text-gray-700 dark:text-gray-300">I joined my first hackathon at 16, built a blockchain voting app, and learned more in 48 hours than a month of school. Here’s my story!</p>
        <a href="#" className="text-blue-500 hover:underline">Read more</a>
      </article>
      <div className="text-center text-gray-500 mt-8">More posts coming soon! 🚧</div>
    </main>
  );
}
