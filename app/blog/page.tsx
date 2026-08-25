import TerminalWindow from "@/components/TerminalWindow";
import { blogPosts } from "@/lib/portfolioData";

export default function Blog() {
  return (
    <TerminalWindow title="user@portfolio: ~/blog">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div>
          <p className="muted text-sm font-bold uppercase tracking-[0.2em]">
            Writing
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Blog posts
          </h1>
        </div>

        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="line flex flex-col gap-2 border-t py-6"
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="muted text-sm leading-7">{post.content}</p>
            <a
              href={post.link}
              className="text-sm font-bold underline underline-offset-4"
            >
              Read more &rarr;
            </a>
          </article>
        ))}
      </div>
    </TerminalWindow>
  );
}
