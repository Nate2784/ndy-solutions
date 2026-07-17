"use server";

import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Initialize Upstash Redis Rate Limiter outside the handler function
// This safely persists connection states across serverless execution environments
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // Automatically looks for UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your .env
  limiter: Ratelimit.slidingWindow(3, "60 s"), // Max 3 message dispatches per minute per IP
});

export async function sendEmail(formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot?: string;
}) {
  try {
    // 2. Extract Client IP and run Rate Limit check instantly before processing anything else
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      console.warn(`[Upstash Rate Limited]: Blocked spam traffic from IP: ${ip}`);
      return { 
        success: false, 
        message: "Too many requests. Please wait before trying again." 
      };
    }

    // 3. SPAM GUARD: Intercept automated scraper bots
    if (formData.honeypot && formData.honeypot.trim() !== "") {
      console.warn(`[Honeypot Blocked]: Request from ${formData.email} dropped.`);
      return { success: true }; // Fake success message to fool the automated bot script
    }

    const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL;
    if (!receiverEmail) {
      console.error("Missing NOTIFICATION_RECEIVER_EMAIL environment variable.");
      return { success: false };
    }

    // 4. DISPATCH VIA RESEND
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiverEmail,
      subject: `✨ New ${formData.subject.toUpperCase()} Inquiry: ${formData.name}`,
      replyTo: formData.email,
      html: `
      <div style="background-color: #FAFAFA; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #09090B; margin: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #E4E4E7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border-collapse: separate;">
          <tbody>
            <tr>
              <td>
                
                <!-- Aqua Theme Accent Border Header Bar -->
                <div style="background: linear-gradient(90deg, #0098A6 0%, #00F2FE 100%); height: 6px; width: 100%;"></div>
                
                <!-- Main Content Container -->
                <div style="padding: 32px; padding-bottom: 24px;">
                  
                  <!-- Branding & Header Section -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                    <tr>
                      <td>
                        <p style="color: #0098A6; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                          Incoming Portal Request
                        </p>
                        <h1 style="color: #09090B; font-size: 24px; font-weight: 700; letter-spacing: -0.03em; margin: 0; line-height: 1.2;">
                          New Client Inquiry
                        </h1>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Structured Metadata Table (Glassmorphism Mock Accent) -->
                  <div style="background-color: rgba(0, 152, 166, 0.02); border-radius: 14px; padding: 20px; border: 1px solid rgba(0, 152, 166, 0.08); margin-bottom: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                      <!-- Client Name -->
                      <tr style="border-bottom: 1px solid rgba(9, 9, 11, 0.04);">
                        <td style="padding: 10px 0; font-size: 11px; color: #71717A; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; width: 30%;">Client Name</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #09090B; font-weight: 600;">${formData.name}</td>
                      </tr>
                      <!-- Email Address -->
                      <tr style="border-bottom: 1px solid rgba(9, 9, 11, 0.04);">
                        <td style="padding: 10px 0; font-size: 11px; color: #71717A; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Email</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #09090B;"><a href="mailto:${formData.email}" style="color: #0098A6; text-decoration: none;">${formData.email}</a></td>
                      </tr>
                      <!-- Phone Number -->
                      <tr style="border-bottom: 1px solid rgba(9, 9, 11, 0.04);">
                        <td style="padding: 10px 0; font-size: 11px; color: #71717A; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Phone</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #09090B;">${formData.phone}</td>
                      </tr>
                      <!-- Project Type / Subject -->
                      <tr>
                        <td style="padding: 10px 0; font-size: 11px; color: #71717A; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Interest</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #0098A6; font-weight: 600; text-transform: capitalize;">${formData.subject}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Message Vision Body Section -->
                  <div style="margin-top: 24px;">
                    <h3 style="font-size: 11px; text-transform: uppercase; color: #71717A; font-weight: 700; letter-spacing: 0.5px; margin: 0 0 10px 0;">
                      Project Blueprint:
                    </h3>
                    <div style="font-size: 14px; line-height: 1.6; color: #27272A; white-space: pre-wrap; background-color: #FAFAFA; padding: 16px; border: 1px solid #E4E4E7; border-radius: 12px;">${formData.message}</div>
                  </div>

                  <!-- Footer Metadata Block -->
                  <div style="margin-top: 36px; text-align: center; border-top: 1px solid #E4E4E7; padding-top: 20px;">
                    <p style="font-size: 12px; color: #71717A; margin: 0; line-height: 1.5;">
                      This inquiry was sent from your website contact form.
                    </p>
                    <p style="font-size: 11px; color: #A1A1AA; margin: 4px 0 0 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Processed securely by NDY - Tech Solutions
                    </p>
                  </div>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false };
    }
    
    return { success: true };
  } catch (err) {
    console.error("Server Action Exception:", err);
    return { success: false };
  }
}