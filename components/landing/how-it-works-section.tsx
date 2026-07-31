"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Connect",
    description: "Integrate with 200+ data sources. One-click setup for databases, APIs, and cloud services.",
    code: `nexus.connect({
  source: 'postgresql',
  config: process.env.DB_URL
})`,
  },
  {
    number: "02",
    title: "Configure",
    description: "Define your AI workflows with our visual builder or code-first approach.",
    code: `nexus.workflow('process-orders', {
  trigger: 'new_order',
  steps: ['validate', 'enrich', 'notify']
})`,
  },
  {
    number: "03",
    title: "Deploy",
    description: "Ship to production instantly. Auto-scaling, monitoring, and 99.9% uptime included.",
    code: `nexus.deploy({
  env: 'production',
  region: 'auto'
}) // Live in < 30s`,
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
      { threshold: 0.1 }
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
          <p className="text-sm font-mono text-primary mb-3">// TECHNOLOGY</p>
          <h2
            className={`text-3xl lg:text-5xl font-semibold tracking-tight mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-balance">Three steps to</span>
            <br />
            <span className="text-balance">production.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
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
  let i = 0;

  while (i < line.length) {
    // Comment: // to end of line
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }

    // String: single or double quoted
    if (line[i] === "'" || line[i] === '"') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j++;
      tokens.push({ type: 'string', value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Keyword: nexus, process, env
    const kwMatch = line.slice(i).match(/^(nexus|process|env)/);
    if (kwMatch) {
      tokens.push({ type: 'keyword', value: kwMatch[0] });
      i += kwMatch[0].length;
      continue;
    }

    // Method: .identifier
    const methodMatch = line.slice(i).match(/^(\.\w+)/);
    if (methodMatch) {
      tokens.push({ type: 'method', value: methodMatch[0] });
      i += methodMatch[0].length;
      continue;
    }

    // Punctuation
    if ('{}()[]:\n'.includes(line[i])) {
      tokens.push({ type: 'punctuation', value: line[i] });
      i++;
      continue;
    }

    // Plain text — accumulate
    let j = i + 1;
    while (j < line.length) {
      const c = line[j];
      if (c === '/' || c === "'" || c === '"' || '{}()[]:\n'.includes(c)) break;
      if (line.slice(j).match(/^(nexus|process|env|\.\w+)/)) break;
      j++;
    }
    tokens.push({ type: 'plain', value: line.slice(i, j) });
    i = j;
  }

  return tokens;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightCode(line: string): string {
  const tokens = tokenizeLine(line);
  return tokens
    .map(({ type, value }) => {
      const escaped = escapeHtml(value);
      switch (type) {
        case 'keyword':   return `<span class="text-foreground">${escaped}</span>`;
        case 'method':    return `<span class="text-primary">${escaped}</span>`;
        case 'string':    return `<span class="text-green-400">${escaped}</span>`;
        case 'comment':   return `<span class="text-muted-foreground/50">${escaped}</span>`;
        case 'punctuation': return `<span class="text-muted-foreground/70">${escaped}</span>`;
        default:          return escaped;
      }
    })
    .join('');
}
