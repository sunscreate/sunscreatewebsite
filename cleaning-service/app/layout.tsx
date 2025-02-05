import { Inter } from "next/font/google"
import { MainNav } from "../components/main-nav"
import Link from "next/link"
import "./globals.css"
import type { Metadata } from "next"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | SunsCreate",
    default: "SunsCreate | エアコンクリーニング・排水管洗浄",
  },
  description:
    "プロフェッショナルなエアコンクリーニングと排水管洗浄サービスを提供。丁寧な作業と確かな技術で、快適な環境を実現します。",
  metadataBase: new URL("https://sunscreate.fun"),
  openGraph: {
    title: "SunsCreate | エアコンクリーニング・排水管洗浄",
    description:
      "プロフェッショナルなエアコンクリーニングと排水管洗浄サービスを提供。丁寧な作業と確かな技術で、快適な環境を実現します。",
    url: "https://sunscreate.fun",
    siteName: "SunsCreate",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code here
  },
  alternates: {
    canonical: "https://sunscreate.fun",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-white">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="font-bold text-xl">
                SunsCreate<span className="ml-1 text-lg">サンズクリエイト</span>
              </Link>
              <MainNav />
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}

