'use client';

import { useState, useEffect } from 'react';
import TerminalWindow from '@/components/TerminalWindow';
import { homePageSectionsData } from '@/lib/portfolioData';
import { AboutContent, ProjectsContent, SkillsContent, RemarksContent } from '@components/HomepageContent';

const TYPING_SPEED_MS = 100;
const SECTION_DELAY_MS = 1000;
const INITIAL_COMMAND = './run-portfolio.sh';

export default function Home() {
  const [typedInitialCommand, setTypedInitialCommand] = useState('');
  const [sections, setSections] = useState(
    homePageSectionsData.map(s => ({ ...s, typedCommand: '', isComplete: false }))
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1); // Start at -1 to handle initial command first
  const [isTyping, setIsTyping] = useState(true);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);

  useEffect(() => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const animate = async () => {
      // Animate initial command first
      if (currentSectionIndex === -1) {
        await delay(500);
        for (let i = 0; i < INITIAL_COMMAND.length; i++) {
          await delay(TYPING_SPEED_MS);
          setTypedInitialCommand(INITIAL_COMMAND.substring(0, i + 1));
        }
        await delay(SECTION_DELAY_MS);
        setCurrentSectionIndex(0);
        return;
      }

      if (currentSectionIndex >= sections.length) {
        setShowFinalPrompt(true);
        return;
      }

      const section = sections[currentSectionIndex];
      const commandToType = `cat ${section.title.toLowerCase()}.md`;

      // Type the command
      setIsTyping(true);
      for (let i = 0; i < commandToType.length; i++) {
        await delay(TYPING_SPEED_MS);
        setSections(prev =>
          prev.map((s, index) =>
            index === currentSectionIndex ? { ...s, typedCommand: commandToType.substring(0, i + 1) } : s
          )
        );
      }
      setIsTyping(false);

      // Mark as complete and show content
      await delay(500);
      setSections(prev =>
        prev.map((s, index) => (index === currentSectionIndex ? { ...s, isComplete: true } : s))
      );

      // Move to the next section
      await delay(SECTION_DELAY_MS);
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
    };

    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionIndex]);

  return (
    <TerminalWindow title="user@portfolio: ~">
      {/* Initial command animation */}
      <div className="mb-4">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$ </span>
        <span className="ml-2">{typedInitialCommand}</span>
        {isTyping && currentSectionIndex === -1 && <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>}
      </div>

      {/* Sections animation */}
      {currentSectionIndex > -1 && (
        <div className="space-y-10">
          {sections.map((section, index) => {
            if (index > currentSectionIndex) return null;

            return (
              <section key={section.id} id={section.id}>
                <div className="flex items-center mb-4">
                  <span className="text-green-400">user@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~/{section.title.toLowerCase()}</span>
                  <span className="text-white">$ </span>
                  <h2 className="text-xl font-bold text-green-300 ml-2">{section.typedCommand}</h2>
                  {isTyping && index === currentSectionIndex && (
                    <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
                  )}
                </div>
                {section.isComplete && (
                  <div className="pl-4 border-l-2 border-green-500/20">
                    {section.id === 'about' && <AboutContent {...section.data} />}
                    {section.id === 'projects' && <ProjectsContent projects={section.data} />}
                    {section.id === 'skills' && <SkillsContent skills={section.data} />}
                    {section.id === 'remarks' && <RemarksContent remarks={section.data} />}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {showFinalPrompt && (
        <div className="mt-8 flex items-center">
          <span className="text-green-400">user@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$ </span>
          <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
        </div>
      )}
    </TerminalWindow>
  );
}
