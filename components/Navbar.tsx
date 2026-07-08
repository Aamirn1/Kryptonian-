"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

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
          color: "#3b82f6",
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
        active ? "text-electric" : ""
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
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-electric focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
      >
        <nav className="flex items-center justify-between gap-4 md:gap-8 px-6 md:px-8 py-3 md:py-4 max-w-3xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/40">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
            <Link
              href="/get-started"
              className="group relative overflow-hidden px-6 py-2 btn-gradient rounded-xl text-white text-sm font-semibold transition-all active:scale-95 hover:btn-gradient-hover"
            >
              <span className="relative z-10">Initiate Scoping</span>
              <span className="shimmer-sweep" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-electric"
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
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-card border border-white/10 shadow-2xl shadow-black/50 animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Logo
                  onClick={() => setMobileMenuOpen(false)}
                  textClassName="text-xl"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-electric"
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
                        ? "bg-electric/10 text-electric"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative overflow-hidden block w-full py-4 btn-gradient rounded-full text-white text-center font-bold transition-all hover:btn-gradient-hover"
                >
                  <span className="relative z-10">Initiate Scoping</span>
                  <span className="shimmer-sweep" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
