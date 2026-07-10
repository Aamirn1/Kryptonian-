"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Megaphone,
  BarChart3,
  Globe,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Digital Strategy",
    description:
      "Bespoke roadmaps engineered to align your brand with modern digital trends and exponential growth vectors.",
    icon: Megaphone,
    image: "/services/strategy.png",
    color: "text-electric",
  },
  {
    title: "Web Development",
    description:
      "High-performance platforms built on cutting-edge architecture — engineered for seamless UX and conversion dominance.",
    icon: Code2,
    image: "/services/web-dev.png",
    color: "text-violet",
  },
  {
    title: "SEO Optimization",
    description:
      "Strategic search precision that compounds organic visibility and builds market-leading domain authority.",
    icon: BarChart3,
    image: "/services/seo.png",
    color: "text-cyan",
  },
  {
    title: "Brand Identity",
    description:
      "Distinctive visual systems crafted to resonate with high-value audiences and establish enduring trust.",
    icon: Sparkles,
    image: "/services/brand.png",
    color: "text-gold",
  },
  {
    title: "Market Analysis",
    description:
      "Data-driven competitive intelligence that keeps you ahead of market shifts and surfaces untapped opportunities.",
    icon: Globe,
    image: "/services/market.png",
    color: "text-cyan",
  },
  {
    title: "Conversion Growth",
    description:
      "Continuous optimisation of your digital ecosystem — turning every interaction into a measurable business outcome.",
    icon: Zap,
    image: "/services/conversion.png",
    color: "text-gold",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the entire section for desktop
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Create the scroll effect for images
        services.forEach((_, index) => {
          if (index === 0) return; // Skip first image as it's the base

          ScrollTrigger.create({
            trigger: `.service-text-${index}`,
            start: "top 40%",
            end: "top 20%",
            onEnter: () => {
              gsap.to(imageRefs.current[index], {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(imageRefs.current[index], {
                y: "100%",
                opacity: 0,
                duration: 1,
                ease: "expo.inOut",
              });
            },
          });
        });

        // Pin the right side
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: rightSideRef.current,
          pinSpacing: false,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-[#f7f1ea] rounded-[2rem] border border-black/10 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]"
    >
      {/* Background dot pattern with edge fade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10,10,15,0.2) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      </div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Scrolling Content */}
          <div ref={leftSideRef} className="lg:w-1/2 w-full lg:pr-20">
            <div className="lg:py-28 py-16">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-black/10 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-zinc-700 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-700" />
                  </span>
                  <p className="text-zinc-700 text-xs font-semibold tracking-[0.18em] uppercase">
                    Capabilities
                  </p>
                </div>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] uppercase text-foreground">
                  Services <br />
                  <span className="text-gradient italic font-display">Architected</span>
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
                  We don&apos;t deliver services — we engineer compounding growth
                  systems built for market dominance.
                </p>
              </div>

              {services.map((service, index) => (
                <div
                  key={index}
                  className={cn(
                    `service-text-${index} group flex flex-col justify-center border-b border-black/10 last:border-0 py-10 transition-all duration-300 hover:-translate-y-1`,
                    index === 0 ? "lg:min-h-[55vh]" : "lg:min-h-[60vh]",
                  )}
                >
                  {/* Icon + Title on a single horizontal line */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-electric/10 border border-electric/20 ${service.color} transition-all duration-300 group-hover:border-electric/40 group-hover:shadow-[0_10px_30px_-10px_rgba(202, 109, 229,0.5)]`}
                    >
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-gradient uppercase">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-lg mb-0">
                    {service.description}
                  </p>

                  {/* Mobile Image Fallback — fills the outlined box edge-to-edge */}
                  <div className="mt-10 lg:hidden">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-card border border-black/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 0px"
                        className="object-cover"
                      />
                      {/* Subtle gradient veil for text legibility if needed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Sticky Images (Desktop Only) */}
          <div
            ref={rightSideRef}
            className="hidden lg:block lg:w-1/2 h-screen overflow-hidden"
          >
            <div className="relative w-full h-full flex items-center justify-center p-20">
              {/* Gradient border wrapper for premium framing */}
              <div className="relative w-full aspect-square max-w-2xl rounded-[2.5rem] p-px bg-gradient-to-br from-electric/40 via-violet/30 to-cyan/40">
              <div className="relative w-full h-full bg-card rounded-[2.5rem] border border-black/10 overflow-hidden shadow-[0_30px_80px_-20px_rgba(202, 109, 229,0.35)]">
                {services.map((service, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="absolute inset-0 bg-card"
                    style={{
                      zIndex: index,
                      transform: index === 0 ? "none" : "translateY(100%)",
                      opacity: index === 0 ? 1 : 0,
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Gradient veil for depth + consistent tone with the section */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
