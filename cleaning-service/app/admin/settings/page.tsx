"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon, KeyIcon, BellIcon, UserIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentPassword !== "kazu0528") {
      setMessage({ type: "error", text: "現在のパスワードが正しくありません" })
      return
    }

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "新しいパスワードは8文字以上で設定してください" })
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "新しいパスワードと確認用パスワードが一致しません" })
      return
    }

    setMessage({ type: "success", text: "パスワードを更新しました" })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-5xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">設定</h1>
          <p className="text-muted-foreground mt-2">アカウントとシステムの設定を管理します</p>
        </div>

        <Tabs defaultValue="security" className="w-full">
          <TabsList className="w-full md:w-auto flex md:inline-flex mb-4 h-auto p-1 bg-muted">
            <TabsTrigger value="security" className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2">
              <KeyIcon className="h-4 w-4" />
              <span>セキュリティ</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2">
              <BellIcon className="h-4 w-4" />
              <span>通知</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2">
              <UserIcon className="h-4 w-4" />
              <span>プロフィール</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>パスワード変更</CardTitle>
                <CardDescription>セキュリティのため、定期的なパスワードの変更をお勧めします</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">現在のパスワード</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="max-w-md"
                      />
                    </div>

                    <Separator className="my-4" />

                    <div className="grid gap-2">
                      <Label htmlFor="new-password">新しいパスワード</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="max-w-md"
                      />
                      <p className="text-sm text-muted-foreground">8文字以上の英数字を設定してください</p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">新しいパスワード（確認）</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="max-w-md"
                      />
                    </div>
                  </div>

                  {message && (
                    <Alert variant={message.type === "error" ? "destructive" : "default"} className="max-w-md">
                      <InfoIcon className="h-4 w-4" />
                      <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="mt-6">
                    パスワードを変更
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>二段階認証</CardTitle>
                <CardDescription>アカウントのセキュリティを強化するための追加の認証設定</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-medium">メール認証</p>
                    <p className="text-sm text-muted-foreground">ログイン時にメールで認証コードを送信します</p>
                  </div>
                  <Button variant="outline">設定する</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
                <CardDescription>メールやシステム通知の設定を管理します</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">この機能は準備中です</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>プロフィール設定</CardTitle>
                <CardDescription>管理者アカウントの基本情報を設定します</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">この機能は準備中です</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

