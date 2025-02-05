"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Image, Paperclip, Send, StickyNote, Search, Plus, Calendar, Tag, X, ArrowLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Memo {
  id: number
  content: string
  date: string
  category: string
  tags: string[]
}

export default function StaffChatPage({ params }: { params: { id: string } }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [showNewMemo, setShowNewMemo] = useState(false)
  const [memoContent, setMemoContent] = useState("")
  const [memoCategory, setMemoCategory] = useState("")
  const [memoSearch, setMemoSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // サンプルメモデータ
  const memos: Memo[] = [
    {
      id: 1,
      content: "エアコン清掃の研修を実施予定",
      date: "2024-01-24",
      category: "研修",
      tags: ["スキルアップ", "清掃技術"],
    },
    {
      id: 2,
      content: "新しい清掃道具の使用方法について確認",
      date: "2024-01-23",
      category: "業務連絡",
      tags: ["道具", "マニュアル"],
    },
  ]

  const handleSend = () => {
    console.log("Sending message:", message)
    console.log("Sending file:", selectedFile)
    setMessage("")
    setSelectedFile(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleMemoSubmit = () => {
    // Here you would implement the actual memo creation logic
    console.log("Creating memo:", { content: memoContent, category: memoCategory })
    setShowNewMemo(false)
    setMemoContent("")
    setMemoCategory("")
  }

  const filteredMemos = memos.filter((memo) => {
    const matchesSearch =
      memo.content.toLowerCase().includes(memoSearch.toLowerCase()) ||
      memo.tags.some((tag) => tag.toLowerCase().includes(memoSearch.toLowerCase()))
    const matchesCategory = !selectedCategory || memo.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="h-[calc(100vh-2rem)]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">戻る</span>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>S1</AvatarFallback>
                </Avatar>
                <span>スタッフ: 山田 太郎</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)]">
          <Tabs defaultValue="chat" className="h-full">
            <TabsList>
              <TabsTrigger value="chat">チャット</TabsTrigger>
              <TabsTrigger value="memos">メモ</TabsTrigger>
            </TabsList>
            <div className="h-[calc(100%-2.5rem)] mt-2">
              <TabsContent value="chat" className="h-full m-0">
                <div className="flex flex-col h-full">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-3 inline-block">
                            <p>本日の作業予定を確認してください。</p>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">14:00</div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="flex-1 text-right">
                          <div className="bg-blue-100 rounded-lg p-3 inline-block text-left">
                            <p>承知いたしました。確認いたします。</p>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">14:05</div>
                        </div>
                        <Avatar>
                          <AvatarFallback>S1</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    {selectedFile && (
                      <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                        <Paperclip className="h-4 w-4" />
                        <span>{selectedFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 p-0 hover:bg-transparent text-muted-foreground"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,image/*"
                        onChange={handleFileSelect}
                      />
                      <Input
                        placeholder="メッセージを入力..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <Button onClick={handleSend}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="memos" className="h-full m-0">
                <div className="flex flex-col h-full">
                  <div className="mb-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Button onClick={() => setShowNewMemo(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        新規メモ
                      </Button>
                      <div className="flex-1" />
                      <div className="flex items-center gap-2">
                        <Select
                          value={selectedCategory || ""}
                          onValueChange={(value) => setSelectedCategory(value || null)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="カテゴリー" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">すべて</SelectItem>
                            <SelectItem value="研修">研修</SelectItem>
                            <SelectItem value="業務連絡">業務連絡</SelectItem>
                            <SelectItem value="その他">その他</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="メモを検索..."
                            value={memoSearch}
                            onChange={(e) => setMemoSearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="space-y-4">
                      {filteredMemos.map((memo) => (
                        <Card key={memo.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">{memo.category}</Badge>
                                  <span className="text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 inline-block mr-1" />
                                    {memo.date}
                                  </span>
                                </div>
                                <p className="text-sm">{memo.content}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Tag className="h-4 w-4 text-muted-foreground" />
                                  <div className="flex gap-1">
                                    {memo.tags.map((tag, index) => (
                                      <Badge key={index} variant="secondary">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                編集
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showNewMemo} onOpenChange={setShowNewMemo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規メモ作成</DialogTitle>
            <DialogDescription>スタッフに関するメモを作成します。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">カテゴリー</Label>
              <Select value={memoCategory} onValueChange={setMemoCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリーを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="研修">研修</SelectItem>
                  <SelectItem value="業務連絡">業務連絡</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">メモ内容</Label>
              <Textarea
                id="content"
                value={memoContent}
                onChange={(e) => setMemoContent(e.target.value)}
                placeholder="メモの内容を入力してください"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewMemo(false)}>
              キャンセル
            </Button>
            <Button onClick={handleMemoSubmit} disabled={!memoContent || !memoCategory}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

