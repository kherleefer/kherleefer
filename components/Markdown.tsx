import { createElement, type ReactNode } from "react";

const INLINE_PATTERN =
  /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let index = 0;
  let match: RegExpExecArray | null;
  // Each recursive call needs its own cursor.
  const pattern = new RegExp(INLINE_PATTERN.source, "g");
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = index++;
    if (token.startsWith("`") && token.endsWith("`") && token.length > 1) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-[var(--soft-surface)] px-1.5 py-0.5 text-[0.88em]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (
      token.startsWith("**") &&
      token.endsWith("**") &&
      token.length > 4
    ) {
      nodes.push(
        <strong key={key} className="font-bold">
          {renderInline(token.slice(2, -2))}
        </strong>,
      );
    } else if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      nodes.push(
        <em key={key} className="italic">
          {renderInline(token.slice(1, -1))}
        </em>,
      );
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (link && /^(https?:\/\/|mailto:)/i.test(link[2])) {
        nodes.push(
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {renderInline(link[1])}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

type ListState = { ordered: boolean; items: ReactNode[] };

const TEXT_CLASS = "text-[0.95em] leading-6";

export default function Markdown({ children }: { children: string }) {
  const lines = children.split(/\r?\n/);
  const parts: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: ListState | null = null;
  let codeBlock: string[] | null = null;
  let key = 0;

  const flushParagraph = () => {
    if (paragraph.length) {
      parts.push(
        <p key={`p${key++}`} className={`${TEXT_CLASS} mb-2`}>
          {renderInline(paragraph.join(" "))}
        </p>,
      );
      paragraph = [];
    }
  };

  const flushList = () => {
    if (!list) return;
    const items = list.items;
    const listKey = key++;
    parts.push(
      createElement(
        list.ordered ? "ol" : "ul",
        {
          key: `l${listKey}`,
          className: `${TEXT_CLASS} mb-2 ${
            list.ordered ? "list-decimal" : "list-disc"
          } pl-6`,
        },
        items.map((item, itemIndex) => (
          <li key={itemIndex} className="mb-1">
            {item}
          </li>
        )),
      ),
    );
    list = null;
  };

  for (const raw of lines) {
    if (codeBlock !== null) {
      if (/^```/.test(raw.trim())) {
        parts.push(
          <pre
            key={`c${key++}`}
            className="mb-2 overflow-x-auto border bg-[var(--soft-surface)] p-3 text-xs"
          >
            <code>{codeBlock.join("\n")}</code>
          </pre>,
        );
        codeBlock = null;
      } else {
        codeBlock.push(raw);
      }
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(raw);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length + 2, 5);
      parts.push(
        createElement(
          `h${level}`,
          {
            key: `h${key++}`,
            className: "mb-1 mt-3 font-black tracking-tight",
          },
          renderInline(heading[2]),
        ),
      );
      continue;
    }

    if (/^```/.test(raw.trim())) {
      flushParagraph();
      flushList();
      codeBlock = [];
      continue;
    }

    if (/^(---|\*\*\*)$/.test(raw.trim())) {
      flushParagraph();
      flushList();
      parts.push(
        <hr key={`r${key++}`} className="my-3 border-t border-[var(--line)]" />,
      );
      continue;
    }

    if (/^>\s?/.test(raw)) {
      flushList();
      parts.push(
        <p
          key={`q${key++}`}
          className={`${TEXT_CLASS} mb-2 border-l-2 pl-3`}
        >
          {renderInline(raw.replace(/^>\s?/, ""))}
        </p>,
      );
      continue;
    }

    const ordered = /^(\d+)[.)]\s+(.*)$/.exec(raw);
    const bullet = /^[-*]\s+(.*)$/.exec(raw);
    if (ordered || bullet) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      const content = ordered ? ordered[2] : bullet![1];
      if (list && list.ordered !== isOrdered) flushList();
      if (!list) list = { ordered: isOrdered, items: [] };
      list.items.push(renderInline(content));
      continue;
    }

    if (raw.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    paragraph.push(raw.trim());
  }

  flushParagraph();
  flushList();
  if (codeBlock !== null) {
    parts.push(
      <pre key={`c${key++}`} className={`${TEXT_CLASS} overflow-x-auto border p-3`}>
        <code>{codeBlock.join("\n")}</code>
      </pre>,
    );
  }

  return <div className="text-left">{parts}</div>;
}