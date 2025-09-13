//import { ReactNode } from "react";

// Types
export type Project = { title: string; description: string; link: string; tech?: string[]; image?: string; };
export type ProjectsByTech = Record<string, Project[]>;
export type SectionData = {
    id: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any; 
};
export type SocialLink = { name: string; url: string; icon: string; command: string; }; // icon is now a string identifier
export type BlogPost = { title: string; content: string; link: string; };
export type ResumeItem = { title: string; details: string[]; };
export type TechIcon = { src: string; href: string; label: string; };

// Data for Homepage Sections
export const homePageSectionsData: SectionData[] = [
  {
    id: "about",
    title: "About Me",
    data: {
      profileImageSrc: "/img/profile_image.png",
      name: "Kherleefer",
      nickname: "Encryptoknight",
      role: "Software Engineer & Full-Stack Developer",
      description: "I am a software engineer, website developer, and full-stack developer specializing in Rust, Tact, JavaScript/TypeScript, Next.js, Vue.js, and mobile apps with Ionic Capacitor. I developed the Gloxx Chain Mobile App, designed an Express-based API, and integrated Telegram Mini Apps Analytics into GetFI. Passionate about blockchain, web development, and scalable applications.",
      githubUrl: "https://github.com/kherleefer",
      twitterUrl: "https://x.com/kherleefer_kk",
      telegramUrl: "https://t.me/Encryptoknight",
      email: "mailto:mahmudkalifa6@gmail.com",
    },
  },
  {
    id: "projects",
    title: "Projects",
    data: [
      { title: "Gloxx Chain", description: "A blockchain-powered web and mobile app built with Ionic Vue and Supabase by a full-stack software engineer.", link: "https://t.me/gloxx_chain/20" },
      { title: "Gloxx Chain API", description: "An Express.js and Node.js API developed to power the crypto mining phase of Gloxx Chain.", link: "#" },
      { title: "Email Filter App", description: "A smart web app for detecting spam and phishing emails, showcasing skills in Python, AI, and full-stack web development.", link: "https://thinkdoit.infy.uk" },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    data: ["Ionic", "Vue.js", "TypeScript", "React", "NextJs", "ExpressJs", "RUST", "TACT", "Solidity", "Python", "Go"],
  },
  {
    id: "remarks",
    title: "Others Remarks",
    data: [
      { title: "selvuc(Zik)", description: "\"An exceptional software engineer and web developer with rare creativity and technical skill.\"" },
      { title: "Michael Ofori", description: "\"His command over ExpressJS and Rust smart contracts as a blockchain developer is inspiring.\"" },
      { title: "Rose Adam", description: "\"Professional, innovative, highly motivated full-stack developer.\"" },
    ],
  },
];

// --- Projects by Tech Data (for dynamic project pages) ---
export const allProjects: ProjectsByTech = {
  react: [
    { title: "React Project One", description: "A modern web application built with React and Tailwind CSS, showcasing responsive website development.", link: "#" },
    { title: "React E-commerce Site", description: "A full-stack online store powered by React, optimized for user experience and performance.", link: "#" },
  ],
  nextjs: [
    { title: "Next.js Portfolio", description: "The portfolio of a software engineer and website developer, built with Next.js for SEO and speed.", link: "/" },
    { title: "Next.js Blog", description: "A content-rich blog with SSG using Next.js, designed for developers and technical writers.", link: "#" },
  ],
  ionic: [
    { title: "Ionic Fitness App", description: "A cross-platform fitness mobile app developed with Ionic and Capacitor, built by a full-stack developer.", link: "#" },
  ],
  typescript: [
    { title: "TypeScript Data Visualizer", description: "A web tool for visualizing complex datasets using TypeScript and modern web development best practices.", link: "#" },
  ],
  rust: [
    { title: "Rust Blockchain CLI", description: "A blockchain command-line interface built in Rust, demonstrating strong skills as a blockchain developer.", link: "#" },
  ],
  aws: [],
  vercel: [],
};

// --- About Page Data ---
export const aboutPageData = {
  profileAvatarSrc: "/img/profile_image.png",
  name: "Kherleefer",
  skills: [
    "Next.js", "TypeScript", "Solidity", "React",
    "Node.js", "Tailwind CSS", "Web3.js",
  ],
  funFacts: [
    "I built my first smart contract at 15!",
    "I love hackathons, memes, and pizza 🍕",
    "My dream: launch a blockchain game that goes viral",
  ],
};

// --- Contact Page Data ---
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/kherleefer",
    icon: "github",
    command: "connect github",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/kherleefer_kk",
    icon: "twitter",
    command: "connect twitter",
  },
  {
    name: "Email",
    url: "mailto:mahmudkalifa6@gmail.com",
    icon: "mail",
    command: "send-mail",
  },
];

// --- Blog Page Data ---
export const blogPosts: BlogPost[] = [
  {
    title: "Why I Love Blockchain (And You Should Too!)",
    content: "Blockchain isn’t just about crypto — it’s about freedom, creativity, and building a better internet. As a blockchain developer and software engineer, here’s why I’m obsessed and how you can get started as a young dev!",
    link: "#"
  },
  {
    title: "My First Hackathon: Lessons, Fails, and Pizza",
    content: "I joined my first hackathon at a Federal Government program, built the Email Spam Filtering App as a full-stack web developer, and learned more in 48 hours than in a month of school. Here’s my story!",
    link: "#"
  },
];

// --- Project Page Data (general projects overview) ---
export const generalProjects: Project[] = [
  {
    title: "CryptoQuest Game",
    description: "A play-to-earn blockchain game where you collect, trade, and battle NFT creatures. Developed as a full-stack project with smart contracts.",
    tech: ["Next.js", "Solidity", "Web3.js", "Polygon"],
    image: "/cryptoquest.png",
    link: "https://github.com/yourusername/cryptoquest",
  },
  {
    title: "TeenDAO",
    description: "A decentralized autonomous organization for teens to learn, vote, and build together. A blockchain development and full-stack engineering project.",
    tech: ["React", "Ethereum", "IPFS"],
    image: "/teendao.png",
    link: "https://github.com/yourusername/teendao",
  },
  {
    title: "BlockChat Messenger",
    description: "A privacy-first chat app using blockchain for end-to-end encryption and identity. Built by a software engineer with Next.js, Node.js, and Solidity.",
    tech: ["Next.js", "Node.js", "Solidity"],
    image: "/blockchat.png",
    link: "https://github.com/yourusername/blockchat",
  },
];

// --- Footer Tech Icons Data ---
export const techIcons: TechIcon[] = [
  { src: "/icons/nextjs.png", href: "/projects/nextjs", label: "Next.js" },
  { src: "/icons/react.png", href: "/projects/react", label: "React" },
  { src: "/icons/ionic.png", href: "/projects/ionic", label: "Ionic" },
  { src: "/icons/typescript.png", href: "/projects/typescript", label: "TypeScript" },
  { src: "/icons/rust.png", href: "/projects/rust", label: "Rust" },
  { src: "/icons/aws.png", href: "/projects/aws", label: "AWS" },
  { src: "/icons/vercel.svg", href: "/projects/vercel", label: "Vercel" },
];

// --- Resume Page Data ---
export const experience: ResumeItem[] = [
  {
    title: "2024–Present:",
    details: ["Blockchain Developer @ TeenDAO — building decentralized applications and smart contracts."],
  },
  {
    title: "2023–2024:",
    details: ["Full-Stack Intern @ CryptoQuest — contributing to blockchain gaming and website development."],
  },
  {
    title: "2022–2023:",
    details: ["Open Source Contributor @ Various Web3 Projects — focusing on Rust, Solidity, and Next.js."],
  },
];

export const education: ResumeItem[] = [
  {
    title: "High School Diploma (STEM Focus), 2025",
    details: [],
  },
  {
    title: "Self-taught Solidity, Next.js, and Blockchain Fundamentals",
    details: [],
  },
];