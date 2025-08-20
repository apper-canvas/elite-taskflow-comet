import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const PriorityIndicator = ({ priority, showLabel = false, className }) => {
  const priorityConfig = {
    high: {
      color: "bg-red-500",
      textColor: "text-red-700",
      label: "High",
      icon: "AlertTriangle"
    },
    medium: {
      color: "bg-yellow-500", 
      textColor: "text-yellow-700",
      label: "Medium",
      icon: "Minus"
    },
    low: {
      color: "bg-green-500",
      textColor: "text-green-700", 
      label: "Low",
      icon: "ArrowDown"
    }
  }

  const config = priorityConfig[priority] || priorityConfig.medium

  if (showLabel) {
    return (
      <div className={cn(
        "inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium",
        `bg-${priority === "high" ? "red" : priority === "medium" ? "yellow" : "green"}-100`,
        config.textColor,
        className
      )}>
        <div className={cn("h-2 w-2 rounded-full", config.color)} />
        {config.label}
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "h-3 w-3 rounded-full transition-all duration-200 hover:scale-110",
        config.color,
        className
      )}
      title={`${config.label} Priority`}
    />
  )
}

export default PriorityIndicator