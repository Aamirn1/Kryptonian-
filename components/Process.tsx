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
      "Deep dive into your business and objectives to build a solid foundation.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Developing a custom blueprint focused on your specific growth goals.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Implementation of the strategy with precision and creative excellence.",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "Continuous monitoring and refinement to maximize results and ROI.",
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
            start: "left 80%", // Start tilting back when left of card is at 80% screen width
            end: "left 20%",   // Finish tilting by the time it reaches 20%
            scrub: true,
          }
        });
      });

      // Staggered entry for step contents
      gsap.from(".step-content", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger,
          start: "center 80%",
        },
      });
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
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground">
                HOW WE <span className="text-gradient italic">WORK</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Our systematic approach ensures every project is delivered with
                the highest standards of quality and efficiency.
              </p>
            </div>
            <div className="text-electric font-mono text-xl md:text-2xl hidden lg:block pointer-events-auto">
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
              <div className="step-content">
                <div className="text-8xl md:text-[10rem] font-bold text-black/5 absolute -top-16 md:-top-24 -left-4 group-hover:text-electric/10 transition-colors pointer-events-none">
                  {step.number}
                </div>
                <div className="relative z-10 pt-10">
                  <div className="w-12 h-1 bg-gradient-to-r from-electric to-violet mb-8 transition-[color,background-color,border-color,box-shadow,transform,opacity] group-hover:w-full" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
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
