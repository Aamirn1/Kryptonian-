import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import path from "path";
import fs from "fs";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessages = body.messages || [];

    // Read the config file directly (committed to repo, works on Vercel).
    const configPath = path.join(process.cwd(), ".z-ai-config");
    const configStr = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(configStr);

    // Call the ZAI API directly with the config.
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
        "X-Z-AI-From": "Z",
        "X-Token": config.token,
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...userMessages,
        ],
        temperature: 0.7,
        max_tokens: 500,
        thinking: { type: "disabled" },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ZAI API error:", response.status, errorText);
      return NextResponse.json(
        { content: "I'm having trouble connecting right now. Please try again or email us at contact@kryptondigital.co.uk" },
        { status: 200 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Sorry, I didn't catch that. Could you rephrase?";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Assistant API error:", error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { content: `Error: ${errorMsg.substring(0, 200)}` },
      { status: 200 }
    );
  }
}

export const maxDuration = 30;
