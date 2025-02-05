"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { toast } from "sonner"

export default function ReviewSubmissionPage({
  params,
}: {
  params: { token: string }
}) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error("評価を選択してください")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: params.token,
          rating,
          comment,
        }),
      })

      if (!response.ok) {
        throw new Error("レビューの送信に失敗しました")
      }

      toast.success("レビューを送信しました。ご協力ありがとうございました。")
      router.push("/reviews")
    } catch (error) {
      toast.error("レビューの送信に失敗しました。お手数ですが、もう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-md mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">レビューを書く</CardTitle>
            <p className="text-center text-sm text-muted-foreground mt-2">※お名前は仮名でも構いません</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">サービスの評価</label>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="p-1"
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(value)}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          value <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="comment" className="block text-sm font-medium">
                  ご感想・ご意見
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="サービスのご感想やご意見をお聞かせください"
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "送信中..." : "レビューを送信"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

