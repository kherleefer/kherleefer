import Image from "next/image";

const projects = [
  {
    title: "CryptoQuest Game",
    description: "A play-to-earn blockchain game where you collect, trade, and battle NFT creatures.",
    tech: ["Next.js", "Solidity", "Web3.js", "Polygon"],
    image: "/cryptoquest.png",
    link: "https://github.com/yourusername/cryptoquest"
  },
  {
    title: "TeenDAO",
    description: "A decentralized autonomous organization for teens to learn, vote, and build together.",
    tech: ["React", "Ethereum", "IPFS"],
    image: "/teendao.png",
    link: "https://github.com/yourusername/teendao"
  },
  {
    title: "BlockChat Messenger",
    description: "A privacy-first chat app using blockchain for end-to-end encryption and identity.",
    tech: ["Next.js", "Node.js", "Solidity"],
    image: "/blockchat.png",
    link: "https://github.com/yourusername/blockchat"
  }
];

export default function Projects() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-green-400 to-blue-500 inline-block">Projects</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-900 p-4 flex flex-col gap-3 hover:scale-[1.03]"
          >
            <Image src={project.image} alt={project.title} width={400} height={200} className="rounded-lg object-cover w-full h-40" />
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((t) => (
                <span key={t} className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded-full text-xs">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
