"use client";

import { Suspense, useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
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

type PackageCategory = "" | "oneTime" | "monthly";

const categoryOptions: { value: Exclude<PackageCategory, "">; label: string }[] = [
  { value: "oneTime", label: "Foundation & Launch" },
  { value: "monthly", label: "Ongoing Growth" },
];

function ContactPageInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

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

  // Auto-fill category + service from URL params (?pkg=oneTime&plan=Growth-Ready)
  // so users coming from the pricing/get-started flow have the form pre-filled.
  useEffect(() => {
    const pkg = searchParams.get("pkg");
    const plan = searchParams.get("plan");

    if (pkg === "oneTime" || pkg === "monthly") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategory(pkg);
      if (plan) {
        // Defer setting service until category is applied — match against the
        // available services for that category.
        const valid = [...pricingData[pkg].map((p) => p.name), "Need to talk"];
        if (valid.includes(plan)) {
          setService(plan);
        }
      }
    }
  }, [searchParams]);

  // On mobile, auto-scroll to the form (not the top) when arriving with
  // preselected package/service params so users land on the form fields
  // (name/email) instead of the contact-info section above.
  useEffect(() => {
    const pkg = searchParams.get("pkg");
    const hasPrefill = pkg === "oneTime" || pkg === "monthly";
    if (!hasPrefill) return;
    // Only auto-scroll on mobile (the contact-info section is only above the
    // form on small screens; on desktop they're side-by-side).
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;
    // Wait for the gsap entrance animation to settle, then scroll the form
    // into view at the top of the viewport.
    const t = window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
    return () => window.clearTimeout(t);
  }, [searchParams]);

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
        // Scroll the form into view so the error is visible (esp. on mobile).
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>
        <Navbar />

        <main id="main-content" ref={containerRef} className="pt-40 pb-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-2 uppercase leading-[0.9] overflow-hidden text-center mb-20"
            >
              <span className="inline-block">LET&apos;S CREATE</span>
              <br />
              <span className="text-primary italic inline-block">
                SOMETHING EPIC
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Contact Info */}
              <div ref={infoRef} className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-8">
                    Contact Information
                  </h2>
                  <p className="text-zinc-500 text-lg mb-12 max-w-md">
                    We&apos;re here to help you navigate your digital
                    transformation. Reach out and start the conversation.
                  </p>
                </div>

                <div className="space-y-8">
                  <a
                    href="mailto:contact@kryptondigital.co.uk"
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/50 transition-all shadow-lg shadow-zinc-200/20">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 uppercase tracking-widest font-bold">
                        Email Us
                      </p>
                      <p className="text-base sm:text-xl font-medium group-hover:text-primary transition-colors break-all">
                        contact@kryptondigital.co.uk
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+447424792233"
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/50 transition-all shadow-lg shadow-zinc-200/20">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 uppercase tracking-widest font-bold">
                        Call Us
                      </p>
                      <p className="text-xl font-medium group-hover:text-primary transition-colors">
                        +44 7424 792233
                      </p>
                    </div>
                  </a>
                </div>

                {/* Response Time Notice */}
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-bold text-sm uppercase tracking-wider">
                      Fast Response Guaranteed
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm">
                    We typically respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-10 bg-white border border-zinc-200 rounded-[3rem] space-y-8 shadow-xl shadow-zinc-200/20"
              >
                {/* Status Message */}
                {formStatus.type && (
                  <div
                    className={`p-4 rounded-2xl flex items-start gap-3 ${
                      formStatus.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
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
                    <label htmlFor="firstName" className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="John"
                      required
                      disabled={isPending}
                      className="w-full bg-[#fafafa] border border-zinc-200 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 disabled:opacity-60"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs" role="alert">
                        {errors.firstName[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="lastName" className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      required
                      disabled={isPending}
                      className="w-full bg-[#fafafa] border border-zinc-200 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 disabled:opacity-60"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs" role="alert">
                        {errors.lastName[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    disabled={isPending}
                    className="w-full bg-[#fafafa] border border-zinc-200 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 disabled:opacity-60"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs" role="alert">{errors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="category" className="text-sm font-bold uppercase tracking-widest text-zinc-500">
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
                    className="w-full bg-[#fafafa] border border-zinc-200 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors appearance-none text-foreground disabled:opacity-60"
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
                  <label htmlFor="service" className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    disabled={isPending || !category}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#fafafa] border border-zinc-200 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors appearance-none text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
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
                    <p className="text-red-500 text-xs" role="alert">{errors.service[0]}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                    Your Message <span className="text-zinc-400 normal-case font-medium tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    disabled={isPending}
                    className="w-full bg-[#fafafa] border border-zinc-200 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 resize-y disabled:opacity-60"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs" role="alert">{errors.message[0]}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-5 bg-foreground text-white font-bold rounded-full hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-foreground/10 uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                >
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

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}
