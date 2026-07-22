"use client";

import { useEffect, useRef, useState, useTransition, Suspense } from "react";
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
  ChevronDown,
  Check,
  X,
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

// Helper: get the price for a plan name (across both categories).
function getPlanPrice(planName: string): string | undefined {
  const all = [...pricingData.oneTime, ...pricingData.monthly];
  return all.find((p) => p.name === planName)?.price;
}

// Helper: get the tier (Silver/Gold/Platinum) for a plan name.
function getPlanTier(planName: string): string | undefined {
  const all = [...pricingData.oneTime, ...pricingData.monthly];
  return all.find((p) => p.name === planName)?.tier;
}

export default function ContactPageWrapper() {
  return (
    <Suspense fallback={null}>
      <ContactPage />
    </Suspense>
  );
}

function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    mailtoLink?: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Package category (single select via expandable menu)
  const [category, setCategory] = useState<PackageCategory>("");
  const [categoryOpen, setCategoryOpen] = useState(false);

  // Services (multi-select via expandable checkbox menu)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);

  // Read URL params (from pricing page CTA) to auto-fill the form.
  const searchParams = useSearchParams();
  useEffect(() => {
    const pkg = searchParams.get("pkg"); // "oneTime" or "monthly"
    const plan = searchParams.get("plan"); // plan name e.g. "Growth-Ready"
    if (pkg === "oneTime" || pkg === "monthly") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategory(pkg);
      if (plan) {
        // Verify the plan belongs to this category, then auto-select it.
        const planExists = pricingData[pkg].some((p) => p.name === plan);
        if (planExists) {
          setSelectedServices([plan]);
        }
      }
    }
  }, [searchParams]);

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
          formRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, },
          "-=1",
        )
        .fromTo(
          infoRef.current?.children || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          "-=0.8",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc],
    );
  };

  const removeService = (svc: string) => {
    setSelectedServices((prev) => prev.filter((s) => s !== svc));
  };

  const handleCategorySelect = (val: Exclude<PackageCategory, "">) => {
    setCategory(val);
    setCategoryOpen(false);
    setSelectedServices([]);
    setServiceOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: null, message: "" });
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const serviceString = selectedServices.join(", ");

    if (selectedServices.length === 0) {
      setErrors({ service: ["Please select at least one service"] });
      return;
    }

    const data: ContactFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      service: serviceString,
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
        setSelectedServices([]);
      } else {
        setFormStatus({
          type: "error",
          message: result.message,
          mailtoLink: result.mailtoLink,
        });
        if (result.errors) {
          setErrors(result.errors);
        }
        // Scroll to the top of the form so the user sees the error message.
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    });
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-zinc-300/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-zinc-400/25 rounded-full blur-[100px]" />
        </div>
        <Navbar />

        <main id="main-content" ref={containerRef} className="pb-32">
          {/* Hero Section */}
          <section className="contact-hero relative pt-40 pb-20 px-6">
            <div className="container mx-auto max-w-6xl relative z-10">
              <h1
                ref={titleRef}
                className="text-6xl md:text-8xl font-black tracking-tighter mb-2 uppercase leading-[0.9] overflow-hidden text-center"
              >
                <span className="inline-block">LET&apos;S CREATE</span>
                <br />
                <span className="text-primary italic inline-block">
                  SOMETHING EPIC
                </span>
              </h1>
            </div>
          </section>

          <div className="container mx-auto max-w-6xl px-6 pt-16 md:pt-20">

            {/* FORM FIRST, then Contact Information below */}
            <div className="flex flex-col gap-16 lg:gap-20">

              {/* Contact Form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-8 md:p-10 bg-white border border-[#cb6ce6]/30 rounded-[2rem] md:rounded-[3rem] space-y-8 shadow-xl shadow-black/10"
              >
                {/* Status Message */}
                {formStatus.type && (
                  <div
                    className={`p-4 rounded-2xl flex items-start gap-3 ${
                      formStatus.type === "success"
                        ? "bg-primary/10 border border-primary/20 text-primary"
                        : "bg-red-500/10 border border-red-500/20 text-red-600"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{formStatus.message}</p>
                      {formStatus.mailtoLink && (
                        <a
                          href={formStatus.mailtoLink}
                          className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-semibold uppercase tracking-[0.12em] hover:bg-primary/80 transition-[color,background-color,border-color,box-shadow,transform,opacity]"
                        >
                          <Mail className="w-4 h-4" />
                          Send via Email
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="firstName" className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="John"
                      required
                      disabled={isPending}
                      className="w-full bg-white border border-[#cb6ce6]/30 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 disabled:opacity-60"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs" role="alert">
                        {errors.firstName[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="lastName" className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      required
                      disabled={isPending}
                      className="w-full bg-white border border-[#cb6ce6]/30 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 disabled:opacity-60"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-xs" role="alert">
                        {errors.lastName[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    disabled={isPending}
                    className="w-full bg-white border border-[#cb6ce6]/30 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 disabled:opacity-60"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs" role="alert">{errors.email[0]}</p>
                  )}
                </div>

                {/* Growth Package — expandable burger menu (single select) */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Growth Package
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => { setCategoryOpen(!categoryOpen); setServiceOpen(false); }}
                      disabled={isPending}
                      className={`w-full bg-white border rounded-2xl p-4 flex items-center justify-between text-left transition-colors disabled:opacity-60 ${
                        categoryOpen || category
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-[#cb6ce6]/30"
                      }`}
                    >
                      <span className={category ? "text-foreground font-medium" : "text-zinc-400"}>
                        {category
                          ? categoryOptions.find((o) => o.value === category)?.label
                          : "Select a package..."}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${categoryOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {categoryOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#cb6ce6]/30 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-20">
                        {categoryOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleCategorySelect(opt.value)}
                            className={`w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors border-b border-black/5 last:border-0 ${
                              category === opt.value ? "bg-primary/5" : ""
                            }`}
                          >
                            <span className="font-medium text-foreground">{opt.label}</span>
                            {category === opt.value && (
                              <Check className="w-5 h-5 text-primary shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Interested In — expandable burger menu (multi-select checkboxes) */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Service Interested In <span className="text-zinc-400 normal-case font-medium tracking-normal">(select multiple)</span>
                  </label>

                  {/* Selected service chips */}
                  {selectedServices.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map((svc) => (
                        <span
                          key={svc}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-full"
                        >
                          {svc}
                          <button
                            type="button"
                            onClick={() => removeService(svc)}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                            aria-label={`Remove ${svc}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => category && setServiceOpen(!serviceOpen)}
                      disabled={isPending || !category}
                      className={`w-full bg-white border rounded-2xl p-4 flex items-center justify-between text-left transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                        serviceOpen || selectedServices.length > 0
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-[#cb6ce6]/30"
                      }`}
                    >
                      <span className={selectedServices.length > 0 ? "text-foreground font-medium" : "text-zinc-400"}>
                        {selectedServices.length > 0
                          ? `${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected`
                          : category
                            ? "Tap to choose services..."
                            : "Choose a growth package first"}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${serviceOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {serviceOpen && category && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#cb6ce6]/30 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-20 max-h-80 overflow-y-auto">
                        {serviceOptions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className={`w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-zinc-50 transition-colors border-b border-black/5 last:border-0 ${
                              selectedServices.includes(s) ? "bg-primary/5" : ""
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                selectedServices.includes(s)
                                  ? "bg-primary border-primary"
                                  : "border-zinc-300 bg-white"
                              }`}
                            >
                              {selectedServices.includes(s) && (
                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                              )}
                            </span>
                            <span className="flex-1 min-w-0">
                              {s !== "Need to talk" && getPlanTier(s) && (
                                <span className="block font-bold text-foreground text-sm leading-tight">
                                  {getPlanTier(s)}
                                </span>
                              )}
                              <span className={`block ${s !== "Need to talk" ? "text-xs text-zinc-500 leading-tight" : "font-medium text-foreground"}`}>
                                {s}
                              </span>
                            </span>
                            {s !== "Need to talk" && getPlanPrice(s) && (
                              <span className="text-sm font-semibold text-primary shrink-0">
                                {getPlanPrice(s)}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.service && (
                    <p className="text-red-400 text-xs" role="alert">{errors.service[0]}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Your Message <span className="text-zinc-400 normal-case font-medium tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    disabled={isPending}
                    className="w-full bg-white border border-[#cb6ce6]/30 rounded-2xl p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary transition-colors text-foreground placeholder:text-zinc-400 resize-y disabled:opacity-60"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-xs" role="alert">{errors.message[0]}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="group relative overflow-hidden w-full py-5 bg-primary hover:bg-primary/80 text-white font-semibold rounded-full transition-[color,background-color,border-color,box-shadow,transform,opacity] active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-primary/10 uppercase tracking-[0.12em] text-xs disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
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

              {/* Contact Information — BELOW the form */}
              <div ref={infoRef} className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-8 tracking-tight">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground text-lg mb-12 max-w-md">
                    We partner with ambitious teams to engineer their next phase
                    of growth. Reach out and let&apos;s start the conversation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <a
                    href="mailto:contact@kryptondigital.co.uk"
                    className="flex items-center gap-5 group cursor-pointer"
                  >
                    <div className="w-14 h-14 shrink-0 bg-white border border-[#cb6ce6]/30 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/50 transition-[color,background-color,border-color,box-shadow,transform,opacity] shadow-lg shadow-black/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] font-semibold">
                        Email Us
                      </p>
                      <p className="text-base font-medium group-hover:text-primary transition-colors break-all leading-snug">
                        contact@kryptondigital.co.uk
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+447424792233"
                    className="flex items-center gap-5 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-white border border-[#cb6ce6]/30 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/50 transition-[color,background-color,border-color,box-shadow,transform,opacity] shadow-lg shadow-black/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] font-semibold">
                        Call Us
                      </p>
                      <p className="text-lg font-medium group-hover:text-primary transition-colors">
                        +44 7424 792233
                      </p>
                    </div>
                  </a>
                </div>

                {/* Response Time Notice */}
                <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-sm uppercase tracking-[0.18em]">
                      Fast Response Guaranteed
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We typically respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
