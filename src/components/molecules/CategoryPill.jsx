import React from "react"
import { cn } from "@/utils/cn"

const CategoryPill = ({ category, className, onClick }) => {
  if (!category) return null

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105",
        "bg-white border shadow-sm hover:shadow-md",
        className
      )}
    >
      <div 
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: category.color }}
      />
      {category.name}
    </button>
  )
}

export default CategoryPill