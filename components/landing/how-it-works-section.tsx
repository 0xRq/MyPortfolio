"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Reconnaissance",
    description: "Analyze the target environment, gather intelligence, and identify potential attack surfaces.",
    code: `samsepi0l@kali:~$ nmap -sV -sC target.com`,
  },
  {
    number: "02",
    title: "Security Testing",
    description: "Assess applications, networks, and systems to discover and validate security weaknesses.",
    code: `samsepi0l@kali:~$ ffuf -u https://target.com/FUZZ -w wordlist.txt

    /admin      [Status: 403]
    /login      [Status: 200]
    /dashboard      [Status: 401] `,
  },
  {
    number: "03",
    title: "Report & Remediation",
    description: "Document findings, explain risks, and provide recommendations to improve security posture.",
    code: `samsepi0l@kali:~$ cat security-report.md
    
    # Vulnerability Report
Finding: Broken Access Control

Recommendation:
- Implement proper authorization checks
- Review access control policies`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
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

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <p className="text-sm font-mono text-primary mb-3">// WORKFLOW</p>
          <h2
            className={`text-3xl lg:text-5xl font-semibold tracking-tight mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-balance">How I Work</span>
        
          </h2>
        </div>

        {/* Main content */}
        <div className="grid xl:grid-cols-2 gap-16 items-start">
          {/* Steps list */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                  activeStep === index
                    ? "bg-card border-primary/50 card-shadow"
                    : "bg-transparent border-transparent hover:bg-card/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-mono text-sm transition-colors ${
                      activeStep === index ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        activeStep === index ? "text-muted-foreground" : "text-muted-foreground/60"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Progress bar */}
                {activeStep === index && (
                  <div className="mt-4 ml-8">
                    <div className="h-0.5 bg-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full animate-[progress_4s_linear]"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="lg:sticky lg:top-32">
            <div className="rounded-xl overflow-hidden bg-card border border-border card-shadow">
              {/* Window chrome */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-secondary/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">workflow.ts</span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm min-h-[200px]">
                <pre className="text-muted-foreground">
                  {steps[activeStep].code.split('\n').map((line, i) => (
                    <div 
                      key={`${activeStep}-${i}`} 
                      className="leading-relaxed animate-in fade-in slide-in-from-left-2"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <span className="text-muted-foreground/40 select-none w-6 inline-block">{i + 1}</span>
                      <span 
                        dangerouslySetInnerHTML={{ 
                          __html: highlightCode(line) 
                        }} 
                      />
                    </div>
                  ))}
                </pre>
              </div>

              {/* Output */}
              <div className="border-t border-border p-4 bg-secondary/20 font-mono text-xs">
                <div className="flex items-center gap-2 text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Ready
                </div>
              </div>
            </div>

            {/* ASCII decoration */}
            
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}

type Token = { type: string; value: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];

  // Terminal prompt
  const promptMatch = line.match(
    /^([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+):([^\s$]+)(\$|#)\s/
  );

  let remaining = line;

  if (promptMatch) {
    tokens.push({
      type: "username",
      value: promptMatch[1]
    });

    tokens.push({
      type: "plain",
      value: "@"
    });

    tokens.push({
      type: "hostname",
      value: promptMatch[2]
    });

    tokens.push({
      type: "plain",
      value: ":"
    });

    tokens.push({
      type: "path",
      value: promptMatch[3]
    });

    tokens.push({
      type: "prompt",
      value: promptMatch[4]
    });

    remaining = line.slice(promptMatch[0].length);
  }


  // Command
const parts = remaining.split(/\s+/).filter(Boolean);

  if (parts.length > 0) {
  tokens.push({
    type: "command",
    value: " " + parts[0]
  });

  parts.slice(1).forEach(part => {

    if (part.startsWith("-")) {
      tokens.push({
        type: "flag",
        value: " " + part
      });

    } else {
      tokens.push({
        type: "argument",
        value: " " + part
      });
    }

  });
}

  return tokens;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightCode(line:string){

const tokens = tokenizeLine(line);

return tokens.map(({type,value})=>{

const escaped = escapeHtml(value);

switch(type){

case "username":
return `<span class="text-green-400">${escaped}</span>`;

case "hostname":
return `<span class="text-cyan-400">${escaped}</span>`;

case "path":
return `<span class="text-blue-400">${escaped}</span>`;

case "prompt":
return `<span class="text-foreground">${escaped}</span>`;

case "command":
return `<span class="text-white font-semibold">${escaped}</span>`;

case "flag":
return `<span class="text-yellow-400">${escaped}</span>`;

case "argument":
return `<span class="text-muted-foreground">${escaped}</span>`;

case "success":
return `<span class="text-green-400">${escaped}</span>`;

case "warning":
return `<span class="text-yellow-400">${escaped}</span>`;

case "error":
return `<span class="text-red-400">${escaped}</span>`;

default:
return escaped;

}

}).join("");

}
