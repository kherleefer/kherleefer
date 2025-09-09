"use client";

import { useState, ReactNode } from 'react';

interface TerminalWindowProps {
  title: ReactNode;
  children: ReactNode;
}

export default function TerminalWindow({ title, children }: TerminalWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => setIsClosed(true);

  const handleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    // Cannot be minimized and maximized at the same time
    if (newMinimizedState) {
      setIsMaximized(false);
    }
  };

  const handleMaximize = () => {
    const newMaximizedState = !isMaximized;
    setIsMaximized(newMaximizedState);
    // Cannot be maximized and minimized at the same time
    if (newMaximizedState) {
      setIsMinimized(false);
    }
  };

  if (isClosed) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <button 
                onClick={() => setIsClosed(false)} 
                className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/50 rounded-lg hover:bg-green-500/30"
            >
                Re-open Terminal
            </button>
        </div>
    );
  }

  const terminalClasses = [
    "bg-black/70 backdrop-blur-sm rounded-lg shadow-2xl border border-green-500/30 flex flex-col transition-all duration-300",
    isMaximized 
        ? "fixed inset-0 top-10 rounded-none z-50" 
        : "relative w-full max-w-6xl",
    isMinimized 
        ? "h-10" // Height of the header bar
        : (isMaximized ? "h-[calc(100vh-2.5rem)]" : "h-[85vh]")
  ].join(" ");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-green-400 font-mono">
      <div className={terminalClasses}>
        {/* Terminal Header */}
        <div 
          className="flex items-center justify-between px-4 py-2 bg-gray-800/80 rounded-t-lg flex-shrink-0 cursor-grab"
          onDoubleClick={handleMaximize}
        >
          <div className="flex items-center space-x-2">
            <button onClick={handleClose} className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none" aria-label="Close"></button>
            <button onClick={handleMinimize} className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none" aria-label="Minimize"></button>
            <button onClick={handleMaximize} className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none" aria-label="Maximize"></button>
          </div>
          <div className="text-sm text-gray-300">{title}</div>
          <div className="w-12"></div>
        </div>

        {/* Terminal Body */}
        <div className={`flex-1 p-6 overflow-y-auto ${isMinimized ? 'hidden' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
