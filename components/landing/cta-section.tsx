"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import GridBackground from "./grid-bg";



export function CtaSection() {
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
    <section ref={sectionRef} className="relative py-12 overflow-hidden ">
      
        <div
          className={`relative border border-border rounded-2xl overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Background with grid */}
          <div className="absolute inset-0 bg-card" />
          <div className="absolute inset-0 grid-pattern opacity-10" />
          
           {/* Animated Grid */}
          <div className="absolute inset-0 opacity-90 pointer-events-none overflow-hidden">
            <GridBackground />
          </div>
          <div className="relative z-10 px-8 lg:px-16 py-10 bg-transparent ">
            <div className="flex items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4 text-foreground text-balance">
                  Let's Connect 
                </h2>

                <p className="text-lg text-foreground/70 mb-8 leading-relaxed max-w-lg">
                  Interested in internships, research, technical discussions, or collaborative projects that challenge me to learn and improve.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  
                  <Button
  size="lg"
  className="bg-foreground hover:bg-foreground text-background px-6 h-12 text-sm font-medium group cursor-pointer border border-border rounded-none"
>
  <Image
    src="/LinkedIn_icon.svg"
    alt="LinkedIn"
    width={16}
    height={16}
    className="mr-2"
  />
  Connect on LinkedIn
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

                  
                </div>

                
              </div>
              
              {/* Animated ASCII Sphere */}
              
            </div>
          </div>
        </div>
     
    </section>
  );
}
