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
      { title: "ReactJet", description: "A cloud platform that builds, signs, and delivers React and React Native apps without the pain of local setup", link: "https://reactjet.vercel.app" },
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
    { title: "Mahony Energy", description: "A website designed for Mahony Energy a smart agro city initiative.", link: "https://mahony-energy.com" },
    { title: "", description: "", link: "#" },
  ],
  nextjs: [
    { title: "This Portfolio", description: "The portfolio of a software engineer and website developer, built with Next.js for SEO and speed.", link: "/" },
    { title: "Amees Empire", description: "An E-commerce website with SSG using Next.js, designed for Amees Empire Cloting and acessories .", link: "https://ameesempire.ng" },
    { title: "DeejaamaNg", description: "An E-commerce website with SSG using Next.js, designed for DeejaamaNg Fashion Cloting and acessories .", link: "https://deejaama.ng" },
    { title: "Daawah", description: "An Islamic educational website, designed for DaawahNg Islamic Foundation .", link: "https://daawah.ng" },

  ],
  ionic: [
    { title: "Gloxx Chain", description: "A blockchain-powered mobile app built with Ionic Vue, Capacitor and PostgreSQL.", link: "https://t.me/gloxx_chain" },
    { title: "Emergency Report System", description: "A  mobile app built with Ionic Vue, Capacitor and PostgreSQL for reporting emergency situation.", link: "#" },

  ],
  typescript: [
    { title: "This Portfolio", description: "The portfolio of a software engineer and website developer, built with Next.js for SEO and speed.", link: "/" },
    { title: "Amees Empire", description: "An E-commerce website with SSG using Next.js, designed for Amees Empire Cloting and acessories .", link: "https://ameesempire.ng" },
    { title: "DeejaamaNg", description: "An E-commerce website with SSG using Next.js, designed for DeejaamaNg Fashion Cloting and acessories .", link: "https://deejaama.ng" },
    { title: "Daawah", description: "An Islamic educational website, designed for DaawahNg Islamic Foundation .", link: "https://daawah.ng" },
    { title: "Mahony Energy", description: "A website designed for Mahony Energy a smart agro city initiative.", link: "https://mahony-energy.com" },
    { title: "Gloxx Chain Api", description: "The Gloxxchain api built using ExpressJS.", link: "#" },
    { title: "Gloxx Chain", description: "A blockchain-powered mobile app built with Ionic Vue, Capacitor and PostgreSQL.", link: "https://t.me/gloxx_chain" },
    { title: "Emergency Report System", description: "A  mobile app built with Ionic Vue, Capacitor and PostgreSQL for reporting emergency situation.", link: "#" },

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
    "Ionic", "Vue.js", "TypeScript/Javascript", "React/ReactNative", 
    "NextJs", "ExpressJs", "RUST", "Github Action Workflow",
     "Solidity", "Python", "Go",".NET",
  ],
  funFacts: [
    "I'm fluent in both frontend and backend languages, from JavaScript to Rust.",
    "My passion for blockchain extends beyond code; I'm also an avid follower of the latest trends in DeFi and Web3.",
    "When I'm not building scalable applications, you can find me exploring the world of mobile development with Ionic Capacitor.",
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
    title: "React Jet",
    description: "A cloud platform that builds, signs, and delivers React and React Native apps without the pain of local setup.",
    tech: ["Next.js", "Go", "Fastify", "Typescript", "PostgreSQL"],
    image: "/reactjet.png",
    link: "https://github.com/kherleefer/React-jet-ui.git",
  },
  {
    title: "Gloxx Chain",
    description: "Gloxx Chain is a blockchain-powered mobile app built with Ionic Vue project built to power the GLX token with wallets, mining, and exchanges all under one secure ecosystem.",
    tech: ["VueJs", "BNBCHAIN", "Solidity", "Ionic", "RUST", "ExpressJs", "Javascript", "Ethers", "PostgreSQL"],
    image: "/GloxxUi.png",
    link: "https://github.com/kherleefer/g-chain-ui.git",
  },
  {
    title: "Emergency Report System",
    description: "An Emergency Report system that enable a user report an emergency to its nearest Authority (Hospital, Police, Fire Department)",
    tech: ["VueJs",  "Ionic",  "ExpressJs", "Javascript", "Firebase", "Paystack"],
    image: "/erpsystem.png",
    link: "https://github.com/kherleefer/erp",
  },
];

// --- Footer Tech Icons Data ---
export const techIcons: TechIcon[] = [
  { src: "/icons/nextjs.png", href: "/projects/nextjs", label: "Next.js" },
  { src: "/icons/react.png", href: "/projects/react", label: "React" },
  { src: "/icons/ionic.png", href: "/projects/ionic", label: "Ionic" },
  { src: "/icons/typescript.png", href: "/projects/typescript", label: "TypeScript" },
  { src: "/icons/rust.png", href: "/projects/rust", label: "Rust" },
 ];

// --- Resume Page Data ---
export const experience: ResumeItem[] = [
  {
    title: "2025-Present (Part-time):",
    details: ["Full-Stack Developer @ Techspeed Business Intelligence — building scalable Webapps, Mobile apps, PWAs and integrating APIs using modern tool and technology."],
  },
  {
    title: "2025-Present (Part-time):",
    details: ["Course Instructor @ TechHub — Delivering training in web development, programming, Microsoft Suite. contribute in preparing curriculum modules covering modern Frameworks, databases and deployment strategies."],
  },
  {
    title: "2022-Present:",
    details: ["Software Engineer @ KK Gliste Technology — focusing on building SaaS products, Built Gloxx Chain, ERP, ReactJet."],
  },
];

export const education: ResumeItem[] = [
  {
    title: "High School Diploma (Computer Science), 2022",
    details: [],
  },
  {
    title: "Self-taught Solidity, Next.js, and Blockchain Fundamentals",
    details: [],
  },
];
