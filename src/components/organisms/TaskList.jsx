import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import TaskCard from "@/components/organisms/TaskCard"
import Empty from "@/components/ui/Empty"

const TaskList = ({ tasks, emptyMessage, emptyIcon }) => {
  if (tasks.length === 0) {
    return (
      <Empty 
        icon={emptyIcon || "CheckSquare"}
        title="No tasks found"
        description={emptyMessage || "Try adjusting your filters or create a new task to get started."}
        showCreateButton={true}
      />
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList