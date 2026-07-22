"use client";

import Link from "next/link";
import {
  Mail,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import ScrollToTop from "./ScrollToTop";
import AIAssistant from "./AIAssistant";

export default function Footer() {
  return (
    <>
    <footer className="bg-primary pt-12 pb-6 border-t border-foreground rounded-t-4xl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-black tracking-tighter mb-6 mr-8">
              LET&apos;S TALK <span className="text-white italic">SHOP</span>.
            </h2>
            <Link
              href="mailto:hello@kryptondigital.com"
              className="text-lg md:text-xl font-medium hover:text-white transition-colors flex items-center gap-3"
            >
              <Mail className="w-5 h-5" />
              contact@kryptondigital.co.uk
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-3 uppercase tracking-widest text-sm">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-foreground hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-foreground hover:text-white transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-foreground hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-foreground hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 uppercase tracking-widest text-sm">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-foreground hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-foreground hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 uppercase tracking-widest text-sm">
                Socials
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.instagram.com/kryptondigital"
                    className="text-foreground hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <Instagram className="w-4 h-4 group-hover:text-white" />{" "}
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/kryptondigital"
                    className="text-foreground hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <Linkedin className="w-4 h-4 group-hover:text-white" />{" "}
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/kryptondigital"
                    className="text-foreground hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <Facebook className="w-4 h-4 group-hover:text-white" />{" "}
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-foreground/40 gap-4">
          <div className="text-xl font-bold tracking-tighter">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
          </div>
          <div className="text-foreground text-sm">
            © 2026 Krypton Digital. All rights reserved. Built with passion &
            motion.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-2 border border-foreground/10 rounded-full text-xs font-bold hover:cursor-pointer hover:bg-foreground hover:text-background transition-all"
          >
            BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
    <ScrollToTop />
    <AIAssistant />
    </>
  );
}
