import { ref } from 'vue'
import { defineStore } from 'pinia'
import customersStore from './customersStore.js'
import API_BASE from '@/services/api.js'

const useAddressesStore = defineStore('addresses', () => {
  const loading = ref(false)
  const address = ref(null)

  const useCustomersStore = customersStore()

  async function fetchAddressById(addressId) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/addresses/${addressId}`)
      if (!response.ok) {
        throw new Error(`Failed to get address (${response.status})`)
      }

      address.value = await response.json()
    } catch (err) {
      console.error('Failed to get address:', err)
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
          customerId,
          ...form,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create address (${response.status})`)
      }

      const newAddress = await response.json()

      useCustomersStore.addAddressToCustomer(customerId, newAddress)

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

      useCustomersStore.updateAddressForCustomer(updatedAddress)

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

      useCustomersStore.removeAddressFromCustomer(addressId)
    } catch (err) {
      console.error('Failed to delete address:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    address,
    fetchAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
  }
})

export default useAddressesStore
