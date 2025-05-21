"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { CalendarDay } from "@/types/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getDaysInMonth, getFirstDayOfMonth, isToday, isPastDay, formatMonthYear } from "@/lib/date-utils"

interface CalendarProps {
  taggedDays: Record<string, string>
  onDayClick: (day: CalendarDay) => void
  isDarkMode: boolean
}

// Main Calendar component
export default function Calendar({ taggedDays, onDayClick, isDarkMode }: CalendarProps) {
  return <ClientOnlyCalendar taggedDays={taggedDays} onDayClick={onDayClick} isDarkMode={isDarkMode} />
}

// Client-side only component to avoid hydration issues
function ClientOnlyCalendar({ taggedDays, onDayClick, isDarkMode }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  
  // Set up the calendar days when component mounts
  useEffect(() => {
    updateCalendarDays(currentDate)
  }, [currentDate])
  
  // Only render after mounting on client
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to update calendar days
  const updateCalendarDays = (date: Date) => {
    const days: CalendarDay[] = []
    const year = date.getFullYear()
    const month = date.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    // Calculate days from previous month to show (Sunday as first day of week)
    const daysFromPrevMonth = firstDayOfMonth
    
    // Add days from previous month
    if (daysFromPrevMonth > 0) {
      const prevMonth = month === 0 ? 11 : month - 1
      const prevYear = month === 0 ? year - 1 : year
      const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)
      
      for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i
        const date = new Date(prevYear, prevMonth, day, 12) // Use noon to avoid DST issues
        days.push({
          date,
          dayOfMonth: day,
          isCurrentMonth: false,
          isToday: isToday(date),
          isPast: isPastDay(date),
        })
      }
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

    // Add days from next month to fill the grid (6 rows x 7 days = 42 days)
    const remainingDays = 42 - days.length
    if (remainingDays > 0) {
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
    }

    setCalendarDays(days)
  }



  // Navigation functions
  const goToPreviousMonth = (): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const goToNextMonth = (): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="p-4 w-full h-[400px] flex items-center justify-center">
        <div className="animate-pulse">Carregando...</div>
      </div>
    )
  }

  return (
    <div className={`p-4 font-['Nothing_Pena'] w-full ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPreviousMonth}
          className={`font-['Nothing_Pena'] ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className={`text-2xl font-medium tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-sky-800'}`}>
          {formatMonthYear(currentDate)}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextMonth}
          className={`font-['Nothing_Pena'] ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'}`}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {weekdays.map((day) => (
          <div key={day} className={`text-center text-sm font-medium py-2 ${isDarkMode ? 'text-gray-400' : 'text-sky-700'}`}>
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          if (!day.isCurrentMonth) {
            return (
              <div 
                key={index} 
                className={`h-10 flex items-center justify-center text-sm ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
              >
                {day.dayOfMonth}
              </div>
            )
          }

          const dateKey = day.date.toISOString().split('T')[0]
          const tagColor = taggedDays[dateKey]
          const isTagged = Boolean(tagColor)

          return (
            <button
              key={index}
              onClick={() => onDayClick(day)}
              className={cn(
                'relative flex items-center justify-center h-10 rounded-md',
                'transition-colors duration-200',
                day.isToday && `font-bold ${isDarkMode ? 'text-white' : 'text-sky-800'}`,
                day.isPast 
                  ? 'opacity-50 cursor-not-allowed' 
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-sky-50',
                isTagged && 'font-medium',
                isTagged && (isDarkMode ? 'text-white' : `text-${tagColor}-800`)
              )}
              disabled={day.isPast}
              style={isTagged ? { 
                backgroundColor: isDarkMode 
                  ? `${tagColor}40` 
                  : `${tagColor}20`,
                border: isTagged && isDarkMode ? `1px solid ${tagColor}80` : 'none'
              } : {}}
            >
              {day.dayOfMonth}
              {isTagged && (
                <span
                  className={`absolute bottom-1 h-2 w-2 rounded-full ${isDarkMode ? 'border border-gray-800' : 'border border-white'}`}
                  style={{ backgroundColor: tagColor }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
