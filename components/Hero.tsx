"use client";

import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MoveRight, TrendingUp, Target, BarChart3 } from "lucide-react";

import ThreeNexus from "./ThreeNexus";
import AuroraBackground from "./AuroraBackground";
import Typewriter from "./Typewriter";

/**
 * Floating glass stat cards layered over the hero composition image.
 * Built with HTML/CSS for crisp typography (vs. rasterized PNG tags).
 */
const FLOATING_CARDS = [
  {
    id: "traffic",
    icon: TrendingUp,
    label: "Organic Traffic",
    value: "+250%",
    className: "top-[6%] right-[4%]",
    accent: "from-electric to-violet",
    delay: 0.2,
  },
  {
    id: "conv",
    icon: Target,
    label: "Conversion Rate",
    value: "3.4x",
    className: "bottom-[14%] left-[0%]",
    accent: "from-violet to-cyan",
    delay: 0.4,
  },
  {
    id: "roi",
    icon: BarChart3,
    label: "Avg. ROI",
    value: "320%",
    className: "bottom-[2%] right-[8%]",
    accent: "from-cyan to-electric",
    delay: 0.6,
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlePart1Ref = useRef<HTMLSpanElement>(null);
  const titlePart2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const isSmallScreen = !window.matchMedia("(min-width: 1024px)").matches;

    if (isSmallScreen) {
      const raf = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(raf);
    }

    const floatingTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial clear state for text
      gsap.set([titlePart1Ref.current, titlePart2Ref.current], {
        y: 80,
        skewY: 4,
        opacity: 0,
      });
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });
      gsap.set(statsRef.current?.children || [], { y: 20, opacity: 0 });

      // Initial state for the hero image + floating cards
      gsap.set(imageRef.current, {
        scale: 0.7,
        opacity: 0,
        rotation: -6,
      });
      gsap.set(cardsRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.6,
      });

      // Build the cinematic reveal
      tl.to(titlePart1Ref.current, {
        y: 0,
        skewY: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.1,
      })
        .to(
          titlePart2Ref.current,
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.6",
        )
        // Hero image rises into place
        .to(
          imageRef.current,
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.4,
            ease: "expo.out",
            onComplete: () => {
              // Gentle floating for the main image
              const tween = gsap.to(imageRef.current, {
                y: "-=14",
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
              floatingTweens.push(tween);
            },
          },
          "-=0.6",
        )
        // Floating cards pop in with stagger
        .to(
          cardsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.6)",
            onComplete: () => {
              // Subtle continuous float for each card
              cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const tween = gsap.to(card, {
                  y: `+=${8 + Math.random() * 8}`,
                  duration: 3.5 + Math.random() * 1.5,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: i * 0.4,
                });
                floatingTweens.push(tween);
              });
            },
          },
          "-=0.8",
        )
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=1.0",
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.8",
        )
        .to(
          statsRef.current?.children || [],
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
          },
          "-=0.6",
        );

      tl.then(() => setLoaded(true));
    }, containerRef);

    return () => {
      floatingTweens.forEach((tween) => tween.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden bg-background text-foreground"
    >
      {/* Aurora background (Opus signature) */}
      <AuroraBackground />

      {/* Loading overlay for small devices */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background lg:hidden">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-electric/20 border-t-electric rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* 3D Background */}
      <ThreeNexus />

      {/* Content */}
      <div
        className={`relative z-10 container mx-auto h-full transition-opacity duration-500 lg:opacity-100 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left mx-8 lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric/10 border border-electric/20 mb-8 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-electric opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
              </span>
              <p className="text-electric text-xs font-semibold tracking-[0.18em] uppercase">
                Strategic Growth Engine
              </p>
            </div>

            <div className="overflow-hidden mb-1">
              <span
                ref={titlePart1Ref}
                className="block text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter leading-[0.9] uppercase"
              >
                Exponential
              </span>
            </div>
            <div className="overflow-hidden mb-3">
              <span
                ref={titlePart2Ref}
                className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase text-gradient italic"
              >
                Growth
              </span>
            </div>

            {/* Typewriter rotating specialization line */}
            <div className="flex items-center gap-2 mb-7 h-7">
              <span className="text-sm md:text-base font-medium text-white/40 tracking-tight">
                Engineered for
              </span>
              <Typewriter
                phrases={[
                  "SEO dominance",
                  "Conversion velocity",
                  "Brand authority",
                  "Market leadership",
                  "Sustainable ROI",
                ]}
                className="text-sm md:text-base font-semibold tracking-tight text-gradient"
                typeSpeed={65}
                deleteSpeed={35}
                pauseDuration={1500}
              />
            </div>

            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-white/60 max-w-xl mb-12 leading-relaxed"
            >
              We architect high-performance digital ecosystems — blending
              precision SEO, elite web development, and brand strategy into a
              compounding growth engine for market-leading companies.
            </p>

            <div ref={ctaRef} className="flex flex-row gap-2.5 sm:gap-4">
              <Link
                href="/pricing"
                className="group relative overflow-hidden px-5 sm:px-10 py-3.5 sm:py-5 btn-gradient text-white font-semibold rounded-full transition-all hover:btn-gradient-hover active:scale-95 flex items-center justify-center gap-2 sm:gap-3 flex-1 sm:flex-none"
              >
                <span className="relative z-10 uppercase tracking-[0.1em] sm:tracking-[0.12em] text-[0.7rem] sm:text-sm whitespace-nowrap">
                  Scale Project
                </span>
                <MoveRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-2 shrink-0" />
                <span className="shimmer-sweep" />
              </Link>
              <Link
                href="/portfolio"
                className="group px-5 sm:px-8 py-3.5 sm:py-5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 flex-1 sm:flex-none"
              >
                <span className="uppercase tracking-[0.1em] sm:tracking-[0.12em] text-[0.7rem] sm:text-sm whitespace-nowrap">View Work</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Animation Stage */}
          <div
            ref={stageRef}
            className="relative h-125 w-full lg:h-[700px] hidden lg:flex items-center justify-center p-8"
          >
            {/* Glow behind the composition */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric/15 via-violet/10 to-cyan/15 rounded-[4rem] blur-3xl -z-10" />

            {/* Main hero composition image */}
            <div
              ref={imageRef}
              className="relative w-[88%] aspect-square max-w-[560px]"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-electric/30 via-violet/20 to-cyan/30 blur-2xl opacity-60" />
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(59,130,246,0.4)]">
                <Image
                  src="/hero-images/main-bg.webp"
                  alt="Digital growth analytics dashboard visualization"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Subtle top sheen */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating glass stat cards */}
            {FLOATING_CARDS.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`absolute ${card.className} z-30`}
              >
                <div className="relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} shrink-0`}
                  >
                    <card.icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-display text-lg font-bold text-white">
                      {card.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                      {card.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Background Accents */}
      <div
        className="absolute top-0 right-0 w-1/3 h-1/2 bg-linear-to-bl from-electric/10 to-transparent blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-linear-to-tr from-violet/10 to-transparent blur-[120px]"
        aria-hidden="true"
      />
    </section>
  );
}
