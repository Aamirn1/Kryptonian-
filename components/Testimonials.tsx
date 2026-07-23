"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CEO, TechStart Ltd",
    content:
      "Krypton Digital transformed our online presence completely. Within 3 months, our organic traffic increased by 250% and we're now ranking #1 for our primary keywords. Their strategic approach to SEO is unmatched.",
    rating: 5,
    image: "/services/strategy.png",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Marketing Director, GrowthBox",
    content:
      "The team at Krypton doesn't just deliver services—they deliver results. Our conversion rate doubled after they redesigned our landing pages. Professional, responsive, and genuinely invested in our success.",
    rating: 5,
    image: "/services/conversion.png",
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Founder, Bloom Boutique",
    content:
      "Working with Krypton was a game-changer for our e-commerce business. Their PPC campaigns delivered a 4.5x ROAS, and their creative team produced stunning brand assets that truly resonate with our audience.",
    rating: 5,
    image: "/services/brand.png",
  },
  {
    id: 4,
    name: "Michael Roberts",
    role: "COO, Nexus Solutions",
    content:
      "We hired Krypton for a complete digital overhaul and they exceeded every expectation. The new website they built is fast, beautiful, and converts 3x better than our old one. Worth every penny.",
    rating: 5,
    image: "/services/web-dev.png",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<(typeof testimonials)[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // Horizontal scroll animation (same as Process section)
      const section = sectionRef.current;
      const trigger = triggerRef.current;
      const cards = gsap.utils.toArray(".testimonial-card-horizontal");
      if (!section || !trigger || cards.length === 0) return;

      const firstCard = cards[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const windowWidth = window.innerWidth;
      // Start the first card on the RIGHT side of the screen (48px padding
      // from the right edge) so it sweeps right-to-left as the user scrolls.
      const initialOffset = windowWidth - cardWidth - 48;

      gsap.set(section, { x: initialOffset });

      const totalWidth = section.scrollWidth;

      gsap.to(section, {
        x: -(totalWidth - windowWidth + initialOffset),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".testimonial-card-horizontal", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Close popup on Escape
  useEffect(() => {
    if (!selectedTestimonial) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTestimonial(null);
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedTestimonial]);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-[#fafafa] overflow-hidden"
    >
      <div ref={triggerRef} className="h-screen flex flex-col">
        {/* Header */}
        <div className="testimonials-header text-center mb-4 pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6 border border-primary/20">
            <Quote className="w-4 h-4 text-primary" />
            <p className="text-primary font-bold text-sm">
              CLIENT SUCCESS STORIES
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6">
            Trusted By{" "}
            <span className="text-primary italic">Industry Leaders</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients
            have to say about working with us.
          </p>
        </div>

        {/* Horizontal scrolling testimonials */}
        <div
          ref={sectionRef}
          className="flex gap-8 px-6 items-center flex-1"
          style={{ width: "max-content" }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              onClick={() => setSelectedTestimonial(testimonial)}
              className="testimonial-card-horizontal group shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] p-8 bg-white border border-[#cb6ce6]/40 rounded-[2.5rem] shadow-lg shadow-zinc-200/20 hover:shadow-xl hover:shadow-zinc-200/30 hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < testimonial.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-zinc-300",
                    )}
                  />
                ))}
              </div>

              <p className="text-zinc-600 text-lg leading-relaxed mb-8 line-clamp-3">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div>

                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-20 pt-16 border-t border-[#cb6ce6]/40 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                4.9/5
              </div>
              <p className="text-zinc-500 text-sm font-medium">
                Average Client Rating
              </p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                50+
              </div>
              <p className="text-zinc-500 text-sm font-medium">
                Projects Delivered
              </p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                98%
              </div>
              <p className="text-zinc-500 text-sm font-medium">
                Client Retention
              </p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                3x
              </div>
              <p className="text-zinc-500 text-sm font-medium">
                Average ROI Increase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative max-w-2xl w-full p-10 bg-white rounded-[2.5rem] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "testimonialPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Quote className="w-7 h-7 text-primary" />
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-6 h-6",
                    i < selectedTestimonial.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-zinc-300",
                  )}
                />
              ))}
            </div>

            <p className="text-zinc-600 text-xl leading-relaxed mb-8">
              &ldquo;{selectedTestimonial.content}&rdquo;
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-[#cb6ce6]/30">
              <div>
                <h4 className="font-bold text-xl">{selectedTestimonial.name}</h4>
                <p className="text-zinc-500">{selectedTestimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
