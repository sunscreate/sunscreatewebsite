"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BarChart3,
  Calendar,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export default function StaffDashboard() {
  const [isAvailable, setIsAvailable] = useState(true)

  // サンプルデータ
  const stats = {
    totalSales: 450000,
    commission: 360000,
    reservationCount: 24,
    completedCount: 20,
    cancelledCount: 1,
    upcomingCount: 3,
    messageCount: 2,
  }

  const todayReservations = [
    {
      id: 1,
      time: "13:00",
      customer: "山田 花子",
      service: "エアコンクリーニング 2台",
      status: "upcoming",
    },
    {
      id: 2,
      time: "15:30",
      customer: "佐藤 健一",
      service: "排水管洗浄",
      status: "upcoming",
    },
  ]

  const recentMessages = [
    {
      id: 1,
      name: "田中 美咲",
      message: "エアコンの調子について相談があります。",
      time: "10分前",
      unread: true,
    },
    {
      id: 2,
      name: "管理者",
      message: "今週の予定を確認してください。",
      time: "30分前",
      unread: true,
    },
  ]

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold">スタッフダッシュボード</h1>
          <p className="text-muted-foreground">山田 太郎さん、おはようございます。</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
            <span className="font-medium">稼働状態</span>
          </div>
          <Badge variant={isAvailable ? "default" : "secondary"}>{isAvailable ? "稼働中" : "停止中"}</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{stats.totalSales.toLocaleString()}</div>
            <div className="flex items-center pt-1 text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +20.1%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">手数料収入（80%）</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{stats.commission.toLocaleString()}</div>
            <div className="flex items-center pt-1 text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +20.1%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">予約件数</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reservationCount}件</div>
            <div className="flex items-center pt-1 text-sm">
              <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-muted-foreground">完了: {stats.completedCount}</span>
              <XCircle className="ml-2 mr-1 h-4 w-4 text-red-600" />
              <span className="text-muted-foreground">キャンセル: {stats.cancelledCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">未読メッセージ</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messageCount}件</div>
            <div className="flex items-center pt-1 text-sm text-amber-600">
              <AlertCircle className="mr-1 h-4 w-4" />
              確認が必要です
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>売上推移</CardTitle>
            <CardDescription>過去30日間の売上推移</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">グラフが表示されます</div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>本日の予約</CardTitle>
            <CardDescription>{format(new Date(), "yyyy年MM月dd日 (E)", { locale: ja })}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-start space-x-4">
                  <div className="bg-secondary w-2 h-2 mt-2 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{reservation.time}</Badge>
                      <span className="font-medium">{reservation.customer}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{reservation.service}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>未読メッセージ</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>{message.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{message.name}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                        {message.unread && <Badge className="bg-red-500">未読</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{message.message}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      返信
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>今週の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">予約済み</span>
                </div>
                <span className="text-2xl font-bold">{stats.upcomingCount}</span>
              </div>
              <Button className="w-full" variant="outline">
                スケジュール確認
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

