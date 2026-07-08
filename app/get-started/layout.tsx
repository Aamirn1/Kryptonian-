import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Choose your engagement path with Krypton Digital — Fast Track, Strategy First, or Enterprise solutions.",
};

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
