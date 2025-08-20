import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Checkbox from "@/components/atoms/Checkbox"
import Button from "@/components/atoms/Button"
import PriorityIndicator from "@/components/molecules/PriorityIndicator"
import CategoryPill from "@/components/molecules/CategoryPill"
import { formatDueDate, getDueDateStatus } from "@/utils/dateHelpers"
import { openTaskModal } from "@/store/slices/uiSlice"
import { toggleTaskComplete } from "@/store/slices/tasksSlice"
import { tasksService } from "@/services/api/tasksService"
import { cn } from "@/utils/cn"

const TaskCard = ({ task }) => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  
  const category = categories.find(cat => cat.Id === task.categoryId)
  const dueStatus = getDueDateStatus(task.dueDate)
  
  const handleToggleComplete = async (e) => {
    e.stopPropagation()
    
    try {
      await tasksService.toggleComplete(task.Id)
      dispatch(toggleTaskComplete(task.Id))
      
      if (!task.completed) {
        toast.success("Task completed! 🎉", {
          position: "top-right",
          autoClose: 2000,
        })
      }
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleEditTask = () => {
    dispatch(openTaskModal(task))
  }

  const dueDateClasses = {
    overdue: "text-red-600 bg-red-50",
    today: "text-orange-600 bg-orange-50", 
    tomorrow: "text-blue-600 bg-blue-50",
    upcoming: "text-gray-600 bg-gray-50",
    none: ""
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white border border-gray-200 rounded-xl p-6 shadow-sm task-card-hover cursor-pointer group",
        task.completed && "opacity-75 bg-gray-50"
      )}
      onClick={handleEditTask}
    >
      <div className="flex items-start gap-4">
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            className="mt-1"
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "font-semibold text-gray-900 group-hover:text-primary-600 transition-colors",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2">
              <PriorityIndicator priority={task.priority} />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleEditTask()
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              >
                <ApperIcon name="Edit" size={14} />
              </Button>
            </div>
          </div>

          {task.description && (
            <p className={cn(
              "text-gray-600 text-sm",
              task.completed && "line-through text-gray-400"
            )}>
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              {category && (
                <CategoryPill category={category} />
              )}
            </div>
            
            {task.dueDate && (
              <div className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                dueDateClasses[dueStatus]
              )}>
                <ApperIcon 
                  name={dueStatus === "overdue" ? "AlertCircle" : "Clock"} 
                  size={12} 
                  className="inline mr-1" 
                />
                {formatDueDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard