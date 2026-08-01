"use client";

import { useEffect, useRef } from "react";

/**
 * HeroFramePlayer — plays a sequence of JPG frames as a fast animation
 * (like a video) by rapidly swapping an <img> src.
 *
 * @param frameCount - total number of frames
 * @param fps - frames per second (default 30 for fast playback)
 * @param basePath - URL path to the frames directory
 * @param prefix - filename prefix (e.g. "ezgif-frame-")
 */
export default function HeroFramePlayer({
  frameCount = 300,
  fps = 30,
  basePath = "/hero-frames",
  prefix = "ezgif-frame-",
  className = "",
}: {
  frameCount?: number;
  fps?: number;
  basePath?: string;
  prefix?: string;
  className?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const currentFrameRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const pad = (n: number) => String(n).padStart(3, "0");
    const frameInterval = 1000 / fps;

    // Set first frame
    img.src = `${basePath}/${prefix}${pad(1)}.jpg`;

    const animate = (time: number) => {
      rafRef.current = requestAnimationFrame(animate);

      const elapsed = time - lastTimeRef.current;
      if (elapsed < frameInterval) return;

      lastTimeRef.current = time - (elapsed % frameInterval);

      currentFrameRef.current = (currentFrameRef.current + 1) % frameCount;
      const frameNum = currentFrameRef.current + 1;
      img.src = `${basePath}/${prefix}${pad(frameNum)}.jpg`;
    };

    // Start animation after a short delay
    const startTimer = setTimeout(() => {
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(startTimer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [frameCount, fps, basePath, prefix]);

  return (
    <div className={`w-full h-full overflow-hidden rounded-[2rem] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
    </div>
  );
}
