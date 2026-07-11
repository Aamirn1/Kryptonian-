"use client";

import { useEffect } from "react";
import Link from "next/link";
import AuroraBackground from "@/components/AuroraBackground";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-electric/25 selection:text-foreground flex items-center justify-center px-6 py-20 overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 max-w-md mx-auto text-center">
        <div className="font-display text-gradient text-6xl font-bold mb-6 leading-none">Oops</div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-[1.1]">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          An unexpected error occurred on our end. Please try again — or head
          back home and we&apos;ll get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="group relative overflow-hidden px-8 py-4 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-full transition-[color,background-color,border-color,box-shadow,transform,opacity] active:scale-95 inline-flex items-center justify-center gap-3"
          >
            <span className="shimmer-sweep" />
            <span className="uppercase tracking-[0.12em] text-sm relative z-10">Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-black/15 text-zinc-700 hover:text-foreground hover:border-black/30 hover:bg-black/5 rounded-full font-semibold transition-[color,background-color,border-color,box-shadow,transform,opacity]"
          >
            <span className="uppercase tracking-[0.12em] text-sm">Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
