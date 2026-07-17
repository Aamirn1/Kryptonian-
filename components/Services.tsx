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
      "Tailored roadmaps designed to align your brand with modern digital trends and exponential growth vectors.",
    icon: Megaphone,
    image: "/services/strategy.png",
    color: "text-blue-500",
  },
  {
    title: "Web Development",
    description:
      "High-performance websites built with cutting-edge architectures for seamless UX and conversion dominance.",
    icon: Code2,
    image: "/services/web-dev.png",
    color: "text-purple-500",
  },
  {
    title: "SEO Optimization",
    description:
      "Strategic search engine precision to drive organic visibility and market-leading domain authority.",
    icon: BarChart3,
    image: "/services/seo.png",
    color: "text-green-500",
  },
  {
    title: "Brand Identity",
    description:
      "Crafting unique visual personas that resonate with high-value audiences and establish trust.",
    icon: Sparkles,
    image: "/services/brand.png",
    color: "text-orange-500",
  },
  {
    title: "Market Analysis",
    description:
      "Data-driven competitive intelligence to stay ahead of market shifts and capitalize on opportunities.",
    icon: Globe,
    image: "/services/market.png",
    color: "text-cyan-500",
  },
  {
    title: "Conversion Growth",
    description:
      "Optimizing your digital ecosystem to turn every interaction into a measurable business outcome.",
    icon: Zap,
    image: "/services/conversion.png",
    color: "text-yellow-500",
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
      className="relative bg-foreground rounded-4xl"
    >
      {/* Background dot pattern with edge fade + primary glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-4xl">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full blur-[120px] opacity-25"
          style={{ background: "#cb6be6" }}
        />
      </div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Scrolling Content */}
          <div ref={leftSideRef} className="lg:w-1/2 w-full lg:pr-20">
            <div className="lg:py-28 py-16">
              <div className="mb-12">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.8] uppercase text-white">
                  Services <br />
                  <span className="text-primary italic">Architected</span>
                </h2>
                <p className="text-white text-xl max-w-xl font-medium">
                  We don&apos;t just provide services; we build high-performance
                  growth systems designed for market dominance.
                </p>
              </div>

              {services.map((service, index) => (
                <div
                  key={index}
                  className={cn(
                    `service-text-${index} flex flex-col justify-center border-b border-primary last:border-0 py-10`,
                    index === 0 ? "lg:min-h-[55vh]" : "lg:min-h-[60vh]",
                  )}
                >
                  <div
                    className={`p-4 rounded-2xl bg-zinc-50 w-fit mb-8 ${service.color}`}
                  >
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-primary uppercase">
                    {service.title}
                  </h3>
                  <p className="text-white text-xl leading-relaxed max-w-lg mb-0">
                    {service.description}
                  </p>

                  {/* Mobile Mobile Image Fallback */}
                  <div className="mt-12 lg:hidden">
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-zinc-50 border border-zinc-100 p-8">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={600}
                        height={600}
                        className="object-contain"
                      />
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
              <div className="relative w-full aspect-square max-w-2xl bg-zinc-50/50 rounded-4xl border border-primary overflow-hidden shadow-2xl shadow-primary/5">
                {services.map((service, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-primary"
                    style={{
                      zIndex: index,
                      transform: index === 0 ? "none" : "translateY(100%)",
                      opacity: index === 0 ? 1 : 0,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
