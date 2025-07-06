import Image from "next/image";
import Link from "next/link";

const projects = [
	{
		title: "CryptoQuest Game",
		description:
			"A play-to-earn blockchain game where you collect, trade, and battle NFT creatures.",
		tech: ["Next.js", "Solidity", "Web3.js", "Polygon"],
		image: "/cryptoquest.png",
		link: "https://github.com/yourusername/cryptoquest",
	},
	{
		title: "TeenDAO",
		description:
			"A decentralized autonomous organization for teens to learn, vote, and build together.",
		tech: ["React", "Ethereum", "IPFS"],
		image: "/teendao.png",
		link: "https://github.com/yourusername/teendao",
	},
	{
		title: "BlockChat Messenger",
		description:
			"A privacy-first chat app using blockchain for end-to-end encryption and identity.",
		tech: ["Next.js", "Node.js", "Solidity"],
		image: "/blockchat.png",
		link: "https://github.com/yourusername/blockchat",
	},
];

export default function Projects() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8">
			{/* Navigation Bar */}
			<nav className="flex justify-center gap-6 mb-10">
				<Link
					href="/"
					className="hover:underline text-blue-200 font-semibold"
				>
					Home
				</Link>
				<Link
					href="/about"
					className="hover:underline text-blue-200 font-semibold"
				>
					About
				</Link>
				<Link
					href="/blog"
					className="hover:underline text-blue-200 font-semibold"
				>
					Blog
				</Link>
				<Link
					href="/resume"
					className="hover:underline text-blue-200 font-semibold"
				>
					Resume
				</Link>
				<Link
					href="/contact"
					className="hover:underline text-blue-200 font-semibold"
				>
					Contact
				</Link>
			</nav>
			<main className="max-w-3xl mx-auto flex flex-col gap-10">
				<div className="bg-blue-800/60 rounded-2xl p-8 mb-6">
					<h1 className="text-4xl font-bold mb-4">Projects</h1>
				</div>
				<div className="grid gap-8 md:grid-cols-2">
					{projects.map((project) => (
						<a
							key={project.title}
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-xl border border-blue-400 shadow-md hover:shadow-lg transition-shadow bg-blue-700 p-4 flex flex-col gap-3 hover:scale-[1.03]"
						>
							<Image
								src={project.image}
								alt={project.title}
								width={400}
								height={200}
								className="rounded-lg object-cover w-full h-40"
							/>
							<h2 className="text-xl font-bold">{project.title}</h2>
							<p className="text-base text-blue-100">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-2 mt-2">
								{project.tech.map((t) => (
									<span
										key={t}
										className="bg-blue-600 px-2 py-0.5 rounded-full text-xs"
									>
										{t}
									</span>
								))}
							</div>
						</a>
					))}
				</div>
			</main>
		</div>
	);
}
