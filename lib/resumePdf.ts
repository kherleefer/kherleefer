import type { jsPDF } from "jspdf";
import {
  aboutPageData,
  certificates,
  education,
  experience,
  generalProjects,
  homePageSectionsData,
  socialLinks,
} from "./portfolioData";

export const PORTFOLIO_URL = "https://kherleefer.netlify.app";

const PAGE_WIDTH = 595.28; // A4 width (pt)
const PAGE_HEIGHT = 841.89; // A4 height (pt)
const MARGIN = 46;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const COLOR = {
  ink: "#181818",
  soft: "#585858",
  faint: "#8c8c8c",
  rule: "#d6d6d6",
  accent: "#101010",
} as const;

type AboutData = {
  profileImageSrc: string;
  name: string;
  nickname: string;
  role: string;
  description: string;
  email: string;
  githubUrl: string;
  telegramUrl: string;
};

function wrap(doc: jsPDF, text: string, width: number): string[] {
  return doc.splitTextToSize(text, width);
}

function drawSectionTitle(doc: jsPDF, title: string, y: number): void {
  doc.setFillColor(COLOR.accent);
  doc.rect(MARGIN, y - 9, 3.2, 13, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(COLOR.ink);
  doc.text(title.toUpperCase(), MARGIN + 11, y + 1);
  doc.setDrawColor(COLOR.rule);
  doc.setLineWidth(0.5);
  doc.line(MARGIN + 11, y + 6, PAGE_WIDTH - MARGIN, y + 6);
}

function numberedFooter(doc: jsPDF): void {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR.faint);
  doc.text(
    `Kherleefer — Resume    •    ${PORTFOLIO_URL}`,
    MARGIN,
    PAGE_HEIGHT - 22,
  );
  doc.text(
    `Page ${doc.getNumberOfPages()}`,
    PAGE_WIDTH - MARGIN,
    PAGE_HEIGHT - 22,
    { align: "right" },
  );
}

async function loadImageDataUrl(src: string): Promise<string | null> {
  try {
    const response = await fetch(src);
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read image"));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateResumePdf(): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });

  const aboutSection = homePageSectionsData.find((s) => s.id === "about");
  const about = (aboutSection?.data ?? {
    profileImageSrc: "/img/profile_image.png",
    name: "Mahmud Abubakar (Kherleefer)",
    nickname: "Encryptoknight",
    role: "Data Analyst, Software Engineer & Full-Stack Developer",
    description: "",
    email: "mahmudkalifa6@gmail.com",
    githubUrl: "https://github.com/kherleefer",
    telegramUrl: "https://t.me/Encryptoknight",
  }) as AboutData;

  let y = 0;
  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - MARGIN - 10) {
      doc.addPage();
      y = MARGIN;
      numberedFooter(doc);
    }
  };

  const linkedin =
    socialLinks.find((link) => link.name === "LinkedIn")?.url.replace(
      /^https?:\/\//,
      "",
    ) ?? "";

  // ---------- Header banner ----------
  const BANNER_H = 150;
  const imgSize = 94;
  const imgX = MARGIN;
  const imgY = (BANNER_H - imgSize) / 2;

  doc.setFillColor(COLOR.accent);
  doc.rect(0, 0, PAGE_WIDTH, BANNER_H, "F");

  const imageData = await loadImageDataUrl(about.profileImageSrc);
  let imagePlaced = false;
  if (imageData) {
    const graphics = doc as jsPDF & {
      clip?: () => void;
      saveGraphicsState?: () => void;
      restoreGraphicsState?: () => void;
    };
    if (
      graphics.saveGraphicsState &&
      graphics.clip &&
      graphics.restoreGraphicsState
    ) {
      try {
        graphics.saveGraphicsState();
        doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2);
        graphics.clip();
        doc.addImage(imageData, "PNG", imgX, imgY, imgSize, imgSize);
        graphics.restoreGraphicsState();
        imagePlaced = true;
      } catch {
        try {
          graphics.restoreGraphicsState();
        } catch {
          // ignore
        }
      }
    }
    if (!imagePlaced) {
      doc.addImage(imageData, "PNG", imgX, imgY, imgSize, imgSize);
      imagePlaced = true;
    }
  }
  if (!imagePlaced) {
    doc.setFillColor(90, 90, 90);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(255, 255, 255);
    doc.text("KL", imgX + imgSize / 2, imgY + imgSize / 2 + 11, {
      align: "center",
    });
  }

  const textX = imgX + imgSize + 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(248, 248, 248);
  doc.text(about.name.toUpperCase(), textX, imgY + 34);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(170, 170, 170);
  doc.text(
    `aka ${about.nickname}`,
    textX + doc.getTextWidth(about.name.toUpperCase()) + 10,
    imgY + 34,
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(196, 196, 196);
  const roleLines = wrap(doc, about.role, PAGE_WIDTH - textX - MARGIN);
  doc.text(roleLines, textX, imgY + 56);

  numberedFooter(doc);

  // ---------- Contact row ----------
  y = BANNER_H + 28;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.8);
  doc.setTextColor(COLOR.soft);
  const contactParts = [
    about.email.replace(/^mailto:/, ""),
    PORTFOLIO_URL.replace(/^https?:\/\//, ""),
    about.githubUrl.replace(/^https?:\/\//, ""),
    linkedin,
    about.telegramUrl.replace(/^https?:\/\//, ""),
  ];
  const contactLines = wrap(doc, contactParts.join("    •    "), CONTENT_WIDTH);
  doc.text(contactLines, MARGIN, y);
  y += contactLines.length * 12 + 12;

  // ---------- Summary ----------
  ensureSpace(70);
  drawSectionTitle(doc, "Summary", y);
  y += 24;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR.soft);
  const summaryLines = wrap(doc, about.description, CONTENT_WIDTH).slice(0, 4);
  doc.text(summaryLines, MARGIN, y);
  y += summaryLines.length * 13 + 14;

  // ---------- Experience ----------
  ensureSpace(40);
  drawSectionTitle(doc, "Experience", y);
  y += 24;
  for (const item of experience) {
    ensureSpace(46);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR.ink);
    const titleLines = wrap(doc, item.title, CONTENT_WIDTH);
    doc.text(titleLines, MARGIN, y);
    y += titleLines.length * 13 + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.3);
    doc.setTextColor(COLOR.soft);
    for (const detail of item.details) {
      const lines = wrap(doc, detail, CONTENT_WIDTH - 14);
      doc.setFillColor(COLOR.accent);
      doc.circle(MARGIN + 3, y - 3, 1.3, "F");
      doc.text(lines, MARGIN + 13, y);
      y += lines.length * 12.5 + 3;
    }
    y += 6;
  }

  // ---------- Education ----------
  ensureSpace(34);
  drawSectionTitle(doc, "Education", y);
  y += 24;
  for (const item of education) {
    ensureSpace(36);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR.ink);
    const titleLines = wrap(doc, item.title, CONTENT_WIDTH - 10);
    doc.text(titleLines, MARGIN, y);
    y += titleLines.length * 13 + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.3);
    doc.setTextColor(COLOR.soft);
    for (const detail of item.details) {
      const lines = wrap(doc, detail, CONTENT_WIDTH - 10);
      doc.text(lines, MARGIN + 10, y);
      y += lines.length * 12.5 + 2;
    }
    y += 6;
  }

  // ---------- Certificates ----------
  ensureSpace(30);
  drawSectionTitle(doc, "Certificates", y);
  y += 26;
  for (const cert of certificates) {
    ensureSpace(24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(COLOR.ink);
    doc.text(cert.title, MARGIN, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.6);
    doc.setTextColor(COLOR.faint);
    doc.text(cert.year, PAGE_WIDTH - MARGIN, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(COLOR.soft);
    doc.text(cert.issuer, MARGIN, y + 11);
    y += 24;
  }

  // ---------- Selected Projects ----------
  ensureSpace(30);
  drawSectionTitle(doc, "Selected Projects", y);
  y += 26;
  for (const project of generalProjects) {
    ensureSpace(52);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR.ink);
    doc.text(project.title, MARGIN, y);
    if (project.tech && project.tech.length > 0) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      doc.setTextColor(COLOR.faint);
      doc.text(
        project.tech.join("  ·  "),
        MARGIN + doc.getTextWidth(project.title) + 10,
        y,
      );
    }
    y += 12.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.3);
    doc.setTextColor(COLOR.soft);
    const descLines = wrap(doc, project.description, CONTENT_WIDTH);
    doc.text(descLines, MARGIN, y);
    y += descLines.length * 12.5 + 3;
    if (project.link && project.link !== "#") {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.4);
      doc.setTextColor(60, 110, 180);
      doc.text(project.link, MARGIN, y);
      y += 13;
    }
    y += 8;
  }

  // ---------- Core Skills ----------
  ensureSpace(34);
  drawSectionTitle(doc, "Core Skills", y);
  y += 24;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.3);
  doc.setTextColor(COLOR.soft);
  const skillLines = wrap(
    doc,
    aboutPageData.skills.join("    •    "),
    CONTENT_WIDTH,
  );
  doc.text(skillLines, MARGIN, y);

  doc.save("Kherleefer-Resume.pdf");
}