import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-bold text-sky-900">SunsCreate</span>
            <span className="text-sm text-gray-600">サンズクリエイト</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/reservation">
              <Button variant="ghost">予約</Button>
            </Link>
            <Link href="/services">
              <Button variant="ghost">サービス内容</Button>
            </Link>
            <Link href="/reviews">
              <Button variant="ghost">口コミ</Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="outline">管理者専用</Button>
            </Link>
            <Link href="/staff">
              <Button variant="outline">スタッフ専用</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Button variant="outline" className="md:hidden">
            <span className="sr-only">メニュー</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}

