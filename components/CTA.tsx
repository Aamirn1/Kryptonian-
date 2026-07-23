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
        <section className="px-6 mt-32 bg-background">
            <div ref={containerRef} className="container mx-auto max-w-4xl">
                <div
                    ref={contentRef}
                    className="bg-foreground border border-primary/30 rounded-[3rem] p-12 md:p-20 text-center shadow-lg shadow-black/20 relative overflow-hidden"
                >
                    {/* Background Decorative Elements */}
                    <div
                        ref={glowRef}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40"
                    />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8 border border-primary/20">
                            <Zap className="w-4 h-4 fill-primary" /> READY TO ACCELERATE?
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight text-white uppercase">
                            LET&apos;S BUILD THE <br />
                            <span className="text-primary italic">FUTURE</span> TOGETHER
                        </h2>

                        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                            Transform your digital vision into a market-leading reality with our expert team. Your growth starts here.
                        </p>

                        <Link
                            href="/pricing"
                            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all active:scale-95 mx-auto"
                        >
                            <span className="uppercase tracking-widest text-sm">
                                Initialize Project Scoping
                            </span>
                            <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
