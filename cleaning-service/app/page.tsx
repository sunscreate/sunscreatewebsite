import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%94%BB%E5%83%8F-cCinSuIyKAHq1OmhuqJhpJ3ITMqiJG.jpeg"
          alt="Professional air conditioning unit"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 to-sky-900/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">SunsCreate</h1>
            <p className="text-xl md:text-2xl mb-8">サンズクリエイト</p>
            <p className="text-lg md:text-xl mb-8">プロフェッショナルなエアコンクリーニングと排水管洗浄サービス</p>
            <div className="flex gap-4">
              <Link href="/reservation">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600">
                  予約する
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 backdrop-blur-sm bg-white/10"
                >
                  サービス内容
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">私たちのサービス</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-sky-900">エアコン分解洗浄</h3>
              <p className="text-gray-600 mb-4">
                プロの技術者による丁寧な分解洗浄で、エアコンを清潔に保ち、効率的な運転をサポートします。
              </p>
              <Link href="/services#aircon-section">
                <Button variant="link" className="text-sky-600">
                  詳しく見る →
                </Button>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-sky-900">排水管洗浄</h3>
              <p className="text-gray-600 mb-4">
                最新の技術と専門知識で、詰まりや汚れを徹底的に除去し、快適な住環境を実現します。
              </p>
              <Link href="/services#drainage-section" className="text-sky-600">
                <Button variant="link" className="text-sky-600">
                  詳しく見る →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">お気軽にご予約ください</h2>
          <p className="mb-8 text-sky-100">24時間オンライン予約受付中</p>
          <Link href="/reservation">
            <Button size="lg" className="bg-white text-sky-900 hover:bg-sky-50">
              予約する
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

