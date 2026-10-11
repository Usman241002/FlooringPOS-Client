import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_URL from '@/services/api.js'

const productsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchProducts() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/api/v1/products`)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      products.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch products:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
})

export default productsStore
