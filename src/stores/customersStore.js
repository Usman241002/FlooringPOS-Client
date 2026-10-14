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

  async function createCustomer(customer) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const newCustomer = await response.json()
      customers.value.push(newCustomer)
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateCustomer(customerId, form) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(`Failed to update customer (${response.status})`)
      }

      const customer = await response.json()
      customers.value = customers.value.map((p) => (p.id === customerId ? customer : p))
    } catch (err) {
      console.error('Failed to update customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteCustomer(customerId) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/customers/${customerId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete customer (${response.status})`)
      }

      customers.value = customers.value.filter((customer) => customer.id !== customerId)
    } catch (err) {
      console.error('Failed to delete customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return { customers, loading, fetchCustomers, createCustomer, updateCustomer, deleteCustomer }
})

export default customersStore
