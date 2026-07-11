import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Services from "@/components/Services";
import SmoothScroll from "@/components/SmoothScroll";
import Testimonials from "@/components/Testimonials";

const siteUrl = "https://kryptondigital.co.uk";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Krypton Digital",
  alternateName: "Krypton Digital Agency",
  url: siteUrl,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Krypton Digital",
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.png`,
  sameAs: [
    "https://www.instagram.com/kryptondigital",
    "https://www.linkedin.com/company/kryptondigital",
    "https://www.facebook.com/kryptondigital",
  ],
};

export default function Home() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div className="relative min-h-screen bg-background text-foreground selection:bg-electric/25 selection:text-foreground antialiased overflow-x-hidden">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Services />
          <Process />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
