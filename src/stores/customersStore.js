import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_BASE from '@/services/api.js'

const useCustomersStore = defineStore('customers', () => {
  const customer = ref(null)
  const customers = ref([])
  const loading = ref(false)

  function sameId(a, b) {
    return String(a) === String(b)
  }

  function addAddressToCustomer(customerId, address) {
    const existingCustomer = customers.value.find((item) => sameId(item.id, customerId))

    if (existingCustomer) {
      existingCustomer.addresses ??= []
      existingCustomer.addresses.push(address)
    }

    if (customer.value && sameId(customer.value.id, customerId)) {
      const alreadyExists = (customer.value.addresses ?? []).some((item) =>
        sameId(item.id, address.id),
      )

      if (!alreadyExists) {
        customer.value.addresses ??= []
        customer.value.addresses.push(address)
      }
    }
  }

  function updateAddressForCustomer(address) {
    customers.value.forEach((item) => {
      const index = (item.addresses ?? []).findIndex((existing) => sameId(existing.id, address.id))

      if (index !== -1) {
        item.addresses[index] = address
      }
    })

    if (customer.value) {
      const index = (customer.value.addresses ?? []).findIndex((existing) =>
        sameId(existing.id, address.id),
      )

      if (index !== -1) {
        customer.value.addresses[index] = address
      }
    }
  }

  function removeAddressFromCustomer(addressId) {
    customers.value.forEach((item) => {
      item.addresses = (item.addresses ?? []).filter((address) => !sameId(address.id, addressId))
    })

    if (customer.value) {
      customer.value.addresses = (customer.value.addresses ?? []).filter(
        (address) => !sameId(address.id, addressId),
      )
    }
  }

  async function fetchCustomers() {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/customers`)

      if (!response.ok) {
        throw new Error(`Failed to fetch customers (${response.status})`)
      }

      customers.value = await response.json()
    } catch (err) {
      console.error('Failed to fetch customers:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCustomer(id) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/customers/${id}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch customer (${response.status})`)
      }

      customer.value = await response.json()
    } catch (err) {
      console.error('Failed to fetch customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createCustomer(form) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(`Failed to create customer (${response.status})`)
      }

      const newCustomer = await response.json()
      customers.value.push({ ...newCustomer, addresses: [] })

      return newCustomer
    } catch (err) {
      console.error('Failed to create customer:', err)
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

      const updatedCustomer = await response.json()

      customers.value = customers.value.map((item) =>
        sameId(item.id, customerId) ? updatedCustomer : item,
      )

      if (customer.value && sameId(customer.value.id, customerId)) {
        customer.value = updatedCustomer
      }

      return updatedCustomer
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

      customers.value = customers.value.filter((item) => !sameId(item.id, customerId))

      if (customer.value && sameId(customer.value.id, customerId)) {
        customer.value = null
      }
    } catch (err) {
      console.error('Failed to delete customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    customer,
    customers,
    loading,
    fetchCustomer,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    addAddressToCustomer,
    updateAddressForCustomer,
    removeAddressFromCustomer,
  }
})

export default useCustomersStore
