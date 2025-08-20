import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import Sidebar from "@/components/organisms/Sidebar"
import TaskModal from "@/components/organisms/TaskModal"
import { setTasks } from "@/store/slices/tasksSlice"
import { setCategories } from "@/store/slices/categoriesSlice"
import { tasksService } from "@/services/api/tasksService"
import { categoriesService } from "@/services/api/categoriesService"

const Layout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
const [tasksData, categoriesData] = await Promise.all([
          tasksService.getAll(),
          categoriesService.getAll()
        ])
        
        dispatch(setTasks(tasksData))
        dispatch(setCategories(categoriesData))
      } catch (error) {
        console.error("Failed to load initial data:", error)
      }
    }

    loadInitialData()
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </main>

      <TaskModal />
    </div>
  )
}

export default Layout