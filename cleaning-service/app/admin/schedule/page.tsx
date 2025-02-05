"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval } from "date-fns"
import { ja } from "date-fns/locale"
import { Clock, Users, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Staff {
  id: number
  name: string
  isActive: boolean
}

interface TimeSlot {
  hour: number
  isAvailable: boolean
}

interface DaySchedule {
  date: Date
  timeSlots: TimeSlot[]
}

export default function SchedulePage() {
  const [selectedStaff, setSelectedStaff] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date())
  const [showBulkEdit, setShowBulkEdit] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  // サンプルデータ
  const staffList: Staff[] = [
    { id: 1, name: "山田 太郎", isActive: true },
    { id: 2, name: "佐藤 次郎", isActive: true },
    { id: 3, name: "鈴木 三郎", isActive: true },
  ]

  const timeSlots = Array.from({ length: 8 }, (_, i) => ({
    hour: i + 9,
    isAvailable: true,
  }))

  const weekStart = startOfWeek(currentWeek, { locale: ja })
  const weekEnd = endOfWeek(currentWeek, { locale: ja })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1))
  }

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1))
  }

  const handleBulkEdit = () => {
    console.log("Bulk edit:", { selectedTimeRange, selectedDays })
    setShowBulkEdit(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">スケジュール管理</h1>
          <p className="text-muted-foreground">スタッフの稼働時間を管理します</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedStaff} onValueChange={setSelectedStaff}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="スタッフを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全てのスタッフ</SelectItem>
              {staffList.map((staff) => (
                <SelectItem key={staff.id} value={staff.id.toString()}>
                  {staff.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={showBulkEdit} onOpenChange={setShowBulkEdit}>
            <DialogTrigger asChild>
              <Button>一括設定</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>スケジュール一括設定</DialogTitle>
                <DialogDescription>複数の時間帯や日付をまとめて設定できます。</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <Label>対象時間</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                      <div key={hour} className="flex items-center space-x-2">
                        <Checkbox
                          id={`hour-${hour}`}
                          checked={selectedTimeRange.includes(hour.toString())}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTimeRange([...selectedTimeRange, hour.toString()])
                            } else {
                              setSelectedTimeRange(selectedTimeRange.filter((h) => h !== hour.toString()))
                            }
                          }}
                        />
                        <Label htmlFor={`hour-${hour}`}>{`${hour}:00`}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>対象曜日</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day}`}
                          checked={selectedDays.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDays([...selectedDays, day])
                            } else {
                              setSelectedDays(selectedDays.filter((d) => d !== day))
                            }
                          }}
                        />
                        <Label htmlFor={`day-${day}`}>{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>稼働設定</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="稼働状態を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">稼働可能</SelectItem>
                      <SelectItem value="unavailable">稼働不可</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBulkEdit(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleBulkEdit}>設定を適用</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            日別
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            週別
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-[280px_1fr]">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>日付選択</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    locale={ja}
                    className="w-full"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{format(selectedDate, "M月d日", { locale: ja })}</div>
                    <div className="text-lg text-muted-foreground">{format(selectedDate, "E曜日", { locale: ja })}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{format(selectedDate, "yyyy年MM月dd日 (E)", { locale: ja })}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedStaff === "all" ? (
                    staffList.map((staff) => (
                      <div key={staff.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={staff.isActive ? "default" : "secondary"}>{staff.name}</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((slot) => (
                            <div
                              key={slot.hour}
                              className="flex items-center justify-between space-x-2 p-2 border rounded-lg"
                            >
                              <Label htmlFor={`${staff.id}-${slot.hour}`}>{`${slot.hour}:00`}</Label>
                              <Switch
                                id={`${staff.id}-${slot.hour}`}
                                checked={slot.isAvailable}
                                onCheckedChange={() => {}}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot.hour}
                          className="flex items-center justify-between space-x-2 p-2 border rounded-lg"
                        >
                          <Label htmlFor={`single-${slot.hour}`}>{`${slot.hour}:00`}</Label>
                          <Switch id={`single-${slot.hour}`} checked={slot.isAvailable} onCheckedChange={() => {}} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span>週間スケジュール</span>
                  <span className="text-muted-foreground">
                    {format(weekStart, "yyyy年MM月dd日", { locale: ja })} -{" "}
                    {format(weekEnd, "MM月dd日", { locale: ja })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setCurrentWeek(new Date())}>
                    今週
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedStaff === "all" ? (
                  staffList.map((staff) => (
                    <div key={staff.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={staff.isActive ? "default" : "secondary"}>{staff.name}</Badge>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {weekDays.map((day) => (
                          <div key={day.toString()} className="space-y-2">
                            <div className="text-center">
                              <div className="font-medium">{format(day, "E", { locale: ja })}</div>
                              <div className="text-sm text-muted-foreground">{format(day, "d", { locale: ja })}</div>
                            </div>
                            <div className="space-y-1">
                              {timeSlots.map((slot) => (
                                <div
                                  key={slot.hour}
                                  className="flex items-center justify-between space-x-2 p-2 border rounded-lg"
                                >
                                  <span className="text-sm">{`${slot.hour}:00`}</span>
                                  <Switch
                                    id={`${staff.id}-${day}-${slot.hour}`}
                                    checked={slot.isAvailable}
                                    onCheckedChange={() => {}}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day) => (
                      <div key={day.toString()} className="space-y-2">
                        <div className="text-center">
                          <div className="font-medium">{format(day, "E", { locale: ja })}</div>
                          <div className="text-sm text-muted-foreground">{format(day, "d", { locale: ja })}</div>
                        </div>
                        <div className="space-y-1">
                          {timeSlots.map((slot) => (
                            <div
                              key={slot.hour}
                              className="flex items-center justify-between space-x-2 p-2 border rounded-lg"
                            >
                              <span className="text-sm">{`${slot.hour}:00`}</span>
                              <Switch
                                id={`single-${day}-${slot.hour}`}
                                checked={slot.isAvailable}
                                onCheckedChange={() => {}}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

