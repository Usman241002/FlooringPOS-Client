<script setup>
import Header from '@/components/Header.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import Section from '@/components/Section.vue'
import RoomsList from '@/components/tables/RoomsList.vue'
import RoomForm from '@/components/forms/RoomForm.vue'

import useAddressesStore from '@/stores/addressesStore'
import useRoomsStore from '@/stores/roomsStore.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const addressesStore = useAddressesStore()
const roomsStore = useRoomsStore()
const route = useRoute()

const roomId = route.params.id

onMounted(async () => {
  await addressesStore.fetchAddressById(roomId)
})

const roomFormVisibility = ref(false)

function openEditForm(room) {
  roomsStore.room = room
  roomFormVisibility.value = true
}

function openCreateForm() {
  roomsStore.room = null
  roomFormVisibility.value = true
}

function closeForm() {
  roomsStore.room = null
  roomFormVisibility.value = false
}
</script>

<template>
  <Header>
    <template #title>Room Measurements</template>
    <template #subtitle
      >{{ addressesStore.address.addressLine1
      }}{{
        addressesStore.address.postcode ? ', ' + addressesStore.address.postcode : ''
      }}</template
    >
    <template #actions>
      <AButton type="primary" @click="openCreateForm">
        <PlusOutlined />
        New Room
      </AButton>
    </template>
  </Header>

  <Section>
    <ASpin v-if="addressesStore.loading" tip="Loading address..." />

    <AAlert
      v-else-if="!addressesStore.address"
      description="The requested address could not be loaded."
      message="Address not found"
      show-icon
      type="warning"
    />

    <ARow v-else :gutter="[16, 16]">
      <ACol :span="8">
        <RoomsList :rooms="addressesStore.address.rooms" @edit="openEditForm" />
      </ACol>

      <ACol :span="16">
        <RoomForm v-if="roomFormVisibility" :room="roomsStore.room" @close="closeForm" />
      </ACol>
    </ARow>
  </Section>
</template>
