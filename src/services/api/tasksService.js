import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const tasksService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const newId = Math.max(...tasks.map(t => t.Id), 0) + 1
    const newTask = {
      Id: newId,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: taskData.categoryId,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      order: tasks.length + 1
    }
    tasks.unshift(newTask)
    return { ...newTask }
  },

  async update(id, taskData) {
    await delay(350)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    const updatedTask = {
      ...tasks[index],
      ...taskData,
      Id: parseInt(id)
    }
    tasks[index] = updatedTask
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    const deletedTask = tasks[index]
    tasks = tasks.filter(task => task.Id !== parseInt(id))
    return { ...deletedTask }
  },

  async toggleComplete(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    task.completed = !task.completed
    return { ...task }
  },

  async getByCategory(categoryId) {
    await delay(250)
    return tasks.filter(task => task.categoryId === parseInt(categoryId))
  },

  async getByPriority(priority) {
    await delay(250)
    return tasks.filter(task => task.priority === priority)
  },

  async getCompleted() {
    await delay(250)
    return tasks.filter(task => task.completed)
  },

  async getOverdue() {
    await delay(250)
    const now = new Date()
    return tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < now && 
      !task.completed
    )
  },

  async search(query) {
    await delay(200)
    if (!query || query.trim() === "") {
      return [...tasks]
    }
    
    const searchTerm = query.toLowerCase().trim()
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    )
  }
}