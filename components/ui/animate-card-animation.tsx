"use client";

import { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Quote, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

interface AnimatedCardStackProps {
  testimonials: Testimonial[];
  onCardClick?: (testimonial: Testimonial) => void;
}

const GAP = 32; // px between cards (matches flex gap-8)

function CardContent({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-6">
      {/* Quote icon + rating */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
          <Quote className="w-6 h-6 text-primary" />
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < testimonial.rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-zinc-300"
              )}
            />
          ))}
        </div>
      </div>

      {/* Testimonial content */}
      <p className="text-zinc-600 text-base leading-relaxed flex-1 line-clamp-4">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Name + role */}
      <div className="flex items-center justify-between gap-2 pt-4 border-t border-zinc-100">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-bold text-foreground">
            {testimonial.name}
          </span>
          <span className="text-muted-foreground text-sm truncate">
            {testimonial.role}
          </span>
        </div>
        <div className="flex h-10 shrink-0 items-center gap-0.5 rounded-full bg-primary pl-4 pr-3 text-sm font-medium text-white">
          Read
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default function AnimatedCardStack({
  testimonials,
  onCardClick,
}: AnimatedCardStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const uniqueCount = testimonials.length;
  // Duplicate the set once so the loop endpoint looks identical to the start.
  const loopCards = [...testimonials, ...testimonials];

  // Measured layout values (re-measured on resize).
  const [step, setStep] = useState(472); // cardWidth + GAP (default 440+32)
  const [vpWidth, setVpWidth] = useState(1024);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll progress for a buttery feel.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Measure the actual per-card step (width + gap) and viewport width so the
  // centering math stays correct across breakpoints.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (track && track.children.length >= 2) {
        const a = track.children[0] as HTMLElement;
        const b = track.children[1] as HTMLElement;
        setStep(b.offsetLeft - a.offsetLeft);
      }
      if (vp) setVpWidth(vp.offsetWidth);
    };
    measure();
    // Re-measure shortly after mount (fonts/images can shift layout) + on resize.
    const t = window.setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Center card[0] at scroll 0: translate track so card[0]'s left edge sits
  // at (viewportWidth - cardWidth) / 2. Then move left by one card-step per
  // unique card. End point centers the first duplicate (== card[0]) for a
  // seamless circular finish.
  const cardWidth = step - GAP;
  const startX = (vpWidth - cardWidth) / 2;
  const endX = startX - uniqueCount * step;
  const x = useTransform(smoothProgress, [0, 1], [startX, endX]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${(uniqueCount + 1) * 60}vh` }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen flex items-center overflow-hidden"
      >
        {/* Soft side fades so half-hidden cards melt into the background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-[#fafafa] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-[#fafafa] to-transparent" />

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-8 will-change-transform"
        >
          {loopCards.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              onClick={() => onCardClick?.(t)}
              className="shrink-0 w-[280px] sm:w-[440px] h-[360px] flex items-stretch justify-center overflow-hidden rounded-[2rem] border border-[#cb6ce6]/30 bg-white shadow-lg shadow-zinc-200/40 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <CardContent testimonial={t} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
