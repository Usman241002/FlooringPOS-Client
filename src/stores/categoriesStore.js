import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_URL from '@/services/api.js'

const categoriesStore = defineStore('categories', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchCategories() {
    try {
      const response = await fetch(`${API_URL}/api/v1/categories`)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      categories.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch categories:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
  }
})

export default categoriesStore
