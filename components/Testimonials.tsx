"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);

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

      gsap.fromTo(
        ".testimonial-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 75%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Auto-advance the mobile carousel every 3 seconds. Pauses when the user
  // hovers/focuses the carousel so manual interaction isn't fighting the timer.
  useEffect(() => {
    const carousel = document.querySelector("[data-testid='testimonials-carousel']");
    if (!carousel) return;

    let paused = false;
    const onPause = () => { paused = true; };
    const onResume = () => { paused = false; };
    carousel.addEventListener("mouseenter", onPause);
    carousel.addEventListener("mouseleave", onResume);
    carousel.addEventListener("touchstart", onPause, { passive: true });
    carousel.addEventListener("touchend", onResume, { passive: true });

    const interval = setInterval(() => {
      if (!paused) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      carousel.removeEventListener("mouseenter", onPause);
      carousel.removeEventListener("mouseleave", onResume);
      carousel.removeEventListener("touchstart", onPause);
      carousel.removeEventListener("touchend", onResume);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 bg-background overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 mb-6 border border-black/10">
            <Quote className="w-4 h-4 text-zinc-700" />
            <p className="text-zinc-700 text-xs font-semibold tracking-[0.18em] uppercase">
              Client Success Stories
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-6 leading-[1.05]">
            Trusted By{" "}
            <span className="text-gradient italic font-display">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Results that speak for themselves. Here&apos;s what our clients say
            about partnering with Krypton Digital.
          </p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="testimonials-grid hidden md:grid grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card group p-8 bg-card border border-black/10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-electric/30 hover:shadow-[0_20px_60px_-20px_rgba(202, 109, 229,0.25)] transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-electric/10 border border-electric/20 rounded-2xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-electric" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < testimonial.rating
                        ? "text-gold fill-gold"
                        : "text-black/15",
                    )}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-zinc-100 rounded-full overflow-hidden ring-1 ring-black/10">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-foreground">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden" data-testid="testimonials-carousel">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full shrink-0 px-1"
                  >
                    <div className="p-6 bg-card border border-black/10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)]">
                      <div className="w-10 h-10 bg-electric/10 border border-electric/20 rounded-xl flex items-center justify-center mb-4">
                        <Quote className="w-5 h-5 text-electric" />
                      </div>

                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < testimonial.rating
                                ? "text-gold fill-gold"
                                : "text-black/15",
                            )}
                          />
                        ))}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-zinc-100 rounded-full overflow-hidden ring-1 ring-black/10">
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${testimonial.image})`,
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-foreground">{testimonial.name}</h4>
                          <p className="text-muted-foreground text-xs">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-electric hover:text-electric transition-colors focus-visible:ring-2 focus-visible:ring-electric"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-[color,background-color,border-color,box-shadow,transform,opacity]",
                      index === activeIndex
                        ? "bg-electric w-6"
                        : "bg-black/15 hover:bg-black/30",
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-electric hover:text-electric transition-colors focus-visible:ring-2 focus-visible:ring-electric"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-16 border-t border-black/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                4.9/5
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                Average Client Rating
              </p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                50+
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                Projects Delivered
              </p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                98%
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                Client Retention
              </p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                3x
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                Average ROI Increase
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
