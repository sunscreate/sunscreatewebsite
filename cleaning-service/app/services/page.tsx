import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollButton } from "@/components/navigation/scroll-button"

// Constants to reduce render complexity
const AIRCON_STEPS = [
  {
    title: "1. 事前確認",
    description: "作業箇所の確認と起動テストを実施",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "2. 分解・点検",
    description: "本体の分解と各部品の状態確認",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "3. 高圧洗浄",
    description: "専用洗剤による熱交換器の徹底洗浄",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "4. パーツクリーニング",
    description: "各パーツの個別洗浄と乾燥",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "5. 組立",
    description: "本体の組み立てと動作確認",
  },
]

const DRAINAGE_STEPS = [
  {
    title: "1. 道具の準備",
    description: "高圧洗浄機など必要な機材の設置と点検",
  },
  {
    title: "2. お客様との確認",
    description: "気になっている箇所や症状のヒアリング、作業範囲の確認",
  },
  {
    title: "3. 屋外排水管",
    description: "排水桝からのアプローチで本管の洗浄を実施",
  },
  {
    title: "4. 各排水口からの排水管の洗浄",
    description: "キッチン、お風呂、洗面所など各所の排水管を徹底洗浄",
  },
  {
    title: "5. 作業終了箇所の確認",
    description: "お客様立ち会いのもと、排水状態の確認と説明",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">サービス内容</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              プロフェッショナルなエアコンクリーニングと排水管洗浄サービスで、
              <br className="hidden md:inline" />
              快適な環境を取り戻します。
            </p>
          </div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ScrollButton targetId="aircon-section">エアコンクリーニング</ScrollButton>
            <ScrollButton targetId="drainage-section">排水管洗浄</ScrollButton>
          </div>
        </div>
      </section>

      {/* エアコンクリーニング Section */}
      <section className="py-16 md:py-24" id="aircon-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">エアコンクリーニング</h2>
            <p className="text-lg mb-8 leading-relaxed">
              プロの技術と最高級の洗剤で、エアコンを徹底的にクリーニング。
              ヤニや頑固な汚れも完全に除去し、快適な空気環境を実現します。
            </p>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl">作業の流れ</CardTitle>
                      <CardDescription>1台あたり約60-90分（機種・汚れ具合により変動）</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      {AIRCON_STEPS.map((step, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/50">
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground text-lg">{step.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">特徴</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-6">
                        <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">最高級の業務用洗剤</h4>
                            <p className="text-muted-foreground">一般的なエコ洗剤では落ちない頑固な汚れも完全除去</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">豊富な実績</h4>
                            <p className="text-muted-foreground">飲食店などの油汚れ・ヤニ汚れにも対応した確かな実績</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">熟練スタッフ</h4>
                            <p className="text-muted-foreground">丁寧な作業で、エアコンの性能を最大限に回復</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl">料金表</CardTitle>
                      <CardDescription>明確な料金体系で、追加料金なしの安心価格</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                          <span className="font-medium">壁掛けエアコン</span>
                          <span className="font-bold text-lg">¥13,000〜</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                          <span className="font-medium">お掃除機能付きエアコン</span>
                          <span className="font-bold text-lg">¥19,000〜</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                          <span className="font-medium">天井埋込型・天吊り型</span>
                          <span className="font-bold text-lg">¥25,000〜</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                          <span className="font-medium">室外機</span>
                          <span className="font-bold text-lg">¥5,000〜</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Link href="/reservation" className="block">
                    <Button size="lg" className="w-full text-lg py-6">
                      今すぐ予約する
                    </Button>
                  </Link>

                  <Accordion type="single" collapsible className="bg-white rounded-lg border">
                    <AccordionItem value="notes" className="border-none">
                      <AccordionTrigger className="px-6">補足事項</AccordionTrigger>
                      <AccordionContent className="px-6">
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <span className="block w-1 h-1 rounded-full bg-muted-foreground" />
                            作業にはお水と電気を使用させていただきます
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="block w-1 h-1 rounded-full bg-muted-foreground" />
                            お風呂場など水を扱える場所をお借りします
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="block w-1 h-1 rounded-full bg-muted-foreground" />
                            作業時間は機種や汚れ具合により変動する場合があります
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 排水管洗浄 Section */}
      <section className="py-16 md:py-24 bg-white" id="drainage-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">排水管洗浄</h2>
            <p className="text-lg mb-8 leading-relaxed">
              排水の流れが悪い、異臭がする、ゴボゴボ音がするなどの トラブルを高圧洗浄で解決します。
            </p>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl">作業の流れ</CardTitle>
                      <CardDescription>作業時間の目安：2-3時間（建物の規模により変動）</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {DRAINAGE_STEPS.map((step, index) => (
                          <div key={index} className="p-4 rounded-lg bg-muted/50">
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-lg">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">対応可能な症状</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-6">
                        <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">排水の流れが悪い</h4>
                            <p className="text-muted-foreground">水はけが悪く、排水に時間がかかる状態</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">排水管からゴボゴボ音がする</h4>
                            <p className="text-muted-foreground">排水時に不快な音が発生する状態</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">異臭がする</h4>
                            <p className="text-muted-foreground">排水口から不快な臭いが漂う状態</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-1">外の排水桝から汚水が溢れている</h4>
                            <p className="text-muted-foreground">排水管の詰まりにより汚水が逆流している状態</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Alert className="bg-muted/50 border-2">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription className="text-base">
                      排水ホースの劣化状況や接続状況によって、部品の交換が必要となる場合があります。
                      その場合は事前にご説明の上、追加料金が発生する場合があります。
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl">料金表</CardTitle>
                      <CardDescription>建物の種類に応じた明確な料金体系</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                          <span className="font-medium">一般住宅</span>
                          <span className="font-bold text-lg">¥25,000〜</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                          <span className="font-medium">二世帯住宅</span>
                          <span className="font-bold text-lg">¥45,000〜</span>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground">
                            ※マンション・テナントビルなど一棟での作業は別途お見積りとなります。
                            お気軽にお問い合わせください。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Link href="/reservation" className="block">
                    <Button size="lg" className="w-full text-lg py-6">
                      今すぐ予約する
                    </Button>
                  </Link>

                  <Accordion type="single" collapsible className="bg-white rounded-lg border">
                    <AccordionItem value="notes" className="border-none">
                      <AccordionTrigger className="px-6">補足事項</AccordionTrigger>
                      <AccordionContent className="px-6">
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <span className="block w-1 h-1 rounded-full bg-muted-foreground" />
                            高圧洗浄機の音や振動が発生する場合があります
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="block w-1 h-1 rounded-full bg-muted-foreground" />
                            駐車場がない場合は事前にご相談ください（重量物の機材運搬があるため）
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="block w-1 h-1 rounded-full bg-muted-foreground" />
                            作業には電気と水道を使用させていただきます
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">まずはお気軽にご予約ください</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">24時間オンライン予約受付中</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/reservation" className="flex-1">
              <Button size="lg" className="w-full text-lg py-6">
                予約する
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-lg py-6">
                お問い合わせ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

