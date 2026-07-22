"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Blog post type
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: string;
  content: string;
};

// Path to blog posts
const postsDirectory = path.join(process.cwd(), "content/blog");

// Ensure directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

// Calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Get all blog posts - SERVER ONLY
export async function getAllPosts(): Promise<BlogPost[]> {
  // If directory doesn't exist or is empty, return sample posts
  if (!fs.existsSync(postsDirectory)) {
    return getSamplePosts();
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const mdxFiles = fileNames.filter((file) => file.endsWith(".mdx"));

  if (mdxFiles.length === 0) {
    return getSamplePosts();
  }

  const posts = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Krypton Digital",
      authorRole: data.authorRole || "Team",
      category: data.category || "General",
      tags: data.tags || [],
      image: data.image || "/services/strategy.png",
      readingTime: calculateReadingTime(content),
      content,
    } as BlogPost;
  });

  // Sort by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get a single blog post by slug - SERVER ONLY
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    // If file doesn't exist, check sample posts
    if (!fs.existsSync(fullPath)) {
      const samplePost = getSamplePosts().find((p) => p.slug === slug);
      return samplePost || null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Krypton Digital",
      authorRole: data.authorRole || "Team",
      category: data.category || "General",
      tags: data.tags || [],
      image: data.image || "/services/strategy.png",
      readingTime: calculateReadingTime(content),
      content,
    } as BlogPost;
  } catch {
    return null;
  }
}

// Get all unique categories - SERVER ONLY
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

// Get all unique tags - SERVER ONLY
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

// Sample posts for demonstration
function getSamplePosts(): BlogPost[] {
  return [
    {
      slug: "seo-trends-2026",
      title: "SEO Trends 2026: What You Need to Know",
      excerpt:
        "Discover the latest SEO trends shaping search rankings in 2026, from AI-driven content to Core Web Vitals evolution.",
      date: "2026-03-10",
      author: "Sarah Chen",
      authorRole: "Head of SEO",
      category: "SEO",
      tags: ["SEO", "Trends", "AI", "Search"],
      image: "/services/seo.png",
      readingTime: "8 min read",
      content: samplePostContent,
    },
    {
      slug: "conversion-rate-optimization",
      title: "The Complete Guide to Conversion Rate Optimization",
      excerpt:
        "Learn proven strategies to double your website's conversion rate through data-driven design and persuasive copy.",
      date: "2026-03-05",
      author: "Alex Thompson",
      authorRole: "Founder & CEO",
      category: "CRO",
      tags: ["CRO", "Conversion", "UX", "Design"],
      image: "/services/conversion.png",
      readingTime: "12 min read",
      content: samplePostContent2,
    },
    {
      slug: "brand-identity-importance",
      title: "Why Brand Identity Matters More Than Ever",
      excerpt:
        "In a crowded digital landscape, a strong brand identity is your competitive advantage. Here's how to build one.",
      date: "2026-02-28",
      author: "Marcus Johnson",
      authorRole: "Creative Director",
      category: "Branding",
      tags: ["Branding", "Identity", "Design", "Strategy"],
      image: "/services/brand.png",
      readingTime: "6 min read",
      content: samplePostContent3,
    },
    {
      slug: "nextjs-performance",
      title: "Maximizing Next.js Performance for SEO",
      excerpt:
        "Technical deep-dive into optimizing Next.js applications for Core Web Vitals and search engine visibility.",
      date: "2026-02-20",
      author: "Sarah Chen",
      authorRole: "Head of SEO",
      category: "Development",
      tags: ["Next.js", "Performance", "SEO", "Technical"],
      image: "/services/web-dev.png",
      readingTime: "10 min read",
      content: samplePostContent4,
    },
    {
      slug: "content-strategy-2026",
      title: "Building a Content Strategy That Converts",
      excerpt:
        "Create content that not only ranks but drives real business results with our comprehensive framework.",
      date: "2026-02-15",
      author: "Emily Rodriguez",
      authorRole: "Client Success",
      category: "Content",
      tags: ["Content", "Strategy", "Marketing", "SEO"],
      image: "/services/strategy.png",
      readingTime: "9 min read",
      content: samplePostContent5,
    },
    {
      slug: "ppc-roas-optimization",
      title: "How We Achieved 4.5x ROAS for Our Client",
      excerpt:
        "A case study breakdown of our PPC optimization strategies that delivered exceptional returns on ad spend.",
      date: "2026-02-08",
      author: "Alex Thompson",
      authorRole: "Founder & CEO",
      category: "PPC",
      tags: ["PPC", "Google Ads", "ROAS", "Case Study"],
      image: "/services/market.png",
      readingTime: "7 min read",
      content: samplePostContent6,
    },
  ];
}

// Sample MDX content
const samplePostContent = `
# SEO Trends 2026: What You Need to Know

Search engine optimization continues to evolve at a rapid pace. In 2026, we're seeing major shifts in how search engines understand and rank content.

## 1. AI-Driven Content Understanding

Google's AI algorithms have become sophisticated at understanding context and user intent. Keyword stuffing is officially dead—semantic relevance is king.

### Key Takeaways:
- Focus on topic clusters, not single keywords
- Create comprehensive content that answers related questions
- Use natural language that matches user search patterns

## 2. Core Web Vitals Evolution

Page experience signals continue to gain importance. Beyond the basics, we're now seeing:

- **Interaction to Next Paint (INP)** replacing FID
- **Time to First Byte (TTFB)** gaining more weight
- Mobile-first indexing is now the only indexing

## 3. E-E-A-T is Non-Negotiable

Experience, Expertise, Authoritativeness, and Trustworthiness aren't just buzzwords—they're ranking factors.

> "In 2026, we've seen a 40% correlation between strong E-E-A-T signals and top 3 rankings." — Sarah Chen, Head of SEO

## 4. Voice Search Optimization

With 55% of households using voice search daily, optimizing for conversational queries is essential.

## Conclusion

The SEO landscape in 2026 rewards quality, user-focused content more than ever. Technical excellence is table stakes—true differentiation comes from exceptional content that genuinely serves user needs.
`;

const samplePostContent2 = `
# The Complete Guide to Conversion Rate Optimization

Converting visitors into customers is both an art and a science. This guide covers everything you need to know about CRO.
`;

const samplePostContent3 = `
# Why Brand Identity Matters More Than Ever

Your brand identity is the foundation of all your marketing efforts. Learn why it matters and how to build a strong one.
`;

const samplePostContent4 = `
# Maximizing Next.js Performance for SEO

Next.js is a powerful framework for building fast, SEO-friendly websites. Here's how to optimize it further.
`;

const samplePostContent5 = `
# Building a Content Strategy That Converts

Content is king, but only if it's strategically planned. Learn our framework for creating content that drives results.
`;

const samplePostContent6 = `
# How We Achieved 4.5x ROAS for Our Client

A detailed breakdown of our PPC strategies that delivered exceptional results for our e-commerce client.
`;
