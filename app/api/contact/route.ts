import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .max(5000, "Message is too long")
    .optional()
    .or(z.literal("")),
});

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "contact@kryptondigital.co.uk";

function buildMailtoLink(data: {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message?: string;
}): string {
  const subject = `New Contact Form Submission - ${data.service}`;
  const body = `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nService: ${data.service}\n\nMessage:\n${data.message || "(none)"}`;
  return `mailto:${CONTACT_TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validated = contactSchema.safeParse(body);
    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Please check the form for errors",
          errors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, service, message } = validated.data;
    const mailtoLink = buildMailtoLink({ firstName, lastName, email, service, message });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured yet. Please click below to send via your email client.",
          mailtoLink,
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = `${escapeHtml(firstName)} ${escapeHtml(lastName)}`;
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = message
      ? escapeHtml(message).replace(/\n/g, "<br>")
      : "<em style=\"color:#999\">No message provided</em>";

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Krypton Digital <noreply@kryptondigital.co.uk>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission - ${service}`,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Contact Form Submission</title><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:40px 20px}.header{background:#cb6be6;padding:30px;border-radius:16px 16px 0 0;text-align:center}.header h1{color:white;margin:0;font-size:24px}.content{background:#f9f9f9;padding:30px;border-radius:0 0 16px 16px}.field{margin-bottom:20px}.field-label{font-weight:600;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}.field-value{font-size:16px;color:#111}</style></head><body><div class="container"><div class="header"><h1>New Lead from Krypton Digital Website</h1></div><div class="content"><div class="field"><div class="field-label">Name</div><div class="field-value">${safeName}</div></div><div class="field"><div class="field-label">Email</div><div class="field-value">${safeEmail}</div></div><div class="field"><div class="field-label">Service Interested In</div><div class="field-value">${safeService}</div></div><div class="field"><div class="field-label">Message</div><div class="field-value">${safeMessage}</div></div></div></div></body></html>`,
      text: `New Contact Form Submission\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message || "(none)"}`,
    });

    if (error) {
      const errMsg =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message)
          : "Unknown provider error";
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(
        {
          success: false,
          message: `Failed to send email: ${errMsg}.`,
          mailtoLink,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! We'll get back to you within 24 hours.",
    });
  } catch (err) {
    const errMsg =
      err instanceof Error ? err.message : "Unknown error";
    console.error("Contact API error:", errMsg);
    return NextResponse.json(
      {
        success: false,
        message: `An unexpected error occurred: ${errMsg}.`,
      },
      { status: 500 }
    );
  }
}
