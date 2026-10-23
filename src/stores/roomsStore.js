import { defineStore } from 'pinia'
import { ref } from 'vue'
import useAddressesStore from '@/stores/addressesStore.js'
import API_BASE from '@/services/api.js'

const useRoomsStore = defineStore('rooms', () => {
  const loading = ref(false)
  const room = ref({})

  const addressesStore = useAddressesStore()

  function upsertRoomInAddress(updatedRoom) {
    const address = addressesStore.address

    if (!address || !updatedRoom?.id) return

    if (!Array.isArray(address.rooms)) {
      address.rooms = []
    }

    const index = address.rooms.findIndex((existingRoom) => existingRoom.id === updatedRoom.id)

    if (index === -1) {
      address.rooms.push(updatedRoom)
    } else {
      address.rooms[index] = updatedRoom
    }
  }

  function removeRoomFromAddress(roomId) {
    const address = addressesStore.address

    if (!address || !Array.isArray(address.rooms)) return

    address.rooms = address.rooms.filter((existingRoom) => existingRoom.id !== roomId)
  }

  async function createRoom(addressId, form) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addressId,
          ...form,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create room (${response.status})`)
      }

      const newRoom = await response.json()

      upsertRoomInAddress(newRoom)

      return newRoom
    } catch (err) {
      console.error('Failed to create room:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateRoom(roomId, form) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update room (${response.status})`)
      }

      const updatedRoom = await response.json()

      upsertRoomInAddress(updatedRoom)

      return updatedRoom
    } catch (err) {
      console.error('Failed to update room:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteRoom(roomId) {
    loading.value = true

    try {
      const response = await fetch(`${API_BASE}/rooms/${roomId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete room (${response.status})`)
      }

      removeRoomFromAddress(roomId)
    } catch (err) {
      console.error('Failed to delete room:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    room,
    createRoom,
    updateRoom,
    deleteRoom,
  }
})

export default useRoomsStore
