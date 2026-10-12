import API_URL from '@/services/api.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const productsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)

  async function fetchProducts() {
    loading.value = true

    try {
      const response = await fetch(`${API_URL}/api/v1/products`)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      products.value = await response.json()
    } catch (err) {
      console.error('Failed to fetch products:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createProduct(form) {
    loading.value = true
    try {
      console.log(JSON.stringify(form))
      const response = await fetch(`${API_URL}/api/v1/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(`Failed to create product (${response.status})`)
      }

      const product = await response.json()

      products.value.push(product)
    } catch (err) {
      console.error('Failed to create product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    fetchProducts,
    createProduct,
  }
})

export default productsStore
