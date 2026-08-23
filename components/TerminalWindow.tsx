import { ReactNode } from 'react';

interface TerminalWindowProps {
  title: ReactNode;
  children: ReactNode;
}

export default function TerminalWindow({ title, children }: TerminalWindowProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-20">
      <div className="w-full">
        {title && <span className="sr-only">{title}</span>}
        {children}
      </div>
    </div>
  );
}
