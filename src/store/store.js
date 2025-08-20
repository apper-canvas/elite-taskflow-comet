import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "@/store/slices/tasksSlice"
import categoriesReducer from "@/store/slices/categoriesSlice"
import uiReducer from "@/store/slices/uiSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
    ui: uiReducer,
  },
})