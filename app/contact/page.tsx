"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { gsap } from "gsap";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sendContactEmail, ContactFormData } from "@/actions/contact";
import { pricingData } from "@/lib/pricing";
import AuroraBackground from "@/components/AuroraBackground";

type PackageCategory = "" | "oneTime" | "monthly";

const categoryOptions: { value: Exclude<PackageCategory, "">; label: string }[] = [
  { value: "oneTime", label: "Foundation & Launch" },
  { value: "monthly", label: "Ongoing Growth" },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [category, setCategory] = useState<PackageCategory>("");
  const [service, setService] = useState<string>("");

  const serviceOptions = category
    ? [...pricingData[category].map((p) => p.name), "Need to talk"]
    : [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5 },
      )
        .fromTo(
          infoRef.current?.children || [],
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: 0.2 },
          "-=1",
        )
        .fromTo(
          formRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2 },
          "-=1.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: null, message: "" });
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    startTransition(async () => {
      const result = await sendContactEmail(data);

      if (result.success) {
        setFormStatus({
          type: "success",
          message: result.message,
        });
        formRef.current?.reset();
        setCategory("");
        setService("");
      } else {
        setFormStatus({
          type: "error",
          message: result.message,
        });
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    });
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-electric/30 selection:text-white antialiased overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-electric/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-violet/10 rounded-full blur-[100px]" />
        </div>
        <Navbar />

        <main id="main-content" ref={containerRef} className="pt-40 pb-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <section className="relative mb-20">
              <AuroraBackground />
              <h1
                ref={titleRef}
                className="text-6xl md:text-8xl font-bold tracking-tighter mb-2 uppercase leading-[0.9] overflow-hidden text-center relative z-10"
              >
                <span className="inline-block">LET&apos;S BUILD YOUR</span>
                <br />
                <span className="text-gradient italic inline-block">
                  GROWTH ENGINE
                </span>
              </h1>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Contact Info */}
              <div ref={infoRef} className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-8 tracking-tight">
                    Contact Information
                  </h2>
                  <p className="text-white/60 text-lg mb-12 max-w-md">
                    We partner with ambitious teams to engineer their next phase
                    of growth. Reach out and let&apos;s start the conversation.
                  </p>
                </div>

                <div className="space-y-8">
                  <a
                    href="mailto:contact@kryptondigital.co.uk"
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-card border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-electric/10 group-hover:border-electric/50 transition-all shadow-lg shadow-black/40">
                      <Mail className="w-6 h-6 text-electric" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-[0.18em] font-semibold">
                        Email Us
                      </p>
                      <p className="text-xl font-medium group-hover:text-electric transition-colors">
                        contact@kryptondigital.co.uk
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+447424792233"
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-card border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-electric/10 group-hover:border-electric/50 transition-all shadow-lg shadow-black/40">
                      <Phone className="w-6 h-6 text-electric" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-[0.18em] font-semibold">
                        Call Us
                      </p>
                      <p className="text-xl font-medium group-hover:text-electric transition-colors">
                        +44 7424 792233
                      </p>
                    </div>
                  </a>
                </div>

                {/* Response Time Notice */}
                <div className="p-6 bg-electric/10 border border-electric/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-electric" />
                    <span className="font-semibold text-sm uppercase tracking-[0.18em]">
                      Fast Response Guaranteed
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">
                    We typically respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-10 bg-card border border-white/10 rounded-[3rem] space-y-8 shadow-xl shadow-black/40"
              >
                {/* Status Message */}
                {formStatus.type && (
                  <div
                    className={`p-4 rounded-2xl flex items-start gap-3 ${
                      formStatus.type === "success"
                        ? "bg-electric/10 border border-electric/20 text-electric"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    )}
                    <p className="text-sm font-medium">{formStatus.message}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="firstName" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="John"
                      required
                      disabled={isPending}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus:border-electric transition-colors text-white placeholder:text-white/40 disabled:opacity-60"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs" role="alert">
                        {errors.firstName[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="lastName" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      required
                      disabled={isPending}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus:border-electric transition-colors text-white placeholder:text-white/40 disabled:opacity-60"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-xs" role="alert">
                        {errors.lastName[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    disabled={isPending}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus:border-electric transition-colors text-white placeholder:text-white/40 disabled:opacity-60"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs" role="alert">{errors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="category" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    Growth Package
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    disabled={isPending}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value as PackageCategory);
                      setService("");
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus:border-electric transition-colors appearance-none text-white disabled:opacity-60"
                  >
                    <option value="" disabled>Select a package...</option>
                    {categoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="service" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    disabled={isPending || !category}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus:border-electric transition-colors appearance-none text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      {category ? "Select a service..." : "Choose a growth package first"}
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs" role="alert">{errors.service[0]}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    Your Message <span className="text-white/50 normal-case font-medium tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    disabled={isPending}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric focus:border-electric transition-colors text-white placeholder:text-white/40 resize-y disabled:opacity-60"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-xs" role="alert">{errors.message[0]}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="group relative overflow-hidden w-full py-5 btn-gradient hover:btn-gradient-hover text-white font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-electric/10 uppercase tracking-[0.12em] text-xs disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <span className="shimmer-sweep" />
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
