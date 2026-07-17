"use client";

import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link || active) return;

    const ctx = gsap.context(() => {
      const onMouseEnter = () => {
        gsap.to(link, {
          color: "#cb6be6",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(link, {
          color: "currentColor",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
    }, link);

    return () => ctx.revert();
  }, [active]);

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onClick}
      className={`text-sm font-medium tracking-tight transition-colors ${
        active ? "text-primary" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

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
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
            <Link
              href="/get-started"
              className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/80 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              Order Now
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
              <div className="pt-6 border-t border-zinc-200">
                <Link
                  href="/get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 bg-primary text-white text-center font-bold rounded-full hover:bg-primary/80 transition-all"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
