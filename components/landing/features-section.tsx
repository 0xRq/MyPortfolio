"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AsciiCube } from "./ascii-cube";
import {
  ShieldPlus,
  Wrench,
  CodeXml,
} from "lucide-react";


const features = [
  {
    title: "Cybersecurity",
    icon: ShieldPlus,
    description: [
      "Penetration Testing",
      "Web Application Security",
      "Network Security",
      "Security Monitoring (SOC)",
    ],
    animationKey: "neural" as const,
  },
  {
    title: "Security Tools",
    icon: Wrench,
    description: [
      "Burp Suite",
      "Nmap",
      "Wireshark",
      "Metasploit",
    ],
    animationKey: "security" as const,
  },
  {
    title: "Programming & Dev",
    icon: CodeXml,
    description: [
      "Python",
      "Web Development",
      "TypeScript",
      "Next.js",
    ],
    animationKey: "workflow" as const,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

const Icon = feature.icon;

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-xl p-8 card-shadow transition-all duration-700 hover:border-primary/50 bg-transparent border border-border/60 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      

      {/* Content */}
      
      {/* Icon */}
<div className="mb-5 w-12 h-12 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center">
  <Icon className="w-6 h-6 text-primary" />
</div>
      <h3 className="text-xl font-semibold mb-5">{feature.title}</h3>
      <ul className="space-y-2 font-mono">
  {feature.description.map((item) => (
    <li key={item} className="flex items-center gap-2">
      <span className="text-primary">▸</span>
      {item}
    </li>
  ))}
</ul>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="features"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with ASCII cube */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-sm font-mono text-primary mb-3">// SKILLSET</p>
            <h2
              className={`text-3xl lg:text-5xl font-semibold tracking-tight mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              
              <span className="text-balance">My Skills</span>
            </h2>
            <p
              className={`text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              A complete platform for building, deploying, and scaling AI applications. 
              From prototype to production in minutes, not months.
            </p>
          </div>
          
          {/* ASCII Cube visualization */}
          <div className="flex justify-center lg:justify-end">
            <AsciiCube className="w-[480px] h-[640px]" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
