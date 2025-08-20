import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import { toggleSidebar, openTaskModal } from "@/store/slices/uiSlice"
import { AuthContext } from "@/App"
const Header = ({ title, description }) => {
  const dispatch = useDispatch()
  const { logout } = useContext(AuthContext)
  const tasks = useSelector(state => state.tasks.tasks)
  const user = useSelector(state => state.user.user)
  const completedTasks = tasks.filter(task => task.completed)
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  const handleCreateTask = () => {
    dispatch(openTaskModal())
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>

<div className="hidden md:flex items-center gap-4">
          {tasks.length > 0 && (
            <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              <span className="font-medium">{completionRate}%</span> complete
              <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          )}
          
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Welcome, {user.firstName || user.name || 'User'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <ApperIcon name="LogOut" size={16} className="mr-1" />
                Logout
              </Button>
            </div>
          )}
          
          <Button
            onClick={handleCreateTask}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar />
        
        <Button
          onClick={handleCreateTask}
          size="icon"
          className="md:hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25"
        >
          <ApperIcon name="Plus" size={16} />
        </Button>
      </div>
    </header>
  )
}

export default Header