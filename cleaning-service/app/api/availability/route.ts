import { NextResponse } from "next/server"
import type { Staff, Reservation, TimeSlot, AvailabilityResponse } from "@/types/schedule"

// サンプルデータ - 実際のアプリケーションではデータベースから取得
const staffList: Staff[] = [
  {
    id: "1",
    name: "山田 太郎",
    services: ["wall-ac", "wall-ac-auto", "ceiling-ac", "outdoor-ac"],
    workHours: {
      start: "09:00",
      end: "18:00",
    },
    breakTime: 60,
    serviceAreas: [
      {
        prefecture: "東京都",
        cities: ["新宿区", "渋谷区", "中野区", "杉並区"],
      },
      {
        prefecture: "神奈川県",
        cities: ["横浜市", "川崎市"],
      },
    ],
  },
  {
    id: "2",
    name: "佐藤 次郎",
    services: ["wall-ac", "wall-ac-auto", "outdoor-ac"],
    workHours: {
      start: "10:00",
      end: "19:00",
    },
    breakTime: 60,
    serviceAreas: [
      {
        prefecture: "東京都",
        cities: ["港区", "品川区", "目黒区", "大田区"],
      },
    ],
  },
  {
    id: "3",
    name: "鈴木 三郎",
    services: ["drain-home", "drain-double"],
    workHours: {
      start: "09:00",
      end: "18:00",
    },
    breakTime: 60,
    serviceAreas: [
      {
        prefecture: "東京都",
        cities: ["千代田区", "中央区", "文京区", "台東区"],
      },
      {
        prefecture: "埼玉県",
        cities: ["さいたま市", "川口市"],
      },
    ],
  },
]

const existingReservations: Reservation[] = [
  {
    id: "1",
    staffId: "1",
    date: "2024-01-28",
    startTime: "09:00",
    endTime: "10:30",
    serviceIds: ["wall-ac"],
    units: 1,
    location: {
      prefecture: "東京都",
      city: "新宿区",
    },
  },
  {
    id: "2",
    staffId: "2",
    date: "2024-01-28",
    startTime: "13:00",
    endTime: "14:30",
    serviceIds: ["wall-ac-auto"],
    units: 1,
    location: {
      prefecture: "東京都",
      city: "品川区",
    },
  },
]

function getServiceDuration(serviceIds: string[], units = 1): number {
  const baseDurations: { [key: string]: number } = {
    "wall-ac": 90,
    "wall-ac-auto": 120,
    "ceiling-ac": 120,
    "outdoor-ac": 15,
    "drain-home": 120,
    "drain-double": 180,
  }

  return serviceIds.reduce((total, serviceId) => {
    const baseDuration = baseDurations[serviceId] || 0
    return total + baseDuration * units
  }, 0)
}

function isTimeInRange(time: string, start: string, end: string): boolean {
  const timeNum = Number.parseInt(time.replace(":", ""))
  const startNum = Number.parseInt(start.replace(":", ""))
  const endNum = Number.parseInt(end.replace(":", ""))
  return timeNum >= startNum && timeNum < endNum
}

function isInServiceArea(staff: Staff, prefecture: string, city: string): boolean {
  return staff.serviceAreas.some((area) => area.prefecture === prefecture && area.cities.includes(city))
}

function checkStaffAvailability(
  staff: Staff,
  date: string,
  time: string,
  duration: number,
  prefecture: string,
  city: string,
  existingReservations: Reservation[],
): boolean {
  // Check if location is in staff's service area
  if (!isInServiceArea(staff, prefecture, city)) {
    return false
  }

  // Check if time is within work hours
  if (!isTimeInRange(time, staff.workHours.start, staff.workHours.end)) {
    return false
  }

  // Check if time slot overlaps with break time (assuming break is from 12:00-13:00)
  const timeNum = Number.parseInt(time.replace(":", ""))
  if (timeNum >= 1200 && timeNum < 1300) {
    return false
  }

  // Check if time slot overlaps with existing reservations
  const requestStart = new Date(`${date}T${time}`)
  const requestEnd = new Date(requestStart.getTime() + duration * 60000)

  return !existingReservations
    .filter((res) => res.staffId === staff.id && res.date === date)
    .some((res) => {
      const resStart = new Date(`${res.date}T${res.startTime}`)
      const resEnd = new Date(`${res.date}T${res.endTime}`)
      return requestStart < resEnd && resStart < requestEnd
    })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Received availability check request:", body)

    // Add validation
    if (!body.date || !body.serviceIds || !body.prefecture || !body.city) {
      console.log("Missing required fields:", body)
      return NextResponse.json(
        { error: "Missing required fields", details: { received: Object.keys(body) } },
        { status: 400 },
      )
    }

    const { date, serviceIds, units, prefecture, city } = body
    const duration = getServiceDuration(serviceIds, units)

    // Generate time slots from 9:00 to 18:00
    const timeSlots: TimeSlot[] = []
    const availableStaff: Staff[] = staffList.filter(
      (staff) =>
        serviceIds.every((serviceId) => staff.services.includes(serviceId)) && isInServiceArea(staff, prefecture, city),
    )

    for (let hour = 9; hour < 18; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`
      const availableStaffForSlot = availableStaff.filter((staff) =>
        checkStaffAvailability(staff, date, time, duration, prefecture, city, existingReservations),
      )

      timeSlots.push({
        time,
        available: availableStaffForSlot.length > 0,
        reason: availableStaffForSlot.length > 0 ? undefined : "予約済みまたは営業時間外",
        availableStaff: availableStaffForSlot.map((staff) => staff.id),
      })
    }

    const response: AvailabilityResponse = {
      date,
      availableStaff,
      timeSlots,
    }

    console.log("Sending availability response:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Availability check error:", error)
    return NextResponse.json(
      { error: "Availability check failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

