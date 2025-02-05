"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { CalendarIcon, Search, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const cancelReasons = [
  { id: "customer-request", label: "お客様都合" },
  { id: "schedule-conflict", label: "スケジュール都合" },
  { id: "weather", label: "天候不良" },
  { id: "emergency", label: "緊急事態" },
  { id: "other", label: "その他" },
]

// サンプルデータ生成関数
const generateSampleReservations = (staffEmail: string) => {
  return [
    {
      id: 1,
      date: "2024/01/25",
      time: "13:00",
      customerName: "山田 花子",
      customerPhone: "090-1234-5678",
      service: "エアコンクリーニング",
      units: 2,
      additionalService: "室外機 2台",
      amount: 36000,
      status: "pending",
      staffEmail: "yamada@sunscreate.com",
    },
    {
      id: 2,
      date: "2024/01/26",
      time: "10:00",
      customerName: "佐藤 健一",
      customerPhone: "090-8765-4321",
      service: "排水管洗浄",
      units: 1,
      additionalService: "",
      amount: 25000,
      status: "confirmed",
      staffEmail: "yamada@sunscreate.com",
    },
    {
      id: 3,
      date: "2024/01/26",
      time: "15:00",
      customerName: "鈴木 美咲",
      customerPhone: "090-9999-8888",
      service: "エアコンクリーニング",
      units: 1,
      additionalService: "室外機 1台",
      amount: 18000,
      status: "completed",
      staffEmail: "sato@sunscreate.com",
    },
  ]
}

export default function StaffReservationsPage() {
  const [date, setDate] = useState<Date>()
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [cancelReason, setCancelReason] = useState("")
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [staffEmail, setStaffEmail] = useState<string>("")
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // ログインしているスタッフのメールアドレスを取得
    const email = localStorage.getItem("staffEmail")
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    if (email) {
      setStaffEmail(email)
      setIsAdmin(adminStatus)
    }
  }, [])

  const handleCancel = () => {
    console.log(`Cancelling reservation with reason: ${cancelReason}`)
    setShowCancelDialog(false)
    setCancelReason("")
  }

  // 予約データをフィルタリング
  const reservations = generateSampleReservations(staffEmail).filter(
    (reservation) => isAdmin || reservation.staffEmail === staffEmail,
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">未確定</Badge>
      case "confirmed":
        return <Badge variant="default">確定済み</Badge>
      case "completed":
        return <Badge variant="secondary">完了</Badge>
      case "cancelled":
        return <Badge variant="destructive">キャンセル</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">予約管理</h1>
          <p className="text-muted-foreground">担当する予約の確認と管理ができます</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>予約一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="検索..." className="pl-8 w-full" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="ステータス" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="pending">未確定</SelectItem>
                    <SelectItem value="confirmed">確定済み</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                    <SelectItem value="cancelled">キャンセル</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-start sm:justify-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ja }) : "日付で絞り込み"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={date} onSelect={setDate} locale={ja} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>予約日時</TableHead>
                    <TableHead>お客様情報</TableHead>
                    <TableHead>サービス内容</TableHead>
                    <TableHead>金額</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div className="min-w-[120px]">
                          <div className="font-medium">{reservation.date}</div>
                          <div className="text-sm text-muted-foreground">{reservation.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[150px]">
                          <div className="font-medium">{reservation.customerName}</div>
                          <div className="text-sm text-muted-foreground">{reservation.customerPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[180px]">
                          <div>
                            {reservation.service} {reservation.units}台
                          </div>
                          {reservation.additionalService && (
                            <div className="text-sm text-muted-foreground">{reservation.additionalService}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>¥{reservation.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col sm:flex-row gap-2 justify-end min-w-[200px]">
                          <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                            詳細
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/chat/customer/${reservation.id}`)}
                            className="w-full sm:w-auto"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            チャット
                          </Button>
                          {["pending", "confirmed"].includes(reservation.status) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full sm:w-auto text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedReservation(reservation)
                                setShowCancelDialog(true)
                              }}
                            >
                              キャンセル
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>予約キャンセル</DialogTitle>
            <DialogDescription>キャンセルの理由を選択してください。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup value={cancelReason} onValueChange={setCancelReason}>
              {cancelReasons.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.id} id={reason.id} />
                  <Label htmlFor={reason.id}>{reason.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              戻る
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={!cancelReason}>
              キャンセルする
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

