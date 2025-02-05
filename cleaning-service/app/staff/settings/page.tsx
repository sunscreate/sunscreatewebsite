"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon, User, Bell, Lock, Clock, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function StaffSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [notificationSettings, setNotificationSettings] = useState({
    customerChat: true,
    adminChat: true,
    staffChat: true,
    reservationReminder: true,
    scheduleChange: true,
  })
  const [workPreferences, setWorkPreferences] = useState({
    maxReservationsPerDay: "5",
    preferredStartTime: "09:00",
    preferredEndTime: "18:00",
    breakTime: "60",
  })

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("新しいパスワードと確認用パスワードが一致しません")
      return
    }
    // パスワード変更のロジックをここに実装
    toast.success("パスワードを変更しました")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // プロフィール更新のロジックをここに実装
    toast.success("プロフィールを更新しました")
  }

  const handleNotificationChange = (key: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
    toast.success("通知設定を更新しました")
  }

  const handleWorkPreferenceChange = (key: string, value: string) => {
    setWorkPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
    toast.success("勤務設定を更新しました")
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">設定</h1>
        <p className="text-muted-foreground">アカウントと作業環境の設定を管理します</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            プロフィール
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            通知
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            セキュリティ
          </TabsTrigger>
          <TabsTrigger value="work" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            勤務設定
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>プロフィール設定</CardTitle>
              <CardDescription>個人情報とプロフィールの設定を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">氏名</Label>
                    <Input id="name" placeholder="山田 太郎" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kana">フリガナ</Label>
                    <Input id="kana" placeholder="ヤマダ タロウ" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input id="email" type="email" placeholder="yamada@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">電話番号</Label>
                    <Input id="phone" type="tel" placeholder="090-1234-5678" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">住所</Label>
                  <Input id="address" placeholder="東京都新宿区..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="お客様に表示される自己紹介文を入力してください"
                  />
                </div>

                <Button type="submit">更新する</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>メッセージやスケジュール変更の通知設定を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">SMS通知</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>お客様からのメッセージ</Label>
                      <p className="text-sm text-muted-foreground">
                        お客様から新しいメッセージが届いた時に通知を受け取ります
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.customerChat}
                      onCheckedChange={() => handleNotificationChange("customerChat")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>管理者からのメッセージ</Label>
                      <p className="text-sm text-muted-foreground">
                        管理者から新しいメッセージが届いた時に通知を受け取ります
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.adminChat}
                      onCheckedChange={() => handleNotificationChange("adminChat")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>他のスタッフからのメッセージ</Label>
                      <p className="text-sm text-muted-foreground">
                        他のスタッフから新しいメッセージが届いた時に通知を受け取ります
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.staffChat}
                      onCheckedChange={() => handleNotificationChange("staffChat")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">予約関連の通知</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>予約リマインダー</Label>
                      <p className="text-sm text-muted-foreground">予約の24時間前にリマインダーを受け取ります</p>
                    </div>
                    <Switch
                      checked={notificationSettings.reservationReminder}
                      onCheckedChange={() => handleNotificationChange("reservationReminder")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>スケジュール変更</Label>
                      <p className="text-sm text-muted-foreground">担当する予約に変更があった時に通知を受け取ります</p>
                    </div>
                    <Switch
                      checked={notificationSettings.scheduleChange}
                      onCheckedChange={() => handleNotificationChange("scheduleChange")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>セキュリティ設定</CardTitle>
              <CardDescription>パスワードの変更や二段階認証の設定を管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">現在のパスワード</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="new-password">新しいパスワード</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">8文字以上の英数字を設定してください</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">新しいパスワード（確認）</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button type="submit">パスワードを変更</Button>
              </form>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium">二段階認証</h3>
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertDescription>この機能は準備中です。今後のアップデートをお待ちください。</AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle>勤務設定</CardTitle>
              <CardDescription>作業時間や予約の受け入れに関する設定を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>1日の最大予約件数</Label>
                    <Select
                      value={workPreferences.maxReservationsPerDay}
                      onValueChange={(value) => handleWorkPreferenceChange("maxReservationsPerDay", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="件数を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}件
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>休憩時間</Label>
                    <Select
                      value={workPreferences.breakTime}
                      onValueChange={(value) => handleWorkPreferenceChange("breakTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="時間を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {[30, 45, 60, 90].map((minutes) => (
                          <SelectItem key={minutes} value={minutes.toString()}>
                            {minutes}分
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>希望開始時間</Label>
                    <Select
                      value={workPreferences.preferredStartTime}
                      onValueChange={(value) => handleWorkPreferenceChange("preferredStartTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="時間を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => i + 8).map((hour) => (
                          <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                            {`${hour}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>希望終了時間</Label>
                    <Select
                      value={workPreferences.preferredEndTime}
                      onValueChange={(value) => handleWorkPreferenceChange("preferredEndTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="時間を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 6 }, (_, i) => i + 16).map((hour) => (
                          <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                            {`${hour}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Alert className="bg-muted">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    これらの設定は希望として管理者に伝えられます。実際の予約状況により、
                    必ずしもご希望に添えない場合がございます。
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

