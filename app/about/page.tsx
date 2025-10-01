'use client';

import { useState, useEffect } from 'react';
import TerminalWindow from '@/components/TerminalWindow';
import { aboutPageData } from '@/lib/portfolioData';
import { AboutContent, SkillsContent, FunFactsContent } from '@/components/HomepageContent';

export default function AboutPage() {
  const { profileAvatarSrc, name, skills, funFacts } = aboutPageData;
  const [visibleSections, setVisibleSections] = useState([false, false, false]);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setVisibleSections(prev => [true, prev[1], prev[2]]), 500),
      setTimeout(() => setVisibleSections(prev => [prev[0], true, prev[2]]), 1500),
      setTimeout(() => setVisibleSections(prev => [prev[0], prev[1], true]), 2500),
      setTimeout(() => setShowFinalPrompt(true), 3000)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <TerminalWindow title="user@portfolio: ~/about">
      {/* About Me Section */}
      {visibleSections[0] && (
        <section id="about">
          <div className="flex items-center mb-4">
            <span className="text-green-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/about</span>
            <span className="text-white">$</span>
            <h2 className="text-xl font-bold text-green-300 ml-2">cat about.md</h2>
          </div>
          <div className="pl-4 border-l-2 border-green-500/20">
            <AboutContent 
              profileImageSrc={profileAvatarSrc}
              name={name}
              nickname="Encryptoknight" 
              role="Software Engineer"
              description="A passionate adolescent software engineer obsessed with blockchain, open source, and building cool stuff for the future, I love learning, sharing, and collaborating with other devs. I believe tech should be fun, creative, and make the world better for everyone!"
              githubUrl="https://github.com/kherleefer"
              twitterUrl="https://x.com/kherleefer_kk"
              telegramUrl="https://t.me/Encryptoknight"
              email="mailto:mahmudkalifa6@gmail.com"
            />
          </div>
        </section>
      )}

      {/* Skills Section */}
      {visibleSections[1] && (
        <section id="skills" className="mt-8">
          <div className="flex items-center mb-4">
            <span className="text-green-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/about</span>
            <span className="text-white">$</span>
            <h2 className="text-xl font-bold text-green-300 ml-2">ls -l skills/</h2>
          </div>
          <div className="pl-4 border-l-2 border-green-500/20">
            <SkillsContent skills={skills} />
          </div>
        </section>
      )}

      {/* Fun Facts Section */}
      {visibleSections[2] && (
        <section id="fun-facts" className="mt-8">
          <div className="flex items-center mb-4">
            <span className="text-green-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/about</span>
            <span className="text-white">$</span>
            <h2 className="text-xl font-bold text-green-300 ml-2">cat fun-facts.txt</h2>
          </div>
          <div className="pl-4 border-l-2 border-green-500/20">
            <FunFactsContent funFacts={funFacts} />
          </div>
        </section>
      )}
      
      {/* Final command prompt */}
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