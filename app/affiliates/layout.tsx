import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "%s | Krypton Digital",
  description: "Krypton Digital affiliate and certification.",
};

export default function AffiliatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
