import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "Krypton Digital Support Assistant", an AI assistant for Krypton Digital, a high-performance digital marketing agency.

About Krypton Digital:
- We deliver SEO, web development, brand identity, and digital strategy for exponential growth.
- Our services include: Digital Strategy, Web Development, SEO Optimization, Brand Identity, Market Analysis, and Conversion Growth.
- We offer Foundation & Launch packages (one-time: Silver £500, Gold £1,200, Platinum £3,000) and Ongoing Growth monthly plans (Silver £299/month, Gold £799/month, Platinum £1,500/month).
- Contact: contact@kryptondigital.co.uk, +44 7424 792233
- We help businesses achieve market-leading digital presence and ROI.

Your role:
- Answer questions about our services, pricing, and process.
- Help visitors decide which package suits their needs.
- Direct them to the contact form or pricing page for next steps.
- Be friendly, professional, and concise (max 3-4 sentences).
- If you don't know something, suggest contacting the team directly.`;

// Pre-built responses for common questions (works on Vercel without external API).
const QUICK_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["service", "offer", "do you", "provide"],
    response: "We offer 6 core services: Digital Strategy, Web Development, SEO Optimization, Brand Identity, Market Analysis, and Conversion Growth. Each is designed to engineer compounding growth for your business. Would you like details on any specific service?",
  },
  {
    keywords: ["price", "pricing", "cost", "how much", "package", "plan"],
    response: "We offer two package types:\n\nFoundation & Launch (one-time):\n• Silver - £500\n• Gold - £1,200\n• Platinum - £3,000\n\nOngoing Growth (monthly):\n• Silver - £299/month\n• Gold - £799/month\n• Platinum - £1,500/month\n\nVisit our Pricing page for full details, or contact us for a custom quote!",
  },
  {
    keywords: ["contact", "email", "phone", "reach", "call"],
    response: "You can reach us at:\n📧 contact@kryptondigital.co.uk\n📞 +44 7424 792233\n\nOr fill out the contact form on our Contact page — we typically respond within 24 hours!",
  },
  {
    keywords: ["seo", "search", "ranking", "google"],
    response: "Our SEO Optimization service includes Technical SEO, On-Page Optimization, Link Building, and Local SEO. We've helped clients achieve 250%+ organic traffic growth and #1 rankings. Check our Pricing page for SEO-inclusive packages!",
  },
  {
    keywords: ["web", "website", "development", "build", "site"],
    response: "Our Web Development service builds high-performance websites with Next.js, responsive design, performance optimization, and API integration. We focus on conversion-driven design. Visit our Portfolio to see our work!",
  },
  {
    keywords: ["brand", "logo", "identity", "design"],
    response: "Our Brand Identity service includes Logo Design, Brand Guidelines, Visual Identity, and Brand Strategy. We craft unique visual personas that resonate with high-value audiences. Starting from £500 — see our Pricing page!",
  },
  {
    keywords: ["hello", "hi", "hey", "greeting"],
    response: "Hi! I'm the Krypton Digital Support Assistant. I can help you with information about our services, pricing, and process. What would you like to know?",
  },
  {
    keywords: ["thank", "thanks", "great", "awesome"],
    response: "You're welcome! Feel free to ask if you have any more questions. You can also reach us at contact@kryptondigital.co.uk or visit our Pricing page to get started!",
  },
];

function findQuickResponse(userMessage: string): string | null {
  const lower = userMessage.toLowerCase();
  for (const item of QUICK_RESPONSES) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.response;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessages = body.messages || [];

    const lastMessage = userMessages.filter((m: { role: string }) => m.role === "user").pop();
    const userContent = lastMessage?.content || "";

    // Try quick response first (instant, no API needed)
    const quick = findQuickResponse(userContent);
    if (quick) {
      return NextResponse.json({ content: quick });
    }

    // Default response for unmatched queries
    return NextResponse.json({
      content: "That's a great question! For detailed information, I'd recommend visiting our Services or Pricing pages. You can also contact our team directly at contact@kryptondigital.co.uk or +44 7424 792233 — we respond within 24 hours!",
    });
  } catch (error) {
    console.error("Assistant API error:", error);
    return NextResponse.json(
      { content: "I'm having trouble right now. Please email us at contact@kryptondigital.co.uk" },
      { status: 200 }
    );
  }
}
