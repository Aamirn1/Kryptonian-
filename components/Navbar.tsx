"use client";

import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// macOS Dock magnification effect for nav links
const MAX_SCALE = 1.35;
const MIN_SCALE = 1.0;
const EFFECT_WIDTH = 180;

const NavLink = ({
  href,
  children,
  active,
  onClick,
  scale,
  onRef,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  scale: number;
  onRef: (el: HTMLAnchorElement | null) => void;
}) => {
  return (
    <Link
      ref={onRef}
      href={href}
      onClick={onClick}
      className={`group relative text-sm font-medium tracking-tight transition-colors hover:text-primary whitespace-nowrap ${
        active ? "text-primary" : ""
      }`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        transition: "color 0.3s ease",
      }}
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
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scales, setScales] = useState<number[]>([]);
  const mouseRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | undefined>(undefined);
  const currentScalesRef = useRef<number[]>([]);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  // Initialize scales
  useEffect(() => {
    const initial = navLinks.map(() => MIN_SCALE);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScales(initial);
    currentScalesRef.current = initial;
  }, [navLinks]);

  // Calculate target scales based on mouse position (cosine magnification)
  const calculateTargetScales = useCallback(() => {
    if (mouseRef.current === null) {
      return navLinks.map(() => MIN_SCALE);
    }

    return navLinks.map((_, index) => {
      const linkEl = linkRefs.current[index];
      if (!linkEl) return MIN_SCALE;

      const rect = linkEl.getBoundingClientRect();
      const containerRect = linksContainerRef.current?.getBoundingClientRect();
      if (!containerRect) return MIN_SCALE;

      const linkCenter = rect.left + rect.width / 2 - containerRect.left;
      const mousePos = mouseRef.current;
      if (mousePos === null) return MIN_SCALE;
      const distance = Math.abs(linkCenter - mousePos);

      if (distance > EFFECT_WIDTH / 2) {
        return MIN_SCALE;
      }

      // Cosine-based magnification curve
      const theta = (distance / (EFFECT_WIDTH / 2)) * (Math.PI / 2);
      const scaleFactor = Math.cos(theta);
      return MIN_SCALE + (scaleFactor * (MAX_SCALE - MIN_SCALE));
    });
  }, []);

  // Animation loop with lerp for smooth transitions
  useEffect(() => {
    const animate = () => {
      const targets = calculateTargetScales();
      const lerpFactor = mouseRef.current !== null ? 0.2 : 0.12;

      const newScales = currentScalesRef.current.map((current, index) => {
        const diff = targets[index] - current;
        return current + (diff * lerpFactor);
      });

      // Check if we need to continue animating
      const needsUpdate = newScales.some((s, i) => Math.abs(s - targets[i]) > 0.002);

      currentScalesRef.current = newScales;
      setScales(newScales);

      if (needsUpdate || mouseRef.current !== null) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation on mouse move
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [calculateTargetScales]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!linksContainerRef.current) return;
    const rect = linksContainerRef.current.getBoundingClientRect();
    mouseRef.current = e.clientX - rect.left;

    // Trigger animation
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(() => {
      const targets = calculateTargetScales();
      const animate = () => {
        const lerpFactor = mouseRef.current !== null ? 0.2 : 0.12;
        const newScales = currentScalesRef.current.map((current, index) => {
          const diff = targets[index] - current;
          return current + (diff * lerpFactor);
        });

        const needsUpdate = newScales.some((s, i) => Math.abs(s - targets[i]) > 0.002);
        currentScalesRef.current = newScales;
        setScales(newScales);

        if (needsUpdate || mouseRef.current !== null) {
          animFrameRef.current = requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }, [calculateTargetScales]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null;
    // Animate back to min scale
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    const animate = () => {
      const targets = navLinks.map(() => MIN_SCALE);
      const newScales = currentScalesRef.current.map((current, index) => {
        const diff = targets[index] - current;
        return current + (diff * 0.12);
      });

      const needsUpdate = newScales.some((s, i) => Math.abs(s - targets[i]) > 0.002);
      currentScalesRef.current = newScales;
      setScales(newScales);

      if (needsUpdate) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 }
    );
  }, []);

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

          {/* Desktop Navigation with macOS Dock magnification */}
          <div
            ref={linksContainerRef}
            className="hidden md:flex items-center gap-6"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {navLinks.map((link, index) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={isActive(link.href)}
                scale={scales[index] || MIN_SCALE}
                onRef={(el) => { linkRefs.current[index] = el; }}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold tracking-tighter"
                >
                  <Image src="/logo.png" alt="Krypton Digital home" width={40} height={40} />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-4 px-4 text-lg font-medium rounded-2xl transition-colors ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-foreground/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="pt-6 border-t border-foreground/10">
                <Link
                  href="/get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 bg-primary text-white text-center font-bold rounded-full hover:bg-primary/80 transition-all"
                >
                  Initiate Scoping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
