"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Target,
  Zap,
  Users,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AuroraBackground from "@/components/AuroraBackground";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 50, suffix: "+", label: "Projects Delivered", icon: CheckCircle2 },
  { number: 98, suffix: "%", label: "Client Satisfaction", icon: Heart },
  { number: 3, suffix: "x", label: "Average ROI Increase", icon: TrendingUp },
  { number: 24, suffix: "/7", label: "Support Available", icon: Globe },
];

const values = [
  {
    icon: Target,
    title: "Results First",
    description:
      "We measure success by your metrics. Every strategy is engineered for measurable business outcomes, not vanity metrics.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description:
      "We stay ahead of algorithm changes and emerging platforms so you don't have to. Tomorrow's strategies, today.",
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description:
      "We don't do one-off projects. We build long-term relationships that scale with your ambitions.",
  },
  {
    icon: Award,
    title: "Excellence Obsessed",
    description:
      "Good enough isn't in our vocabulary. Every pixel, every line of code, every campaign gets our full expertise.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description:
      "Started as a freelance consultancy helping local businesses navigate post-pandemic digital transformation.",
  },
  {
    year: "2022",
    title: "Team Expansion",
    description:
      "Grew from solo founder to a team of 8 specialists across SEO, development, and creative strategy.",
  },
  {
    year: "2023",
    title: "Enterprise Clients",
    description:
      "Landed first Fortune 500 client and expanded service offerings to include full-scale digital transformation.",
  },
  {
    year: "2024",
    title: "Global Reach",
    description:
      "Opened international operations serving clients across UK, US, and UAE markets with localized strategies.",
  },
  {
    year: "2025",
    title: "AI Integration",
    description:
      "Pioneered AI-driven marketing workflows, reducing campaign setup time by 60% while improving performance.",
  },
];

const team = [
  {
    name: "Sadeed Uddin Salhyonka",
    role: "Founder & CEO",
    bio: "Former Google strategist with 10+ years scaling digital operations for enterprise brands.",
    image: "/team/sadeed-uddin.jpg",
  },
  {
    name: "Muhammad Furqan",
    role: "Head of SEO",
    bio: "Technical SEO expert who has driven 300%+ organic growth for e-commerce brands.",
    image: "/team/furqan.jpg",
  },
  {
    name: "Arslan Ali",
    role: "Creative Director",
    bio: "Award-winning designer passionate about brands that challenge industry norms.",
    image: "/team/arslan.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Client Success",
    bio: "Dedicated to ensuring every client feels like our only client. Results obsessed.",
    image: "/team/emily.jpg",
  },
];

// Individual stat card with counter
const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000 + index * 300;
        const startTime = Date.now();
        const endValue = stat.number;

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.round(easeOut * endValue);
          
          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      },
    });

    return () => trigger.kill();
  }, [stat.number, index]);

  return (
    <div
      ref={cardRef}
      className="stat-card text-center p-8 border border-white/10 rounded-3xl bg-card backdrop-blur-sm group hover:border-electric/30 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-electric/10 border border-electric/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <stat.icon className="w-7 h-7 text-electric" />
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tighter mb-2">
        {count}
        <span className="text-gradient">{stat.suffix}</span>
      </div>
      <div className="text-white/60 text-xs font-semibold tracking-[0.18em] uppercase">{stat.label}</div>
    </div>
  );
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        .fromTo(
          ".about-hero-title",
          { y: 100, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2 }
        )
        .fromTo(
          ".about-hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".about-hero-badge",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      // Values animation
      gsap.fromTo(
        ".value-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%",
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        ".timeline-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
        }
      );

      // Team animation
      gsap.fromTo(
        ".team-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 75%",
          },
        }
      );

      // Mission section parallax
      gsap.fromTo(
        ".mission-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-background text-foreground selection:bg-electric/30 selection:text-white antialiased overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] bg-electric/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vw] bg-violet/10 rounded-full blur-[120px]" />
        </div>

        <Navbar />

        <main>
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative pt-40 pb-20 px-6 min-h-[80vh] flex items-center"
          >
            <AuroraBackground />
            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="about-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-semibold mb-8 tracking-[0.18em] uppercase">
                    <Zap className="w-3 h-3 fill-electric" />
                    Our Story
                  </div>

                  <div className="overflow-hidden mb-2">
                    <h1 className="about-hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase">
                      We Engineer
                    </h1>
                  </div>
                  <div className="overflow-hidden mb-8">
                    <h1 className="about-hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase text-gradient italic">
                      Digital Giants
                    </h1>
                  </div>

                  <p className="about-hero-subtitle text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed font-medium">
                    Krypton Digital is a growth engineering studio —
                    architects obsessed with compounding ambitious businesses
                    into market leaders.
                  </p>
                </div>

                <div className="relative hidden lg:block">
                  <div className="relative aspect-square max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-electric/10 rounded-3xl rotate-6 blur-2xl" />
                    <div className="relative bg-card border border-white/10 rounded-3xl p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                      <Image
                        src="/images/hero/hero_team_collaboration_1769511734235.png"
                        alt="Krypton Digital Team"
                        width={600}
                        height={600}
                        className="object-contain rounded-3xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-24 px-6 bg-card">
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mission-section py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-5xl">
              <div className="mission-content text-center">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 uppercase leading-[0.95]">
                  Our <span className="text-gradient italic">Mission</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
                  To democratise enterprise-grade digital growth for ambitious
                  companies. Every business deserves the strategies, tooling,
                  and talent that Fortune 500s deploy to dominate their
                  markets — and the engineers who know how to wield them.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  {["Transparency", "Innovation", "Partnership", "Results"].map(
                    (word) => (
                      <span
                        key={word}
                        className="px-6 py-3 bg-electric/10 border border-electric/20 rounded-full text-electric font-semibold text-sm tracking-[0.18em] uppercase"
                      >
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section ref={valuesRef} className="py-24 md:py-32 px-6 bg-card">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-semibold mb-6 tracking-[0.18em] uppercase">
                  <Heart className="w-3 h-3" />
                  What Drives Us
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white leading-[0.95]">
                  Our <span className="text-gradient italic">Values</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="value-card group p-10 bg-card border border-white/10 rounded-3xl hover:border-electric/30 hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.3)] transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
                  >
                    <div className="w-16 h-16 bg-electric/10 border border-electric/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-electric/20 transition-colors">
                      <value.icon className="w-8 h-8 text-electric" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section ref={timelineRef} className="py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-semibold mb-6 tracking-[0.18em] uppercase">
                  <TrendingUp className="w-3 h-3" />
                  Our Journey
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.95]">
                  The <span className="text-gradient italic">Timeline</span>
                </h2>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric/40 via-violet/30 to-transparent md:-translate-x-1/2" />

                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`timeline-item relative flex items-start gap-8 mb-16 last:mb-0 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-background shadow-[0_0_20px_-2px_rgba(59,130,246,0.7)] md:-translate-x-1/2 mt-2 z-10 bg-gradient-to-br from-electric to-violet" />

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                        index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <span className="font-display text-electric font-bold text-lg tracking-[0.18em]">
                        {milestone.year}
                      </span>
                      <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section ref={teamRef} className="py-24 md:py-32 px-6 bg-card">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-semibold mb-6 tracking-[0.18em] uppercase">
                  <Users className="w-3 h-3" />
                  The Team
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white mb-6 leading-[0.95]">
                  Meet The <span className="text-gradient italic">Experts</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                  A senior team of strategists, creatives, and engineers —
                  each obsessed with compounding your growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="team-card group text-center hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] group-hover:border-electric/30 group-hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.3)] transition-all duration-300">
                      <div className="aspect-square bg-muted relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-electric/10 to-transparent" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-electric font-medium text-sm mb-3 tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 md:py-32 px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="relative p-12 md:p-20 bg-card rounded-3xl overflow-hidden text-center border border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-electric/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 uppercase leading-[0.95]">
                    Ready To Join{" "}
                    <span className="text-gradient italic">Forces?</span>
                  </h2>
                  <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Let&apos;s architect the next phase of your growth — and
                    engineer something the market won&apos;t forget.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-4 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-full transition-all active:scale-95"
                    >
                      <span className="shimmer-sweep" />
                      <span className="uppercase tracking-[0.12em] text-sm">Start A Project</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 rounded-full font-semibold transition-all"
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
