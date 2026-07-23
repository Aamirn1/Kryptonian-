"use client";

import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Static nav links at module scope (stable reference across renders).
const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const NavLink = ({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative text-sm font-medium tracking-tight transition-colors hover:text-primary whitespace-nowrap ${
        active ? "text-primary" : ""
      }`}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 w-full bg-primary rounded-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          active
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-100"
        }`}
        style={{ transformOrigin: "center" }}
      />
    </Link>
  );
};

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = NAV_LINKS;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 }
    );
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileMenuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMobileMenuOpen(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
      >
        <nav className="flex items-center justify-between gap-4 md:gap-8 px-6 md:px-8 py-3 md:py-4 max-w-3xl w-full bg-background/50 backdrop-blur-md border border-foreground/10 rounded-full shadow-2xl shadow-black/10">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter hover:text-primary transition-colors"
          >
            <Image src="/logo.png" alt="Krypton Digital home" width={36} height={36} className="md:w-10 md:h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={isActive(link.href)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              href="/get-started"
              className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/80 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              Initiate Scoping
            </Link>
          </div>

          {/* Animated Burger Button (mobile only) */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-foreground/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary text-foreground"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative h-3.5 w-5">
              {/* Line 1 (top) → rotates to 45° + moves to center */}
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-full rounded-full bg-current"
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
              {/* Line 2 (middle) → fades + scales to 0 */}
              <motion.span
                className="absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current"
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
              {/* Line 3 (bottom) → rotates to -45° + moves to center */}
              <motion.span
                className="absolute left-0 top-3 h-0.5 w-full rounded-full bg-current"
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            </div>
          </button>
        </nav>

        {/* Slide-down mobile dropdown panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-x-4 top-[68px] z-50 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="rounded-2xl border border-black/10 bg-white/98 backdrop-blur-xl p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                {/* Nav links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors min-h-[44px]",
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-foreground/5"
                      )}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  ))}
                </nav>

                {/* Divider + CTA */}
                <div className="mt-2 border-t border-black/10 pt-3">
                  <Link
                    href="/get-started"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-all active:scale-[0.98] hover:bg-primary/90"
                  >
                    Initiate Scoping
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
