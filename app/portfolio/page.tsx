"use client";

import {
  ArrowRight,
  TrendingUp,
  Globe,
  Zap,
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
    projectUrl: "https://tradelink-sooty.vercel.app/",
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
    projectUrl: "https://www.signaturestitchs.com",
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
    projectUrl: "https://mydollarstore.vercel.app/",
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
    projectUrl: "https://chohan-s-style-dsaa.vercel.app/",
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
    projectUrl: "https://islamabadoptical.vercel.app/",
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
    projectUrl: "https://foodexpresslalkurti.vercel.app/",
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
        className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vw] bg-zinc-300/30 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[-5%] w-[40vw] h-[40vw] bg-zinc-400/25 rounded-full blur-[120px]" />
        </div>

        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="portfolio-hero relative pt-40 pb-20 px-6">
            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-[#281000]/20 mb-8">
                  <Globe className="w-3 h-3 text-zinc-700" />
                  <p className="text-zinc-700 font-semibold text-xs tracking-[0.18em] uppercase">
                    Our Work
                  </p>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 uppercase leading-[0.9]">
                  Work That{" "}
                  <span className="text-primary italic">Compounds</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                  A portfolio engineered into market leadership — real
                  campaigns, real architecture, real growth.
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
                      className="group relative bg-white border border-[#281000]/20 rounded-3xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)] hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.25)] transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300"
                    >
                      <div className="grid lg:grid-cols-2">
                        {/* Image Side */}
                        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-linear-to-br from-primary/20 to-primary/10 overflow-hidden">
                          <Image
                            src={featured.image}
                            alt={featured.title}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                        </div>

                        {/* Content Side */}
                        <div className="p-10 lg:p-16 flex flex-col justify-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold mb-6 w-fit border border-[#281000]/20 tracking-[0.18em] uppercase">
                            Featured Case Study
                          </div>

                          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-[1.05]">
                            {featured.title}
                          </h2>

                          <p className="text-xl text-primary font-medium mb-4">
                            {featured.client}
                          </p>

                          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            {featured.description}
                          </p>

                          {/* Results */}
                          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10">
                            {featured.results.map((result, idx) => (
                              <div key={idx} className="min-w-0">
                                <div className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                                  {result.metric}
                                </div>
                                <div className="text-muted-foreground text-[0.6rem] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.18em] leading-tight">
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
                                className="px-4 py-2 bg-black/5 border border-[#281000]/20 text-foreground/80 text-sm font-medium rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* View Project Button */}
                          {featured.projectUrl && (
                            <a
                              href={featured.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary rounded-full text-white text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform,opacity] active:scale-95 hover:bg-primary/90 overflow-hidden"
                            >
                              <span className="relative z-10 uppercase tracking-[0.12em]">
                                View Project
                              </span>
                              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </a>
                          )}

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
                    className={`px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-[color,background-color,border-color,box-shadow,transform,opacity] ${
                      activeCategory === category
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-black/5 border border-[#281000]/20 text-muted-foreground hover:border-primary hover:text-primary"
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
                    className="case-card group bg-white border border-[#281000]/20 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.25)] hover:border-primary/30 hover:-translate-y-1 transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/10 tracking-wide">
                          {caseStudy.category}
                        </span>
                      </div>

                      {/* Client Logo */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white border border-[#281000]/20 rounded-xl p-2 shadow-lg shadow-black/10">
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
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {caseStudy.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4">
                        {caseStudy.client}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                        {caseStudy.description}
                      </p>

                      {/* Results Preview */}
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#281000]/20">
                        <div className="text-2xl font-bold text-primary">
                          {caseStudy.results[0].metric}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-[0.18em]">
                          {caseStudy.results[0].label}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {caseStudy.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-black/5 text-muted-foreground text-xs rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Project Button */}
                      {caseStudy.projectUrl && (
                        <a
                          href={caseStudy.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary rounded-full text-white text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform,opacity] active:scale-95 hover:bg-primary/90 overflow-hidden"
                        >
                          <span className="relative z-10 uppercase tracking-[0.1em]">
                            View Project
                          </span>
                          <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="process-section py-24 md:py-32 px-6 bg-card">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-[#281000]/20 text-zinc-700 text-xs font-semibold mb-6 tracking-[0.18em] uppercase">
                  <Zap className="w-3 h-3" />
                  Our Process
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 uppercase leading-[0.95]">
                  How We Deliver{" "}
                  <span className="text-primary italic">Results</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  A proven methodology engineered to compound growth for every
                  client we partner with.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="process-step group p-8 lg:p-6 bg-black/5 border border-[#281000]/20 rounded-3xl hover:border-primary/30 hover:bg-black/10 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.25)] transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300"
                  >
                    <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      0{index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="relative p-12 md:p-20 bg-white border border-[#281000]/20 rounded-3xl overflow-hidden text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-zinc-400/35 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 uppercase leading-[0.95]">
                    Ready to Be Our{" "}
                    <span className="text-primary italic">Next Success</span>?
                  </h2>
                  <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Let&apos;s architect the same compounding results for your
                    business.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-[color,background-color,border-color,box-shadow,transform,opacity] active:scale-95"
                    >
                      <span className="uppercase tracking-[0.12em] text-sm">Start Your Project</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-black/15 text-zinc-700 hover:text-foreground hover:border-black/30 hover:bg-black/5 rounded-full font-semibold transition-[color,background-color,border-color,box-shadow,transform,opacity]"
                    >
                      <span className="uppercase tracking-[0.12em] text-sm">View Pricing</span>
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
