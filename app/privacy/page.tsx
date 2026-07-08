"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import { Shield, Mail, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type ContentItem = {
  subtitle?: string;
  text?: string;
  list?: string[];
};

type Section = {
  title: string;
  content: ContentItem[];
};

const sections: Section[] = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "1.1 Personal Information",
        text: "When you use our contact form or services, we may collect: your name, email address, phone number, company name, and any information you voluntarily provide about your project or business needs.",
      },
      {
        subtitle: "1.2 Usage Data",
        text: "We automatically collect information about how you interact with our website, including your IP address, browser type, device information, pages visited, time spent on pages, and referring URLs.",
      },
      {
        subtitle: "1.3 Cookies & Tracking",
        text: "We use cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and understand where our visitors come from. You can control cookies through your browser settings.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        text: "We use the information we collect to:",
        list: [
          "Respond to your inquiries and provide requested services",
          "Process and manage your projects",
          "Send administrative information and project updates",
          "Improve our website, services, and user experience",
          "Comply with legal obligations and enforce our terms",
          "Send marketing communications (with your consent)",
        ],
      },
    ],
  },
  {
    title: "3. Legal Basis for Processing (GDPR)",
    content: [
      {
        text: "Under GDPR, we process your personal data based on the following legal grounds:",
        list: [
          "Contractual necessity: Processing required to fulfill our contract with you",
          "Legitimate interests: Improving our services and website security",
          "Legal obligation: Compliance with applicable laws and regulations",
          "Consent: Marketing communications (you can withdraw consent anytime)",
        ],
      },
    ],
  },
  {
    title: "4. Data Sharing & Third Parties",
    content: [
      {
        text: "We do not sell your personal information. We may share data with:",
        list: [
          "Service providers: Email delivery (Resend), analytics (Google Analytics), hosting (Vercel)",
          "Business partners: Only when necessary for project delivery and with your consent",
          "Legal authorities: When required by law or to protect our rights",
        ],
      },
    ],
  },
  {
    title: "5. Data Security",
    content: [
      {
        text: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. This includes:",
        list: [
          "SSL/TLS encryption for data transmission",
          "Secure server infrastructure",
          "Regular security assessments",
          "Limited access to personal data (employees only)",
        ],
      },
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      {
        text: "We retain your personal data for as long as necessary to:",
        list: [
          "Provide our services and fulfill the purposes outlined in this policy",
          "Comply with legal obligations, resolve disputes, and enforce agreements",
          "Maintain business records for accounting and tax purposes (typically 6-7 years)",
        ],
      },
    ],
  },
  {
    title: "7. Your Rights (GDPR & CCPA)",
    content: [
      {
        text: "Depending on your location, you have the following rights regarding your personal data:",
        list: [
          "Right to access: Request a copy of your personal data",
          "Right to rectification: Correct inaccurate or incomplete data",
          "Right to erasure: Request deletion of your data ('right to be forgotten')",
          "Right to restrict processing: Limit how we use your data",
          "Right to data portability: Receive your data in a structured format",
          "Right to object: Opt-out of certain data uses including marketing",
          "Right to withdraw consent: Withdraw previously given consent",
        ],
      },
    ],
  },
  {
    title: "8. International Data Transfers",
    content: [
      {
        text: "Your data may be transferred to and processed in countries outside the UK and EEA (such as the United States) where our service providers operate. We ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission.",
      },
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      {
        text: "Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us immediately.",
      },
    ],
  },
  {
    title: "10. Changes to This Policy",
    content: [
      {
        text: "We may update this Privacy Policy from time to time. The updated version will be indicated by an updated 'Last Updated' date. We encourage you to review this policy periodically.",
      },
    ],
  },
];

export default function PrivacyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".privacy-hero",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
      );

      // Sections animation
      gsap.fromTo(
        ".policy-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".policy-content",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-background text-foreground selection:bg-electric/30 selection:text-white antialiased"
      >
        <Navbar />

        <main className="pt-32 pb-32">
          {/* Hero Section */}
          <section className="privacy-hero relative px-6 mb-20 overflow-hidden">
            <AuroraBackground />
            <div className="container mx-auto max-w-4xl relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-electric/10 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-electric" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-electric">
                  Legal
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                Privacy <span className="text-gradient italic">Policy</span>
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Last Updated: 13 March 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href="mailto:contact@kryptondigital.co.uk"
                    className="text-sm hover:text-electric transition-colors"
                  >
                    contact@kryptondigital.co.uk
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="px-6 mb-16">
            <div className="container mx-auto max-w-4xl">
              <div className="p-8 md:p-12 bg-card border border-white/10 rounded-4xl shadow-lg shadow-black/40">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  At Krypton Digital, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This policy complies with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and the California Consumer Privacy Act (CCPA) where applicable.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Sections */}
          <section className="policy-content px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="policy-section p-8 md:p-12 bg-card border border-white/10 rounded-4xl shadow-sm hover:shadow-lg hover:shadow-black/40 transition-shadow"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
                      {section.title}
                    </h2>

                    <div className="space-y-6">
                      {section.content.map((item, i) => (
                        <div key={i}>
                          {item.subtitle && (
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                              {item.subtitle}
                            </h3>
                          )}
                          {item.text && (
                            <p className="text-muted-foreground leading-relaxed">
                              {item.text}
                            </p>
                          )}
                          {item.list && (
                            <ul className="space-y-2 mt-4">
                              {item.list?.map((listItem: string, li: number) => (
                                <li
                                  key={li}
                                  className="flex items-start gap-3 text-muted-foreground"
                                >
                                  <span className="w-1.5 h-1.5 bg-electric rounded-full mt-2.5 shrink-0" />
                                  <span className="leading-relaxed">
                                    {listItem}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="px-6 mt-20">
            <div className="container mx-auto max-w-4xl">
              <div className="p-10 md:p-16 bg-card border border-white/10 rounded-[3rem] text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Questions About Your Privacy?
                </h2>
                <p className="text-white/50 mb-8 max-w-xl mx-auto">
                  If you have any questions about this Privacy Policy or want to exercise your data rights, we&apos;re here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:contact@kryptondigital.co.uk?subject=Privacy%20Policy%20Inquiry"
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 btn-gradient text-white font-bold rounded-full transition-all"
                  >
                    <span className="shimmer-sweep" />
                    <Mail className="w-5 h-5" />
                    Contact Us
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
                  >
                    Contact Form
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
