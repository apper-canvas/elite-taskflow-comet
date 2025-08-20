import { isOverdue } from "@/utils/dateHelpers"

export const filterTasks = (tasks, filters) => {
  let filteredTasks = [...tasks]
  
  // Filter by search query
  if (filters.search && filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase().trim()
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    )
  }
  
  // Filter by category
  if (filters.category) {
    filteredTasks = filteredTasks.filter(task => 
      task.categoryId === parseInt(filters.category)
    )
  }
  
  // Filter by priority
  if (filters.priority) {
    filteredTasks = filteredTasks.filter(task => 
      task.priority === filters.priority
    )
  }
  
  // Filter by status
  switch (filters.status) {
    case "completed":
      filteredTasks = filteredTasks.filter(task => task.completed)
      break
    case "active":
      filteredTasks = filteredTasks.filter(task => !task.completed)
      break
    case "overdue":
      filteredTasks = filteredTasks.filter(task => 
        task.dueDate && isOverdue(task.dueDate) && !task.completed
      )
      break
    default:
      // Show all tasks
      break
  }
  
  return filteredTasks
}

export const sortTasks = (tasks, sortBy = "order") => {
  const sortedTasks = [...tasks]
  
  switch (sortBy) {
    case "dueDate":
      return sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    case "priority":
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return sortedTasks.sort((a, b) => 
        priorityOrder[b.priority] - priorityOrder[a.priority]
      )
    case "created":
      return sortedTasks.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    case "alphabetical":
      return sortedTasks.sort((a, b) => 
        a.title.localeCompare(b.title)
      )
    default:
      return sortedTasks.sort((a, b) => a.order - b.order)
  }
}