import React from "react"
import { useDispatch } from "react-redux"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { openTaskModal } from "@/store/slices/uiSlice"

const Empty = ({ 
  icon = "CheckSquare", 
  title = "No tasks yet",
  description = "Get started by creating your first task and take control of your productivity.",
  showCreateButton = true 
}) => {
  const dispatch = useDispatch()

  const handleCreateTask = () => {
    dispatch(openTaskModal())
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-full p-8 mb-6">
        <ApperIcon name={icon} className="h-16 w-16 text-primary-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {showCreateButton && (
        <Button 
          onClick={handleCreateTask}
          size="lg"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25"
        >
          <ApperIcon name="Plus" size={20} />
          Create Your First Task
        </Button>
      )}
    </div>
  )
}

export default Empty