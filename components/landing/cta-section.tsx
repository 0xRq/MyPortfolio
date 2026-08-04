"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GridBackground from "./grid-bg";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownToLine,
  Mail,
  FileText,
} from "lucide-react";


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
  <section ref={sectionRef} className="relative py-12 overflow-hidden">
    <div
      className={`relative rounded-2xl overflow-hidden p-[1px] transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Moving light */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
<div className="absolute -inset-[150%] animate-spin [animation-duration:4s] bg-[conic-gradient(from_0deg,transparent_0deg,var(--primary)_8deg,transparent_16deg)]" />    </div>


  {/* Actual card */}
  <div className="relative rounded-2xl overflow-hidden bg-card">
          {/* Background with grid */}
          <div className="absolute inset-0 bg-card" />
<div
  className="absolute inset-0 opacity-[0.10] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
  style={{
    backgroundImage:
      "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }}
/>          
           {/* Animated Grid */}
          
          <div className="relative z-10 px-8 lg:px-16 py-16 bg-transparent ">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-foreground text-balance">
                  Let's Connect 
                </h2>

                <p className="text-lg text-foreground/70 mb-8 leading-relaxed max-w-lg">
                  Interested in internships, research, technical discussions, or collaborative projects that challenge me to learn and improve.
                </p>



                <div className="flex flex-col sm:flex-row items-start gap-6 ">
                  
                  <Button
  size="lg"
  className="bg-foreground hover:bg-foreground text-background px-6 h-12 text-sm font-medium group cursor-pointer border rounded-none"
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
              <div className="flex flex-col gap-6 w-full lg:w-[420px] mt-8 lg:mt-0">
  <Button
    asChild
    variant="outline"
    className="w-full h-25 justify-between border-border hover:border-primary/50 bg-background/50"
  >
    <a href="mailto:rayanalrashed8@email.com">
      <div className="flex items-center gap-3">
        <Mail 
        width={undefined}
        height={undefined}
        className="text-primary ml-2 w-6! h-6!" 
         />
        <div className="text-left lg:ml-2">
          <p className="font-medium lg:text-lg">Email Me</p>
          <p className="text-sm lg:text-md text-muted-foreground">
            rayanalrashed8@gmail.com
          </p>
        </div>
      </div>
      <ArrowUpRight 
        className="w-5 h-5 mr-2" 
       />
    </a>
  </Button>

  <Button
    asChild
    variant="outline"
    className="w-full h-25 justify-between border-border hover:border-primary/50 bg-background/50"
  >
    <a
      href="/Rayan-Alrashed-CV.pdf"
      download
    >
      <div className="flex items-center gap-3">
        <FileText
        width={undefined}
        height={undefined}
        className="text-primary ml-2 w-6! h-6!" 
         />
        <div className="text-left lg:ml-2">
          <p className="font-medium lg:text-lg">Download CV</p>
          <p className="text-sm lg:text-md text-muted-foreground">
            View my experience & more
          </p>
        </div>
      </div>
      <ArrowDownToLine className="w-4 h-4 mr-2" />
    </a>
  </Button>
</div>
            </div>
          </div>
        </div>
     </div>
     
    </section>
  );
}
