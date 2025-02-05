import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string
  subject: string
  text: string
  html?: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set")
    return {
      success: false,
      error: "Email service is not configured",
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "SunsCreate <onboarding@resend.dev>", // Using Resend's default sending domain
      to,
      subject,
      text,
      html: html || text,
      reply_to: "support@sunscreate.com", // Add reply-to address
    })

    if (error) {
      console.error("Resend API error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data?.id) {
      console.error("No message ID returned")
      return {
        success: false,
        error: "Failed to send email",
      }
    }

    return {
      success: true,
      messageId: data.id,
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

