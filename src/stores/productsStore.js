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

  async function updateProduct(productId, form) {
    loading.value = true

    try {
      const response = await fetch(`${API_URL}/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(`Failed to update product (${response.status})`)
      }

      const product = await response.json()
      products.value = products.value.map((p) => (p.id === productId ? product : p))
    } catch (err) {
      console.error('Failed to update product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(productId) {
    loading.value = true

    try {
      const response = await fetch(`${API_URL}/api/v1/products/${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete product (${response.status})`)
      }

      products.value = products.value.filter((product) => product.id !== productId)
    } catch (err) {
      console.error('Failed to delete product:', err)
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
    updateProduct,
    deleteProduct,
  }
})

export default productsStore
