"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <div className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <Navbar />

        <main ref={containerRef} className="pt-40 pb-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-foreground transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO HOME
            </Link>

            <div className="intro-content mb-24 max-w-3xl">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase">
                Ready to <br />
                <span className="text-primary italic">Engage?</span>
              </h1>
              <p className="text-xl text-zinc-500 leading-relaxed">
                You&apos;re one step away from transforming your digital presence.
                Choose your path and let&apos;s build the future together.
              </p>
            </div>

            <div
              ref={stepsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Option 1: Fast Track */}
              <div className="step-card group relative p-10 bg-white border border-zinc-200 rounded-4xl overflow-hidden hover:bg-zinc-50 hover:border-primary/50 transition-all shadow-xl shadow-zinc-200/20">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Foundation & Launch (One-Time or Project-Based)</h3>
                <p className="text-zinc-500 mb-8 leading-relaxed">
                  Best for businesses with a clear goal who want to start
                  immediate execution on specific digital needs.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all"
                >
                  GO FAST <Rocket className="w-5 h-5" />
                </Link>
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-zinc-200 font-black text-6xl">01</span>
                </div>
              </div>

              {/* Option 2: Strategy First */}
              <div className="step-card group relative p-10 bg-primary/5 border border-primary/20 rounded-4xl overflow-hidden hover:bg-primary/10 hover:border-primary/40 transition-all shadow-xl shadow-primary/10">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-xl shadow-primary/30">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Ongoing Growth & Management (Subscription Packages)</h3>
                <p className="text-zinc-500 mb-8 leading-relaxed">
                  Comprehensive audit and roadmap creation. Perfect for
                  established brands looking for a serious overhaul.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex py-4 px-8 bg-primary text-white font-bold rounded-2xl group-hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                  START AUDIT
                </Link>
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-primary/15 font-black text-6xl">02</span>
                </div>
              </div>

              {/* Option 3: Enterprise */}
              <div className="step-card group relative p-10 bg-white border border-zinc-200 rounded-4xl overflow-hidden hover:bg-zinc-50 hover:border-primary/50 transition-all shadow-xl shadow-zinc-200/20">
                <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Full Package</h3>
                <p className="text-zinc-500 mb-8 leading-relaxed">
                  End-to-end digital management. We become your internal
                  marketing and tech department.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all"
                >
                  LEARN MORE <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-zinc-200 font-black text-6xl">03</span>
                </div>
              </div>
            </div>

            <div className="intro-content mt-32 text-center p-20 bg-white border border-zinc-200 rounded-[4rem] shadow-xl shadow-zinc-200/20">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">
                STILL UNSURE?
              </h2>
              <p className="text-zinc-500 text-lg mb-10 max-w-xl mx-auto">
                Schedule a free 15-minute discovery call with our experts to
                find the right path for your business.
              </p>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 border border-zinc-200 rounded-full font-bold hover:bg-foreground hover:text-white hover:border-foreground transition-all"
              >
                BOOK A CALL
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
