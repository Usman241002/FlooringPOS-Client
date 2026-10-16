import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_BASE from '@/services/api.js'

const customersStore = defineStore('customers', () => {
  const customer = ref(null)
  const customers = ref([])
  const loading = ref(false)

  function sameId(a, b) {
    return String(a) === String(b)
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
      customers.value.push(newCustomer)

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

  async function createAddress(customerId, form) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          customerId,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create address (${response.status})`)
      }

      const newAddress = await response.json()

      const existingCustomer = customers.value.find((item) => sameId(item.id, customerId))

      if (existingCustomer) {
        existingCustomer.addresses ??= []
        existingCustomer.addresses.push(newAddress)
      }

      if (customer.value && sameId(customer.value.id, customerId)) {
        customer.value.addresses ??= []
        customer.value.addresses.push(newAddress)
      }

      return newAddress
    } catch (err) {
      console.error('Failed to create address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateAddress(addressId, form) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/addresses/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(`Failed to update address (${response.status})`)
      }

      const updatedAddress = await response.json()

      customers.value.forEach((item) => {
        const index = (item.addresses ?? []).findIndex((address) => sameId(address.id, addressId))

        if (index !== -1) {
          item.addresses[index] = updatedAddress
        }
      })

      if (customer.value) {
        const index = (customer.value.addresses ?? []).findIndex((address) =>
          sameId(address.id, addressId),
        )

        if (index !== -1) {
          customer.value.addresses[index] = updatedAddress
        }
      }

      return updatedAddress
    } catch (err) {
      console.error('Failed to update address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteAddress(addressId) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/addresses/${addressId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete address (${response.status})`)
      }

      customers.value.forEach((item) => {
        item.addresses = (item.addresses ?? []).filter((address) => !sameId(address.id, addressId))
      })

      if (customer.value) {
        customer.value.addresses = (customer.value.addresses ?? []).filter(
          (address) => !sameId(address.id, addressId),
        )
      }
    } catch (err) {
      console.error('Failed to delete address:', err)
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
    createAddress,
    updateAddress,
    deleteAddress,
  }
})

export default customersStore
