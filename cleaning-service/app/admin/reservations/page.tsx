"use client"

import { useState } from "react"
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

export default function ReservationsPage() {
  const [date, setDate] = useState<Date>()
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [cancelReason, setCancelReason] = useState("")
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const router = useRouter()

  const handleCancel = () => {
    console.log(`Cancelling reservation with reason: ${cancelReason}`)
    setShowCancelDialog(false)
    setCancelReason("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">予約管理</h1>
          <p className="text-muted-foreground">予約の確認と管理ができます</p>
        </div>
        <Button className="w-full sm:w-auto">新規予約</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>予約一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="検索..." className="w-full md:max-w-xs" />
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

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>予約日時</TableHead>
                    <TableHead>顧客名</TableHead>
                    <TableHead>サービス内容</TableHead>
                    <TableHead>金額</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>担当者</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="min-w-[120px]">
                          <div className="font-medium">2024/01/25</div>
                          <div className="text-sm text-muted-foreground">13:00</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[150px]">
                          <div className="font-medium">山田 太郎</div>
                          <div className="text-sm text-muted-foreground">090-1234-5678</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[180px]">
                          <div>エアコンクリーニング 2台</div>
                          <div className="text-sm text-muted-foreground">室外機 2台</div>
                        </div>
                      </TableCell>
                      <TableCell>¥36,000</TableCell>
                      <TableCell>
                        <Badge variant="outline">未確定</Badge>
                      </TableCell>
                      <TableCell>
                        <div>佐藤 一郎</div>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-sm"
                          onClick={() => router.push("/chat/staff/1")}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          スタッフとチャット
                        </Button>
                      </TableCell>
                      <TableCell className="text-right space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button variant="ghost" size="sm" className="w-full sm:w-auto mb-2 sm:mb-0">
                          詳細
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/chat/customer/${i}`)}
                          className="w-full sm:w-auto mb-2 sm:mb-0"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          お客様とチャット
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 w-full sm:w-auto"
                          onClick={() => {
                            setSelectedReservation({ id: i })
                            setShowCancelDialog(true)
                          }}
                        >
                          キャンセル
                        </Button>
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

