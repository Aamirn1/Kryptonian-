import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  // Enable gzip/brotli compression on the server.
  compress: true,
  // Hide the X-Powered-By header (minor security + saves bytes).
  poweredByHeader: false,
  // Strip console.* in production (keeps error/warn). Significantly reduces
  // shipped JS from libs that log chatty debug output.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  images: {
    // Serve AVIF first (smaller than WebP), fall back to WebP then original.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images longer at the CDN edge.
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kryptondigital.co.uk",
      },
      {
        protocol: "https",
        hostname: "*.kryptondigital.co.uk",
      },
    ],
  },
  experimental: {
    // Tree-shake unused exports from heavy icon/Component libraries so only
    // the icons/components actually used ship to the client.
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  // Silence the multiple-lockfile workspace-root warning + speed up builds.
  turbopack: {
    root: __dirname,
  },
  // Security headers + long-cache static assets.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Long-cache Next.js optimized images (_next/image).
        source: "/_next/image/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Long-cache static assets in _next/static.
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
