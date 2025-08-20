import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import FormField from "@/components/molecules/FormField"
import { closeTaskModal } from "@/store/slices/uiSlice"
import { addTask, updateTask, deleteTask } from "@/store/slices/tasksSlice"
import { tasksService } from "@/services/api/tasksService"

const TaskModal = () => {
  const dispatch = useDispatch()
  const { showTaskModal, editingTask } = useSelector(state => state.ui)
  const categories = useSelector(state => state.categories.categories)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
categoryId: editingTask.categoryId?.toString() || "",
        priority: editingTask.priority || "medium",
        dueDate: editingTask.dueDate ? 
          new Date(editingTask.dueDate).toISOString().slice(0, 16) : ""
      })
    } else {
      setFormData({
        title: "",
        description: "",
categoryId: categories.length > 0 ? categories[0].Id.toString() : "",
        priority: "medium",
        dueDate: ""
      })
    }
    setErrors({})
  }, [editingTask, showTaskModal, categories])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        categoryId: parseInt(formData.categoryId),
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      }

      if (editingTask) {
const updatedTask = await tasksService.update(editingTask.Id, taskData)
        dispatch(updateTask(updatedTask))
        toast.success("Task updated successfully!")
      } else {
const newTask = await tasksService.create(taskData)
        dispatch(addTask(newTask))
        toast.success("Task created successfully!")
      }
      
      dispatch(closeTaskModal())
    } catch (error) {
      toast.error(editingTask ? "Failed to update task" : "Failed to create task")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!editingTask) return
    
    const confirmed = window.confirm("Are you sure you want to delete this task?")
    if (!confirmed) return
    
    setIsSubmitting(true)
    
    try {
await tasksService.delete(editingTask.Id)
      dispatch(deleteTask(editingTask.Id))
      dispatch(closeTaskModal())
      toast.success("Task deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete task")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    dispatch(closeTaskModal())
  }

  if (!showTaskModal) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <FormField label="Title" error={errors.title} required>
              <Input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter task title"
                disabled={isSubmitting}
              />
            </FormField>

            <FormField label="Description">
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Add a description (optional)"
                disabled={isSubmitting}
                rows={3}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category" error={errors.categoryId} required>
                <Select
                  value={formData.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">Select category</option>
{categories.map(category => (
                    <option key={category.Id} value={category.Id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Priority">
                <Select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormField>
            </div>

            <FormField label="Due Date">
              <Input
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                disabled={isSubmitting}
              />
            </FormField>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                {editingTask && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2"
                  >
                    <ApperIcon name="Trash2" size={16} />
                    Delete
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <ApperIcon name="Loader2" size={16} className="animate-spin" />
                      {editingTask ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <ApperIcon name={editingTask ? "Save" : "Plus"} size={16} />
                      {editingTask ? "Update Task" : "Create Task"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TaskModal