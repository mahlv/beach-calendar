"use client"

import { cn } from "@/lib/utils"

interface ColorPickerProps {
  selectedColor: string
  onColorSelect: (color: string) => void
}

export default function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  const colors = [
    { name: "Matheus", value: "#3b82f6", label: "Blue" }, // Blue
    { name: "Arthur", value: "#f97316", label: "Orange" }, // Orange
  ]

  return (
    <div className="p-4 border-t border-sky-100 bg-sky-50">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-sky-800">Selecione sua cor:</h3>

        <div className="flex space-x-4">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorSelect(color.value)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md transition-all",
                selectedColor === color.value ? "ring-2 ring-offset-1 ring-sky-500 bg-white" : "hover:bg-white",
              )}
            >
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color.value }} />
              <span className="text-sm text-sky-800">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
