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

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(currentSection);
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
<div className="grid lg:grid-cols-2 gap-16 items-stretch h-full">
  {/* Left */}
  <div
    className={`h-full flex flex-col transition-all duration-700 ${
      isVisible
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-8"
    }`}
  >
    <div className="h-full pr-0 lg:pr-16 flex flex-col">
      <div className="space-y-7 flex flex-col h-full">
        <p className="text-md lg:text-lg text-muted-foreground leading-relaxed">
          I'm <span className="text-primary">Rayan Alrashed</span>, a Saudi
          Arabian Computer Science student specializing in cybersecurity,
          currently in my first year at{" "}
          <span className="font-semibold">
            Imam Mohammed Bin Saud Islamic University
          </span>
          , where I continue to build my foundation in programming & security
          concepts. I'm interested in cybersecurity and understanding how
          systems work, how they can be exploited, and how they can be secured.
        </p>

        <p className="text-md lg:text-lg text-muted-foreground leading-relaxed">
          I believe that education extends beyond the classroom, and I aim to
          make the most of my time at university by continuously expanding my
          knowledge and practical skills. Throughout my college journey, I plan
          to pursue professional certifications, participate in student clubs,
          and engage in hands-on projects that complement my academic studies.
        </p>

        {/* University Info — pinned to bottom, matches CV button on the right */}
        <div className="grid grid-cols-1 gap-4 mt-auto">
          {/* University */}
          <div className="h-[100px] p-5 rounded-lg bg-foreground/5 border border-border flex items-center">
            <div className="flex items-center gap-6 justify-center w-full max-w-md mx-auto">
              <div className="flex-shrink-0">
                <Image
                  src="/university-logo.webp"
                  alt="University logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-left">
                <p className="text-lg text-foreground mb-1">
                  B.S. in Computer Science
                </p>
                <h3 className="font-medium font-sans text-sm text-muted-foreground">
                  Imam Mohammad Ibn Saud Islamic University • 1st Year
                </h3>
              </div>
            </div>
          </div>

          {/* Enjaz */}
          <div className="h-[100px] p-7 rounded-lg bg-foreground/5 border border-border flex sm:items-center">
            <div className="flex items-center gap-6 justify-center w-full max-w-md mx-auto">
              <div className="flex-shrink-0">
                <Image
                  src="/enjaz_logo.jpg"
                  alt="Enjaz logo"
                  width={64}
                  height={64}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="text-left">
                <p className="text-lg text-foreground mb-1">
                  Cybersecurity Club Member
                </p>
                <h3 className="font-medium font-sans text-sm text-muted-foreground">
                  Enjaz • College of Computer and Information Sciences
                </h3>
              </div>
            </div>
          </div>
        </div>
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

    {/* CV Download Button — pinned to bottom, matches Enjaz card on the left */}
    <a
      href="/MyResume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-10 flex w-full items-center justify-center gap-4 rounded-lg bg-foreground/5 border border-border px-6 py-9 text-md text-foreground font-medium font-mono transition-all hover:border-primary hover:text-primary"
    >
      <FileText className="h-5 w-5" />
      Download CV
    </a>
  </div>
</div>
    </div>
  </section>
  );
}
