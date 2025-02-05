"use server"

import { sendEmail } from "../lib/email"

export async function sendNotificationEmail(email: string, subject: string, message: string) {
  if (!email || !message) {
    return {
      success: false,
      error: "Email and message are required",
    }
  }

  try {
    const result = await sendEmail({
      to: email,
      subject,
      text: message,
    })

    if (!result.success) {
      throw new Error(result.error)
    }

    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}

