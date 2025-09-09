//import { ReactNode } from "react";

// Types
export type Project = { title: string; description: string; link: string; tech?: string[]; image?: string; };
export type ProjectsByTech = Record<string, Project[]>;
export type SectionData = {
    id: string;
    title: string;
    data: unknown; // Using 'any' for now as data structure varies per section type
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
    // Raw data for the AboutContent component
    data: {
      profileImageSrc: "/img/profile_image.png",
      name: "Kherleefer",
      nickname: "Encryptoknight",
      role: "Software Engineer",
      description: "I am a software engineer specializing in Rust, Tact, Javascript/Typescript, NextJs, VueJs, and Mobile apps with Ionic Capacitor. I developed Gloxx Chain Mobile App, designed an Express-based API UI, and integrated Telegram Mini Apps Analytics into GetFI.",
      githubUrl: "https://github.com/kherleefer",
      twitterUrl: "https://x.com/kherleefer_kk",
      telegramUrl: "https://t.me/Encryptoknight",
      email: "mailto:mahmudkalifa6@gmail.com",
    },
  },
  {
    id: "projects",
    title: "Projects",
    // Raw data for the ProjectsContent component
    data: [
      { title: "Gloxx Chain", description: "Web app with Ionic Vue and Supabase", link: "https://t.me/gloxx_chain/20" },
      { title: "Gloxx Chain API", description: "API for crypto mining phase", link: "#" },
      { title: "Email Filter App", description: "Detecting Spam & Phishing Emails", link: "https://thinkdoit.infy.uk" },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    // Raw data for the SkillsContent component
    data: ["Ionic", "Vue.js", "TypeScript", "React", "NextJs", "ExpressJs", "RUST", "TACT", "Solidity", "Python", "Go"],
  },
  {
    id: "remarks",
    title: "Others Remarks",
    // Raw data for the RemarksContent component
    data: [
      { title: "selvuc(Zik)", description: "\"Exceptional developer with rare creativity and technical skill.\"" },
      { title: "Michael Ofori", description: "\"Command over ExpressJS and Rust smart contracts is inspiring.\"" },
      { title: "Rose Adam", description: "\"Professional, innovative, highly motivated.\"" },
    ],
  },
];

// --- Projects by Tech Data (for dynamic project pages) ---
export const allProjects: ProjectsByTech = {
  react: [
    { title: "React Project One", description: "A cool app built with React and Tailwind CSS.", link: "#" },
    { title: "React E-commerce Site", description: "An online store powered by React.", link: "#" },
  ],
  nextjs: [
    { title: "Next.js Portfolio", description: "The very portfolio you are looking at!", link: "/" },
    { title: "Next.js Blog", description: "A content-heavy blog with SSG.", link: "#" },
  ],
  ionic: [
    { title: "Ionic Fitness App", description: "A cross-platform mobile app for tracking workouts.", link: "#" },
  ],
  typescript: [
    { title: "TypeScript Data Visualizer", description: "A tool for visualizing complex datasets.", link: "#" },
  ],
  rust: [
    { title: "Rust Blockchain CLI", description: "A command-line interface for a custom blockchain.", link: "#" },
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
    content: "Blockchain isn’t just about crypto it’s about freedom, creativity, and building a better internet. Here’s why I’m obsessed, and how you can get started as a teen dev!",
    link: "#"
  },
  {
    title: "My First Hackathon: Lessons, Fails, and Pizza",
    content: "I joined my first hackathon at a program organised by the Federal Government, built the Email spam filtering app, and learned more in 48 hours than a month of school. Here’s my story!",
    link: "#"
  },
];

// --- Project Page Data (for the main /project route if it still exists) ---
// Assuming this is for a general projects overview page, not the dynamic ones.
export const generalProjects: Project[] = [
  {
    title: "CryptoQuest Game",
    description: "A play-to-earn blockchain game where you collect, trade, and battle NFT creatures.",
    tech: ["Next.js", "Solidity", "Web3.js", "Polygon"],
    image: "/cryptoquest.png",
    link: "https://github.com/yourusername/cryptoquest",
  },
  {
    title: "TeenDAO",
    description: "A decentralized autonomous organization for teens to learn, vote, and build together.",
    tech: ["React", "Ethereum", "IPFS"],
    image: "/teendao.png",
    link: "https://github.com/yourusername/teendao",
  },
  {
    title: "BlockChat Messenger",
    description: "A privacy-first chat app using blockchain for end-to-end encryption and identity.",
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
    details: ["Blockchain Developer @ TeenDAO"],
  },
  {
    title: "2023–2024:",
    details: ["Full Stack Intern @ CryptoQuest"],
  },
  {
    title: "2022–2023:",
    details: ["Open Source Contributor @ Various Web3 Projects"],
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
