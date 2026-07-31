"use client";

import { useEffect, useState, useRef } from "react";
import { AsciiDna } from "./ascii-dna";

const regions = [
  { name: "Curiosity", 
    nodes: 1, 
    latency: "< 20ms",
    description: "Driven by a constant desire to understand how systems work and explore new technologies."
   },

  { name: "Adaptability", 
    nodes: 2, 
    latency: "< 25ms" ,
    description: "I enjoy breaking down complex problems into smaller, manageable solutions."
  },

  { name: "Fast Learner", 
    nodes: 3, 
    latency: "< 30ms",
    description: "I enjoy breaking down complex problems into smaller, manageable solutions."
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-muted/30 overflow-hidden">
      {/* ASCII DNA Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <AsciiDna className="w-[600px] h-[500px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Left: Content */}
<div
  className={`h-full transition-all duration-700 ${
    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
  }`}
>
  <div className="h-full bg-card rounded-lg border border-border card-shadow p-8 lg:p-10 flex flex-col">
    <p className="text-sm font-mono text-primary mb-4">// ABOUT ME</p>

    <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-8 text-balance">
      Whoami
    </h2>

    <div className="space-y-6 flex-1">
      <p className="text-lg text-muted-foreground leading-relaxed">
        I'm Rayan Alrashed, a Saudi Arabian Computer Science student with a
        passion for cybersecurity & understanding the systems
        that power our digital world. As I currently pursue my studies in
        computer science at{" "}
        <span className="text-primary font-heading">
          Imam Mohammed Bin Saud University
        </span>
        , I focus on building a strong foundation in programming and security
        concepts while continuously expanding my knowledge through hands-on
        learning & personal projects.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        My interest in technology began with a simple curiosity about how things
        work and a desire to explore beyond what was visible on the surface.
        Over time, that curiosity developed into a passion for cybersecurity,
        where I became interested in analyzing systems,
        identifying weaknesses, and securing technologies. Today, I continue to
        challenge myself through projects that push my
        abilities forward.
      </p>
    </div>
  </div>
</div>

          {/* Right: Regions Grid */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="grid grid-cols-1 gap-3">
              {regions.map((region, index) => (
                <div
  key={region.name}
  className="group relative bg-card rounded-lg p-5 border border-border card-shadow hover:border-primary/50 transition-all duration-300"
  style={{ transitionDelay: `${index * 50}ms` }}
>
  <div className="flex items-center justify-between mb-2">
    <h2 className="font-semibold text-lg">{region.name}</h2>
    
  </div>

  {/* Description */}
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

    
  </div>

  
</div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 p-6 rounded-lg bg-foreground/5 border border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-mono text-2xl font-semibold text-primary">17</div>
                  <div className="text-xs text-muted-foreground">Internships</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-semibold text-primary">99.99%</div>
                  <div className="text-xs text-muted-foreground">Certificates</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-semibold text-primary">1.2B</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
