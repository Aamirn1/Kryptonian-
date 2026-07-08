"use client";

import Link from "next/link";
import {
  Mail,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-card pt-12 pb-6 border-t border-white/10 rounded-t-4xl">
      <div className="h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-black tracking-tighter mb-6 mr-8">
              LET&apos;S TALK <span className="text-gradient italic">SHOP</span>.
            </h2>
            <Link
              href="mailto:hello@kryptondigital.com"
              className="text-lg md:text-xl font-medium hover:text-electric transition-colors flex items-center gap-3"
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
                    className="text-muted-foreground hover:text-electric transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-muted-foreground hover:text-electric transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-electric transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-electric transition-colors"
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
                    className="text-muted-foreground hover:text-electric transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-electric transition-colors"
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
                    className="text-muted-foreground hover:text-electric transition-colors flex items-center gap-2 group"
                  >
                    <Instagram className="w-4 h-4 group-hover:text-electric" />{" "}
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/kryptondigital"
                    className="text-muted-foreground hover:text-electric transition-colors flex items-center gap-2 group"
                  >
                    <Linkedin className="w-4 h-4 group-hover:text-electric" />{" "}
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/kryptondigital"
                    className="text-muted-foreground hover:text-electric transition-colors flex items-center gap-2 group"
                  >
                    <Facebook className="w-4 h-4 group-hover:text-electric" />{" "}
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-white/10 gap-4">
          <div className="text-xl font-bold tracking-tighter">
            <Image src="/white-logo.png" alt="Logo" width={36} height={36} />
          </div>
          <div className="text-muted-foreground text-sm">
            © 2026 Krypton Digital. All rights reserved. Built with passion &
            motion.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-2 border border-white/10 rounded-full text-xs font-bold hover:cursor-pointer hover:bg-electric hover:text-white transition-all"
          >
            BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
