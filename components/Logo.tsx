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
  variant = "default",
  onClick,
}: {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  /** "default" = white text for dark nav; "footer" = slightly dimmed */
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
            "text-lg font-bold leading-none md:text-xl",
            variant === "footer"
              ? "text-white/90"
              : "text-foreground",
            textClassName,
          )}
        >
          Krypton{" "}
          <span className="bg-gradient-to-r from-electric to-violet bg-clip-text text-transparent">
            Digital
          </span>
        </span>
      )}
    </Link>
  );
}
