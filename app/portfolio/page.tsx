"use client";

import {
  ArrowRight,
  TrendingUp,
  Globe,
  Zap,
  ChevronRight,
  BarChart3,
  Target,
} from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AuroraBackground from "@/components/AuroraBackground";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web Development", "SEO", "Branding", "E-commerce"];

const caseStudies = [
  {
    id: 1,
    title: "TechStart Website Redesign",
    client: "TechStart Ltd",
    category: "Web Development",
    image: "/services/web-dev.png",
    logo: "/services/strategy.png",
    description:
      "Complete website overhaul for a SaaS startup, focusing on conversion optimization and modern design aesthetics.",
    results: [
      { metric: "250%", label: "Increase in Conversions" },
      { metric: "40%", label: "Lower Bounce Rate" },
      { metric: "2.1s", label: "Page Load Time" },
    ],
    tags: ["Next.js", "Tailwind", "GSAP"],
    featured: true,
  },
  {
    id: 2,
    title: "E-commerce SEO Campaign",
    client: "Bloom Boutique",
    category: "SEO",
    image: "/services/seo.png",
    logo: "/services/brand.png",
    description:
      "Comprehensive SEO strategy for a fashion e-commerce brand targeting competitive keywords in the UK market.",
    results: [
      { metric: "#1", label: "Ranking - Main Keyword" },
      { metric: "340%", label: "Organic Traffic Growth" },
      { metric: "180%", label: "Revenue Increase" },
    ],
    tags: ["Technical SEO", "Content Strategy", "Link Building"],
    featured: true,
  },
  {
    id: 3,
    title: "Complete Brand Identity",
    client: "Nexus Solutions",
    category: "Branding",
    image: "/services/brand.png",
    logo: "/services/conversion.png",
    description:
      "Full brand identity creation including logo, color palette, typography, and comprehensive brand guidelines.",
    results: [
      { metric: "95%", label: "Client Satisfaction" },
      { metric: "50+", label: "Brand Assets Created" },
      { metric: "3x", label: "Brand Recognition" },
    ],
    tags: ["Logo Design", "Brand Strategy", "Guidelines"],
    featured: false,
  },
  {
    id: 4,
    title: "GrowthBox PPC Management",
    client: "GrowthBox",
    category: "E-commerce",
    image: "/services/conversion.png",
    logo: "/services/market.png",
    description:
      "Strategic Google Ads and Meta Ads management with continuous optimization and A/B testing.",
    results: [
      { metric: "4.5x", label: "Return on Ad Spend" },
      { metric: "-35%", label: "Cost Per Acquisition" },
      { metric: "£2M+", label: "Revenue Generated" },
    ],
    tags: ["Google Ads", "Meta Ads", "CRO"],
    featured: false,
  },
  {
    id: 5,
    title: "Healthcare Platform SEO",
    client: "MedConnect",
    category: "SEO",
    image: "/services/strategy.png",
    logo: "/services/seo.png",
    description:
      "Local SEO and content strategy for a healthcare appointment booking platform across 20+ cities.",
    results: [
      { metric: "Top 3", label: "Local Pack Rankings" },
      { metric: "500%", label: "Local Traffic Growth" },
      { metric: "15k+", label: "New Patient Bookings" },
    ],
    tags: ["Local SEO", "Content Marketing", "GMB Optimization"],
    featured: false,
  },
  {
    id: 6,
    title: "Restaurant Chain Rebrand",
    client: "Taste Collective",
    category: "Branding",
    image: "/services/market.png",
    logo: "/services/web-dev.png",
    description:
      "Multi-location restaurant brand refresh with new visual identity, menu design, and digital presence.",
    results: [
      { metric: "60%", label: "Social Engagement Up" },
      { metric: "25%", label: "Walk-in Increase" },
      { metric: "12", label: "Locations Rebranded" },
    ],
    tags: ["Visual Identity", "Print Design", "Social Media"],
    featured: false,
  },
];

const processSteps = [
  {
    icon: Target,
    title: "Discovery & Research",
    description:
      "Deep dive into your business, competitors, and target audience.",
  },
  {
    icon: Zap,
    title: "Strategy & Planning",
    description: "Custom roadmap tailored to your specific goals and budget.",
  },
  {
    icon: BarChart3,
    title: "Execution & Optimization",
    description: "Implementation with continuous monitoring and improvements.",
  },
  {
    icon: TrendingUp,
    title: "Results & Growth",
    description: "Data-driven reporting and scaling successful strategies.",
  },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCases =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".portfolio-hero",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
      );

      gsap.fromTo(
        ".case-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cases-grid",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".process-step",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <SmoothScroll>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-background text-foreground selection:bg-electric/30 selection:text-white antialiased overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vw] bg-electric/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[-5%] w-[40vw] h-[40vw] bg-violet/10 rounded-full blur-[120px]" />
        </div>

        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="portfolio-hero relative pt-40 pb-20 px-6">
            <AuroraBackground />
            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 mb-8">
                  <Globe className="w-3 h-3 text-electric" />
                  <p className="text-electric font-bold text-sm tracking-widest uppercase">
                    Our Work
                  </p>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
                  Results That
                  <span className="text-gradient italic ml-2">Speak</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed font-medium">
                  Explore our portfolio of successful projects. Real results for
                  real businesses.
                </p>
              </div>

              {/* Featured Case Study */}
              <div className="mt-20">
                {caseStudies
                  .filter((c) => c.featured)
                  .slice(0, 1)
                  .map((featured) => (
                    <div
                      key={featured.id}
                      className="group relative bg-card border border-white/10 rounded-[3rem] overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-2">
                        {/* Image Side */}
                        <div className="relative h-full bg-linear-to-br from-electric/20 to-violet/20">
                          <Image
                            src={featured.image}
                            alt={featured.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0" />
                        </div>

                        {/* Content Side */}
                        <div className="p-10 lg:p-16 flex flex-col justify-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/20 text-electric text-xs font-bold mb-6 w-fit tracking-wider uppercase">
                            Featured Case Study
                          </div>

                          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            {featured.title}
                          </h2>

                          <p className="text-xl text-electric font-medium mb-4">
                            {featured.client}
                          </p>

                          <p className="text-white/50 text-lg leading-relaxed mb-8">
                            {featured.description}
                          </p>

                          {/* Results */}
                          <div className="grid grid-cols-3 gap-6 mb-10">
                            {featured.results.map((result, idx) => (
                              <div key={idx}>
                                <div className="text-3xl md:text-4xl font-black text-white mb-1">
                                  {result.metric}
                                </div>
                                <div className="text-white/60 text-xs uppercase tracking-wider">
                                  {result.label}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {featured.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Link
                            href={`/portfolio/${featured.id}`}
                            className="inline-flex items-center gap-2 text-electric font-bold group/link"
                          >
                            View Full Case Study
                            <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Filter & Cases Grid */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                      activeCategory === category
                        ? "bg-electric text-white"
                        : "bg-white/5 border border-white/10 text-white/60 hover:border-electric hover:text-electric"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Cases Grid */}
              <div className="cases-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCases.map((caseStudy) => (
                  <div
                    key={caseStudy.id}
                    className="case-card group bg-card border border-white/10 rounded-[2.5rem] overflow-hidden hover:shadow-xl hover:shadow-black/40 hover:border-electric/20 transition-all"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/10">
                          {caseStudy.category}
                        </span>
                      </div>

                      {/* Client Logo */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-card border border-white/10 rounded-xl p-2 shadow-lg shadow-black/40">
                        <Image
                          src={caseStudy.logo}
                          alt={caseStudy.client}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-electric transition-colors">
                        {caseStudy.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-4">
                        {caseStudy.client}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2">
                        {caseStudy.description}
                      </p>

                      {/* Results Preview */}
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                        <div className="text-2xl font-black text-electric">
                          {caseStudy.results[0].metric}
                        </div>
                        <div className="text-xs text-white/60 uppercase tracking-wider">
                          {caseStudy.results[0].label}
                        </div>
                      </div>

                      {/* Tags & Link */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {caseStudy.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/portfolio/${caseStudy.id}`}
                          className="w-10 h-10 bg-electric rounded-full flex items-center justify-center text-white hover:bg-violet transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="process-section py-32 px-6 bg-card">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 text-electric text-xs font-bold mb-6 tracking-widest uppercase">
                  <Zap className="w-3 h-3" />
                  Our Process
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
                  How We Deliver{" "}
                  <span className="text-gradient italic">Results</span>
                </h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                  A proven methodology that consistently drives growth for our
                  clients.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="process-step group p-8 lg:p-6 bg-white/5 border border-white/10 rounded-4xl hover:border-electric/30 hover:bg-white/10 transition-all"
                  >
                    <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                      <step.icon className="w-8 h-8 text-electric" />
                    </div>
                    <div className="text-4xl font-black text-foreground mb-2">
                      0{index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="relative p-12 md:p-20 bg-card border border-white/10 rounded-[3rem] overflow-hidden text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-electric/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
                    Ready to Be Our{" "}
                    <span className="text-gradient italic">Next Success</span>?
                  </h2>
                  <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Let&apos;s discuss how we can achieve similar results for
                    your business.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-4 btn-gradient hover:btn-gradient-hover text-white font-bold rounded-full transition-all active:scale-95"
                    >
                      <span className="shimmer-sweep" />
                      Start Your Project
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all"
                    >
                      View Pricing
                    </Link>
                  </div>
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
