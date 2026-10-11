import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_URL from '@/services/api.js'

const brandsStore = defineStore('brands', () => {
  const brands = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchBrands() {
    try {
      const response = await fetch(`${API_URL}/api/v1/brands`)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      brands.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch brands:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    brands,
    loading,
    error,
    fetchBrands,
  }
})

export default brandsStore
