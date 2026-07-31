"use client";

import { useMemo } from "react";

const GRID_X = 192; // vertical line spacing
const GRID_Y = 120; // horizontal line spacing
const SEGMENT = 160;

export default function GridBackground() {
  const signals = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        horizontal: Math.random() > 0.5,
        line: Math.floor(Math.random() * 18),
        delay: Math.random() * 20,
        duration: 4 + Math.random() * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.07) 2px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.07) 2px, transparent 1px)
          `,
          backgroundSize: `${GRID_X}px ${GRID_Y}px`,
        }}
      />

      {/* Moving signals */}
      {signals.map((signal) =>
        signal.horizontal ? (
          <div
            key={signal.id}
            className="absolute h-px"
            style={{
              top: signal.line * GRID_Y,
              width: SEGMENT,
              animation: `gridHorizontal ${signal.duration}s linear infinite`,
              animationDelay: `${signal.delay}s`,
            }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60 blur-[0.5px]" />
          </div>
        ) : (
          <div
            key={signal.id}
            className="absolute w-px"
            style={{
              left: signal.line * GRID_X,
              height: SEGMENT,
              animation: `gridVertical ${signal.duration}s linear infinite`,
              animationDelay: `${signal.delay}s`,
            }}
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-60 blur-[0.5px]" />
          </div>
        )
      )}
    </div>
  );
}