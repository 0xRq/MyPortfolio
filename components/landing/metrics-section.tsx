"use client";

import { useEffect, useState, useRef } from "react";
import { AsciiWave } from "./ascii-wave";
import { Google_Sans_Code } from "next/font/google";

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="font-mono text-4xl lg:text-6xl font-semibold tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

const certifications = [
   {
    logo: "./Google_logo.svg",
    issuer: "Google",
    title: "Google Cybersecurity Professional Certificate",
    credential: "9-course program covering cybersecurity fundamentals, Linux, SQL, Python, SIEM, and security operations",
    button: "Verify Credential",
    href: "https://..."
  },
  {
    logo: "./Tuwaiq_Academy.svg",
    issuer: "Tuwaiq Academy",
    title: "Penetration Testing Bootcamp",
    credential: "6-week intensive training focused on reconnaissance, vulnerability assessment, exploitation, and reporting",
    button: "View Certificate",
    href: "https://..."
  },
  {
    logo: "./STC-logo.svg",
    issuer: "STC",
    title: "Incident Response Internship",
    credential: "Virtual internship focused on security operations, incident handling, and cybersecurity workflows",
    button: "View Certificate",
    href: "https://..."
  },
  {
    logo: "./CC_Logo.png",
    issuer: "Clifford Chance",
    title: "Cybersecurity Analyst Intern",
    credential: "Applied experience in security analysis, threat investigation, and cybersecurity research",
    button: "Verify Certificate",
    href: "https://..."
  },
  {
    logo: "./Udemy_logo.svg",
    issuer: "Udemy",
    title: "Ethical Hacking",
    credential: "Training covering penetration testing methodologies, security tools, and techniques",
    button: "Verify Certificate",
    href: "https://..."
  },
  {
    logo: "./Udemy_logo.svg",
    issuer: "Udemy",
    title: "Social Engineering",
    credential: "Professional training focused on human-based security risks and social engineering techniques",
    button: "View Certificate",
    href: "https://..."
  },
];

export function MetricsSection() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="metrics" className="relative py-32 overflow-hidden">
      {/* ASCII Wave Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <AsciiWave className="w-full h-full object-cover" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-mono text-primary mb-3">// CERTIFICATIONS</p>
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-balance">
             Certifications & Courses
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>All systems operational</span>
            <span className="text-border">|</span>
            <span>{time.toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Certifications Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {certifications.map((cert) => (
    <div
      key={cert.title}
      className="group bg-card border border-border rounded-xl p-8 flex flex-col justify-between card-shadow hover:border-primary/50 transition-all"
    >
      <div>
        {/* Logo + Issuer */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src={cert.logo}
            alt={cert.issuer}
            className="h-6 w-6 object-contain"
          />

          <span className="text-sm font-mono text-primary">
            {cert.issuer}
          </span>
        </div>

        {/* Certificate Title */}
        <h3 className="text-xl font-semibold mb-2">
          {cert.title}
        </h3>

        {/* Credential Info */}
        <p className="text-sm text-muted-foreground">
          {cert.credential}
        </p>
      </div>

      {/* Verification Button */}
      <a
        href={cert.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
      >
        {cert.button}
      </a>
    </div>
  ))}
</div>
        
        
        
      </div>
    </section>
  );
}

function ActivityLine({ time, event, region, status, latency }: { 
  time: string; 
  event: string; 
  region: string; 
  status: string; 
  latency: string; 
}) {
  return (
    <div className="flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-500">
      <span className="text-muted-foreground/50 w-8">{time}</span>
      <span className="text-foreground">{event}</span>
      <span className="text-muted-foreground/50">{region}</span>
      <span className={status.startsWith("2") ? "text-green-500" : "text-yellow-500"}>{status}</span>
      <span className="text-primary">{latency}</span>
    </div>
  );
}
