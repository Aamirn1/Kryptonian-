import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Logo — Krypton Digital wordmark.
 *
 * Renders a gradient growth-arrow icon (rising trend line) followed by the
 * "Krypton Digital" wordmark in Space Grotesk. Replaces the old pink "kr"
 * PNG logo across the site (Navbar, Footer, mobile menu).
 *
 * The growth arrow signals the brand promise: "Future of Digital Growth".
 */
export default function Logo({
  className,
  iconClassName,
  textClassName,
  showText = true,
  onClick,
}: {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  /**
   * Kept for API compatibility — both variants now render `text-foreground`
   * (the white theme uses a single text color across surfaces).
   */
  variant?: "default" | "footer";
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Krypton Digital — home"
      className={cn(
        "group flex items-center gap-2.5 font-display tracking-tight transition-opacity hover:opacity-90",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric via-violet to-cyan shadow-[0_0_20px_-4px_rgba(59,130,246,0.6)] transition-all duration-300 group-hover:shadow-[0_0_26px_-2px_rgba(139,92,246,0.85)] md:h-10 md:w-10",
          iconClassName,
        )}
      >
        <TrendingUp className="h-5 w-5 text-white md:h-6 md:w-6" strokeWidth={2.5} />
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
      </span>
      {showText && (
        <span
          className={cn(
            "font-display text-lg font-bold leading-none tracking-tight md:text-xl text-foreground",
            textClassName,
          )}
        >
          Krypton{" "}
          <span className="relative inline-block bg-clip-text text-transparent animate-gradient-x bg-[linear-gradient(110deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)] bg-[length:200%_auto]">
            Digital
          </span>
        </span>
      )}
    </Link>
  );
}
