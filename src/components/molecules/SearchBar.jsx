import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import { setFilter } from "@/store/slices/tasksSlice"

const SearchBar = ({ placeholder = "Search tasks..." }) => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.tasks.filters.search)

  const handleSearchChange = (e) => {
    dispatch(setFilter({ search: e.target.value }))
  }

  const clearSearch = () => {
    dispatch(setFilter({ search: "" }))
  }

  return (
    <div className="relative flex-1 max-w-md">
      <ApperIcon 
        name="Search" 
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar