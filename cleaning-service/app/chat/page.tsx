"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Image, Paperclip, Send } from "lucide-react"

export default function ChatPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSend = () => {
    // Handle sending message and file
    console.log("Sending message:", message)
    console.log("Sending file:", selectedFile)
    setMessage("")
    setSelectedFile(null)
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Card className="h-[calc(100vh-2rem)]">
        <CardHeader>
          <CardTitle>チャット</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)]">
          <Tabs defaultValue="customers" className="h-full">
            <TabsList>
              <TabsTrigger value="customers">お客様</TabsTrigger>
              <TabsTrigger value="staff">スタッフ</TabsTrigger>
            </TabsList>
            <div className="h-[calc(100%-2.5rem)] mt-2">
              <TabsContent value="customers" className="h-full m-0">
                <div className="grid h-full grid-cols-[280px_1fr]">
                  <div className="border-r">
                    <ScrollArea className="h-[calc(100vh-11rem)]">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer">
                          <Avatar>
                            <AvatarFallback>C{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">お客様{i}</div>
                            <div className="text-sm text-muted-foreground">最新のメッセージ...</div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  <div className="flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarFallback>C1</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-100 rounded-lg p-3 inline-block">
                              <p>エアコンの調子が悪いのですが、見ていただけますか？</p>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">14:00</div>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <div className="flex-1 text-right">
                            <div className="bg-blue-100 rounded-lg p-3 inline-block text-left">
                              <p>承知いたしました。具体的な症状を教えていただけますか？</p>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">14:05</div>
                          </div>
                          <Avatar>
                            <AvatarFallback>Me</AvatarFallback>
                          </Avatar>
                        </div>
                        {/* File message example */}
                        <div className="flex gap-3 justify-end">
                          <div className="flex-1 text-right">
                            <div className="bg-blue-100 rounded-lg p-3 inline-block text-left">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>請求書.pdf</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">14:10</div>
                          </div>
                          <Avatar>
                            <AvatarFallback>Me</AvatarFallback>
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
                            ×
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
                </div>
              </TabsContent>
              <TabsContent value="staff" className="h-full m-0">
                {/* Similar structure as customers tab */}
                <div className="grid h-full grid-cols-[280px_1fr]">
                  <div className="border-r">
                    <ScrollArea className="h-[calc(100vh-11rem)]">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer">
                          <Avatar>
                            <AvatarFallback>S{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">スタッフ{i}</div>
                            <div className="text-sm text-muted-foreground">最新のメッセージ...</div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  <div className="flex flex-col">
                    <ScrollArea className="flex-1 p-4">{/* Chat messages will appear here */}</ScrollArea>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input placeholder="メッセージを入力..." />
                        <Button>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

