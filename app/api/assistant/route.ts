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

// ZAI API config — embedded directly so it works on Vercel (no file needed).
const ZAI_CONFIG = {
  baseUrl: "https://internal-api.z.ai/v1",
  apiKey: "Z.ai",
  chatId: "chat-f9020f2c-0c1a-4dca-a513-3f6339ea0a3b",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjFlYjQ1ZGUtY2Q5Mi00ZGJjLTk5NDEtZmIxZTExZTlkY2MyIiwiY2hhdF9pZCI6ImNoYXQtZjkwMjBmMmMtMGMxYS00ZGNhLWE1MTMtM2Y2MzM5ZWEwYTNiIiwicGxhdGZvcm0iOiJ6YWkifQ.tLdNi2EDdUnT1x_qCH-yXBzm5lFLnZZO4xSDBmEWXEI",
  userId: "f1eb45de-cd92-4dbc-9941-fb1e11e9dcc2",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessages = body.messages || [];

    // Call the ZAI API directly via fetch (no SDK file dependency).
    const response = await fetch(`${ZAI_CONFIG.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ZAI_CONFIG.apiKey}`,
        "X-Z-AI-From": "Z",
        "X-Chat-Id": ZAI_CONFIG.chatId,
        "X-User-Id": ZAI_CONFIG.userId,
        "X-Token": ZAI_CONFIG.token,
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
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ZAI API error:", response.status, errorText);
      return NextResponse.json(
        { content: `API error ${response.status}: ${errorText.substring(0, 200)}` },
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
