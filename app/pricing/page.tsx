"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, MoveRight, Shield } from "lucide-react";
import Link from "next/link";
import { pricingData } from "@/lib/pricing";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"oneTime" | "monthly">(
    "oneTime",
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      gsap.fromTo(
        ".pricing-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
          clearProps: "transform",
        },
      );

      // Title gliding animation - starts centered, glides apart on scroll
      if (
        titleLine1Ref.current &&
        titleLine2Ref.current &&
        titleContainerRef.current
      ) {
        // Set initial state - both lines centered
        gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
          x: 0,
        });

        // Create scroll-triggered animation
        gsap.to(titleLine1Ref.current, {
          x: -100, // Glide left
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: "top 0%",
            end: "top 100%",
            scrub: 1,
          },
        });

        gsap.to(titleLine2Ref.current, {
          x: 100, // Glide right
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: "top 0%",
            end: "top 100%",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [billingCycle]); // Re-run animation when cycle changes

  const activePlans = pricingData[billingCycle];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-zinc-300/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-zinc-400/25 rounded-full blur-[100px]" />
        </div>

        <Navbar />

        <main ref={containerRef} className="pb-32">
          {/* Hero Section — tall so the aurora background flows naturally */}
          <section className="pricing-hero relative pt-40 pb-20 px-6">
            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="pricing-header text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-black/10 text-zinc-700 text-xs font-semibold mb-5 tracking-[0.18em] uppercase">
                  <Shield className="w-3 h-3" />
                  Growth Packages
                </div>
                <h1
                  ref={titleContainerRef}
                  className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase leading-[0.95]"
                >
                  <span ref={titleLine1Ref} className="inline-block">
                    ELEVATE YOUR
                  </span>
                  <br />
                  <span
                    ref={titleLine2Ref}
                    className="text-primary italic inline-block"
                  >
                    DIGITAL IMPACT
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                  Fixed-scope foundations or aggressive monthly growth retainers.
                  Architected for market dominance.
                </p>

                {/* Switcher */}
                <div className="flex justify-center mb-12">
                  <div className="bg-black/5 p-1.5 rounded-full border border-black/10 shadow-lg shadow-black/15 flex gap-1 relative">
                    <button
                      onClick={() => setBillingCycle("oneTime")}
                      className={`px-8 py-3 rounded-full text-sm font-semibold tracking-[0.12em] uppercase transition-[color,background-color,border-color,box-shadow,transform,opacity] relative z-10 ${
                        billingCycle === "oneTime"
                          ? "text-white"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Foundation & Launch
                    </button>
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-8 py-3 rounded-full text-sm font-semibold tracking-[0.12em] uppercase transition-[color,background-color,border-color,box-shadow,transform,opacity] relative z-10 ${
                        billingCycle === "monthly"
                          ? "text-white"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Ongoing Growth
                    </button>
                    <div
                      className={`absolute top-1.5 bottom-1.5 transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300 ease-expo-out bg-primary rounded-full ${
                        billingCycle === "oneTime"
                          ? "left-1.5 right-[50%]"
                          : "left-[50%] right-1.5"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Grid */}
          <section className="px-6">
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
            >
              {activePlans.map((plan, index) => (
                <div
                  key={`${billingCycle}-${index}`}
                  className={`pricing-card group relative p-10 bg-white border ${
                    plan.popular
                      ? "border-primary shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.35)]"
                      : "border-black/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]"
                  } rounded-3xl overflow-hidden flex flex-col transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300 ease-out hover:-translate-y-1 hover:border-primary/50`}
                >
                  {plan.popular && (
                    <div className="absolute top-8 right-6 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[10px] font-semibold tracking-[0.18em] uppercase shadow-lg shadow-primary/30">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center border ${
                      plan.color === "primary"
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : plan.color === "blue"
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "bg-primary/10 border-primary/20 text-primary"
                    }`}
                  >
                    <plan.icon className="w-6 h-6" />
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold tracking-tight mb-1 uppercase">
                      {plan.tier}
                    </h3>
                    <p className="text-sm font-semibold text-foreground/70 tracking-tight mb-1">
                      {plan.name}
                    </p>
                    <p className="text-xs font-semibold text-primary tracking-[0.18em] uppercase mb-4 opacity-80">
                      {plan.sub}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-5xl font-bold tracking-tighter text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-zinc-400 text-sm font-semibold tracking-tight">
                        {plan.duration}
                      </span>
                    </div>
                    {plan.footer && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-xs font-medium text-zinc-600 tracking-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {plan.footer === "flexible contract" ? "Flexible — cancel anytime" : plan.footer}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4 mb-12 grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-zinc-100 border border-black/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-primary stroke-[3]" />
                        </div>
                        <span className="text-muted-foreground text-sm font-medium leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/contact?pkg=${encodeURIComponent(billingCycle)}&plan=${encodeURIComponent(plan.name)}`}
                    className="group relative overflow-hidden inline-flex items-center justify-between px-8 py-5 rounded-full font-semibold tracking-[0.12em] text-xs uppercase transition-[color,background-color,border-color,box-shadow,transform,opacity] bg-primary hover:bg-primary/80 text-white"
                  >
                    <span className="relative z-10">{plan.cta}</span>
                    <MoveRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="pricing-header mt-32 text-center p-16 md:p-24 bg-white border border-black/10 rounded-3xl relative overflow-hidden group shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
              {/* Animated Background Gradients */}
              <div className="absolute top-0 right-0 w-2/3 h-full bg-zinc-400/35 blur-[150px] -rotate-12 translate-x-1/2 opacity-50 transition-transform group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 w-1/2 h-full bg-zinc-400/25 blur-[120px] rotate-45 -translate-x-1/2 opacity-50" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter uppercase leading-[0.95]">
                  NEED A <span className="text-primary italic">CUSTOM</span>{" "}
                  <br />
                  STRATEGY?
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
                  For high-growth scale-ups and established enterprises
                  requiring complex architecture and dedicated engineering
                  teams.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden px-12 py-5 bg-primary hover:bg-primary/80 text-white rounded-full font-semibold tracking-[0.12em] text-xs uppercase transition-[color,background-color,border-color,box-shadow,transform,opacity] w-full sm:w-auto inline-flex items-center justify-center"
                  >
                    <span className="relative z-10">Speak with an Expert</span>
                  </Link>
                  {/* <Link
                    href="/partner-programme"
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-[color,background-color,border-color,box-shadow,transform,opacity]"
                  >
                    Partnerships
                  </Link> */}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
