import TerminalWindow from '@/components/TerminalWindow';
import { aboutPageData } from '@/lib/portfolioData';
import { AboutContent, SkillsContent, FunFactsContent } from '@/components/HomepageContent';

export default function AboutPage() {
  const { profileAvatarSrc, name, skills, funFacts } = aboutPageData;

  return (
    <TerminalWindow title="user@portfolio: ~/about">
      <div className="mx-auto flex max-w-4xl flex-col gap-14">
        <div>
          <p className="muted text-sm font-bold uppercase tracking-[0.2em]">Profile</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">About me</h1>
        </div>
        <section>
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
        </section>
        <section className="line border-t pt-8">
          <h2 className="mb-5 text-2xl font-black">Skills</h2>
          <SkillsContent skills={skills} />
        </section>
        <section className="line border-t pt-8">
          <h2 className="mb-5 text-2xl font-black">A few facts</h2>
          <FunFactsContent funFacts={funFacts} />
        </section>
      </div>
    </TerminalWindow>
  );
}