import Link from "next/link";
import { Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <span className="text-[120px] md:text-[180px] font-black tracking-tighter text-primary leading-none">
            404
          </span>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">
          Page Not Found
        </h1>

        {/* Error Message */}
        <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-md mx-auto leading-relaxed">
          Oops! The page you&apos;re looking for seems to have vanished into the
          digital void.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-white font-bold rounded-full hover:bg-primary transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-zinc-200 rounded-full font-bold hover:border-primary hover:text-primary transition-all"
          >
            <HelpCircle className="w-5 h-5" />
            Get Help
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-10 border-t border-zinc-200">
          <p className="text-sm text-zinc-400 mb-6 uppercase tracking-widest font-bold">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="text-zinc-600 hover:text-primary transition-colors font-medium"
            >
              Pricing
            </Link>
            <span className="text-zinc-300">•</span>
            <Link
              href="/about"
              className="text-zinc-600 hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            <span className="text-zinc-300">•</span>
            <Link
              href="/contact"
              className="text-zinc-600 hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
            <span className="text-zinc-300">•</span>
            <Link
              href="/get-started"
              className="text-zinc-600 hover:text-primary transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
