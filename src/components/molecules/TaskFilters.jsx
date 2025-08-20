import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { setFilter, clearFilters } from "@/store/slices/tasksSlice"

const TaskFilters = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.tasks.filters)
  const categories = useSelector(state => state.categories.categories)

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ [key]: value === "all" ? null : value }))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const hasActiveFilters = filters.category || filters.priority || filters.status !== "all" || filters.search

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Select
          value={filters.status || "all"}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-36"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </Select>

        <Select
          value={filters.category || "all"}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-40"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
<option key={category.Id} value={category.Id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select
          value={filters.priority || "all"}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
          className="w-36"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-gray-600 hover:text-gray-800"
        >
          <ApperIcon name="X" size={16} className="mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}

export default TaskFilters