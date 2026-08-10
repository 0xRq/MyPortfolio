"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import {
  MessageCircleQuestion,
  Compass,
  BookOpen,
  FileText,
  type LucideIcon
} from "lucide-react";

type Region = {
  name: string;
  icon: LucideIcon;
  nodes: number;
  description: string;
};

const regions: Region[] = [
  {
    name: "Curiosity",
    icon: MessageCircleQuestion,
    nodes: 1,
    description:
      "Driven by a constant desire to understand how systems work and explore new technologies.",
  },
  {
    name: "Adaptability",
    icon: Compass,
    nodes: 2,
    description:
      "I adapt quickly to new environments, challenges, and technologies while continuously improving my skills.",
  },
  {
    name: "Fast Learner",
    icon: BookOpen,
    nodes: 3,
    description:
      "I enjoy learning new concepts quickly and applying them through hands-on projects.",
  },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

return (
  <section
    ref={sectionRef}
    className="relative py-32 bg-muted/30 overflow-hidden"
    id="AboutMe"
  >
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      {/* Section Heading */}
      <div
        className={`mb-12 transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-sm font-mono text-primary mb-4">// WHOAMI</p>

        <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
          About Me
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div
          className={`h-full transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="h-full pr-16 flex flex-col">
            <div className="space-y-7 flex flex-col h-full">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-primary">Rayan Alrashed</span>, a Saudi Arabian Computer Science student specializing in cybersecurity. I am currently pursuing my studies at{" "}
                <span className="font-semibold">
                  Imam Mohammed Bin Saud University
                </span>
                , where I continue to build my foundation in programming & security concepts. I actively seek opportunities to expand my technical knowledge, strengthen my skills, and challenge myself through hands-on projects & practical experiences.
              </p>

<br></br> <br></br>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Throughout my journey, I have developed strong adaptability and a passion for continuous learning. I enjoy challenging myself with new concepts and finding creative solutions to complex problems. I have pursued professional certifications, including Google's Professional Cybersecurity Certificate and Google AI Essentials, while strengthening my skills through specialized Penetration Testing bootcamps & personal projects.
              </p>

              {/* CV Download Button */}
    <a
      href="/Rayan-Alrashed-CV.pdf"
      download
      className="mt-auto flex w-full items-center justify-center gap-4 rounded-lg bg-foreground/5 border border-border px-6 py-9 text-md text-foreground font-medium font-mono transition-all hover:border-primary hover:text-primary"
    >
      <FileText className="h-5 w-5" />
      Download CV
    </a>
            </div>
          </div>
        </div>

        {/* Right: Regions Grid */}
        <div
          className={`h-full flex flex-col transition-all duration-700 delay-200 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <div className="grid grid-cols-1 gap-3">
  {regions.map((region, index) => {
    const Icon = region.icon;

    return (
      <div
        key={region.name}
        className="group relative bg-card rounded-lg p-5 border border-border card-shadow hover:border-primary/50 transition-all duration-300"
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 mr-1 text-primary" />
            <h2 className="font-semibold text-lg">{region.name}</h2>
          </div>
        </div>

        <p className="mb-4 text-md text-muted-foreground leading-relaxed pr-16">
          {region.description}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: region.nodes }).map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-primary/70 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>

          <span className="text-xs text-primary font-mono">
            // {index + 1}
          </span>
        </div>
      </div>
    );
  })}
</div>

            {/* Stats */}
            {/* University */}
<div className="mt-9 p-6 rounded-lg bg-foreground/5 border border-border">
  <div className="flex items-center gap-5">
    
    {/* University Logo */}
    <div className="flex-shrink-0">
      <Image
        src="/university-logo.png"
        alt="University logo"
        width={64}
        height={64}
        className="w-12 h-12 object-contain"
      />
    </div>

    {/* University Info */}
    <div className="text-left">
      <p className="text-lg text-foreground mb-1">
        B.C. in Computer Science
      </p>
      <h3 className="font-medium font-sans text-sm text-muted-foreground">
        Imam Mohammad Ibn Saud Islamic University • 1st Year
      </h3>


      
    </div>

  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
