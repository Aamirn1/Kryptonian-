"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import { ArrowLeft, Rocket, Target, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".intro-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5 },
      ).fromTo(
        ".step-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-electric/25 selection:text-foreground antialiased overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-zinc-200/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-zinc-200/25 rounded-full blur-[100px]" />
        </div>

        <Navbar />

        <main ref={containerRef} className="relative pt-40 pb-32 px-6 overflow-hidden">
          <AuroraBackground />
          <div className="container mx-auto max-w-6xl relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric transition-colors mb-12 group text-xs font-semibold tracking-[0.18em] uppercase"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="intro-content mb-24 max-w-3xl">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 uppercase leading-[0.9]">
                Ready to <br />
                <span className="text-gradient italic">Engage?</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                You&apos;re one decision away from engineering your next phase
                of growth. Choose how we partner — and let&apos;s build the
                future, together.
              </p>
            </div>

            <div
              ref={stepsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Option 1: Fast Track */}
              <div className="step-card group relative p-10 bg-white border border-black/10 rounded-3xl overflow-hidden hover:bg-zinc-50 hover:border-electric/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
                <div className="w-16 h-16 bg-electric/10 border border-electric/20 text-electric rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6 leading-[1.1]">Foundation &amp; Launch (One-Time or Project-Based)</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Best for businesses with a clear goal who want to start
                  immediate execution on specific digital needs.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-electric font-semibold group-hover:gap-4 transition-all"
                >
                  <span className="uppercase tracking-[0.12em] text-sm">Go Fast</span> <Rocket className="w-5 h-5" />
                </Link>
                <div className="absolute top-0 right-0 p-8">
                  <span className="font-display text-black/[0.06] font-bold text-6xl">01</span>
                </div>
              </div>

              {/* Option 2: Strategy First */}
              <div className="step-card group relative p-10 bg-electric/5 border border-electric/20 rounded-3xl overflow-hidden hover:bg-electric/10 hover:border-electric/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.25)]">
                <div className="w-16 h-16 bg-electric text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-xl shadow-electric/30">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6 leading-[1.1]">Ongoing Growth &amp; Management (Subscription Packages)</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Comprehensive audit and roadmap creation. Perfect for
                  established brands looking for a serious overhaul.
                </p>
                <Link
                  href="/pricing"
                  className="group relative overflow-hidden inline-flex items-center justify-center py-4 px-8 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-2xl group-hover:scale-105 transition-all shadow-lg shadow-electric/20"
                >
                  <span className="shimmer-sweep" />
                  <span className="uppercase tracking-[0.12em] text-sm relative z-10">Start Audit</span>
                </Link>
                <div className="absolute top-0 right-0 p-8">
                  <span className="font-display text-electric/15 font-bold text-6xl">02</span>
                </div>
              </div>

              {/* Option 3: Enterprise */}
              <div className="step-card group relative p-10 bg-white border border-black/10 rounded-3xl overflow-hidden hover:bg-zinc-50 hover:border-electric/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
                <div className="w-16 h-16 bg-violet/10 border border-violet/20 text-violet rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6 leading-[1.1]">Full Package</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  End-to-end digital management. We become your internal
                  marketing and tech department.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-electric font-semibold group-hover:gap-4 transition-all"
                >
                  <span className="uppercase tracking-[0.12em] text-sm">Learn More</span> <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
                <div className="absolute top-0 right-0 p-8">
                  <span className="font-display text-black/[0.06] font-bold text-6xl">03</span>
                </div>
              </div>
            </div>

            <div className="intro-content mt-32 text-center p-20 bg-white border border-black/10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
              <h2 className="text-4xl font-bold mb-6 tracking-tight leading-[1.05]">
                STILL UNSURE?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                Schedule a free 15-minute discovery call with our experts to
                find the right path for your business.
              </p>
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center px-10 py-4 border border-black/15 rounded-full font-semibold text-zinc-700 hover:text-foreground hover:border-black/30 hover:bg-black/5 transition-all"
              >
                <span className="shimmer-sweep" />
                <span className="uppercase tracking-[0.12em] text-sm relative z-10">Book a Call</span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
