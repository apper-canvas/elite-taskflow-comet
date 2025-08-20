import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { openTaskModal, closeSidebar } from "@/store/slices/uiSlice"
import { cn } from "@/utils/cn"

const Sidebar = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector(state => state.ui)
  const categories = useSelector(state => state.categories.categories)
  const tasks = useSelector(state => state.tasks.tasks)
  const params = useParams()

  const getTaskCount = (filter) => {
    switch (filter.type) {
      case "all":
        return tasks.length
      case "completed":
        return tasks.filter(task => task.completed).length
      case "overdue":
        return tasks.filter(task => {
          if (!task.dueDate || task.completed) return false
          return new Date(task.dueDate) < new Date()
        }).length
      case "category":
        return tasks.filter(task => task.categoryId === filter.id).length
      case "priority":
        return tasks.filter(task => task.priority === filter.priority).length
      default:
        return 0
    }
  }

  const handleCreateTask = () => {
    dispatch(openTaskModal())
    dispatch(closeSidebar())
  }

  const handleLinkClick = () => {
    dispatch(closeSidebar())
  }

  const navigationItems = [
    {
      type: "all",
      label: "All Tasks",
      icon: "List",
      to: "/",
      count: getTaskCount({ type: "all" })
    },
    {
      type: "completed",
      label: "Completed",
      icon: "CheckCircle2",
      to: "/completed",
      count: getTaskCount({ type: "completed" })
    },
    {
      type: "overdue",
      label: "Overdue",
      icon: "AlertTriangle",
      to: "/overdue",
      count: getTaskCount({ type: "overdue" })
    }
  ]

  const priorityItems = [
    {
      type: "priority",
      priority: "high",
      label: "High Priority",
      icon: "AlertTriangle",
      to: "/priority/high",
      count: getTaskCount({ type: "priority", priority: "high" }),
      color: "text-red-600"
    },
    {
      type: "priority", 
      priority: "medium",
      label: "Medium Priority",
      icon: "Minus",
      to: "/priority/medium", 
      count: getTaskCount({ type: "priority", priority: "medium" }),
      color: "text-yellow-600"
    },
    {
      type: "priority",
      priority: "low", 
      label: "Low Priority",
      icon: "ArrowDown",
      to: "/priority/low",
      count: getTaskCount({ type: "priority", priority: "low" }),
      color: "text-green-600"
    }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-2">
            <ApperIcon name="CheckSquare" className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-sm text-gray-500">Stay organized</p>
          </div>
        </div>
      </div>

      {/* Create Task Button */}
      <div className="p-6 border-b border-gray-200">
        <Button
          onClick={handleCreateTask}
          size="lg"
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          New Task
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 space-y-6 overflow-y-auto scrollbar-hide">
        {/* Main Navigation */}
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Overview
          </h3>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={({ isActive }) => cn(
                  "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <ApperIcon name={item.icon} size={18} />
                  {item.label}
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {item.count}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Priority Navigation */}
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            By Priority
          </h3>
          <nav className="space-y-1">
            {priorityItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={({ isActive }) => cn(
                  "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <ApperIcon name={item.icon} size={18} className={item.color} />
                  {item.label}
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {item.count}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Categories */}
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <nav className="space-y-1">
            {categories.map((category) => (
              <NavLink
                key={category.Id}
                to={`/category/${category.Id}`}
                onClick={handleLinkClick}
                className={({ isActive }) => cn(
                  "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {getTaskCount({ type: "category", id: category.Id })}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:bg-white lg:border-r lg:border-gray-200">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-40 flex transition-opacity duration-300",
        sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => dispatch(closeSidebar())}
        />
        
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: sidebarOpen ? "0%" : "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative flex w-80 max-w-xs flex-col bg-white shadow-2xl"
        >
          <SidebarContent />
        </motion.div>
      </div>
    </>
  )
}

export default Sidebar