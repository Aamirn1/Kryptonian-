"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

// Card stack positions: index 0 = front (bottom), 1 = middle, 2 = back (top peek)
const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

const exitAnimation = {
  y: 360,
  scale: 1,
  zIndex: 10,
};

const enterAnimation = {
  y: -16,
  scale: 0.9,
};

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

function AnimatedCard({
  testimonial,
  index,
  isAnimating,
  onClick,
}: {
  testimonial: Testimonial;
  index: number;
  isAnimating: boolean;
  onClick?: () => void;
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2];
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index;

  const exitAnim = index === 0 ? exitAnimation : undefined;
  const initialAnim = index === 2 ? enterAnimation : undefined;

  return (
    <motion.div
      key={testimonial.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      onClick={onClick}
      className="absolute flex h-[360px] w-[324px] sm:w-[480px] items-stretch justify-center overflow-hidden rounded-t-[2rem] rounded-b-3xl border border-[#cb6be6]/30 bg-white p-1 shadow-lg shadow-zinc-200/40 will-change-transform cursor-pointer hover:border-primary/50 transition-colors"
    >
      <CardContent testimonial={testimonial} />
    </motion.div>
  );
}

export default function AnimatedCardStack({
  testimonials,
  onCardClick,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
}: AnimatedCardStackProps) {
  const [cards, setCards] = useState<Testimonial[]>(testimonials.slice(0, 3));
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextIndex, setNextIndex] = useState(testimonials.length > 3 ? 3 : 0);
  const [paused, setPaused] = useState(false);

  const handleAnimate = useCallback(() => {
    setIsAnimating(true);

    setCards((prev) => {
      const nextTestimonial = testimonials[nextIndex % testimonials.length];
      return [...prev.slice(1), nextTestimonial];
    });
    setNextIndex((prev) => (prev + 1) % testimonials.length);
    setIsAnimating(false);
  }, [testimonials, nextIndex]);

  // Auto-advance
  useEffect(() => {
    if (!autoAdvance || paused || testimonials.length <= 1) return;
    const timer = setInterval(handleAnimate, autoAdvanceInterval);
    return () => clearInterval(timer);
  }, [autoAdvance, paused, autoAdvanceInterval, handleAnimate, testimonials.length]);

  return (
    <div
      className="flex w-full flex-col items-center justify-center pt-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[420px] w-full overflow-hidden sm:w-[644px]">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((testimonial, index) => (
            <AnimatedCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isAnimating={isAnimating}
              onClick={() => onCardClick?.(testimonial)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-border py-4">
        <button
          onClick={handleAnimate}
          className="flex h-10 cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-full border border-[#cb6be6]/30 bg-white px-6 font-semibold text-foreground transition-all hover:bg-primary hover:text-white hover:border-primary active:scale-[0.98]"
        >
          Next Story
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
