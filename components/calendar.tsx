"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { CalendarDay } from "@/types/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getDaysInMonth, getFirstDayOfMonth, isToday, isPastDay, formatMonthYear } from "@/lib/date-utils"

interface CalendarProps {
  taggedDays: Record<string, string>
  onDayClick: (day: CalendarDay) => void
}

export default function Calendar({ taggedDays, onDayClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

  useEffect(() => {
    const days: CalendarDay[] = []
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    // Add days from previous month to fill the first week
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1
      const date = new Date(prevYear, prevMonth, day)
      days.push({
        date,
        dayOfMonth: day,
        isCurrentMonth: false,
        isToday: isToday(date),
        isPast: isPastDay(date),
      })
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: true,
        isToday: isToday(date),
        isPast: isPastDay(date),
      })
    }

    // Add days from next month to fill the last week
    const remainingDays = 42 - days.length // 6 rows of 7 days
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year

    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(nextYear, nextMonth, i)
      days.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: false,
        isToday: isToday(date),
        isPast: isPastDay(date),
      })
    }

    setCalendarDays(days)
  }, [currentDate])

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1
      const prevYear = prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear()
      return new Date(prevYear, prevMonth, 1)
    })
  }

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1
      const nextYear = prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear()
      return new Date(nextYear, nextMonth, 1)
    })
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPreviousMonth}
          className="text-sky-700 hover:text-sky-900 hover:bg-sky-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <h3 className="text-lg font-medium text-sky-800">{formatMonthYear(currentDate)}</h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextMonth}
          className="text-sky-700 hover:text-sky-900 hover:bg-sky-50"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-sky-600 py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const dateKey = day.date.toISOString().split("T")[0]
          const isTagged = dateKey in taggedDays
          const tagColor = taggedDays[dateKey]

          return (
            <button
              key={index}
              onClick={() => onDayClick(day)}
              disabled={day.isPast}
              className={cn(
                "aspect-square flex items-center justify-center rounded-md text-sm relative",
                day.isCurrentMonth ? "font-medium" : "text-gray-400",
                day.isToday && "font-bold",
                day.isPast ? "cursor-not-allowed opacity-50" : "hover:bg-sky-50 cursor-pointer",
                !day.isCurrentMonth && "hover:bg-transparent cursor-default",
              )}
              style={{
                backgroundColor: isTagged ? tagColor : undefined,
                color: isTagged ? "#ffffff" : undefined,
              }}
            >
              {day.dayOfMonth}
            </button>
          )
        })}
      </div>
    </div>
  )
}
