"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ScrollToTop — fixed bottom-left button that appears after the user scrolls
 * down past one viewport, and smoothly scrolls back to the top on click.
 * Hidden on mobile when the viewport is too short to need it (<= 500px).
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 left-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-[#cb6ce6]/30 bg-white/80 backdrop-blur-xl text-zinc-700 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)] transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none",
      )}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );
}
