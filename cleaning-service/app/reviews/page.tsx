import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">お客様の声</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "田中 様",
              service: "エアコンクリーニング",
              rating: 5,
              comment:
                "丁寧な作業で、エアコンの調子が格段に良くなりました。スタッフの方の説明も分かりやすく、大変満足しています。",
            },
            {
              name: "佐藤 様",
              service: "排水管洗浄",
              rating: 5,
              comment:
                "長年気になっていた排水の詰まりがきれいに解消されました。作業後の説明も丁寧で、今後の管理方法まで教えていただき、とても参考になりました。",
            },
            {
              name: "鈴木 様",
              service: "エアコンクリーニング",
              rating: 5,
              comment:
                "予約から作業まで、とてもスムーズでした。作業後は見違えるようにキレイになり、嫌な臭いも消えました。",
            },
          ].map((review, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{review.name}</CardTitle>
                    <CardDescription>{review.service}</CardDescription>
                  </div>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

