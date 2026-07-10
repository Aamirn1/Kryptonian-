"use client";

import dynamic from "next/dynamic";

// Client wrapper so we can use `ssr: false` with next/dynamic (not allowed
// directly in Server Components like app/layout.tsx). This keeps the 319-line
// CookieConsent component out of the initial JS bundle on every page — it
// loads after first paint, which is fine since the banner only appears after
// a short delay anyway.
const CookieConsent = dynamic(() => import("./CookieConsent"), {
  ssr: false,
  loading: () => null,
});

export default function CookieConsentLazy() {
  return <CookieConsent />;
}
