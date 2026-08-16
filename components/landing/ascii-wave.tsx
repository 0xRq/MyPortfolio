"use client";

import { useEffect, useRef } from "react";

export function AsciiWave({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "█▓▒░ ";
    const width = 60;
    const height = 24;

    const cellWidth = 8;
    const cellHeight = 12;

    canvas.width = width * cellWidth;
    canvas.height = height * cellHeight;

    ctx.font = "12px JetBrains Mono, monospace";
    ctx.textBaseline = "top";

    let animationId = 0;
    let time = 0;

    // Limit the animation to ~30 FPS.
    let lastFrame = 0;
    const frameInterval = 1000 / 30;

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);

      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const wave1 =
            Math.sin(x * 0.08 + time) *
            Math.cos(y * 0.12 + time * 0.5);

          const wave2 =
            Math.sin(x * 0.05 - time * 0.7) *
            Math.sin(y * 0.08 + time * 0.3);

          const wave3 =
            Math.cos(x * 0.03 + y * 0.03 + time * 0.4);

          const normalized =
            ((wave1 + wave2 + wave3) / 3 + 1) / 2;

          const charIndex = Math.floor(
            normalized * (chars.length - 1)
          );

          const char = chars[charIndex];

          if (char !== " ") {
            const alpha = 0.3 + normalized * 0.7;

            // Use a fixed color instead of constructing an
            // OKLCH string for every character.
            ctx.fillStyle = `rgba(120, 220, 210, ${alpha})`;

            ctx.fillText(
              char,
              x * cellWidth,
              y * cellHeight
            );
          }
        }
      }

      time += 0.016;
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}