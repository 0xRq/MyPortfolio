"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AsciiSphere } from "./ascii-sphere";
import { AsciiWave } from "./ascii-wave";
import { AsciiTorus } from "./ascii-torus"; // Added import for AsciiTorus
import GridBackground from "./grid-bg";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
     
      {/* Animated Grid */}
<div className="absolute inset-0 opacity-90 pointer-events-none overflow-hidden">
  <GridBackground />
</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
        {/* Badge */}
        <div 
          className={`flex justify-center mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          
        </div>
        
        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <h1 
            className={`text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95] mb-8 transition-all duration-700 delay-100 lg:text-7xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: 'var(--font-geist-pixel-line), monospace' }}
          >
            <span className="text-balance">Curious by Nature.</span>
            <br />
            <span className="text-balance">Driven by </span>{" "}
            <span className="text-primary">Technology.
              <span className="cursor-blink ml-1"></span>
            </span>
          </h1>
          
          <p 
            className={`text-lg text-foreground max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Hey. I'm{" "} 
            <span className="font-(--font-geist-pixel-line) text-primary font-semibold opacity-100" style={{ fontFamily: 'var(--font-geist-pixel-line), monospace' }}>
              Rayan Alrashed</span>, and welcome to my portfolio. I'm a Computer Science student with a deep passion for cybersecurity, honing my skills through hands-on labs and personal projects.
          </p>
        </div>
        
        {/* CTAs */}
        <div 
  className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-20 transition-all duration-700 delay-300 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`}
>
  <Button 
    size="lg" 
    className="cursor-pointer bg-foreground hover:bg-foreground/90 text-background rounded-none px-6 h-11 text-sm font-medium group"
  >
    View my Projects

    <span className="relative ml-2 w-4 h-4 overflow-hidden">
      {/* Current arrow */}
      <ArrowRight
        className="
          absolute inset-0
          w-4 h-4
          transition-transform
          duration-500
          ease-[cubic-bezier(.16,1,.3,1)]
          group-hover:translate-x-full
        "
      />

      {/* Incoming arrow */}
      <ArrowRight
        className="
          absolute inset-0
          w-4 h-4
          -translate-x-full
          transition-transform
          duration-500
          ease-[cubic-bezier(.16,1,.3,1)]
          group-hover:translate-x-0
        "
      />
    </span>
  </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="cursor-pointer rounded-none h-11 px-6 text-sm font-medium hover:bg-secondary/50 bg-transparent"
          >
            Let's Connect
          </Button>
        </div>
        
        
      </div>
    </section>
  );
}
