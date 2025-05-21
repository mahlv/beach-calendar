"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Calendar from "./calendar"
import ColorPicker from "./color-picker"
import type { CalendarDay } from "@/types/calendar"

interface BeachHouseCalendarProps {
  isDarkMode: boolean;
}

export default function BeachHouseCalendar({ isDarkMode }: BeachHouseCalendarProps) {
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
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-sky-100'} rounded-lg shadow-md overflow-hidden border`}>
      <div className={`p-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-sky-50 border-sky-100'} border-b`}>
        <h4 className={`text-2xl font-medium text-center font-fira ${isDarkMode ? 'text-gray-200' : 'text-sky-800'}`}></h4>
      </div>

      <Calendar taggedDays={taggedDays} onDayClick={handleDayClick} isDarkMode={isDarkMode} />

      <ColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} isDarkMode={isDarkMode} />
    </div>
  )
}
