import { NextResponse } from "next/server"
import { sendEmail } from "@/app/lib/email"

export async function POST(request: Request) {
  try {
    const { email, subject, message } = await request.json()

    if (!email || !subject || !message) {
      return NextResponse.json({ error: "メールアドレス、件名、本文は必須です" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "正しいメールアドレスを入力してください" }, { status: 400 })
    }

    const result = await sendEmail({
      to: email,
      subject,
      text: message,
    })

    if (!result.success) {
      console.error("Email sending failed:", result.error)
      return NextResponse.json(
        { error: "メールの送信に失敗しました。しばらく経ってからもう一度お試しください。" },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    })
  } catch (error) {
    console.error("Notification API error:", error)
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 })
  }
}

