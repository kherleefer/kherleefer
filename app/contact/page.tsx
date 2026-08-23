import TerminalWindow from "@/components/TerminalWindow";
import { socialLinks } from "@/lib/portfolioData";
import React from "react";

import * as Icons from 'lucide-react';

export default function ContactPage() {
  return (
    <TerminalWindow title="user@portfolio: ~/contact">
      <div className="mx-auto max-w-3xl">
        <p className="muted text-sm font-bold uppercase tracking-[0.2em]">Contact</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Let&apos;s connect.</h1>
        <p className="muted mt-5 max-w-xl leading-7">Have a project, idea, or opportunity in mind? Reach out through any of these channels.</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {socialLinks.map((link) => {
              const Icon = Icons[link.icon] as React.ComponentType<{ size?: number | string; className?: string }>;
            

            return (
              <div key={link.name}>
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface line flex items-center gap-4 border p-4 transition-colors hover:border-black dark:hover:border-white"
                >
                  
                  <Icon size="24" />

                  <div>
                    <p className="font-semibold">{link.name}</p>
                    <p className="muted break-all text-xs">{link.url}</p>
                  </div>
                  <span className="ml-auto text-xs font-bold">Open</span>
                </a>
              </div>
            )})}
        </div>
      </div>
    </TerminalWindow>
  );
}
