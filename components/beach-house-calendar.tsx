"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Calendar from "./calendar"
import ColorPicker from "./color-picker"
import type { CalendarDay } from "@/types/calendar"

export default function BeachHouseCalendar() {
  const [selectedColor, setSelectedColor] = useState<string>("#3b82f6") // Default to blue
  
  // Get tags from Convex
  const taggedDays = useQuery(api.calendar.getTags) || {}
  const toggleTag = useMutation(api.calendar.toggleTag)

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth || day.isPast) return

    const dateKey = day.date.toISOString().split("T")[0]
    void toggleTag({ date: dateKey, color: selectedColor })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-sky-100">
      <div className="p-4 bg-sky-50 border-b border-sky-100">
        <h4 className="text-2xl font-medium text-sky-800 text-center font-fira"></h4>
        
      </div>

      <Calendar taggedDays={taggedDays} onDayClick={handleDayClick} />

      <ColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />
    </div>
  )
}
