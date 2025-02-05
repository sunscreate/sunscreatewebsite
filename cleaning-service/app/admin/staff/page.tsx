"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface StaffMember {
  id: number
  name: string
  services: string[]
  totalSales: number
  commission: number
  isActive: boolean
}

export default function StaffPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [showChatHistory, setShowChatHistory] = useState(false)
  const router = useRouter()

  // サンプルデータ
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: 1,
      name: "山田 太郎",
      services: ["エアコン分解洗浄", "排水管洗浄"],
      totalSales: 450000,
      commission: 360000,
      isActive: true,
    },
    {
      id: 2,
      name: "佐藤 次郎",
      services: ["エアコン分解洗浄"],
      totalSales: 280000,
      commission: 224000,
      isActive: false,
    },
    {
      id: 3,
      name: "鈴木 三郎",
      services: ["排水管洗浄"],
      totalSales: 350000,
      commission: 280000,
      isActive: true,
    },
  ])

  const handleStatusChange = (staffId: number, isActive: boolean) => {
    setStaffMembers(staffMembers.map((staff) => (staff.id === staffId ? { ...staff, isActive } : staff)))
  }

  // スタッフを稼働状態でソート
  const sortedStaffMembers = [...staffMembers].sort((a, b) => {
    if (a.isActive === b.isActive) return 0
    return a.isActive ? -1 : 1
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">スタッフ管理</h1>
          <p className="text-muted-foreground">スタッフの登録と管理ができます</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">新規スタッフ登録</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>新規スタッフ登録</DialogTitle>
              <DialogDescription>新しいスタッフの情報を入力してください。</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">基本情報</TabsTrigger>
                <TabsTrigger value="bank">振込先情報</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <div className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">氏名</Label>
                      <Input id="name" placeholder="山田 太郎" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="kana">フリガナ</Label>
                      <Input id="kana" placeholder="ヤマダ タロウ" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input id="email" type="email" placeholder="yamada@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input id="phone" type="tel" placeholder="090-1234-5678" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">住所</Label>
                    <Input id="address" placeholder="東京都新宿区..." />
                  </div>
                  <div className="space-y-2">
                    <Label>対応可能サービス</Label>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wall-ac" />
                        <Label htmlFor="wall-ac">壁掛けエアコン</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wall-ac-auto" />
                        <Label htmlFor="wall-ac-auto">壁掛けエアコン（お掃除機能付き）</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ceiling-ac" />
                        <Label htmlFor="ceiling-ac">埋め込み型・天吊り型エアコン</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="drain-home" />
                        <Label htmlFor="drain-home">排水管洗浄（一般住宅）</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="drain-double" />
                        <Label htmlFor="drain-double">排水管洗浄（二世帯住宅）</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bank">
                <div className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="bank-name">銀行名</Label>
                      <Input id="bank-name" placeholder="〇〇銀行" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="branch-name">支店名</Label>
                      <Input id="branch-name" placeholder="〇〇支店" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="account-type">口座種別</Label>
                      <Input id="account-type" placeholder="普通" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="account-number">口座番号</Label>
                      <Input id="account-number" placeholder="1234567" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="account-name">口座名義（カタカナ）</Label>
                    <Input id="account-name" placeholder="ヤマダ タロウ" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit" className="w-full">
                登録
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>スタッフ一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ステータス</TableHead>
                  <TableHead>氏名</TableHead>
                  <TableHead>対応サービス</TableHead>
                  <TableHead>総売上</TableHead>
                  <TableHead>手数料（80%）</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStaffMembers.map((staff) => (
                  <TableRow key={staff.id} className={!staff.isActive ? "opacity-60" : undefined}>
                    <TableCell>
                      <div className="min-w-[150px] flex items-center gap-2">
                        <Switch
                          checked={staff.isActive}
                          onCheckedChange={(checked) => handleStatusChange(staff.id, checked)}
                        />
                        <Badge variant={staff.isActive ? "default" : "secondary"}>
                          {staff.isActive ? "稼働中" : "停止中"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[120px]">{staff.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[200px]">{staff.services.join(", ")}</div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[120px]">¥{staff.totalSales.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[120px]">¥{staff.commission.toLocaleString()}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col sm:flex-row gap-2 justify-end min-w-[200px]">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          詳細
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => {
                            setSelectedStaff(staff.name)
                            setShowChatHistory(true)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          チャット履歴
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => router.push(`/chat/staff/${staff.id}`)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          チャットする
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showChatHistory} onOpenChange={setShowChatHistory}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedStaff}のチャット履歴</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="customer" className="w-full h-full">
            <TabsList>
              <TabsTrigger value="customer">お客様とのチャット</TabsTrigger>
              <TabsTrigger value="admin">管理者とのチャット</TabsTrigger>
            </TabsList>
            <TabsContent value="customer" className="h-[calc(100%-40px)]">
              <div className="border rounded-lg h-full overflow-y-auto p-4">
                {/* チャット履歴表示エリア */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">お客様 - 2024/01/24 10:00</p>
                      <div className="bg-gray-100 rounded-lg p-2 mt-1">
                        エアコンの調子が悪いのですが、見ていただけますか？
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 text-right">山田 太郎 - 2024/01/24 10:05</p>
                      <div className="bg-blue-100 rounded-lg p-2 mt-1 ml-auto">
                        承知いたしました。具体的な症状を教えていただけますか？
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="admin" className="h-[calc(100%-40px)]">
              <div className="border rounded-lg h-full overflow-y-auto p-4">
                {/* 管理者とのチャット履歴 */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">管理者 - 2024/01/24 09:00</p>
                      <div className="bg-gray-100 rounded-lg p-2 mt-1">本日の作業予定を確認してください。</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

