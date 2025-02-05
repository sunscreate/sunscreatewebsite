"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { sendNotificationEmail } from "@/app/actions/send-notification"

async function sendChatNotification(email: string, message: string) {
  try {
    const result = await sendNotificationEmail(
      email,
      "新しいチャットメッセージがあります",
      `新しいメッセージ: ${message}

チャットを確認するにはログインしてください。`,
    )

    if (!result.success) {
      throw new Error(result.error)
    }

    return { success: true }
  } catch (error) {
    console.error("Chat notification error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send notification",
    }
  }
}

export default function StaffChatPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">スタッフチャット</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">管理者とチャット</h2>
          <p className="text-muted-foreground mb-4">管理者に直接連絡が必要な場合はこちらから</p>
          <Button onClick={() => router.push("/chat/staff/admin")} className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            管理者とチャットする
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">チャット通知</h2>
          <p className="text-muted-foreground">チャットメッセージの通知は登録されたメールアドレスに送信されます。</p>
        </Card>
      </div>
    </div>
  )
}

