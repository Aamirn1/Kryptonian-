import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our portfolio of digital marketing projects — web development, SEO campaigns, branding, and e-commerce solutions.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
