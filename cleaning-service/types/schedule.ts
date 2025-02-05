export interface ServiceArea {
  prefecture: string
  cities: string[]
}

export interface Staff {
  id: string
  name: string
  services: string[]
  workHours: {
    start: string
    end: string
  }
  breakTime: number // minutes
  serviceAreas: ServiceArea[] // Add service areas
}

export interface Reservation {
  id: string
  staffId: string
  date: string
  startTime: string
  endTime: string
  serviceIds: string[]
  units: number
  location: {
    prefecture: string
    city: string
  }
}

export interface TimeSlot {
  time: string
  available: boolean
  reason?: string
  availableStaff?: string[] // Add available staff for this time slot
}

export interface AvailabilityResponse {
  date: string
  availableStaff: Staff[]
  timeSlots: TimeSlot[]
}

