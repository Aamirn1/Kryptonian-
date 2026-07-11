"use server";

import { Resend } from "resend";
import { z } from "zod";

// Escape HTML to prevent injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Please enter a valid email"),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .max(5000, "Message is too long")
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  mailtoLink?: string;
};

// The email address that receives contact form submissions.
// Default: the Resend account owner's email (works with onboarding@resend.dev).
// To use contact@kryptondigital.co.uk, verify the domain on resend.com/domains
// and set CONTACT_TO_EMAIL env var.
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "amir03115794492@gmail.com";

export async function sendContactEmail(
  formData: ContactFormData,
): Promise<ContactResponse> {
  try {
    // Validate form data
    const validated = contactSchema.safeParse(formData);

    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Please check the form for errors",
        errors,
      };
    }

    const { firstName, lastName, email, service, message } = validated.data;

    // Build a mailto fallback link (used if Resend is not configured or fails).
    const subject = `New Contact Form Submission - ${service}`;
    const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message || "(none)"}`;
    const mailtoLink = `mailto:contact@kryptondigital.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Check if Resend API key is configured.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set in environment variables.");
      return {
        success: false,
        message:
          "Email service is not configured yet. Please click below to send via your email client, or contact us directly at contact@kryptondigital.co.uk.",
        mailtoLink,
      };
    }

    // Initialize Resend with the API key.
    const resend = new Resend(apiKey);

    // Escape all user input before inserting into HTML
    const safeName = `${escapeHtml(firstName)} ${escapeHtml(lastName)}`;
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = message
      ? escapeHtml(message).replace(/\n/g, "<br>")
      : "<em style=\"color:#999\">No message provided</em>";

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Krypton Digital <onboarding@resend.dev>";

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body { font-family: -apple-system, BlinkMacNextFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { background: #ca6de5; padding: 30px; border-radius: 16px 16px 0 0; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 16px 16px; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
              .field-value { font-size: 16px; color: #111; }
              .message-box { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e5e5e5; }
              .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #999; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Lead from Krypton Digital Website</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Name</div>
                  <div class="field-value">${safeName}</div>
                </div>

                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value">${safeEmail}</div>
                </div>

                <div class="field">
                  <div class="field-label">Service Interested In</div>
                  <div class="field-value">${safeService}</div>
                </div>

                <div class="field">
                  <div class="field-label">Message</div>
                  <div class="message-box">${safeMessage}</div>
                </div>

                <div class="footer">
                  <p>This email was sent from the contact form on kryptondigital.co.uk</p>
                  <p>${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Service: ${service}

Message:
${message || "(none)"}

---
Sent from kryptondigital.co.uk contact form
${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: `Failed to send email: ${error.message || "Unknown error"}. Please try again or contact us directly at contact@kryptondigital.co.uk.`,
        mailtoLink,
      };
    }

    return {
      success: true,
      message:
        "Message sent successfully! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    const subject = `New Contact Form Submission - ${formData.service}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message || "(none)"}`;
    const mailtoLink = `mailto:contact@kryptondigital.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return {
      success: false,
      message: "An unexpected error occurred. Please try again or send via your email client.",
      mailtoLink,
    };
  }
}
