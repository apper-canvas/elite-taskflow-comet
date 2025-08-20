import React, { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import Header from "@/components/organisms/Header"
import TaskFilters from "@/components/molecules/TaskFilters"
import TaskList from "@/components/organisms/TaskList"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { filterTasks, sortTasks } from "@/utils/taskFilters"

const TasksPage = () => {
  const { categoryId, priority } = useParams()
  const location = useLocation()
  const { tasks, loading, error, filters } = useSelector(state => state.tasks)
  const categories = useSelector(state => state.categories.categories)

  // Determine page context from route
  const getPageContext = () => {
    const path = location.pathname
    
    if (path === "/") {
      return {
        title: "All Tasks",
        description: "Manage all your tasks in one place",
        filter: { status: "all" }
      }
    }
    
    if (path === "/completed") {
      return {
        title: "Completed Tasks", 
        description: "Tasks you've successfully completed",
        filter: { status: "completed" }
      }
    }
    
    if (path === "/overdue") {
      return {
        title: "Overdue Tasks",
        description: "Tasks that need immediate attention",
        filter: { status: "overdue" }
      }
    }
    
    if (categoryId) {
      const category = categories.find(cat => cat.Id === parseInt(categoryId))
      return {
        title: category ? `${category.name} Tasks` : "Category Tasks",
        description: category ? `Tasks in the ${category.name} category` : "Tasks in this category",
        filter: { category: categoryId }
      }
    }
    
    if (priority) {
      return {
        title: `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`,
        description: `Tasks with ${priority} priority level`,
        filter: { priority }
      }
    }
    
    return {
      title: "Tasks",
      description: "Manage your tasks",
      filter: {}
    }
  }

  const pageContext = getPageContext()

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    // Combine route-based filters with user filters
    const combinedFilters = {
      ...filters,
      ...pageContext.filter
    }
    
    const filtered = filterTasks(tasks, combinedFilters)
    return sortTasks(filtered, "order")
  }, [tasks, filters, pageContext.filter])

  const getEmptyMessage = () => {
    const path = location.pathname
    
    if (path === "/completed") {
      return "No completed tasks yet. Start checking off those tasks!"
    }
    
    if (path === "/overdue") {
      return "Great! No overdue tasks. You're staying on top of things."
    }
    
    if (categoryId) {
      const category = categories.find(cat => cat.Id === parseInt(categoryId))
      return category ? `No tasks in ${category.name} category yet.` : "No tasks in this category yet."
    }
    
    if (priority) {
      return `No ${priority} priority tasks found.`
    }
    
    if (filters.search) {
      return `No tasks found matching "${filters.search}".`
    }
    
    return "No tasks found. Create your first task to get started!"
  }

  const getEmptyIcon = () => {
    const path = location.pathname
    
    if (path === "/completed") return "CheckCircle2"
    if (path === "/overdue") return "Clock"
    if (priority === "high") return "AlertTriangle"
    if (priority === "medium") return "Minus"
    if (priority === "low") return "ArrowDown"
    
    return "CheckSquare"
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col">
        <Header title="Loading..." />
        <div className="flex-1 p-6">
          <Loading />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col">
        <Header title="Error" />
        <div className="flex-1 p-6">
          <Error error={error} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title={pageContext.title}
        description={pageContext.description}
      />
      
      <div className="flex-1 p-6">
        <TaskFilters />
        
        <TaskList 
          tasks={filteredAndSortedTasks}
          emptyMessage={getEmptyMessage()}
          emptyIcon={getEmptyIcon()}
        />
      </div>
    </div>
  )
}

export default TasksPage