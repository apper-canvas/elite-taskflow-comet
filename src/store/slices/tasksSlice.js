import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    priority: null,
    status: "all",
    search: ""
  }
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload)
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.Id === action.payload.Id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.Id !== action.payload)
    },
    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find(task => task.Id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload
      const [removed] = state.tasks.splice(sourceIndex, 1)
      state.tasks.splice(destinationIndex, 0, removed)
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priority: null,
        status: "all",
        search: ""
      }
    }
  }
})

export const {
  setLoading,
  setError,
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  reorderTasks,
  setFilter,
  clearFilters
} = tasksSlice.actions

export default tasksSlice.reducer