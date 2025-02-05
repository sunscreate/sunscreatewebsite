import { NextResponse } from "next/server"
import { sendNotificationSMS } from "@/app/actions/send-sms"

export async function POST(request: Request) {
  try {
    const { phoneNumber, message } = await request.json()

    if (!phoneNumber || !message) {
      return NextResponse.json({ error: "Phone number and message are required" }, { status: 400 })
    }

    const result = await sendNotificationSMS(phoneNumber, message)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    })
  } catch (error) {
    console.error("SMS API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

