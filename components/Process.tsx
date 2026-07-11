"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "A deep immersion into your business, market, and objectives — the foundation that informs every decision that follows.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "A bespoke blueprint engineered around your specific growth goals, target audiences, and competitive landscape.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Strategy translated into delivery — built with precision, creative excellence, and obsessive attention to detail.",
  },
  {
    number: "04",
    title: "Optimisation",
    description:
      "Continuous monitoring, measurement, and refinement to compound results and maximise long-term ROI.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const trigger = triggerRef.current;
      const stepItems = gsap.utils.toArray(".process-step");

      if (!section || !trigger || stepItems.length === 0) return;

      // Calculate initial horizontal offset to center the first card
      const firstCard = stepItems[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const windowWidth = window.innerWidth;
      const initialOffset = windowWidth / 2 - cardWidth / 2;

      // Set initial position
      gsap.set(section, { x: initialOffset });

      const totalWidth = section.scrollWidth;

      // Main horizontal move
      const horizontalTween = gsap.to(section, {
        x: -(totalWidth - windowWidth + initialOffset),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Individual card animations using containerAnimation
      (stepItems as HTMLElement[]).forEach((step) => {
        const content = step.querySelector(".step-content");

        // Initial state: tilted
        gsap.set(content, { rotateZ: 10, transformOrigin: "center center" });

        // Animation: return to normal as it passes through the center/view
        gsap.to(content, {
          rotateZ: 0,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            containerAnimation: horizontalTween,
            start: "left 80%",
            end: "left 20%",
            scrub: true,
          },
        });
      });

      // Staggered entry for step contents — uses fromTo so cards are never
      // stuck at opacity:0 if the ScrollTrigger doesn't fire immediately.
      gsap.fromTo(
        ".step-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger,
            start: "top 85%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-background border-y border-black/5 overflow-hidden"
    >
      <div ref={triggerRef} className="h-screen flex items-center">
        <div className="container mx-auto px-6 mb-auto pt-32 absolute top-0 left-0 right-0 z-10 pointer-events-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-xl pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-black/10 mb-6 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-zinc-700 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-700" />
                </span>
                <p className="text-zinc-700 text-xs font-semibold tracking-[0.18em] uppercase">
                  Methodology
                </p>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground leading-[1.05]">
                HOW WE <span className="text-gradient italic font-display">WORK</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                A systematic methodology that ensures every engagement is
                delivered to the highest standards of quality, precision, and
                measurable efficiency.
              </p>
            </div>
            <div className="font-display text-electric/70 font-mono text-xl md:text-2xl hidden lg:block pointer-events-auto tracking-wider">
              / PROCESS FLOW
            </div>
          </div>
        </div>

        <div
          ref={sectionRef}
          className="flex gap-12 lg:gap-24 px-6 md:px-[10vw] items-center mt-32"
          style={{ width: "max-content" }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-step relative group shrink-0 w-[85vw] md:w-[45vw] lg:w-[25vw]"
            >
              <div className="step-content relative bg-card border border-black/10 rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:border-electric/30 group-hover:shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.25)] group-hover:-translate-y-1">
                {/* Gradient top accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent rounded-t-3xl" />
                {/* Oversized ghost number */}
                <div className="font-display text-8xl md:text-[10rem] font-bold text-black/5 absolute -top-16 md:-top-24 -left-4 group-hover:text-electric/10 transition-colors pointer-events-none leading-none">
                  {step.number}
                </div>
                <div className="relative z-10 pt-10">
                  <div className="w-12 h-1 bg-gradient-to-r from-electric to-violet mb-8 transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-3xl md:text-4xl font-bold text-gradient leading-none">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
