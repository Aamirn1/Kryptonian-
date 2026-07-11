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
          <div className="bg-card border border-black/10 rounded-3xl shadow-2xl shadow-black/10 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Icon & Text */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-electric/10 border border-electric/20 rounded-2xl flex items-center justify-center shrink-0">
                  <Cookie className="w-6 h-6 text-electric" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1 text-foreground">
                    We value your privacy
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                    We use cookies to enhance your browsing experience, serve
                    personalised content, and analyse our traffic. By clicking
                    &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                    <Link
                      href="/privacy"
                      className="text-electric hover:underline font-medium"
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
                  className="px-6 py-3 border border-black/10 rounded-xl hover:cursor-pointer text-sm font-semibold tracking-tight hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Preferences
                </button>
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 border border-black/10 rounded-xl hover:cursor-pointer text-sm font-semibold tracking-tight hover:bg-black/5 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="group relative overflow-hidden px-6 py-3 btn-gradient text-white rounded-xl hover:cursor-pointer text-sm font-semibold tracking-tight hover:btn-gradient-hover transition-colors flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    Accept All
                  </span>
                  <span className="shimmer-sweep" />
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
              className="relative bg-card rounded-3xl shadow-2xl shadow-black/20 w-full max-w-lg max-h-[85vh] flex flex-col border border-black/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-card border-b border-black/10 p-6 flex items-center justify-between shrink-0 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-electric/10 border border-electric/20 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-electric" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">Cookie Preferences</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full hover:bg-black/10 flex items-center justify-center transition-colors"
                  aria-label="Close cookie preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="p-6 space-y-6 overflow-y-auto overscroll-contain">
                {/* Essential Cookies */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-black/10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-display font-bold text-lg text-foreground">Essential Cookies</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-electric/20 text-electric mt-1">
                        Always On
                      </span>
                    </div>
                    <div className="w-12 h-6 bg-electric rounded-full relative" aria-hidden="true">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These cookies are necessary for the website to function and
                    cannot be switched off. They include session cookies and
                    consent preferences.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="p-5 bg-zinc-50 border border-black/10 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-display font-bold text-lg text-foreground" id="analytics-label">Analytics Cookies</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/5 text-muted-foreground mt-1">
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
                      <div className="w-12 h-6 bg-zinc-300 peer-focus-visible:ring-2 peer-focus-visible:ring-electric rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-[color,background-color,border-color,box-shadow,transform,opacity] peer-checked:bg-electric" />
                    </label>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. We use Google Analytics.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="p-5 bg-zinc-50 border border-black/10 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-display font-bold text-lg text-foreground" id="marketing-label">Marketing Cookies</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/5 text-muted-foreground mt-1">
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
                      <div className="w-12 h-6 bg-zinc-300 peer-focus-visible:ring-2 peer-focus-visible:ring-electric rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-[color,background-color,border-color,box-shadow,transform,opacity] peer-checked:bg-electric" />
                    </label>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These cookies may be set through our site by our advertising
                    partners to build a profile of your interests.
                  </p>
                </div>

                {/* Extra info */}
                <div className="p-5 bg-zinc-50 rounded-2xl border border-black/10">
                  <h4 className="font-display font-bold text-lg text-foreground mb-3">More Information</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    You can change your cookie preferences at any time by
                    clicking the Cookie Settings link in the footer of our
                    website.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    For more details about how we use cookies, please read our{" "}
                    <Link
                      href="/privacy"
                      className="text-electric hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-card border-t border-black/10 p-6 flex flex-col sm:flex-row gap-3 shrink-0 rounded-b-3xl">
                <button
                  onClick={handleAcceptEssential}
                  className="px-6 py-3 border border-black/10 rounded-xl text-sm font-semibold tracking-tight hover:bg-black/5 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="group relative overflow-hidden flex-1 px-6 py-3 btn-gradient text-white rounded-xl text-sm font-semibold tracking-tight hover:btn-gradient-hover transition-colors"
                >
                  <span className="relative z-10">Save Preferences</span>
                  <span className="shimmer-sweep" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
