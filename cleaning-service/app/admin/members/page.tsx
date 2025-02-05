"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("name")

  // サンプルデータ
  const members = [
    {
      id: 1,
      name: "山田 太郎",
      email: "yamada@example.com",
      phone: "090-1234-5678",
      address: "東京都新宿区...",
      registeredAt: "2024-01-20",
      reservationCount: 3,
    },
    // 他のメンバーデータ
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">会員管理</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>会員一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="検索項目" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">氏名</SelectItem>
                  <SelectItem value="email">メールアドレス</SelectItem>
                  <SelectItem value="phone">電話番号</SelectItem>
                  <SelectItem value="address">住所</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>氏名</TableHead>
                    <TableHead>メールアドレス</TableHead>
                    <TableHead>電話番号</TableHead>
                    <TableHead>住所</TableHead>
                    <TableHead>登録日</TableHead>
                    <TableHead>予約回数</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="min-w-[120px]">{member.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[180px]">{member.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[120px]">{member.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[200px]">{member.address}</div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[100px]">{member.registeredAt}</div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[80px]">{member.reservationCount}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          詳細
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
    </div>
  )
}

