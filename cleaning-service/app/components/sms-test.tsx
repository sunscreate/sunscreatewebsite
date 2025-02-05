"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function SMSTest() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSending(true)

    try {
      const response = await fetch("/api/sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send SMS")
      }

      toast.success("SMSを送信しました")
      setPhoneNumber("")
      setMessage("")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "SMSの送信に失敗しました")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          電話番号
        </label>
        <Input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="090-1234-5678"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          メッセージ
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力してください"
          required
        />
      </div>
      <Button type="submit" disabled={isSending}>
        {isSending ? "送信中..." : "SMSを送信"}
      </Button>
    </form>
  )
}

