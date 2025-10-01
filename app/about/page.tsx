'use client';

import { useState, useEffect } from 'react';
import TerminalWindow from '@/components/TerminalWindow';
import { aboutPageData } from '@/lib/portfolioData';
import { AboutContent, SkillsContent, FunFactsContent } from '@/components/HomepageContent';

const TYPING_SPEED_MS = 100;
const SECTION_DELAY_MS = 1000;

// Use a mapped type to ensure config and components stay in sync
const sectionConfig = {
  about: {
    command: 'cat about.md',
    Component: AboutContent,
  },
  skills: {
    command: 'ls -l skills/',
    Component: SkillsContent,
  },
  'fun-facts': {
    command: 'cat fun-facts.txt',
    Component: FunFactsContent,
  },
};

const sectionIds = Object.keys(sectionConfig) as (keyof typeof sectionConfig)[];

export default function AboutPage() {
  const { profileAvatarSrc, name, skills, funFacts } = aboutPageData;

  const [sections, setSections] = useState(sectionIds.map(id => ({ 
    id, 
    typedCommand: '', 
    isComplete: false 
  })));
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);

  useEffect(() => {
    if (currentSectionIndex >= sectionIds.length) {
      setShowFinalPrompt(true);
      return;
    }

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const animateSection = async () => {
      const sectionId = sectionIds[currentSectionIndex];
      const commandToType = sectionConfig[sectionId].command;

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

      // Mark as complete to show content
      await delay(500);
      setSections(prev =>
        prev.map((s, index) => (index === currentSectionIndex ? { ...s, isComplete: true } : s))
      );

      // Move to the next section
      await delay(SECTION_DELAY_MS);
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
    };

    animateSection();
  
  }, [currentSectionIndex]);

  return (
    <TerminalWindow title="user@portfolio: ~/about">
      {sections.map((section, index) => {
        if (index > currentSectionIndex) return null;
        
        const { id } = section;

        return (
          <section key={id} id={id} className={index > 0 ? "mt-8" : ""}>
            <div className="flex items-center mb-4">
              <span className="text-green-400">user@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~/about</span>
              <span className="text-white">$</span>
              <span className="text-xl font-bold text-green-300 ml-2">{section.typedCommand}</span>
              {isTyping && index === currentSectionIndex && <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>}
            </div>
            {section.isComplete && (
              <div className="pl-4 border-l-2 border-green-500/20">
                {(() => {
                  switch (id) {
                    case 'about':
                      return <AboutContent 
                                profileImageSrc={profileAvatarSrc} 
                                name={name} 
                                nickname="Encryptoknight"
                                role="Software Engineer"
                                description="A passionate adolescent software engineer obsessed with blockchain, open source, and building cool stuff for the future, I love learning, sharing, and collaborating with other devs. I believe tech should be fun, creative, and make the world better for everyone!"
                                githubUrl="https://github.com/kherleefer"
                                twitterUrl="https://x.com/kherleefer_kk"
                                telegramUrl="https://t.me/Encryptoknight"
                                email="mailto:mahmudkalifa6@gmail.com"
                              />;
                    case 'skills':
                      return <SkillsContent skills={skills} />;
                    case 'fun-facts':
                      return <FunFactsContent funFacts={funFacts} />;
                    default:
                      return null;
                  }
                })()}
              </div>
            )}
          </section>
        );
      })}

      {showFinalPrompt && (
        <div className="mt-8 flex items-center">
          <span className="text-green-400">user@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/about</span>
          <span className="text-white">$ </span>
          <span className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></span>
        </div>
      )}
    </TerminalWindow>
  );
}