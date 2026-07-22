"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost } from "@/lib/blog-server";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface BlogClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export default function BlogClient({ initialPosts, categories }: BlogClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? initialPosts
      : initialPosts.filter((post) => post.category === activeCategory);

  const featuredPost = initialPosts[0];
  const recentPosts = filteredPosts.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-hero",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
      );

      gsap.fromTo(
        ".blog-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <SmoothScroll>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-[#fafafa] text-foreground selection:bg-primary selection:text-white antialiased overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="blog-hero pt-40 pb-20 px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold mb-8 tracking-widest uppercase">
                  <BookOpen className="w-3 h-3" />
                  Blog
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
                  Insights &{" "}
                  <span className="text-primary italic">Strategies</span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium">
                  Expert advice, industry trends, and proven strategies to grow
                  your digital presence.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Post */}
          {featuredPost && (
            <section className="px-6 pb-20">
              <div className="container mx-auto max-w-7xl">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block relative bg-foreground rounded-[3rem] overflow-hidden"
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative h-75 lg:h-125">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0" />
                    </div>

                    {/* Content Side */}
                    <div className="p-10 lg:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <span className="text-zinc-400 text-sm">
                          {featuredPost.readingTime}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">
                              {featuredPost.author}
                            </p>
                            <p className="text-zinc-500 text-xs">
                              {new Date(featuredPost.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Filter & Posts Grid */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                    activeCategory === "All"
                      ? "bg-foreground text-white"
                      : "bg-white border border-[#cb6ce6]/40 text-zinc-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                      activeCategory === category
                        ? "bg-foreground text-white"
                        : "bg-white border border-[#cb6ce6]/40 text-zinc-600 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Posts Grid */}
              <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="blog-card group bg-white border border-[#cb6ce6]/40 rounded-[2.5rem] overflow-hidden hover:shadow-xl hover:shadow-zinc-200/30 hover:border-primary/20 transition-all"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <div className="flex items-center gap-4 text-zinc-400 text-xs mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-zinc-500" />
                            </div>
                            <span className="text-sm font-medium">
                              {post.author}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-primary text-sm font-bold">
                            Read
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="relative p-12 md:p-20 bg-foreground rounded-[3rem] overflow-hidden text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
                    Ready to Grow Your{" "}
                    <span className="text-primary italic">Business</span>?
                  </h2>
                  <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Let&apos;s turn these strategies into results for your
                    business.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all active:scale-95"
                    >
                      Start Your Project
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all"
                    >
                      View Pricing
                    </Link>
                  </div>
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
