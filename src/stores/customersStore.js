import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_BASE from '@/services/api.js'

const customersStore = defineStore('customers', () => {
  const customers = ref([])
  const loading = ref(false)

  async function fetchCustomers() {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/customers`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      customers.value = await response.json()
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return { customers, loading, fetchCustomers }
})

export default customersStore
