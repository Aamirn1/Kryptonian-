"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
};

export type CardStackProps = {
  items: Testimonial[];
  initialIndex?: number;
  maxVisible?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: Testimonial) => void;
  onCardClick?: (item: Testimonial) => void;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

/** Testimonial card content rendered inside the fan card. */
function TestimonialCardContent({
  item,
  active,
}: {
  item: Testimonial;
  active: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col gap-3 p-5 sm:p-6 bg-white">
      {/* Quote icon + rating */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
          <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3.5 h-3.5 sm:w-4 sm:h-4",
                i < item.rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-zinc-300"
              )}
            />
          ))}
        </div>
      </div>

      {/* Testimonial content */}
      <p
        className={cn(
          "text-zinc-600 leading-relaxed flex-1 overflow-hidden",
          "text-sm sm:text-base",
          active ? "line-clamp-4" : "line-clamp-2"
        )}
      >
        &ldquo;{item.content}&rdquo;
      </p>

      {/* Name + role */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-bold text-foreground text-sm sm:text-base">
            {item.name}
          </span>
          <span className="text-muted-foreground text-xs sm:text-sm truncate">
            {item.role}
          </span>
        </div>
        <div className="flex h-9 shrink-0 items-center gap-0.5 rounded-full bg-primary pl-3 pr-2 text-xs font-medium text-white">
          Read
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

export function CardStack({
  items,
  initialIndex = 0,
  maxVisible = 5,
  overlap = 0.5,
  spreadDeg = 40,
  perspectivePx = 1100,
  depthPx = 120,
  tiltXDeg = 10,
  activeLiftPx = 18,
  activeScale = 1.03,
  inactiveScale = 0.92,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = true,
  intervalMs = 4000,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  onCardClick,
}: CardStackProps) {
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);
  // Responsive card dimensions measured from container width.
  const [cardSize, setCardSize] = React.useState({ width: 440, height: 300 });

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Measure container to compute responsive card size.
  React.useLayoutEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.offsetWidth;
      // Card width: ~85% of a mobile viewport, capped for desktop.
      // On small screens show nearly full-width; on desktop ~440px.
      const width = Math.min(440, Math.max(260, cw * 0.82));
      const height = Math.round(width * 0.7); // ~7:10 aspect
      setCardSize({ width: Math.round(width), height });
    };
    measure();
    const t = window.setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { width: cardWidth, height: cardHeight } = cardSize;

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // Autoplay
  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return;
    if (pauseOnHover && hovering) return;
    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(700, intervalMs)
    );
    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  return (
    <div
      ref={containerRef}
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full outline-none"
        style={{ height: Math.max(340, cardHeight + 90) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* Spotlight washes */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/5 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;
              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: React.MouseEvent | React.TouchEvent | PointerEvent,
                      info: {
                        offset: { x: number };
                        velocity: { x: number };
                      }
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(
                        160,
                        cardWidth * 0.22
                      );
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-2xl border-2 border-[#cb6ce6]/20 overflow-hidden shadow-xl shadow-zinc-200/40",
                    "will-change-transform select-none",
                    isActive
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-pointer"
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 40,
                          x,
                          rotateZ,
                          rotateX,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => {
                    if (!isActive) {
                      setActive(i);
                    } else {
                      onCardClick?.(item);
                    }
                  }}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <TestimonialCardContent item={item} active={isActive} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots navigation */}
      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    on
                      ? "bg-primary w-6"
                      : "bg-foreground/20 hover:bg-foreground/40"
                  )}
                  aria-label={`Go to ${it.name}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Prev / Next buttons (mobile-friendly) */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          disabled={!canGoPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cb6ce6]/30 bg-white text-foreground transition-all hover:bg-primary hover:text-white hover:border-primary active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous testimonial"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
        </button>
        <button
          onClick={next}
          disabled={!canGoNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cb6ce6]/30 bg-white text-foreground transition-all hover:bg-primary hover:text-white hover:border-primary active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
