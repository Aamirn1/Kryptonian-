"use client";

import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";

import ThreeNexus from "./ThreeNexus";

const HERO_PARTS = [
  { id: "main", src: "/hero-images/main-bg.webp", className: "w-[75%] z-10" },
  {
    id: "star1",
    src: "/hero-images/Star-1.png",
    className: "w-[15%] top-[-5%] left-[-2%] z-20",
  },
  {
    id: "star2",
    src: "/hero-images/Star-2.png",
    className: "w-[12%] bottom-[8%] right-[15%] z-20",
  },
  {
    id: "star-p",
    src: "/hero-images/star.png",
    className: "w-[8%] top-[8%] left-[15%] z-20",
  },
  {
    id: "stroke1",
    src: "/hero-images/Stroke-1.png",
    className: "w-[38%] bottom-[0%] right-[5%] z-5",
  },
  {
    id: "stroke2",
    src: "/hero-images/Stroke-2.png",
    className: "w-[80%] bottom-[24%] left-[5%] z-5",
  },
  {
    id: "tag1",
    src: "/hero-images/Tag-1.png",
    className: "w-[28%] bottom-[18%] left-[2%] z-30",
  },
  {
    id: "tag2",
    src: "/hero-images/Tag-2.png",
    className: "w-[28%] top-[12%] right-[2%] z-30",
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
  const partsRef = useRef<(HTMLDivElement | null)[]>([]);
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

      // Initial state for parts: Randomly scattered
      partsRef.current.forEach((part) => {
        if (!part) return;
        const xOffset = (Math.random() - 0.5) * 1500;
        const yOffset = (Math.random() - 0.5) * 1500;
        const rotation = (Math.random() - 0.5) * 90;
        gsap.set(part, {
          x: xOffset,
          y: yOffset,
          rotation: rotation,
          opacity: 0,
          scale: 0.3,
        });
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

        // Assembly animation - Speeded up for better responsiveness
        .to(
          partsRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            stagger: {
              each: 0.05,
              from: "random",
            },
            ease: "expo.out",
            onComplete: () => {
              // Add a subtle floating animation after assembly
              partsRef.current.forEach((part, i) => {
                if (!part) return;
                const tween = gsap.to(part, {
                  y: `+=${10 + Math.random() * 10}`,
                  duration: 4 + Math.random() * 2,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: i * 0.3,
                });
                floatingTweens.push(tween);
              });
            },
          },
          "-=0.6",
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
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden bg-[#fafafa] text-foreground"
    >
      {/* Loading overlay for small devices */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#fafafa] lg:hidden">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-8 w-fit">
              <Zap className="w-3 h-3 text-primary fill-primary" />
              <p className="text-primary text-xs font-bold tracking-wider uppercase">
                Strategic Growth Engine
              </p>
            </div>

            <div className="overflow-hidden mb-1">
              <span
                ref={titlePart1Ref}
                className="block text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.9] uppercase"
              >
                Exponential
              </span>
            </div>
            <div className="overflow-hidden mb-8">
              <span
                ref={titlePart2Ref}
                className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-primary italic"
              >
                Growth
              </span>
            </div>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-zinc-500 max-w-xl mb-12 leading-relaxed font-medium"
            >
              Mastering the digital landscape with bespoke SEO architectures
              engineered for market-leading dominance and ROI.
            </p>

            <div ref={ctaRef}>
              <Link
                href="/pricing"
                className="group relative px-10 py-5 bg-foreground text-white font-bold rounded-full transition-all hover:bg-primary active:scale-95 flex items-center gap-3 w-full"
              >
                <span className="uppercase tracking-widest text-medium">
                  Order Now
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Animation Stage */}
          <div
            ref={stageRef}
            className="relative h-125 w-full lg:h-[700px] hidden lg:flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-3 blur-3xl -z-10" />

            {/* Parts for assembly - These now form the final permanent visual */}
            <div className="relative w-full h-full flex items-center justify-center">
              {HERO_PARTS.map((part, index) => (
                <div
                  key={part.id}
                  ref={(el) => {
                    partsRef.current[index] = el;
                  }}
                  className={`absolute ${part.className} flex items-center justify-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.05)]`}
                >
                  <Image
                    src={part.src}
                    alt=""
                    width={800}
                    height={800}
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Accents */}
      <div
        className="absolute top-0 right-0 w-1/3 h-1/2 bg-linear-to-bl from-primary/5 to-transparent blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-linear-to-tr from-primary/10 to-transparent blur-[120px]"
        aria-hidden="true"
      />
    </section>
  );
}
