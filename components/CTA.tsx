"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, Zap } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation
            gsap.fromTo(
                contentRef.current,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Pulse animation for the glow
            gsap.to(glowRef.current, {
                scale: 1.2,
                opacity: 0.6,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="py-28 relative overflow-hidden"
        >
            {/* Background Decorative Elements */}
            <div
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/20 rounded-full blur-[120px] pointer-events-none opacity-40"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div
                    ref={contentRef}
                    className="max-w-5xl mx-auto bg-card border border-white/10 rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-sm relative overflow-hidden group hover:border-electric/30 transition-colors duration-500"
                >
                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 text-electric font-bold text-sm mb-8 border border-electric/20">
                            <Zap className="w-4 h-4 fill-electric" /> READY TO ACCELERATE?
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-tight text-foreground">
                            LET&apos;S BUILD THE <br />
                            <span className="text-gradient italic">FUTURE</span> TOGETHER
                        </h2>

                        <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
                            Transform your digital vision into a market-leading reality with our expert team. Your growth starts here.
                        </p>

                        <Link
                            href="/pricing"
                            className="group relative inline-flex items-center gap-4 px-10 py-5 btn-gradient text-white font-bold rounded-full overflow-hidden transition-all hover:btn-gradient-hover active:scale-95 mx-auto"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-white">
                                INITIATE PROJECT SCOPING
                            </span>
                            <MoveRight className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2 group-hover:text-white" />
                            <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform group-hover:translate-y-0" />
                            <span className="shimmer-sweep" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
