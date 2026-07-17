"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
            <div className="relative min-h-screen selection:bg-primary selection:text-white antialiased">
                <Navbar />

                <main ref={containerRef} className="pt-40 pb-32 px-6">
                    <div className="container mx-auto max-w-7xl">
                        {/* Header */}
                        <div className="partner-header text-center mb-24 max-w-4xl mx-auto">
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase leading-none">
                                PARTNER <br />
                                <span className="text-primary italic">PROGRAMME</span>
                            </h1>
                            <p className="text-xl text-muted leading-relaxed mb-12">
                                Scale your technical capabilities through our specialised partner ecosystem.
                                We provide enterprise-grade infrastructure and developer expertise to accelerate your client deliveries.
                            </p>
                            <Link
                                href="#apply"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all active:scale-95 shadow-lg shadow-primary/20"
                            >
                                APPLY FOR PARTNER ACCESS <ArrowRight className="w-5 h-5" />
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
                                <div key={i} className="partner-content p-10 bg-foreground/[0.03] border border-foreground/10 rounded-[3rem] hover:border-primary/50 transition-colors group">
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                                        <item.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-muted leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Datasheet Download */}
                        <div className="partner-content mb-32 p-12 bg-foreground/5 border border-primary/20 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4">Programme Technical Overview</h2>
                                <p className="text-muted text-lg max-w-xl">
                                    Download our detailed datasheet covering technical specifications, referral structures, and integration parameters.
                                </p>
                            </div>
                            <button className="relative z-10 inline-flex items-center gap-3 px-8 py-5 bg-foreground text-background font-bold rounded-full hover:bg-primary hover:text-white transition-all">
                                <FileDown className="w-6 h-6" /> DOWNLOAD DATASHEET (PDF)
                            </button>
                        </div>

                        {/* Gated Application Form */}
                        <div id="apply" className="partner-content max-w-4xl mx-auto">
                            <div className="bg-foreground/[0.03] border border-foreground/10 rounded-[4rem] p-12 md:p-20">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold mb-6">Partner Application</h2>
                                    <p className="text-muted text-lg">
                                        Qualified technical partners only. Please provide your agency or consultancy details for technical vetting.
                                    </p>
                                </div>

                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold uppercase tracking-widest text-muted">Company Name</label>
                                            <input type="text" className="w-full bg-background border border-foreground/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Technical Solutions Ltd" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold uppercase tracking-widest text-muted">Website URL</label>
                                            <input type="url" className="w-full bg-background border border-foreground/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors" placeholder="https://" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold uppercase tracking-widest text-muted">Contact Name</label>
                                            <input type="text" className="w-full bg-background border border-foreground/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold uppercase tracking-widest text-muted">Business Email</label>
                                            <input type="email" className="w-full bg-background border border-foreground/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors" placeholder="name@company.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold uppercase tracking-widest text-muted">Technical Specialism</label>
                                        <select className="w-full bg-background border border-foreground/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors appearance-none">
                                            <option>E-commerce (Shopify/Laravel)</option>
                                            <option>Performance Marketing Agency</option>
                                            <option>Brand & Creative Consultancy</option>
                                            <option>SaaS Development</option>
                                            <option>Other technical service</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold uppercase tracking-widest text-muted">Proposed Partnership Focus</label>
                                        <textarea rows={4} className="w-full bg-background border border-foreground/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors" placeholder="Briefly outline your technical project requirements..."></textarea>
                                    </div>
                                    <button className="w-full py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all active:scale-95 flex items-center justify-center gap-3">
                                        APPLY FOR PARTNER ACCESS <Send className="w-5 h-5" />
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
