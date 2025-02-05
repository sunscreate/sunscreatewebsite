import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">管理者専用ページ</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>予約管理</CardTitle>
              <CardDescription>予約の確認・編集・キャンセル</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/reservations">
                <Button className="w-full">予約を管理する</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>会員管理</CardTitle>
              <CardDescription>会員情報の確認・編集</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/members">
                <Button className="w-full">会員を管理する</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>スタッフ管理</CardTitle>
              <CardDescription>スタッフの登録・編集・ステータス変更</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/staff">
                <Button className="w-full">スタッフを管理する</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>売上管理</CardTitle>
              <CardDescription>売上の確認・レポート出力</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/sales">
                <Button className="w-full">売上を確認する</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>チャット管理</CardTitle>
              <CardDescription>スタッフ・顧客とのチャット</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/chat">
                <Button className="w-full">チャットを開く</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>設定</CardTitle>
              <CardDescription>システム設定・パスワード変更</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/settings">
                <Button className="w-full">設定を変更する</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

