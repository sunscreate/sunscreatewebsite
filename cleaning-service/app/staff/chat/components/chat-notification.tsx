"use client"

import { useState } from "react"
import { toast } from "sonner"
import { notifyNewMessage } from "../actions"

interface ChatNotificationProps {
  recipientEmail: string
  senderName: string
  messagePreview: string
}

export function ChatNotification({ recipientEmail, senderName, messagePreview }: ChatNotificationProps) {
  const [isSending, setIsSending] = useState(false)

  async function handleNotification() {
    setIsSending(true)
    try {
      const result = await notifyNewMessage(recipientEmail, senderName, messagePreview)
      if (!result.success) {
        throw new Error(result.error)
      }
      toast.success("通知メールを送信しました")
    } catch (error) {
      toast.error("通知の送信に失敗しました")
      console.error("Notification error:", error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <button
      onClick={handleNotification}
      disabled={isSending}
      className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
    >
      {isSending ? "送信中..." : "通知を送信"}
    </button>
  )
}

