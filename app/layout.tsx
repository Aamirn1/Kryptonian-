import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Krypton Digital | Future of Digital Growth",
    template: "%s | Krypton Digital",
  },
  applicationName: "Krypton Digital",
  description:
    "High-performance digital marketing agency delivering SEO, web development, brand identity, and digital strategy for exponential growth.",
  metadataBase: new URL("https://kryptondigital.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://kryptondigital.co.uk",
    siteName: "Krypton Digital",
    title: "Krypton Digital | Future of Digital Growth",
    description:
      "High-performance digital marketing agency delivering SEO, web development, brand identity, and digital strategy for exponential growth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Krypton Digital — Future of Digital Growth",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krypton Digital | Future of Digital Growth",
    description:
      "High-performance digital marketing agency delivering SEO, web development, brand identity, and digital strategy for exponential growth.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground selection:bg-electric/30 selection:text-white`}
      >
        {children}
        <CookieConsent />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
