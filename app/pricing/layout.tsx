import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for digital marketing services. Choose from Foundation & Launch packages or Ongoing Growth plans.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
