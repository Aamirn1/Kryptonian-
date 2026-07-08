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
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20 overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 max-w-md mx-auto text-center">
        <div className="text-gradient text-6xl font-black mb-6">Oops</div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="group relative overflow-hidden px-8 py-4 btn-gradient text-white font-bold rounded-full transition-all active:scale-95"
          >
            <span className="shimmer-sweep" />
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 border border-white/10 rounded-full font-bold hover:border-electric hover:text-electric transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
