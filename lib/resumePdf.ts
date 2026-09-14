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
export const FULL_NAME = "Mahmud Abubakar";
export const KNOWN_AS = "Kherleefer";

const PAGE_WIDTH = 595.28; // A4 width (pt)
const PAGE_HEIGHT = 841.89; // A4 height (pt)
const MARGIN = 46;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

type RGB = readonly [number, number, number];

const COLOR = {
  ink: [24, 24, 24] as const,
  soft: [88, 88, 88] as const,
  faint: [140, 140, 140] as const,
  rule: [214, 214, 214] as const,
  accent: [16, 16, 16] as const,
  bannerText: [248, 248, 248] as const,
  bannerMuted: [196, 196, 196] as const,
  bannerFaint: [170, 170, 170] as const,
  link: [60, 110, 180] as const,
} as const;

function applyFill(doc: jsPDF, [r, g, b]: RGB): void {
  doc.setFillColor(r, g, b);
}

function applyText(doc: jsPDF, [r, g, b]: RGB): void {
  doc.setTextColor(r, g, b);
}

function applyStroke(doc: jsPDF, [r, g, b]: RGB): void {
  doc.setDrawColor(r, g, b);
}

type AboutData = {
  profileImageSrc: string;
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

function emitLines(
  doc: jsPDF,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
): number {
  for (let i = 0; i < lines.length; i++) {
    doc.text(lines[i], x, y + i * lineHeight);
  }
  return lines.length * lineHeight;
}

function drawSectionTitle(doc: jsPDF, title: string, y: number): void {
  applyFill(doc, COLOR.accent);
  doc.rect(MARGIN, y - 9, 3.2, 13, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  applyText(doc, COLOR.ink);
  doc.text(title.toUpperCase(), MARGIN + 11, y + 1);
  applyStroke(doc, COLOR.rule);
  doc.setLineWidth(0.5);
  doc.line(MARGIN + 11, y + 6, PAGE_WIDTH - MARGIN, y + 6);
}

function numberedFooter(doc: jsPDF): void {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  applyText(doc, COLOR.faint);
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
    nickname: "Encryptoknight",
    role: "Data Analyst, Software Engineer & Full-Stack Developer",
    description:
      "Software engineer and data analyst specialising in full-stack web, mobile and blockchain development.",
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
  const BANNER_H = 158;
  const imgSize = 96;
  const imgX = MARGIN;
  const imgY = (BANNER_H - imgSize) / 2;

  applyFill(doc, COLOR.accent);
  doc.rect(0, 0, PAGE_WIDTH, BANNER_H, "F");

  // Profile photo placed plainly — no clip() and no overlay shapes, so the
  // image stays fully visible and the rest of the page always renders.
  const imageData = await loadImageDataUrl(about.profileImageSrc);
  if (imageData) {
    doc.addImage(imageData, "PNG", imgX, imgY, imgSize, imgSize);
  } else {
    applyFill(doc, [90, 90, 90]);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(255, 255, 255);
    doc.text("KL", imgX + imgSize / 2, imgY + imgSize / 2 + 11, {
      align: "center",
    });
  }

  // Full name on the first line, the "aka" tag on its own line underneath
  // (never inline with the name), then the role line below that.
  const nameX = imgX + imgSize + 26;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(25);
  applyText(doc, COLOR.bannerText);
  doc.text(FULL_NAME.toUpperCase(), nameX, imgY + 38);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  applyText(doc, COLOR.bannerFaint);
  doc.text(`aka ${KNOWN_AS}  •  @${about.nickname}`, nameX, imgY + 53);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  applyText(doc, COLOR.bannerMuted);
  const roleLines = wrap(doc, about.role, PAGE_WIDTH - nameX - MARGIN);
  emitLines(doc, roleLines, nameX, imgY + 66, 13);

  numberedFooter(doc);

  // ---------- Contact row ----------
  y = BANNER_H + 28;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.8);
  applyText(doc, COLOR.soft);
  const contactParts = [
    about.email.replace(/^mailto:/, ""),
    PORTFOLIO_URL.replace(/^https?:\/\//, ""),
    about.githubUrl.replace(/^https?:\/\//, ""),
    linkedin,
    about.telegramUrl.replace(/^https?:\/\//, ""),
  ];
  const contactLines = wrap(doc, contactParts.join("    •    "), CONTENT_WIDTH);
  y += emitLines(doc, contactLines, MARGIN, y, 12) + 12;

  // ---------- Summary ----------
  ensureSpace(70);
  drawSectionTitle(doc, "Summary", y);
  y += 24;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  applyText(doc, COLOR.soft);
  const summaryLines = wrap(doc, about.description, CONTENT_WIDTH).slice(0, 4);
  y += emitLines(doc, summaryLines, MARGIN, y, 13) + 14;

  // ---------- Experience ----------
  ensureSpace(40);
  drawSectionTitle(doc, "Experience", y);
  y += 24;
  for (const item of experience) {
    ensureSpace(46);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    applyText(doc, COLOR.ink);
    const titleLines = wrap(doc, item.title, CONTENT_WIDTH);
    y += emitLines(doc, titleLines, MARGIN, y, 13) + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.3);
    applyText(doc, COLOR.soft);
    for (const detail of item.details) {
      const lines = wrap(doc, detail, CONTENT_WIDTH - 14);
      applyFill(doc, COLOR.accent);
      doc.circle(MARGIN + 3, y - 3, 1.3, "F");
      y += emitLines(doc, lines, MARGIN + 13, y, 12.5) + 3;
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
    applyText(doc, COLOR.ink);
    const titleLines = wrap(doc, item.title, CONTENT_WIDTH - 10);
    y += emitLines(doc, titleLines, MARGIN, y, 13) + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.3);
    applyText(doc, COLOR.soft);
    for (const detail of item.details) {
      const lines = wrap(doc, detail, CONTENT_WIDTH - 10);
      y += emitLines(doc, lines, MARGIN + 10, y, 12.5) + 2;
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
    applyText(doc, COLOR.ink);
    doc.text(cert.title, MARGIN, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.6);
    applyText(doc, COLOR.faint);
    doc.text(cert.year, PAGE_WIDTH - MARGIN, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    applyText(doc, COLOR.soft);
    doc.text(cert.issuer, MARGIN, y + 11);
    y += 24;
  }

  // ---------- Selected Projects ----------
  ensureSpace(30);
  drawSectionTitle(doc, "Selected Projects", y);
  y += 26;
  for (const project of generalProjects) {
    ensureSpace(64);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    applyText(doc, COLOR.ink);
    const titleLines = wrap(doc, project.title, CONTENT_WIDTH);
    y += emitLines(doc, titleLines, MARGIN, y, 13);

    // Tech tags on their own line below the title so they never overlap it.
    if (project.tech && project.tech.length > 0) {
      ensureSpace(22);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      applyText(doc, COLOR.faint);
      const techLines = wrap(doc, project.tech.join("  ·  "), CONTENT_WIDTH);
      y += emitLines(doc, techLines, MARGIN, y, 10.5) + 1;
    }
    y += 1;

    ensureSpace(46);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.3);
    applyText(doc, COLOR.soft);
    const descLines = wrap(doc, project.description, CONTENT_WIDTH);
    y += emitLines(doc, descLines, MARGIN, y, 12.5) + 3;

    if (project.link && project.link !== "#") {
      ensureSpace(16);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.4);
      applyText(doc, COLOR.link);
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
  applyText(doc, COLOR.soft);
  const skillLines = wrap(
    doc,
    aboutPageData.skills.join("    •    "),
    CONTENT_WIDTH,
  );
  emitLines(doc, skillLines, MARGIN, y, 12.5);

  doc.save("Kherleefer-Resume.pdf");
}