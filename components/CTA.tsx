import { MoveRight, Zap } from "lucide-react";
import Link from "next/link";

/**
 * CTA — "LET'S ENGINEER YOUR NEXT CHAPTER OF GROWTH" section.
 *
 * No GSAP animations (removed to eliminate load lag). The section renders
 * instantly with static CSS only. The visual design is identical.
 */
export default function CTA() {
    return (
        <section
            className="py-28 relative overflow-hidden bg-[#f7f1ea]"
        >
            {/* Background Decorative Elements (static, no animation) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-400/35 rounded-full blur-[120px] pointer-events-none opacity-40" />

            <div className="container mx-auto px-6 relative z-10">
                <div
                    className="max-w-5xl mx-auto bg-card border border-black/10 rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-sm relative overflow-hidden group hover:border-electric/30 transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-500 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)]"
                >
                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                    {/* Top gradient accent line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
                    {/* Inner aurora wash */}
                    <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-violet/5 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-zinc-700 font-semibold text-xs tracking-[0.18em] uppercase mb-8 border border-black/10">
                            <Zap className="w-4 h-4 fill-electric" /> Ready to Accelerate?
                        </div>

                        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] text-foreground">
                            LET&apos;S ENGINEER YOUR <br />
                            <span className="text-gradient italic">NEXT CHAPTER</span> OF GROWTH
                        </h2>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                            Transform your digital vision into a market-leading reality with our senior team. Your next chapter of compounding growth starts here.
                        </p>

                        <Link
                            href="/pricing"
                            className="group relative inline-flex items-center gap-4 px-10 py-5 btn-gradient text-white font-semibold rounded-full overflow-hidden transition-[color,background-color,border-color,box-shadow,transform,opacity] hover:btn-gradient-hover active:scale-95 mx-auto"
                        >
                            <span className="relative z-10 uppercase tracking-[0.12em] text-sm transition-colors group-hover:text-white">
                                Order Now
                            </span>
                            <MoveRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-2 group-hover:text-white" />
                            <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform group-hover:translate-y-0" />
                            <span className="shimmer-sweep" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
