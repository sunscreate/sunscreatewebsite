"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { sendNotificationEmail } from "@/app/actions/send-notification"

interface ReservationFormData {
  name?: string
  email?: string
  phone?: string
  services?: Array<{
    service: string
    quantity: number
  }>
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inquiryType, setInquiryType] = useState("general")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Move localStorage access to useEffect to ensure it only runs on client
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedData = localStorage.getItem("reservationFormData")
        if (savedData) {
          const data: ReservationFormData = JSON.parse(savedData)
          setFormData((prev) => ({
            ...prev,
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            message: data.services
              ? `【予約に関するお問い合わせ】\n${data.services.map((s) => `${s.service} ${s.quantity}台`).join("\n")}`
              : "",
          }))
          setInquiryType("reservation")
          localStorage.removeItem("reservationFormData")
        }
      }
    } catch (error) {
      console.error("Error loading saved form data:", error)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const emailResult = await sendNotificationEmail(
        process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sunscreate528@gmail.com",
        `お問い合わせ: ${formData.name}様より`,
        `
お問い合わせ種別: ${
          {
            general: "一般的なお問い合わせ",
            reservation: "予約に関するお問い合わせ",
            quotation: "お見積りに関するお問い合わせ",
            other: "その他のお問い合わせ",
          }[inquiryType]
        }

お名前: ${formData.name}
メールアドレス: ${formData.email}
電話番号: ${formData.phone}

お問い合わせ内容:
${formData.message}
      `,
      )

      if (!emailResult.success) {
        throw new Error("Failed to send email")
      }

      toast.success("お問い合わせを受け付けました。担当者より折り返しご連絡させていただきます。")
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Contact form submission error:", error)
      toast.error("送信に失敗しました。お手数ですが、しばらく経ってからもう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">お問い合わせ</h1>
            <p className="mt-2 text-muted-foreground">
              サービスに関するご質問やご相談など、お気軽にお問い合わせください。
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>お問い合わせフォーム</CardTitle>
              <CardDescription>
                ご回答は営業時間内に順次対応させていただきます。
                <br />
                緊急の場合はお電話にてご連絡ください。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label>お問い合わせ種別</Label>
                  <RadioGroup value={inquiryType} onValueChange={setInquiryType} className="grid grid-cols-2 gap-4">
                    <Label
                      htmlFor="general"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <RadioGroupItem value="general" id="general" className="sr-only" />
                      一般的なお問い合わせ
                    </Label>
                    <Label
                      htmlFor="reservation"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <RadioGroupItem value="reservation" id="reservation" className="sr-only" />
                      予約に関するお問い合わせ
                    </Label>
                    <Label
                      htmlFor="quotation"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <RadioGroupItem value="quotation" id="quotation" className="sr-only" />
                      お見積りに関するお問い合わせ
                    </Label>
                    <Label
                      htmlFor="other"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <RadioGroupItem value="other" id="other" className="sr-only" />
                      その他のお問い合わせ
                    </Label>
                  </RadioGroup>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">お名前 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">メールアドレス *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">電話番号 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">お問い合わせ内容 *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "送信中..." : "送信する"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  「送信する」ボタンをクリックすることで、
                  <br />
                  お問い合わせの処理に必要な範囲で個人情報を利用することに同意したものとします。
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

