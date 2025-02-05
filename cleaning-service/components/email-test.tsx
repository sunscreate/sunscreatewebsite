"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function EmailTest() {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSending(true)

    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "メール送信に失敗しました")
      }

      toast.success("メールを送信しました")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "メール送信に失敗しました"
      toast.error(errorMessage)
      console.error("Email sending error:", error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>メール送信テスト</CardTitle>
        <CardDescription>テストメールの送信ができます。Resendのデフォルトドメインから送信されます。</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              宛先メールアドレス
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              件名
            </label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="件名を入力してください"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              本文
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="メッセージを入力してください"
              required
            />
          </div>
          <Button type="submit" disabled={isSending} className="w-full">
            {isSending ? "送信中..." : "テストメールを送信"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

