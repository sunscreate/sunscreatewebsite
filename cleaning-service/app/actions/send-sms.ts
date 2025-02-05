"use server"

import { sendSMS } from "../lib/twilio"

export async function sendNotificationSMS(phoneNumber: string, message: string) {
  if (!phoneNumber || !message) {
    return {
      success: false,
      error: "Phone number and message are required",
    }
  }

  // Format phone number to E.164 format
  let formattedPhone = phoneNumber.replace(/[^\d+]/g, "")
  if (!formattedPhone.startsWith("+")) {
    // Add Japan country code if not present
    formattedPhone = "+81" + formattedPhone.replace(/^0/, "")
  }

  try {
    const result = await sendSMS(formattedPhone, message)
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error("Error sending SMS:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send SMS",
    }
  }
}

