import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} SunsCreate. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ホーム
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-800">
            サービス内容
          </Link>
          <Link href="/reservation" className="text-gray-600 hover:text-gray-800">
            予約
          </Link>
        </div>
      </div>
    </footer>
  )
}

