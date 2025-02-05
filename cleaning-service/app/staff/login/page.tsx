"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface StaffCredentials {
  email: string
  password: string
}

// サンプルのスタッフデータ
const staffList: StaffCredentials[] = [
  {
    email: "yamada@sunscreate.com",
    password: "yamada123",
  },
  {
    email: "sato@sunscreate.com",
    password: "sato123",
  },
  {
    email: "suzuki@sunscreate.com",
    password: "suzuki123",
  },
  // 開発者アカウント
  {
    email: "sunscreate528@gmail.com",
    password: "kazu0528",
  },
]

export default function StaffLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // 実際のアプリケーションでは、ここでAPIを呼び出してサーバーサイドで認証を行う
    const staff = staffList.find((s) => s.email === email)

    if (staff && staff.password === password) {
      // 認証成功
      localStorage.setItem("staffAuthenticated", "true")
      localStorage.setItem("staffEmail", email)

      // 開発者アカウントの場合は特別なフラグを設定
      if (email === "sunscreate528@gmail.com") {
        localStorage.setItem("isAdmin", "true")
      }

      router.push("/staff")
    } else {
      setError("メールアドレスまたはパスワードが正しくありません")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">スタッフログイン</CardTitle>
          <CardDescription className="text-center">登録されたメールアドレスでログインしてください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@sunscreate.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button variant="link" className="text-sm text-muted-foreground" onClick={() => router.push("/")}>
              トップページに戻る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

