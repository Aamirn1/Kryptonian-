/**
 * AuroraBackground — Opus Solutions signature animated background.
 *
 * Renders three large blurred "aurora" blobs (electric blue, violet, cyan)
 * that drift around on an 18s loop, plus a subtle white grid with a radial
 * fade mask. Place this as the first child inside any section/page that
 * should carry the Opus look. It is purely decorative and pointer-events-none.
 *
 * Usage:
 *   <section className="relative ...">
 *     <AuroraBackground />
 *     <div className="relative z-10">...</div>
 *   </section>
 */
export default function AuroraBackground({
  className = "",
  showGrid = true,
}: {
  className?: string;
  showGrid?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Base ink wash */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Aurora blobs */}
      <div className="animate-aurora absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[#3b82f6]/25 blur-[120px]" />
      <div className="animate-aurora [animation-delay:-6s] absolute top-10 right-0 h-[480px] w-[480px] rounded-full bg-[#8b5cf6]/22 blur-[120px]" />
      <div className="animate-aurora [animation-delay:-12s] absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#06b6d4]/18 blur-[120px]" />

      {/* Subtle white grid with radial fade */}
      {showGrid && (
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" />
      )}
    </div>
  );
}
