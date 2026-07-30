import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "B-Corporation Affiliate",
  description: "Krypton Digital — B-Corporation certified affiliate.",
};

export default function BCorporationAffiliatePage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-32 px-6 min-h-screen bg-[#fafafa]">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <p className="text-primary font-bold text-sm tracking-widest uppercase">
              Affiliate
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 text-foreground">
            B-Corporation
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Certified B-Corporation — Meeting the highest standards of social
            and environmental performance, transparency, and accountability.
          </p>
          <div className="relative w-full max-w-md mx-auto aspect-square">
            <Image
              src="/images/affiliates/bcorp-logo.png"
              alt="B-Corporation certification"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
