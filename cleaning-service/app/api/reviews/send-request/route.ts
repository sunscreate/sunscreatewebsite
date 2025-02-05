import { NextResponse } from "next/server"
import { Resend } from "resend"
import { ReviewRequestEmail } from "@/components/emails/review-request"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { customerName, customerEmail, reservationId } = await req.json()

    // Generate a unique review token (in a real app, store this in your database)
    const reviewToken = `${reservationId}-${Date.now()}`

    const reviewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reviews/submit/${reviewToken}`

    await resend.emails.send({
      from: "SunsCreate <support@sunscreate.com>",
      to: customerEmail,
      subject: "サービスのご利用ありがとうございました - レビューのお願い",
      react: ReviewRequestEmail({
        customerName,
        reviewUrl,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send review request:", error)
    return NextResponse.json({ error: "Failed to send review request" }, { status: 500 })
  }
}

