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
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Digital Strategy",
    description:
      "Tailored roadmaps designed to align your brand with modern digital trends and exponential growth vectors.",
    icon: Megaphone,
    color: "text-blue-500",
    features: ["Market Research", "Competitor Analysis", "Growth Roadmap", "KPI Framework"],
  },
  {
    title: "Web Development",
    description:
      "High-performance websites built with cutting-edge architectures for seamless UX and conversion dominance.",
    icon: Code2,
    color: "text-purple-500",
    features: ["Next.js Development", "Responsive Design", "Performance Optimization", "API Integration"],
  },
  {
    title: "SEO Optimization",
    description:
      "Strategic search engine precision to drive organic visibility and market-leading domain authority.",
    icon: BarChart3,
    color: "text-green-500",
    features: ["Technical SEO", "On-Page Optimization", "Link Building", "Local SEO"],
  },
  {
    title: "Brand Identity",
    description:
      "Crafting unique visual personas that resonate with high-value audiences and establish trust.",
    icon: Sparkles,
    color: "text-orange-500",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    title: "Market Analysis",
    description:
      "Data-driven competitive intelligence to stay ahead of market shifts and capitalize on opportunities.",
    icon: Globe,
    color: "text-cyan-500",
    features: ["Competitor Research", "Market Trends", "Audience Insights", "Performance Metrics"],
  },
  {
    title: "Conversion Growth",
    description:
      "Optimizing your digital ecosystem to turn every interaction into a measurable business outcome.",
    icon: Zap,
    color: "text-yellow-500",
    features: ["A/B Testing", "CRO Strategy", "Funnel Optimization", "Analytics Setup"],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".service-card-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-foreground rounded-4xl py-28"
    >
      {/* Background dot pattern */}
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
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="services-header mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase text-white">
            Services <span className="text-primary italic">Architected</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            We don&apos;t just provide services; we build high-performance growth
            systems designed for market dominance.
          </p>
        </div>

        {/* Services Grid - cards with icon left, content right */}
        <div className="services-grid grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card-item group flex items-start gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 transition-transform duration-300 group-hover:scale-110",
                  service.color,
                )}
              >
                <service.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold tracking-tight text-primary uppercase mb-3">
                  {service.title}
                </h3>
                <p className="text-white/60 text-base leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 text-xs font-medium rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
