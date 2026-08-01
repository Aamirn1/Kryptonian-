"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BCorporationAffiliatePage() {
  return (
    <>
      <Navbar hideSkipLink />
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/affiliates/bcorp-logo.png"
            alt="B-Corporation certification"
            className="w-full h-auto max-w-md mx-auto rounded-2xl"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
