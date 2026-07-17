"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot?: string; // Hidden anti-spam tracker
}) {
  try {
    // 🛑 SPAM GUARD: Automated bots fill out all available fields.
    // Real human users cannot see or interact with this field.
    if (formData.honeypot && formData.honeypot.trim() !== "") {
      console.warn(`[Spam Blocked]: Request from ${formData.email} intercepted via honeypot.`);
      return { success: true }; // Return true silently so the bot thinks it succeeded
    }

    const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL;
    
    if (!receiverEmail) {
      console.error("Missing NOTIFICATION_RECEIVER_EMAIL environment variable.");
      return { success: false };
    }

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiverEmail,
      subject: `✨ New ${formData.subject.toUpperCase()} Inquiry: ${formData.name}`,
      replyTo: formData.email,
      html: `
        <div style="background-color: #F9FAFB; padding: 40px 20px; font-family: 'Georgia', serif; color: #122244;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
            
            <!-- Metallic Gold Header Bar -->
            <div style="background: linear-gradient(45deg, #BF953F 0%, #FCF6BA 45%, #B38728 100%); height: 8px;"></div>
            
            <div style="padding: 40px;">
              <h1 style="color: #122244; font-size: 28px; margin-bottom: 8px; font-weight: normal;">New Client Inquiry</h1>
              <p style="color: #C8A153; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; margin-bottom: 30px; font-family: sans-serif; font-weight: bold;">Ayana General Trading</p>
              
              <div style="background-color: #F9FAFB; border-radius: 12px; padding: 24px; margin-bottom: 30px; border-left: 4px solid #C8A153;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-family: sans-serif; text-transform: uppercase;">Client Name</td>
                    <td style="padding: 8px 0; font-size: 16px; color: #122244; font-weight: bold;">${formData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-family: sans-serif; text-transform: uppercase;">Email Address</td>
                    <td style="padding: 8px 0; font-size: 16px; color: #122244;">${formData.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-family: sans-serif; text-transform: uppercase;">Phone Number</td>
                    <td style="padding: 8px 0; font-size: 16px; color: #122244;">${formData.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-family: sans-serif; text-transform: uppercase;">Interest</td>
                    <td style="padding: 8px 0; font-size: 16px; color: #C8A153; font-weight: bold; text-transform: capitalize;">${formData.subject}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 30px;">
                <h3 style="font-size: 14px; text-transform: uppercase; color: #122244; margin-bottom: 12px; font-family: sans-serif;">Message Details:</h3>
                <p style="font-size: 16px; line-height: 1.8; color: #374151; white-space: pre-wrap; font-style: italic; background-color: #ffffff; padding: 15px; border: 1px solid #F3F4F6; border-radius: 8px;">
                  "${formData.message}"
                </p>
              </div>

              <div style="margin-top: 40px; text-align: center; border-top: 1px solid #F3F4F6; padding-top: 20px;">
                <p style="font-size: 12px; color: #9ca3af; font-family: sans-serif;">
                  This inquiry was sent from your website contact form.
                </p>
              </div>
            </div>
          </div>
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