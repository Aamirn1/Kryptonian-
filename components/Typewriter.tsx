"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Typewriter — professional rotating typewriter text animation.
 *
 * Cycles through an array of phrases, typing each character then deleting,
 * with a blinking caret. Respects prefers-reduced-motion (renders the first
 * phrase statically without animation).
 *
 * Implemented as a single self-scheduling timeout loop to avoid cascading
 * setState calls inside effects (per react-hooks/set-state-in-effect rule).
 *
 * Usage:
 *   <Typewriter
 *     phrases={["SEO Architecture", "Web Development", "Brand Identity"]}
 *     className="text-electric"
 *   />
 */
export default function Typewriter({
  phrases,
  className,
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseDuration = 1600,
  caretClassName,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  caretClassName?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mutable refs drive the scheduling loop without triggering re-renders.
  const deletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount flag for hydration safety (Typewriter only animates client-side).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || phrases.length === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Static render for reduced-motion users — intentional one-time set.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayed(phrases[0]);
      return;
    }

    let cancelled = false;
    let currentDisplayed = "";
    let currentPhrase = 0;
    let currentDeleting = false;

    const tick = () => {
      if (cancelled) return;
      const full = phrases[currentPhrase] || "";

      if (!currentDeleting && currentDisplayed === full) {
        // Pause at full word, then start deleting.
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          currentDeleting = true;
          tick();
        }, pauseDuration);
        return;
      }

      if (currentDeleting && currentDisplayed === "") {
        // Move to next phrase.
        currentDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setPhraseIndex(currentPhrase);
        timeoutRef.current = setTimeout(tick, typeSpeed);
        return;
      }

      // Type or delete one character.
      currentDisplayed = currentDeleting
        ? full.substring(0, currentDisplayed.length - 1)
        : full.substring(0, currentDisplayed.length + 1);
      setDisplayed(currentDisplayed);
      deletingRef.current = currentDeleting;

      timeoutRef.current = setTimeout(tick, currentDeleting ? deleteSpeed : typeSpeed);
    };

    timeoutRef.current = setTimeout(tick, typeSpeed);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted, phrases, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span
      className={cn("inline-flex items-baseline", className)}
      aria-label={phrases[phraseIndex]}
    >
      <span aria-hidden="true">{displayed}</span>
      <span
        className={cn(
          "ml-0.5 inline-block w-[3px] h-[1em] -mb-[0.1em] rounded-full bg-electric animate-[caret-blink_1.1s_steps(2)_infinite]",
          caretClassName,
        )}
        aria-hidden="true"
      />
    </span>
  );
}
