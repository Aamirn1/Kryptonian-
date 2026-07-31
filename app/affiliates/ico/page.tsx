import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ICO Affiliate",
  description: "Krypton Digital — ICO (Information Commissioner's Office) affiliate.",
};

export default function ICOAffiliatePage() {
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
            ICO
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Information Commissioner&apos;s Office — We are registered with the
            ICO for data protection compliance.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/affiliates/ico-logo.png"
            alt="ICO - Information Commissioner's Office"
            className="w-full h-auto max-w-md mx-auto rounded-2xl"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
