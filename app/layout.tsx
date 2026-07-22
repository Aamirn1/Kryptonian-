import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsentLazy from "@/components/CookieConsentLazy";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Krypton Digital | Future of Digital Growth",
    template: "%s | Krypton Digital",
  },
  applicationName: "Krypton Digital",
  description:
    "High-performance digital marketing agency delivering SEO, web development, brand identity, and digital strategy for exponential growth.",
  metadataBase: new URL("https://kryptondigital.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://kryptondigital.vercel.app",
    siteName: "Krypton Digital",
    title: "Krypton Digital | Future of Digital Growth",
    description:
      "High-performance digital marketing agency delivering SEO, web development, brand identity, and digital strategy for exponential growth.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krypton Digital — Future of Digital Growth",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krypton Digital | Future of Digital Growth",
    description:
      "High-performance digital marketing agency delivering SEO, web development, brand identity, and digital strategy for exponential growth.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieConsentLazy />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
