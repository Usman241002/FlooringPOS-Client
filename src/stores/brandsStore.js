import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_BASE from '@/services/api.js'

const useBrandsStore = defineStore('brands', () => {
  const brands = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchBrands() {
    try {
      const response = await fetch(`${API_BASE}/brands`)

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

export default useBrandsStore
