"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is your tech stack?",
        answer: "We are stack-agnostic and select based on project requirements. Common deployments include Jamstack (Next.js/Vercel, Headless WordPress), Laravel for complex applications, and Shopify Plus for e-commerce. We prioritise performance, security, and maintainability.",
    },
    {
        question: "How do you handle data/analytics integration?",
        answer: "We implement via Google Tag Manager with a data layer, ensuring clean, event-driven tracking compatible with GA4, ads platforms, and CRMs. We provide full documentation of the tracking schema.",
    },
    {
        question: "What is included in 'managed hosting'?",
        answer: "Enterprise-grade infrastructure (e.g., AWS, Google Cloud), automated daily backups, SSL/TLS management, CDN configuration, proactive security monitoring, and a 99.9% uptime SLA.",
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".faq-title",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    },
                }
            );
            gsap.fromTo(
                ".faq-item",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section ref={containerRef} className="py-40 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="faq-title mb-20 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 text-electric font-semibold text-xs tracking-[0.18em] uppercase mb-6 border border-electric/20">
                            <HelpCircle className="w-4 h-4" /> Technical FAQ
                        </div>
                        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.05]">
                            ANSWERS FOR <br />
                            <span className="text-gradient italic">TECHNICAL</span> CLIENTS
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                            Clear, considered answers to the questions technical
                            stakeholders ask before partnering with us.
                        </p>
                    </div>

                    <div className="space-y-6" role="list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] hover:border-electric/30 transition-all duration-300"
                                role="listitem"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full p-8 md:p-10 flex items-center justify-between gap-6 text-left focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-inset rounded-3xl"
                                    aria-expanded={activeIndex === index}
                                    aria-controls={`faq-panel-${index}`}
                                    id={`faq-button-${index}`}
                                >
                                    <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground">
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-electric border-electric text-white shadow-[0_0_20px_-4px_rgba(59,130,246,0.7)]' : 'border-white/10 text-white/70'}`} aria-hidden="true">
                                        {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>
                                <div
                                    id={`faq-panel-${index}`}
                                    role="region"
                                    aria-labelledby={`faq-button-${index}`}
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-8 md:p-10 pt-0 text-white/60 text-base md:text-lg leading-relaxed max-w-3xl">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
