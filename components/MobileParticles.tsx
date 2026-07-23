"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rounded: boolean;
}

/**
 * MobileParticles — lightweight CSS-animated floating particle field for the
 * hero on mobile/tablet (< 1024px). Mirrors the #cb6be6 color of the desktop
 * ThreeNexus WebGL scene so the hero keeps its signature purple star/rectangle
 * floating animation on small screens without the WebGL performance cost.
 *
 * Renders small rounded rectangles (squares) that drift + fade in a loop.
 * Particles are generated in useEffect (not during render) to keep the
 * component pure.
 */
export default function MobileParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles once on mount (client-only, avoids SSR + purity issues).
    const generated: Particle[] = Array.from({ length: 28 }).map((_, i) => {
      const size = 4 + Math.round(Math.random() * 8); // 4-12px
      return {
        id: i,
        left: Math.random() * 100, // %
        top: Math.random() * 100, // %
        size,
        duration: 6 + Math.random() * 8, // 6-14s
        delay: Math.random() * 8, // 0-8s
        opacity: 0.25 + Math.random() * 0.5, // 0.25-0.75
        rounded: Math.random() > 0.5, // some squares, some rounded
      };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generated);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden lg:hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes krypton-particle-drift {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1);   opacity: 0; }
          15%  { opacity: var(--p-op); }
          50%  { transform: translate3d(20px, -30px, 0) rotate(180deg) scale(1.15); }
          85%  { opacity: var(--p-op); }
          100% { transform: translate3d(-15px, -60px, 0) rotate(360deg) scale(0.9); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "#cb6be6",
              borderRadius: p.rounded ? "2px" : "0",
              boxShadow: "0 0 8px rgba(203, 107, 230, 0.5)",
              animation: `krypton-particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              "--p-op": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
