"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { X, Cookie, Settings, Check } from "lucide-react";
import Link from "next/link";

type ConsentType = "all" | "essential" | null;

const COOKIE_CONSENT_KEY = "cookie-consent";

// Subscribe to storage changes
const subscribe = (callback: () => void) => {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};

// Get stored consent from localStorage
const getStoredConsent = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY);
};

export default function CookieConsent() {
  // Use useSyncExternalStore to read localStorage without causing cascading renders
  const storedConsent = useSyncExternalStore(
    subscribe,
    getStoredConsent,
    () => null,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const consent = storedConsent as ConsentType;
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent === "all");
  const [marketingEnabled, setMarketingEnabled] = useState(consent === "all");

  useEffect(() => {
    // Show banner after delay only if no consent stored
    if (!storedConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [storedConsent]);

  // Lock body scroll when settings modal is open
  useEffect(() => {
    if (showSettings) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showSettings]);

  // Close settings modal on Escape
  useEffect(() => {
    if (!showSettings) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSettings(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showSettings]);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "all");
    setIsVisible(false);
    setShowSettings(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleSavePreferences = () => {
    const value = analyticsEnabled || marketingEnabled ? "all" : "essential";
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setIsVisible(false);
    setShowSettings(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleAcceptEssential = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setIsVisible(false);
    setShowSettings(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setIsVisible(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleClose = () => {
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6" role="dialog" aria-label="Cookie consent">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-[#281000] rounded-4xl shadow-2xl shadow-black/10 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Icon & Text */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
                    We use cookies to enhance your browsing experience, serve
                    personalised content, and analyse our traffic. By clicking
                    &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline font-medium"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-3 border border-[#281000] rounded-xl hover:cursor-pointer text-sm font-bold hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Preferences
                </button>
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 border border-[#281000] rounded-xl hover:cursor-pointer text-sm font-bold hover:bg-zinc-50 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-foreground text-white rounded-xl hover:cursor-pointer text-sm font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cookie preferences">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-white border-b border-[#281000]/20 p-6 flex items-center justify-between shrink-0 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Cookie Preferences</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-colors"
                  aria-label="Close cookie preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="p-6 space-y-6 overflow-y-auto overscroll-contain">
                {/* Essential Cookies */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-[#281000]/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">Essential Cookies</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 mt-1">
                        Always On
                      </span>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative" aria-hidden="true">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    These cookies are necessary for the website to function and
                    cannot be switched off. They include session cookies and
                    consent preferences.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="p-5 bg-white border border-[#281000] rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg" id="analytics-label">Analytics Cookies</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-600 mt-1">
                        Optional
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={analyticsEnabled}
                        onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                        aria-labelledby="analytics-label"
                      />
                      <div className="w-12 h-6 bg-zinc-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. We use Google Analytics.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="p-5 bg-white border border-[#281000] rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg" id="marketing-label">Marketing Cookies</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-600 mt-1">
                        Optional
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={marketingEnabled}
                        onChange={(e) => setMarketingEnabled(e.target.checked)}
                        aria-labelledby="marketing-label"
                      />
                      <div className="w-12 h-6 bg-zinc-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    These cookies may be set through our site by our advertising
                    partners to build a profile of your interests.
                  </p>
                </div>

                {/* Extra info */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-[#281000]/20">
                  <h4 className="font-bold text-lg mb-3">More Information</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-3">
                    You can change your cookie preferences at any time by
                    clicking the Cookie Settings link in the footer of our
                    website.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    For more details about how we use cookies, please read our{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-white border-t border-[#281000]/20 p-6 flex flex-col sm:flex-row gap-3 shrink-0 rounded-b-3xl">
                <button
                  onClick={handleAcceptEssential}
                  className="px-6 py-3 border border-[#281000] rounded-xl text-sm font-bold hover:bg-zinc-50 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-foreground text-white rounded-xl text-sm font-bold hover:bg-primary transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
