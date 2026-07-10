"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import { ShieldCheck, Users, Briefcase, FileDown, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PartnerProgrammePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            tl.fromTo(
                ".partner-header",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, delay: 0.3 }
            ).fromTo(
                ".partner-content",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
                "-=0.8"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <SmoothScroll>
            <div className="relative min-h-screen bg-background text-foreground selection:bg-electric/25 selection:text-foreground antialiased overflow-hidden">
                <AuroraBackground />
                <Navbar />

                <main ref={containerRef} className="relative z-10 pt-40 pb-32 px-6">
                    <div className="container mx-auto max-w-7xl">
                        {/* Header */}
                        <div className="partner-header text-center mb-24 max-w-4xl mx-auto">
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 uppercase leading-[0.9]">
                                PARTNER <br />
                                <span className="text-gradient italic">PROGRAMME</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                                Scale your technical capabilities through our specialised partner ecosystem.
                                We provide enterprise-grade infrastructure and developer expertise to accelerate your client deliveries.
                            </p>
                            <Link
                                href="#apply"
                                className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-full transition-all active:scale-95"
                            >
                                <span className="shimmer-sweep" />
                                <span className="uppercase tracking-[0.12em] text-sm">Apply for Partner Access</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Programme Pillars */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                            {[
                                {
                                    title: "Technical Synergy",
                                    desc: "Access our stack-agnostic expertise in Jamstack, Laravel, and Shopify Plus for complex project requirements.",
                                    icon: Briefcase,
                                },
                                {
                                    title: "Infrastructure SLA",
                                    desc: "Deploy on our enterprise AWS/Google Cloud managed architecture with guaranteed 99.9% uptime and proactive monitoring.",
                                    icon: ShieldCheck,
                                },
                                {
                                    title: "Strategic Growth",
                                    desc: "Leverage our data-driven growth strategies and technical audits to increase client retention and project value.",
                                    icon: Users,
                                },
                            ].map((item, i) => (
                                <div key={i} className="partner-content group p-10 bg-white border border-black/10 rounded-3xl hover:border-electric/50 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.25)] transition-all duration-300 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
                                    <div className="w-14 h-14 bg-electric/10 border border-electric/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-electric/20 transition-colors">
                                        <item.icon className="w-7 h-7 text-electric" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Datasheet Download */}
                        <div className="partner-content mb-32 p-12 bg-electric/5 border border-electric/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_10px_40px_-15px_rgba(202, 109, 229,0.2)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-electric/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4 tracking-tight">Programme Technical Overview</h2>
                                <p className="text-muted-foreground text-lg max-w-xl">
                                    Download our detailed datasheet covering technical specifications, referral structures, and integration parameters.
                                </p>
                            </div>
                            <button className="group relative overflow-hidden z-10 inline-flex items-center gap-3 px-8 py-5 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-full transition-all">
                                <span className="shimmer-sweep" />
                                <FileDown className="w-6 h-6" />
                                <span className="uppercase tracking-[0.12em] text-sm">Download Datasheet (PDF)</span>
                            </button>
                        </div>

                        {/* Gated Application Form */}
                        <div id="apply" className="partner-content max-w-4xl mx-auto">
                            <div className="bg-white border border-black/10 rounded-3xl p-12 md:p-20 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold mb-6 tracking-tight leading-[1.05]">Partner Application</h2>
                                    <p className="text-muted-foreground text-lg">
                                        Qualified technical partners only. Please provide your agency or consultancy details for technical vetting.
                                    </p>
                                </div>

                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Company Name</label>
                                            <input type="text" className="w-full bg-white border border-black/10 rounded-2xl p-4 focus:outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric transition-colors text-foreground placeholder:text-zinc-400" placeholder="e.g. Technical Solutions Ltd" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Website URL</label>
                                            <input type="url" className="w-full bg-white border border-black/10 rounded-2xl p-4 focus:outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric transition-colors text-foreground placeholder:text-zinc-400" placeholder="https://" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Contact Name</label>
                                            <input type="text" className="w-full bg-white border border-black/10 rounded-2xl p-4 focus:outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric transition-colors text-foreground placeholder:text-zinc-400" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Business Email</label>
                                            <input type="email" className="w-full bg-white border border-black/10 rounded-2xl p-4 focus:outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric transition-colors text-foreground placeholder:text-zinc-400" placeholder="name@company.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Technical Specialism</label>
                                        <select className="w-full bg-white border border-black/10 rounded-2xl p-4 focus:outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric transition-colors appearance-none text-foreground">
                                            <option>E-commerce (Shopify/Laravel)</option>
                                            <option>Performance Marketing Agency</option>
                                            <option>Brand & Creative Consultancy</option>
                                            <option>SaaS Development</option>
                                            <option>Other technical service</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Proposed Partnership Focus</label>
                                        <textarea rows={4} className="w-full bg-white border border-black/10 rounded-2xl p-4 focus:outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric transition-colors text-foreground placeholder:text-zinc-400 resize-y" placeholder="Briefly outline your technical project requirements..."></textarea>
                                    </div>
                                    <button className="group relative overflow-hidden w-full py-5 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-electric/10 uppercase tracking-[0.12em] text-xs">
                                        <span className="shimmer-sweep" />
                                        <span className="relative z-10">Apply for Partner Access</span>
                                        <Send className="w-5 h-5 relative z-10" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    );
}
