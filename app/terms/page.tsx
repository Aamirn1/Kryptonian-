"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Mail, Calendar, ArrowLeft } from "lucide-react";
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
    title: "1. Agreement to Terms",
    content: [
      {
        text: "By accessing our website at kryptondigital.co.uk, engaging our services, or communicating with us, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
      },
    ],
  },
  {
    title: "2. Services Description",
    content: [
      {
        text: "Krypton Digital provides digital marketing services including but not limited to:",
        list: [
          "Search Engine Optimization (SEO)",
          "Web design and development",
          "Brand identity and creative services",
          "Digital strategy consulting",
          "Content marketing",
          "Pay-per-click (PPC) advertising management",
          "Social media marketing",
          "Analytics and reporting",
        ],
      },
    ],
  },
  {
    title: "3. Project Engagement & Proposals",
    content: [
      {
        subtitle: "3.1 Proposals",
        text: "All project proposals are valid for 30 days from the date of issue unless otherwise specified. Acceptance of a proposal constitutes a binding agreement.",
      },
      {
        subtitle: "3.2 Project Scope",
        text: "The scope of work is defined in the project proposal or Statement of Work (SOW). Any changes to the scope require a written change order and may affect pricing and timelines.",
      },
      {
        subtitle: "3.3 Client Responsibilities",
        text: "You agree to:",
        list: [
          "Provide necessary access, materials, and information in a timely manner",
          "Review and approve deliverables within specified timeframes",
          "Designate a single point of contact for project communications",
          "Ensure all provided content and materials do not infringe third-party rights",
        ],
      },
    ],
  },
  {
    title: "4. Fees & Payment Terms",
    content: [
      {
        subtitle: "4.1 Pricing",
        text: "All prices are quoted in GBP (£) unless otherwise specified. Project fees are based on the scope of work defined in the proposal.",
      },
      {
        subtitle: "4.2 Payment Schedule",
        text: "Payment terms are as follows:",
        list: [
          "One-time projects: 50% deposit before work begins, 50% upon completion",
          "Monthly retainers: Payment due on the 1st of each month",
          "Late payments: Subject to a 5% late fee per month overdue",
        ],
      },
      {
        subtitle: "4.3 Additional Costs",
        text: "Third-party costs (advertising spend, stock images, domain registration, hosting, plugins, etc.) are billed separately and are your responsibility unless included in the proposal.",
      },
    ],
  },
  {
    title: "5. Intellectual Property",
    content: [
      {
        subtitle: "5.1 Ownership",
        text: "Upon full payment, you will own the final deliverables created specifically for your project. However, we retain:",
        list: [
          "Rights to preliminary concepts, drafts, and unused ideas",
          "Rights to our proprietary frameworks, methodologies, and tools",
          "The right to display completed work in our portfolio and marketing materials",
        ],
      },
      {
        subtitle: "5.2 Third-Party Assets",
        text: "Stock photos, fonts, software licenses, and other third-party assets are subject to their respective license terms. We will inform you of any ongoing licensing fees.",
      },
      {
        subtitle: "5.3 Client Materials",
        text: "You warrant that you have the right to use all materials, content, and intellectual property you provide to us, and you indemnify us against claims arising from their use.",
      },
    ],
  },
  {
    title: "6. Confidentiality",
    content: [
      {
        text: "Both parties agree to maintain the confidentiality of proprietary information disclosed during the engagement. This obligation survives termination of our working relationship.",
      },
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      {
        text: "To the fullest extent permitted by law:",
        list: [
          "Our liability is limited to the amount paid for the specific services giving rise to the claim",
          "We are not liable for indirect, incidental, special, or consequential damages",
          "We do not guarantee specific results from SEO or marketing campaigns (e.g., rankings, traffic, conversions)",
          "We are not responsible for platform algorithm changes, third-party service outages, or force majeure events",
        ],
      },
    ],
  },
  {
    title: "8. Term & Termination",
    content: [
      {
        subtitle: "8.1 Project-Based Work",
        text: "Either party may terminate project-based work with 14 days' written notice. You remain liable for all work completed and expenses incurred up to the termination date.",
      },
      {
        subtitle: "8.2 Retainer Agreements",
        text: "Monthly retainer agreements require 30 days' written notice to terminate. No refunds for partial months.",
      },
      {
        subtitle: "8.3 Immediate Termination",
        text: "We may terminate immediately for non-payment, abusive behavior, or breach of these terms.",
      },
    ],
  },
  {
    title: "9. Dispute Resolution",
    content: [
      {
        text: "Any dispute arising from these terms shall first be attempted to be resolved through good faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
      },
    ],
  },
  {
    title: "10. Refund Policy",
    content: [
      {
        text: "Our refund policy is as follows:",
        list: [
          "Deposits are non-refundable once work has commenced",
          "If we fail to deliver agreed-upon milestones, a proportional refund may be issued",
          "No refunds for completed and approved work",
          "No refunds for third-party expenses already incurred",
        ],
      },
    ],
  },
  {
    title: "11. Governing Law",
    content: [
      {
        text: "These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles.",
      },
    ],
  },
  {
    title: "12. Changes to Terms",
    content: [
      {
        text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Continued use of our services constitutes acceptance of the updated terms.",
      },
    ],
  },
];

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".terms-hero",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
      );

      gsap.fromTo(
        ".terms-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".terms-content",
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
        className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased"
      >
        <Navbar />

        <main className="pt-32 pb-32">
          {/* Hero Section */}
          <section className="terms-hero px-6 mb-20">
            <div className="container mx-auto max-w-4xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  Legal
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                Terms of <span className="text-primary italic">Service</span>
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-zinc-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Last Updated: 13 March 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href="mailto:contact@kryptondigital.co.uk"
                    className="text-sm hover:text-primary transition-colors"
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
              <div className="p-8 md:p-12 bg-white border border-zinc-200 rounded-4xl shadow-lg shadow-zinc-200/20">
                <p className="text-lg text-zinc-600 leading-relaxed mb-4">
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and Krypton Digital Ltd (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of our website and services.
                </p>
                <p className="text-lg text-zinc-600 leading-relaxed">
                  Please read these Terms carefully before engaging our services. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                </p>
              </div>
            </div>
          </section>

          {/* Terms Sections */}
          <section className="terms-content px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="terms-section p-8 md:p-12 bg-white border border-zinc-200 rounded-4xl shadow-sm hover:shadow-lg hover:shadow-zinc-200/20 transition-shadow"
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
                            <p className="text-zinc-600 leading-relaxed">
                              {item.text}
                            </p>
                          )}
                          {item.list && (
                            <ul className="space-y-2 mt-4">
                              {item.list?.map((listItem: string, li: number) => (
                                <li
                                  key={li}
                                  className="flex items-start gap-3 text-zinc-600"
                                >
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0" />
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
              <div className="p-10 md:p-16 bg-foreground rounded-[3rem] text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Questions About Our Terms?
                </h2>
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                  If you have any questions or concerns about these Terms of Service, please don&apos;t hesitate to reach out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:contact@kryptondigital.co.uk?subject=Terms%20of%20Service%20Inquiry"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all"
                  >
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
