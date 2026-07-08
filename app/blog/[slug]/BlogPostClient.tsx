"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import { BlogPost } from "@/lib/blog-server";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface BlogPostClientProps {
  post: BlogPost | null;
  allPosts: BlogPost[];
}

export default function BlogPostClient({
  post,
  allPosts,
}: BlogPostClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const relatedPosts = post
    ? allPosts
        .filter(
          (p) =>
            p.slug !== post.slug &&
            (p.category === post.category ||
              p.tags.some((t) => post.tags.includes(t))),
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".post-header",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
      );

      gsap.fromTo(
        ".post-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".post-content",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".related-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".related-section",
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [post]);

  // Handle not found
  if (!post) {
    return (
      <SmoothScroll>
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-electric font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </SmoothScroll>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  return (
    <SmoothScroll>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-background text-foreground selection:bg-electric/30 selection:text-white antialiased"
      >
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="relative pt-40 pb-20 px-6 overflow-hidden">
            <AuroraBackground />
            <div className="container mx-auto max-w-4xl relative z-10">
              <div className="post-header">
                {/* Back Link */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Blog
                </Link>

                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 bg-electric/10 text-electric text-sm font-bold rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {post.readingTime}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pb-8 border-b border-white/10">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{post.author}</p>
                    <p className="text-muted-foreground text-sm">{post.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="px-6 mb-16">
            <div className="container mx-auto max-w-5xl">
              <div className="relative aspect-video rounded-4xl overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="px-6 pb-20">
            <div className="container mx-auto max-w-4xl">
              <div className="grid lg:grid-cols-[1fr,280px] gap-16">
                {/* Main Content */}
                <div className="post-content">
                  <MarkdownRenderer content={post.content} />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm font-medium rounded-full"
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Share */}
                  <div className="flex items-center gap-4 mt-8">
                    <span className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share this article:
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          shareTitle,
                        )}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-electric hover:text-white hover:border-electric transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          shareUrl,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-electric hover:text-white hover:border-electric transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          shareUrl,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-electric hover:text-white hover:border-electric transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText(shareUrl)}
                        className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-electric hover:text-white hover:border-electric transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block">
                  <div className="sticky top-32 space-y-8">
                    {/* Newsletter */}
                    <div className="p-6 bg-card border border-white/10 rounded-2xl">
                      <h3 className="text-white font-bold text-lg mb-3">
                        Subscribe to Updates
                      </h3>
                      <p className="text-white/50 text-sm mb-4">
                        Get the latest insights delivered to your inbox.
                      </p>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground text-sm mb-3 focus:outline-none focus:border-electric"
                      />
                      <button className="w-full py-3 bg-electric text-white font-bold rounded-full hover:bg-electric/80 transition-colors text-sm">
                        Subscribe
                      </button>
                    </div>

                    {/* Categories */}
                    <div className="p-6 bg-card border border-white/10 rounded-2xl">
                      <h3 className="font-bold text-lg mb-4">Categories</h3>
                      <div className="space-y-2">
                        {Array.from(
                          new Set(allPosts.map((p) => p.category)),
                        ).map((category) => (
                          <Link
                            key={category}
                            href={`/blog?category=${category}`}
                            className="flex items-center justify-between py-2 text-white/70 hover:text-electric transition-colors"
                          >
                            <span>{category}</span>
                            <span className="text-sm text-white/50">
                              {
                                allPosts.filter((p) => p.category === category)
                                  .length
                              }
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="related-section py-20 px-6 bg-card border-y border-white/10">
              <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-12">
                  Related <span className="text-gradient italic">Articles</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.slug}
                      className="related-card group"
                    >
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="text-electric text-xs font-bold uppercase tracking-wider">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-electric transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="py-32 px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="relative p-12 md:p-20 bg-card border border-white/10 rounded-[3rem] overflow-hidden text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-electric/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
                    Ready to Implement These{" "}
                    <span className="text-gradient italic">Strategies</span>?
                  </h2>
                  <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Let&apos;s turn knowledge into results for your business.
                  </p>
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-5 btn-gradient text-white font-bold rounded-full transition-all active:scale-95"
                  >
                    <span className="shimmer-sweep" />
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
