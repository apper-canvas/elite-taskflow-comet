import categoriesData from "@/services/mockData/categories.json"

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoriesService = {
  async getAll() {
    await delay(200)
    return [...categories]
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(cat => cat.Id === parseInt(id))
    if (!category) {
      throw new Error(`Category with id ${id} not found`)
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(300)
    const newId = Math.max(...categories.map(c => c.Id), 0) + 1
    const newCategory = {
      Id: newId,
      name: categoryData.name,
      color: categoryData.color || "#6B7280",
      order: categories.length + 1
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, categoryData) {
    await delay(250)
    const index = categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }
    
    const updatedCategory = {
      ...categories[index],
      ...categoryData,
      Id: parseInt(id)
    }
    categories[index] = updatedCategory
    return { ...updatedCategory }
  },

  async delete(id) {
    await delay(200)
    const index = categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }
    
    const deletedCategory = categories[index]
    categories = categories.filter(cat => cat.Id !== parseInt(id))
    return { ...deletedCategory }
  }
}