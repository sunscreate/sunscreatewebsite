"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { AvailabilityResponse } from "@/types/schedule"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import cn from "classnames"

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  serviceAddress: string
}

interface ServiceSelection {
  selected: boolean
  quantity: number
}

interface ServiceSelections {
  [key: string]: ServiceSelection
}

export default function ReservationPage() {
  const [step, setStep] = useState(1)
  const [date1, setDate1] = useState<Date>()
  const [date2, setDate2] = useState<Date>()
  const [hasSelectedAC, setHasSelectedAC] = useState(false)
  const [totalUnits, setTotalUnits] = useState(0)
  const [serviceSelections, setServiceSelections] = useState<ServiceSelections>({})
  const [totalAmount, setTotalAmount] = useState({ subtotal: 0, tax: 0, total: 0 })
  const [availabilityData1, setAvailabilityData1] = useState<AvailabilityResponse | null>(null)
  const [availabilityData2, setAvailabilityData2] = useState<AvailabilityResponse | null>(null)
  const [selectedTime1, setSelectedTime1] = useState<string>("")
  const [selectedTime2, setSelectedTime2] = useState<string>("")
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [formComplete, setFormComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceAddress: "",
  })

  const validateForm = () => {
    return Object.values(formData).every((value) => value.trim() !== "")
  }

  const isLoggedIn = false // Replace with actual login status
  const user = { name: "", address: "", phone: "", email: "" } // Replace with actual user data

  const services = [
    {
      id: "wall-ac",
      label: "壁掛けエアコン",
      price: 13000,
      time: 90,
    },
    {
      id: "wall-ac-auto",
      label: "壁掛けエアコン（お掃除機能付き）",
      price: 19000,
      time: 120,
    },
    {
      id: "ceiling-ac",
      label: "埋め込み型・天吊り型エアコン",
      price: 25000,
      time: 120,
    },
    {
      id: "outdoor-ac",
      label: "室外機",
      price: 5000,
      time: 15,
    },
    {
      id: "drain-home",
      label: "排水管洗浄（一般住宅）",
      price: 25000,
      time: 120,
    },
    {
      id: "drain-double",
      label: "排水管洗浄（二世帯住宅）",
      price: 45000,
      time: 180,
    },
  ]

  const calculateTotal = useCallback(() => {
    let total = 0
    Object.entries(serviceSelections).forEach(([serviceId, selection]) => {
      if (selection.selected) {
        const service = services.find((s) => s.id === serviceId)
        if (service) {
          const quantity = selection.quantity || 1
          total += service.price * quantity
        }
      }
    })
    // 税込価格から税額を計算 (税率10%の場合)
    const tax = Math.floor(total - total / 1.1)
    setTotalAmount({
      subtotal: total - tax, // 税抜価格
      tax,
      total: total, // 税込合計
    })
  }, [serviceSelections])

  useEffect(() => {
    calculateTotal()
  }, [serviceSelections, calculateTotal]) // Added calculateTotal to dependencies

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setServiceSelections((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        selected: checked,
        quantity: prev[serviceId]?.quantity || 1,
      },
    }))

    // Update AC selection status
    const acServices = ["wall-ac", "wall-ac-auto", "ceiling-ac"]
    const hasAC = acServices.some((id) => (id === serviceId ? checked : serviceSelections[id]?.selected))
    setHasSelectedAC(hasAC)

    // Calculate total units
    const total = acServices.reduce((sum, id) => {
      if (id === serviceId) {
        return sum + (checked ? 1 : 0)
      }
      return sum + (serviceSelections[id]?.selected ? serviceSelections[id]?.quantity || 1 : 0)
    }, 0)
    setTotalUnits(total)
  }

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    setServiceSelections((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        quantity,
      },
    }))

    // Update total units for AC services
    const acServices = ["wall-ac", "wall-ac-auto", "ceiling-ac"]
    const total = acServices.reduce((sum, id) => {
      if (id === serviceId) {
        return sum + quantity
      }
      return sum + (serviceSelections[id]?.selected ? serviceSelections[id]?.quantity || 1 : 0)
    }, 0)
    setTotalUnits(total)
  }

  const checkAvailability = useCallback(
    async (date: Date, setAvailabilityData: (data: AvailabilityResponse | null) => void) => {
      console.log("Starting availability check with data:", {
        date: format(date, "yyyy-MM-dd"),
        selectedServices: Object.entries(serviceSelections)
          .filter(([_, selection]) => selection.selected)
          .map(([serviceId]) => serviceId),
        totalUnits,
        formComplete,
        serviceAddress: formData.serviceAddress,
      })
      try {
        setCheckingAvailability(true)
        setAvailabilityData(null)

        const selectedServices = Object.entries(serviceSelections)
          .filter(([_, selection]) => selection.selected)
          .map(([serviceId]) => serviceId)

        if (!selectedServices.length || !formData.serviceAddress || !date) {
          console.log("Validation failed:", { selectedServices, serviceAddress: formData.serviceAddress, date })
          toast.error("必要な情報が不足しています")
          return
        }

        let prefecture, city
        const prefectureMatch = formData.serviceAddress.match(/(.+?)[都道府県]/)
        if (prefectureMatch) {
          prefecture = `${prefectureMatch[1]}${formData.serviceAddress.includes("都") ? "都" : formData.serviceAddress.includes("道") ? "道" : formData.serviceAddress.includes("府") ? "府" : "県"}`
          const afterPrefecture = formData.serviceAddress.slice(prefectureMatch[0].length)
          const cityMatch = afterPrefecture.match(/(.+?)[市区町村]/)
          if (cityMatch) {
            city = `${cityMatch[1]}${afterPrefecture.match(/[市区町村]/)?.[0] || ""}`
          }
        }

        console.log("Parsed address:", { prefecture, city, serviceAddress: formData.serviceAddress })
        if (!prefecture || !city) {
          console.log("Invalid address format")
          toast.error("正しい住所形式で入力してください（例：東京都新宿区...）")
          return
        }

        const response = await fetch("/api/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: format(date, "yyyy-MM-dd"),
            serviceIds: selectedServices,
            units: totalUnits,
            prefecture,
            city,
          }),
        })

        if (!response.ok) {
          throw new Error("Availability check failed")
        }

        const data = await response.json()
        console.log("Availability API response:", data)
        setAvailabilityData(data)
      } catch (error) {
        console.error("Error checking availability:", error)
        toast.error("空き状況の確認に失敗しました：" + (error instanceof Error ? error.message : "不明なエラー"))
        setAvailabilityData(null)
      } finally {
        setCheckingAvailability(false)
      }
    },
    [formData.serviceAddress, serviceSelections, totalUnits],
  )

  useEffect(() => {
    if (date1 && formComplete && Object.entries(serviceSelections).some(([_, selection]) => selection.selected)) {
      console.log("Checking availability for date1:", date1)
      checkAvailability(date1, setAvailabilityData1)
    }
  }, [date1, formComplete, checkAvailability])

  useEffect(() => {
    if (date2 && formComplete && Object.entries(serviceSelections).some(([_, selection]) => selection.selected)) {
      console.log("Checking availability for date2:", date2)
      checkAvailability(date2, setAvailabilityData2)
    }
  }, [date2, formComplete, checkAvailability])

  const renderTimeSlots = (
    availabilityData: AvailabilityResponse | null,
    selectedTime: string,
    setSelectedTime: (time: string) => void,
  ) => {
    if (!Object.entries(serviceSelections).some(([_, selection]) => selection.selected)) {
      return (
        <Alert>
          <AlertDescription>サービスを1つ以上選択してください。</AlertDescription>
        </Alert>
      )
    }

    if (checkingAvailability) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )
    }

    if (!availabilityData) {
      return (
        <Alert>
          <AlertDescription>空き状況を確認中です...</AlertDescription>
        </Alert>
      )
    }

    if (availabilityData.timeSlots.length === 0) {
      return (
        <Alert>
          <AlertDescription>選択された日付の予約可能な時間帯がありません。</AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="grid grid-cols-4 gap-2">
        {availabilityData.timeSlots.map((slot) => (
          <Button
            key={slot.time}
            variant={selectedTime === slot.time ? "default" : "outline"}
            className={cn("w-full", !slot.available && "opacity-50 cursor-not-allowed bg-muted hover:bg-muted")}
            disabled={!slot.available}
            onClick={() => slot.available && setSelectedTime(slot.time)}
          >
            {slot.time}
            {!slot.available && <span className="block text-xs text-muted-foreground">予約不可</span>}
          </Button>
        ))}
      </div>
    )
  }

  // Service selection section with total amount display
  const renderServiceSelection = () => (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          室外機のクリーニングは、エアコン本体のクリーニングとセットでのみご利用いただけます。
        </AlertDescription>
      </Alert>

      {totalUnits >= 6 && formComplete && (
        <Alert variant="destructive">
          <AlertDescription>
            6台以上のご依頼については、スケジュール調整が必要なため、お問い合わせフォームよりご連絡ください。
            <Button
              variant="link"
              className="text-red-600 p-0 h-auto ml-2"
              onClick={() => {
                // Get form data
                const formData = {
                  name: (document.getElementById("name") as HTMLInputElement)?.value,
                  email: (document.getElementById("email") as HTMLInputElement)?.value,
                  phone: (document.getElementById("phone") as HTMLInputElement)?.value,
                  address: (document.getElementById("address") as HTMLInputElement)?.value,
                  serviceAddress: (document.getElementById("serviceAddress") as HTMLInputElement)?.value,
                  services: Object.entries(serviceSelections)
                    .filter(([_, selection]) => selection.selected)
                    .map(([serviceId, selection]) => ({
                      service: services.find((s) => s.id === serviceId)?.label,
                      quantity: selection.quantity,
                    })),
                }

                // Store form data in localStorage for the contact form
                localStorage.setItem("reservationFormData", JSON.stringify(formData))

                // Redirect to contact form
                window.location.href = "/contact"
              }}
            >
              お問い合わせフォームへ進む
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  id={service.id}
                  disabled={service.id === "outdoor-ac" && !hasSelectedAC}
                  checked={serviceSelections[service.id]?.selected || false}
                  onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                />
                <div className="flex-1 space-y-2">
                  <Label htmlFor={service.id} className="text-base">
                    {service.label}
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    料金: ¥{service.price.toLocaleString()} / 所要時間: {service.time}分
                  </div>
                  {(service.id.includes("ac") || service.id === "outdoor-ac") &&
                    serviceSelections[service.id]?.selected && (
                      <div className="pt-2">
                        <Label htmlFor={`${service.id}-count`}>台数</Label>
                        <Select
                          value={String(serviceSelections[service.id]?.quantity || 1)}
                          onValueChange={(value) => handleQuantityChange(service.id, Number.parseInt(value))}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="台数を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}台
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-lg">
              <span>合計金額（税込）</span>
              <span>¥{totalAmount.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>（内消費税）</span>
              <span>¥{totalAmount.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>（税抜価格）</span>
              <span>¥{totalAmount.subtotal.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => setStep(1)}>
          戻る
        </Button>
        <Button onClick={() => setStep(3)} className="flex-1">
          次へ
        </Button>
      </div>
    </div>
  )

  const handleSubmit = async () => {
    toast.promise(
      // Here you would make an API call to submit the reservation
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "予約を送信中...",
        success: "予約依頼を受け付けました。確認メールをお送りしますので、ご確認ください。",
        error: "予約の送信に失敗しました。お手数ですが、もう一度お試しください。",
      },
    )
  }

  const renderCustomerInfoStep = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">お名前</Label>
          <Input
            id="name"
            placeholder="山田 太郎"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            placeholder="yamada@example.com"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">電話番号</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="090-1234-5678"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">ご住所</Label>
          <Input
            id="address"
            placeholder="例：東京都新宿区西新宿1-2-3 ○○マンション101"
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            required
          />
          <p className="text-sm text-muted-foreground">
            都道府県から番地、マンション・アパート名、部屋番号まで正確にご記入ください。
          </p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAddress"
              onCheckedChange={(checked) => {
                if (checked) {
                  setFormData((prev) => ({ ...prev, serviceAddress: prev.address }))
                }
              }}
            />
            <Label htmlFor="sameAddress">施工場所は登録住所と同じ</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="serviceAddress">施工場所の住所</Label>
            <Input
              id="serviceAddress"
              placeholder="例：東京都新宿区西新宿1-2-3 ○○マンション101"
              value={formData.serviceAddress}
              onChange={(e) => setFormData((prev) => ({ ...prev, serviceAddress: e.target.value }))}
              required
            />
            <p className="text-sm text-muted-foreground">
              都道府県から番地、マンション・アパート名、部屋番号まで正確にご記入ください。
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={() => {
            const isValid = validateForm()
            if (isValid) {
              setFormComplete(true)
              setStep(2)
            } else {
              toast.error("全ての必須項目を入力してください")
            }
          }}
          className="w-full"
        >
          次へ
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            {["お客様情報", "サービス選択", "希望日時", "お支払い方法", "内容確認"].map((title, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`
                  rounded-full w-8 h-8 flex items-center justify-center
                  ${step === index + 1 ? "bg-primary text-white" : "bg-gray-200"}
                `}
                >
                  {index + 1}
                </div>
                <span
                  className={`
                  ml-2 hidden sm:inline-block
                  ${step === index + 1 ? "text-primary font-medium" : "text-gray-500"}
                `}
                >
                  {title}
                </span>
                {index < 4 && <div className="hidden sm:block mx-4 h-px w-12 bg-gray-200" />}
              </div>
            ))}
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && "お客様情報"}
                {step === 2 && "サービスの選択"}
                {step === 3 && "希望日時の選択"}
                {step === 4 && "お支払い方法の選択"}
                {step === 5 && "内容確認"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {step === 1 && renderCustomerInfoStep()}
              {step === 2 && renderServiceSelection()}
              {step === 3 && (
                <div className="space-y-6">
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>第2候補は、なるべく第1候補と異なる日付でご選択ください。</AlertDescription>
                  </Alert>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="font-medium">第1候補</h3>
                      <div className="grid gap-4">
                        <Calendar
                          mode="single"
                          selected={date1}
                          onSelect={setDate1}
                          locale={ja}
                          fromDate={new Date()}
                          disabled={(date) => {
                            const day = date.getDay()
                            return day === 0 || day === 6 // 土日を無効化
                          }}
                          className="rounded-md border"
                        />
                        {date1 && (
                          <div className="space-y-2">
                            <Label>作業開始時間</Label>
                            {renderTimeSlots(availabilityData1, selectedTime1, setSelectedTime1)}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">第2候補</h3>
                      <div className="grid gap-4">
                        <Calendar
                          mode="single"
                          selected={date2}
                          onSelect={setDate2}
                          locale={ja}
                          fromDate={new Date()}
                          disabled={(date) => {
                            const day = date.getDay()
                            return day === 0 || day === 6 // 土日を無効化
                          }}
                          className="rounded-md border"
                        />
                        {date2 && (
                          <div className="space-y-2">
                            <Label>作業開始時間</Label>
                            {renderTimeSlots(availabilityData2, selectedTime2, setSelectedTime2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      戻る
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      className="flex-1"
                      disabled={!date1 || !selectedTime1 || !date2 || !selectedTime2}
                    >
                      次へ
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>お支払いは作業完了後、作業スタッフが対応させていただきます。</AlertDescription>
                  </Alert>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    {[
                      { value: "cash", label: "現金" },
                      { value: "credit", label: "クレジットカード" },
                      { value: "qr", label: "QRコード決済" },
                      { value: "transit", label: "交通系電子マネー" },
                      { value: "bank", label: "後日振込" },
                    ].map(({ value, label }) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <Label htmlFor={value}>{label}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="text-sm text-muted-foreground">
                    ※後日振込を選択された場合、請求書をサイト内のチャットでPDFにて送付させていただきます。
                  </div>

                  <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>
                      予約依頼ボタンを押した時点では予約は確定していません。
                      管理者が内容を確認の上、日時を確定させていただきます。
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      戻る
                    </Button>
                    <Button className="flex-1" onClick={() => setStep(5)}>
                      内容確認へ
                    </Button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>
                      予約内容をご確認ください。内容を修正する場合は、各セクションの「編集」ボタンをクリックしてください。
                    </AlertDescription>
                  </Alert>

                  {/* Customer Information */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-medium">お客様情報</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                        編集
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium">お名前</div>
                          <div className="text-sm text-muted-foreground">{user.name || "山田 太郎"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">メールアドレス</div>
                          <div className="text-sm text-muted-foreground">{user.email || "yamada@example.com"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">電話番号</div>
                          <div className="text-sm text-muted-foreground">{user.phone || "090-1234-5678"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">ご住所</div>
                          <div className="text-sm text-muted-foreground">{user.address || "東京都新宿区..."}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Selected Services */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-medium">選択したサービス</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                        編集
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(serviceSelections)
                        .filter(([_, selection]) => selection.selected)
                        .map(([serviceId, selection]) => {
                          const service = services.find((s) => s.id === serviceId)
                          if (!service) return null
                          return (
                            <div key={serviceId} className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{service.label}</div>
                                {selection.quantity > 1 && (
                                  <div className="text-sm text-muted-foreground">{selection.quantity}台</div>
                                )}
                              </div>
                              <div className="font-medium">
                                ¥{(service.price * (selection.quantity || 1)).toLocaleString()}
                              </div>
                            </div>
                          )
                        })}
                      <Separator />
                      <div className="flex justify-between items-center font-bold">
                        <div>合計金額（税込）</div>
                        <div>¥{totalAmount.total.toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preferred Dates */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-medium">希望日時</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setStep(3)}>
                        編集
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="font-medium">第1候補</div>
                        <div className="text-sm text-muted-foreground">
                          {date1 && format(date1, "yyyy年MM月dd日 (E)", { locale: ja })} {selectedTime1}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">第2候補</div>
                        <div className="text-sm text-muted-foreground">
                          {date2 && format(date2, "yyyy年MM月dd日 (E)", { locale: ja })} {selectedTime2}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-medium">お支払い方法</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setStep(4)}>
                        編集
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="font-medium">
                        {{
                          cash: "現金",
                          credit: "クレジットカード",
                          qr: "QRコード決済",
                          transit: "交通系電子マネー",
                          bank: "後日振込",
                        }[paymentMethod] || "未選択"}
                      </div>
                    </CardContent>
                  </Card>

                  <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <InfoIcon className="h-4 w-4" />
                    <AlertDescription>
                      予約依頼ボタンを押した時点では予約は確定していません。
                      管理者が内容を確認の上、日時を確定させていただきます。
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(4)}>
                      戻る
                    </Button>
                    <Button className="flex-1" onClick={handleSubmit}>
                      予約を確定する
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

