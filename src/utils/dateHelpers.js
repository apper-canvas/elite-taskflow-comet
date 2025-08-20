import { format, isToday, isTomorrow, isYesterday, isPast, formatDistanceToNow } from "date-fns"

export const formatDueDate = (dateString) => {
  if (!dateString) return null
  
  const date = new Date(dateString)
  
  if (isToday(date)) {
    return `Today at ${format(date, "h:mm a")}`
  }
  
  if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, "h:mm a")}`
  }
  
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "h:mm a")}`
  }
  
  return format(date, "MMM d, yyyy 'at' h:mm a")
}

export const isOverdue = (dateString) => {
  if (!dateString) return false
  return isPast(new Date(dateString))
}

export const getDueDateStatus = (dateString) => {
  if (!dateString) return "none"
  
  const date = new Date(dateString)
  
  if (isPast(date)) return "overdue"
  if (isToday(date)) return "today"
  if (isTomorrow(date)) return "tomorrow"
  
  return "upcoming"
}

export const getRelativeTime = (dateString) => {
  if (!dateString) return ""
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}