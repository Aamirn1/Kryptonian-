import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo — Krypton Digital wordmark.
 *
 * Renders the official "kr" logo image (logo.png) followed by the
 * "Krypton Digital" wordmark in Space Grotesk. The "Digital" portion
 * uses an animated purple gradient (logo color).
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
   * Kept for API compatibility — both variants render `text-foreground`.
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
        "group flex items-center gap-2 font-display tracking-tight transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="Krypton Digital logo"
        width={56}
        height={56}
        priority
        className={cn(
          "h-12 w-12 md:h-14 md:w-14 object-contain transition-transform duration-300 group-hover:scale-105",
          iconClassName,
        )}
      />
      {showText && (
        <span
          className={cn(
            "font-display text-lg font-bold leading-none tracking-tight md:text-xl text-foreground",
            textClassName,
          )}
        >
          Krypton{" "}
          <span className="relative inline-block bg-clip-text text-transparent animate-gradient-x bg-[linear-gradient(110deg,#ca6de5,#b854e6,#ca6de5)] bg-[length:200%_auto]">
            Digital
          </span>
        </span>
      )}
    </Link>
  );
}
