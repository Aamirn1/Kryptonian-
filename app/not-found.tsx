import Link from "next/link";
import { Home, HelpCircle } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-electric/25 selection:text-foreground flex items-center justify-center px-6 py-20 overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <span className="font-display text-gradient text-[120px] md:text-[180px] font-bold tracking-tighter leading-none">
            404
          </span>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6 leading-[0.95]">
          Page Not Found
        </h1>

        {/* Error Message */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for has drifted off the map — or never
          existed. Let&apos;s get you back on course.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-full transition-all active:scale-95"
          >
            <span className="shimmer-sweep" />
            <Home className="w-5 h-5 relative z-10" />
            <span className="uppercase tracking-[0.12em] text-sm relative z-10">Back to Home</span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-black/15 text-zinc-700 hover:text-foreground hover:border-black/30 hover:bg-black/5 rounded-full font-semibold transition-all"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="uppercase tracking-[0.12em] text-sm">Get Help</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-10 border-t border-black/10">
          <p className="text-xs text-zinc-400 mb-6 uppercase tracking-[0.18em] font-semibold">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="text-foreground/70 hover:text-electric transition-colors font-medium"
            >
              Pricing
            </Link>
            <span className="text-black/30">•</span>
            <Link
              href="/about"
              className="text-foreground/70 hover:text-electric transition-colors font-medium"
            >
              About Us
            </Link>
            <span className="text-black/30">•</span>
            <Link
              href="/contact"
              className="text-foreground/70 hover:text-electric transition-colors font-medium"
            >
              Contact
            </Link>
            <span className="text-black/30">•</span>
            <Link
              href="/get-started"
              className="text-foreground/70 hover:text-electric transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
