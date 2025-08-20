import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ className, checked, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className={cn(
          "h-5 w-5 rounded border-2 border-gray-300 bg-white text-primary-500 transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 checkbox-bounce",
          checked && "border-primary-500 bg-primary-500",
          className
        )}
        ref={ref}
        checked={checked}
        {...props}
      />
      {checked && (
        <ApperIcon 
          name="Check" 
          className="absolute left-0.5 top-0.5 h-3 w-3 text-white pointer-events-none animate-bounce-in" 
        />
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox