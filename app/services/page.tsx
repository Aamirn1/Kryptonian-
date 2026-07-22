"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Megaphone,
  Code2,
  BarChart3,
  Globe,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Digital Strategy",
    description:
      "Tailored roadmaps designed to align your brand with modern digital trends and exponential growth vectors.",
    icon: Megaphone,
    image: "/services/strategy.png",
    features: ["Market Research", "Competitor Analysis", "Growth Roadmap", "KPI Framework"],
  },
  {
    title: "Web Development",
    description:
      "High-performance websites built with cutting-edge architectures for seamless UX and conversion dominance.",
    icon: Code2,
    image: "/services/web-dev.png",
    features: ["Next.js Development", "Responsive Design", "Performance Optimization", "API Integration"],
  },
  {
    title: "SEO Optimization",
    description:
      "Strategic search engine precision to drive organic visibility and market-leading domain authority.",
    icon: BarChart3,
    image: "/services/seo.png",
    features: ["Technical SEO", "On-Page Optimization", "Link Building", "Local SEO"],
  },
  {
    title: "Brand Identity",
    description:
      "Crafting unique visual personas that resonate with high-value audiences and establish trust.",
    icon: Sparkles,
    image: "/services/brand.png",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    title: "Market Analysis",
    description:
      "Data-driven competitive intelligence to stay ahead of market shifts and capitalize on opportunities.",
    icon: Globe,
    image: "/services/market.png",
    features: ["Competitor Research", "Market Trends", "Audience Insights", "Performance Metrics"],
  },
  {
    title: "Conversion Growth",
    description:
      "Optimizing your digital ecosystem to turn every interaction into a measurable business outcome.",
    icon: Zap,
    image: "/services/conversion.png",
    features: ["A/B Testing", "CRO Strategy", "Funnel Optimization", "Analytics Setup"],
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
      );

      gsap.fromTo(
        ".service-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased overflow-hidden">
        <Navbar />

        <main ref={containerRef} className="pt-40 pb-32">
          {/* Hero */}
          <section className="px-6 mb-20">
            <div className="container mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <p className="text-primary font-bold text-sm">What We Do</p>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
                Our <span className="text-primary italic">Services</span>
              </h1>
              <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">
                We don&apos;t just provide services — we engineer compounding growth systems built for market dominance.
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="service-card group bg-white border border-[#cb6ce6]/30 rounded-[2rem] overflow-hidden hover:shadow-xl hover:shadow-black/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                          <service.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-[#281000] uppercase">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-zinc-500 text-base leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-[#281000] font-semibold text-sm hover:gap-3 transition-all"
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 mt-32">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-foreground border border-[#cb6ce6]/30 rounded-[3rem] p-12 md:p-20 text-center shadow-lg shadow-black/20 relative overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-white">
                  Ready to <span className="text-primary italic">Scale?</span>
                </h2>
                <p className="text-white text-lg mb-8 max-w-xl mx-auto">
                  Let&apos;s engineer your next chapter of growth. Initiate scoping today.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all active:scale-95"
                >
                  <span className="uppercase tracking-widest text-sm">Initiate Scoping</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
