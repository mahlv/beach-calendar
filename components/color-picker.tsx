"use client"

import { cn } from "@/lib/utils"

interface ColorPickerProps {
  selectedColor: string
  onColorSelect: (color: string) => void
  isDarkMode: boolean
}

export default function ColorPicker({ selectedColor, onColorSelect, isDarkMode }: ColorPickerProps) {
  const colors = [
    { name: "M", value: "#3b82f6", label: "Blue" }, // Blue
    { name: "A", value: "#E3C567", label: "Orange" }, // Orange
  ]

  return (
    <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-sky-100 bg-sky-50'}`}>
      <div className="flex flex-col space-y-3">
        <h3 className={`text-base font-medium font-fira ${isDarkMode ? 'text-gray-200' : 'text-sky-800'}`}>Sua cor:</h3>

        <div className="flex space-x-4">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorSelect(color.value)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md transition-all font-['Nothing_Pena']",
                selectedColor === color.value 
                  ? `ring-2 ring-offset-2 ring-sky-500 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm` 
                  : isDarkMode 
                    ? 'hover:bg-gray-700 hover:shadow-sm' 
                    : 'hover:bg-white hover:shadow-sm'
              )}
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
                <span className={`text-base font-nothing ${isDarkMode ? 'text-gray-200' : 'text-sky-800'}`}>
                  {color.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
