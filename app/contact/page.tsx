"use client";

import TerminalWindow from "@/components/TerminalWindow";
import { socialLinks } from "@/lib/portfolioData";

export default function ContactPage() {
  return (
    <TerminalWindow title="user@portfolio: ~/contact">
      <div className="mb-4">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/contact</span>
        <span className="text-white">$</span>
        <h2 className="text-xl font-bold text-green-300 ml-2">./connect.sh</h2>
      </div>

      <p className="text-green-200 mb-6">Establishing connections... Select a service to connect.</p>

      <div className="space-y-4">
        {socialLinks.map((link) => (
          <div key={link.name} className="flex items-center gap-4">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-zinc-900/50 p-4 rounded-md border border-green-600/30 flex items-center gap-4 hover:border-green-400/80 transition-colors"
            >
              {link.icon}
              <div className="flex-1">
                <p className="font-semibold text-green-300">{link.name}</p>
                <p className="text-xs text-green-200">{link.url}</p>
              </div>
              <span className="text-xs text-blue-400">Execute</span>
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~/contact</span>
        <span className="text-white">$ </span>
        <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
      </div>
    </TerminalWindow>
  );
}
