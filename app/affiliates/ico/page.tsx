import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ICO Affiliate",
  description: "Krypton Digital — ICO (Information Commissioner's Office) affiliate.",
};

export default function ICOAffiliatePage() {
  return (
    <>
      
      <main className="pt-20 pb-32 px-6 min-h-screen bg-[#fafafa]">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <p className="text-primary font-bold text-sm tracking-widest uppercase">
              Affiliate
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 text-foreground">
            ICO
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Information Commissioner&apos;s Office — We are registered with the
            ICO for data protection compliance.
          </p>
          <div className="relative w-full max-w-md mx-auto aspect-square">
            <Image
              src="/images/affiliates/ico-logo.png"
              alt="ICO - Information Commissioner's Office"
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
