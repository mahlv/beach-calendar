"use client"

import { useState } from "react"
import Calendar from "./calendar"
import ColorPicker from "./color-picker"
import type { CalendarDay } from "@/types/calendar"

export default function BeachHouseCalendar() {
  const [selectedColor, setSelectedColor] = useState<string>("#3b82f6") // Default to blue
  const [taggedDays, setTaggedDays] = useState<Record<string, string>>({})

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth || day.isPast) return

    const dateKey = day.date.toISOString().split("T")[0]

    setTaggedDays((prev) => {
      const newTaggedDays = { ...prev }

      // If day is already tagged with selected color, remove the tag
      if (newTaggedDays[dateKey] === selectedColor) {
        delete newTaggedDays[dateKey]
      } else {
        // Otherwise, tag with selected color
        newTaggedDays[dateKey] = selectedColor
      }

      return newTaggedDays
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-sky-100">
      <div className="p-4 bg-sky-50 border-b border-sky-100">
        <h4 className="text-2xl font-medium text-sky-800 text-center" style={{ fontFamily: "'Cascadia Code Light', monospace", textAlign: "center" }}>Selecione os dias</h4>
        
      </div>

      <Calendar taggedDays={taggedDays} onDayClick={handleDayClick} />

      <ColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />
    </div>
  )
}
