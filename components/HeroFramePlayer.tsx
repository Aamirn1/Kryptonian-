"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroFramePlayer — plays a sequence of JPG frames as a fast, smooth video
 * by rapidly swapping an <img> src.
 *
 * All frames are PRELOADED into memory before playback starts, so there is
 * no network stutter during animation. Playback runs at a high frame-rate
 * so it feels like a real video.
 *
 * @param frameCount - total number of frames
 * @param fps - frames per second (default 30 for smooth, video-like playback)
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
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  // Preload all frames into memory so playback is stutter-free.
  useEffect(() => {
    let cancelled = false;
    const pad = (n: number) => String(n).padStart(3, "0");
    const images: HTMLImageElement[] = [];

    const preload = async () => {
      const promises: Promise<void>[] = [];
      for (let i = 1; i <= frameCount; i++) {
        const im = new Image();
        im.src = `${basePath}/${prefix}${pad(i)}.jpg`;
        images.push(im);
        promises.push(
          new Promise<void>((resolve) => {
            im.onload = () => resolve();
            im.onerror = () => resolve();
          }),
        );
      }
      await Promise.all(promises);
      if (cancelled) return;
      framesRef.current = images;
      setReady(true);
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [frameCount, basePath, prefix]);

  // Start smooth playback once frames are preloaded.
  useEffect(() => {
    if (!ready) return;
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

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [ready, frameCount, fps, basePath, prefix]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-[2rem] bg-zinc-900 ${className}`}
    >
      {/* Loading shimmer while frames preload */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        className="w-full h-full object-cover"
        aria-hidden="true"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.3s" }}
      />
    </div>
  );
}
