"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — Lenis smooth scrolling wrapper.
 *
 * IMPORTANT: Lenis is DISABLED on touch devices and reduced-motion users.
 * On iOS Safari, Lenis hijacks the native momentum scroll which causes
 * severe jank/hanging. Native scroll is always smoother on touch — so we
 * only enable Lenis for desktop pointer (mouse wheel) scrolling.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Skip on touch devices — native iOS/Android scroll is better there.
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    // Skip if user prefers reduced motion.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
