"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, Search, MoreVertical, Check, X, Upload, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

// In a real app, this would come from your database
const reviews = [
  {
    id: 1,
    customerName: "山田 花子",
    rating: 5,
    comment:
      "とても丁寧な作業で、エアコンの調子が格段に良くなりました。作業後の掃除も完璧で、スタッフの方の対応も親切でした。",
    date: "2024-01-20",
    service: "エアコンクリーニング",
    status: "published",
    staffName: "佐藤 一郎",
  },
  {
    id: 2,
    customerName: "佐藤 健一",
    rating: 4.5,
    comment: "予約から作業完了まで、スムーズに対応していただきました。エアコンの効きが良くなり、満足しています。",
    date: "2024-01-18",
    service: "エアコンクリーニング",
    status: "pending",
    staffName: "山田 太郎",
  },
  // Add more reviews...
]

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  )
}

export default function AdminReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [filterRating, setFilterRating] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [importData, setImportData] = useState({
    customerName: "",
    rating: "5",
    comment: "",
    service: "",
    staffName: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleImportReview = async () => {
    try {
      // In a real app, make an API call to save the imported review
      toast.success("レビューを追加しました")
      setShowImportDialog(false)
      setImportData({
        customerName: "",
        rating: "5",
        comment: "",
        service: "",
        staffName: "",
        date: new Date().toISOString().split("T")[0],
      })
    } catch (error) {
      toast.error("レビューの追加に失敗しました")
    }
  }

  const handleDeleteReview = async (reviewId: number) => {
    try {
      // In a real app, make an API call to delete the review
      toast.success("レビューを削除しました")
      setShowDeleteDialog(false)
      setSelectedReview(null)
    } catch (error) {
      toast.error("レビューの削除に失敗しました")
    }
  }

  const handleStatusChange = async (reviewId: number, newStatus: string) => {
    try {
      // In a real app, make an API call to update the status
      toast.success("レビューのステータスを更新しました")
    } catch (error) {
      toast.error("ステータスの更新に失敗しました")
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesRating = filterRating === "all" || review.rating >= Number(filterRating)
    const matchesStatus = filterStatus === "all" || review.status === filterStatus
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.staffName.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesRating && matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">レビュー管理</h1>
        <Button onClick={() => setShowImportDialog(true)}>
          <Upload className="w-4 h-4 mr-2" />
          レビューを追加
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>レビュー一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="評価で絞り込み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての評価</SelectItem>
                    <SelectItem value="5">5星以上</SelectItem>
                    <SelectItem value="4">4星以上</SelectItem>
                    <SelectItem value="3">3星以上</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="ステータスで絞り込み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのステータス</SelectItem>
                    <SelectItem value="pending">承認待ち</SelectItem>
                    <SelectItem value="published">公開中</SelectItem>
                    <SelectItem value="rejected">非公開</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>投稿日</TableHead>
                    <TableHead>お客様名</TableHead>
                    <TableHead>評価</TableHead>
                    <TableHead>担当スタッフ</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>{format(new Date(review.date), "yyyy年M月", { locale: ja })}</TableCell>
                      <TableCell>{review.customerName}</TableCell>
                      <TableCell>
                        <RatingStars rating={review.rating} />
                      </TableCell>
                      <TableCell>{review.staffName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            review.status === "published"
                              ? "default"
                              : review.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {
                            {
                              published: "公開中",
                              pending: "承認待ち",
                              rejected: "非公開",
                            }[review.status]
                          }
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedReview(review)
                                setShowReviewDialog(true)
                              }}
                            >
                              詳細を見る
                            </DropdownMenuItem>
                            {review.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => handleStatusChange(review.id, "published")}>
                                  <Check className="w-4 h-4 mr-2" />
                                  承認する
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(review.id, "rejected")}
                                  className="text-red-600"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  非公開にする
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedReview(review)
                                setShowDeleteDialog(true)
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              削除する
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>レビューを追加</DialogTitle>
            <DialogDescription>
              他のサイトでいただいたレビューや、メールでいただいたレビューを追加できます。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">お客様名</Label>
                <Input
                  id="customerName"
                  value={importData.customerName}
                  onChange={(e) => setImportData({ ...importData, customerName: e.target.value })}
                  placeholder="山田 花子"
                />
                <p className="text-sm text-muted-foreground">※仮名でも構いません</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">評価</Label>
                <Select
                  value={importData.rating}
                  onValueChange={(value) => setImportData({ ...importData, rating: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="評価を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">サービス内容</Label>
              <Input
                id="service"
                value={importData.service}
                onChange={(e) => setImportData({ ...importData, service: e.target.value })}
                placeholder="エアコンクリーニング"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="staffName">担当スタッフ</Label>
              <Input
                id="staffName"
                value={importData.staffName}
                onChange={(e) => setImportData({ ...importData, staffName: e.target.value })}
                placeholder="佐藤 一郎"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">投稿年月</Label>
              <Input
                id="date"
                type="month"
                value={importData.date.substring(0, 7)}
                onChange={(e) => setImportData({ ...importData, date: `${e.target.value}-01` })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">レビュー内容</Label>
              <Textarea
                id="comment"
                value={importData.comment}
                onChange={(e) => setImportData({ ...importData, comment: e.target.value })}
                placeholder="レビュー内容を入力してください"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={handleImportReview}>追加する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>レビューを削除</AlertDialogTitle>
            <AlertDialogDescription>
              このレビューを削除してもよろしいですか？この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedReview && handleDeleteReview(selectedReview.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-2xl">
          {selectedReview && (
            <>
              <DialogHeader>
                <DialogTitle>レビュー詳細</DialogTitle>
                <DialogDescription>
                  投稿日: {format(new Date(selectedReview.date), "yyyy年M月", { locale: ja })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <div className="font-medium">お客様名</div>
                  <div>{selectedReview.customerName}</div>
                </div>
                <div>
                  <div className="font-medium">評価</div>
                  <RatingStars rating={selectedReview.rating} />
                </div>
                <div>
                  <div className="font-medium">サービス内容</div>
                  <div>{selectedReview.service}</div>
                </div>
                <div>
                  <div className="font-medium">担当スタッフ</div>
                  <div>{selectedReview.staffName}</div>
                </div>
                <div>
                  <div className="font-medium">レビュー内容</div>
                  <div className="mt-1 text-gray-600">{selectedReview.comment}</div>
                </div>
              </div>
              <DialogFooter>
                {selectedReview.status === "pending" && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleStatusChange(selectedReview.id, "rejected")}>
                      非公開にする
                    </Button>
                    <Button onClick={() => handleStatusChange(selectedReview.id, "published")}>承認する</Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

