import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showTaskModal: false,
  showCategoryModal: false,
  editingTask: null,
  editingCategory: null,
  sidebarOpen: false
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openTaskModal: (state, action) => {
      state.showTaskModal = true
      state.editingTask = action.payload || null
    },
    closeTaskModal: (state) => {
      state.showTaskModal = false
      state.editingTask = null
    },
    openCategoryModal: (state, action) => {
      state.showCategoryModal = true
      state.editingCategory = action.payload || null
    },
    closeCategoryModal: (state) => {
      state.showCategoryModal = false
      state.editingCategory = null
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false
    }
  }
})

export const {
  openTaskModal,
  closeTaskModal,
  openCategoryModal,
  closeCategoryModal,
  toggleSidebar,
  closeSidebar
} = uiSlice.actions

export default uiSlice.reducer