import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categories: [],
  loading: false,
  error: null
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(cat => cat.Id === action.payload.Id)
      if (index !== -1) {
        state.categories[index] = action.payload
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat.Id !== action.payload)
    }
  }
})

export const {
  setLoading,
  setError,
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = categoriesSlice.actions

export default categoriesSlice.reducer