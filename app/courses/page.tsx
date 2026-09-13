import type { Metadata } from "next";
import CoursesClient from "@components/CoursesClient";

export const metadata: Metadata = {
  title: "Courses | Learn with Kherleefer",
  description:
    "Choose a practical Engineering, Analytics or Productivity courses and access its learning materials.",
    keywords: [
    "Software Engineer",
    "Web Developer",
    "Blockchain Developer",
    "Next.js",
    "React",
    "Vue.js",
    "Ionic Framework",
    "Solidity",
    "OpenZeppelin",
    "BNB Chain",
    "TypeScript",
    "Rust",
    "Express.js",
    "Fastify",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "IT Consultant",
    "Data",
    "Analyst",
    "Ai Automation",
    "Nigeria",
    "in Nigeria",
  ],
  metadataBase: new URL("https://kherleefer.netlify.app/courses"),
  alternates: { canonical: "https://kherleefer.netlify.app/courses" },

  openGraph: {
    title: "Learn with Kherleefer",
    description:
      "Choose a practical Engineering, Analytics or Productivity courses and access its learning materials.",
    url: "https://kherleefer.netlify.app/courses",
    type: "website",
    images: [
      {
        url: "https://kherleefer.netlify.app/img/courseOg.png",
        width: 1000,
        height: 1000,
        alt: "Learn Kherleefer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Learn with Kherleefer",
    description:
      "Choose a practical Engineering, Analytics or Productivity courses and access its learning materials.",
    images: ["https://kherleefer.netlify.app/img/courseOg.png"],
    site: "@kherleefer_kk",
  },

   other: {
    "og:image:width": "1000",
    "og:image:height": "1000",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
