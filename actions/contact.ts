"use server";

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

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "contact@kryptondigital.com";

export async function sendContactEmail(
  formData: ContactFormData,
): Promise<ContactResponse> {
  try {
    const validated = contactSchema.safeParse(formData);

    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors;
      return { success: false, message: "Please check the form for errors", errors };
    }

    const { firstName, lastName, email, service, message } = validated.data;

    const subject = `New Contact Form Submission - ${service}`;
    const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message || "(none)"}`;
    const mailtoLink = `mailto:${CONTACT_TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        message: "Email service is not configured yet. Please click below to send via your email client.",
        mailtoLink,
      };
    }

    const resend = new Resend(apiKey);

    const safeName = `${escapeHtml(firstName)} ${escapeHtml(lastName)}`;
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = message
      ? escapeHtml(message).replace(/\n/g, "<br>")
      : "<em style=\"color:#999\">No message provided</em>";

    const fromEmail = process.env.RESEND_FROM_EMAIL || "Krypton Digital <noreply@kryptondigital.com>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission - ${service}`,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Contact Form Submission</title><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:40px 20px}.header{background:#cb6be6;padding:30px;border-radius:16px 16px 0 0;text-align:center}.header h1{color:white;margin:0;font-size:24px}.content{background:#f9f9f9;padding:30px;border-radius:0 0 16px 16px}.field{margin-bottom:20px}.field-label{font-weight:600;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}.field-value{font-size:16px;color:#111}</style></head><body><div class="container"><div class="header"><h1>New Lead from Krypton Digital Website</h1></div><div class="content"><div class="field"><div class="field-label">Name</div><div class="field-value">${safeName}</div></div><div class="field"><div class="field-label">Email</div><div class="field-value">${safeEmail}</div></div><div class="field"><div class="field-label">Service Interested In</div><div class="field-value">${safeService}</div></div><div class="field"><div class="field-label">Message</div><div class="field-value">${safeMessage}</div></div></div></div></body></html>`,
      text: `New Contact Form Submission\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message || "(none)"}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: `Failed to send email: ${error.message || "Unknown error"}.`, mailtoLink };
    }

    return { success: true, message: "Message sent successfully! We'll get back to you within 24 hours." };
  } catch (error) {
    console.error("Contact form error:", error);
    const subject = `New Contact Form Submission - ${formData.service}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message || "(none)"}`;
    const mailtoLink = `mailto:${CONTACT_TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { success: false, message: "An unexpected error occurred. Please try again or send via your email client.", mailtoLink };
  }
}
