"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl font-black text-primary mb-6">Oops</div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          Something went wrong
        </h1>
        <p className="text-zinc-500 mb-8">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-foreground text-white font-bold rounded-full hover:bg-primary transition-all active:scale-95"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 border border-zinc-200 rounded-full font-bold hover:border-primary hover:text-primary transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
