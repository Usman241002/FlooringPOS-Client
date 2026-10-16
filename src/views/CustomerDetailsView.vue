<script setup>
import Header from '@/components/Header.vue'
import Section from '@/components/Section.vue'
import CustomerDetails from '@/components/CustomerDetails.vue'

import customersStore from '@/stores/customersStore.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'
import AddressForm from '@/components/forms/AddressForm.vue'

const useCustomersStore = customersStore()
const route = useRoute()
const customerId = route.params.id

const addressFormVisibility = ref(false)
const selectedAddress = ref(null)

function openEditForm(address) {
  addressFormVisibility.value = true
  selectedAddress.value = address
}

function openCreateForm() {
  addressFormVisibility.value = true
  selectedAddress.value = null
}

function closeForm() {
  addressFormVisibility.value = false
  selectedAddress.value = null
}

onMounted(async () => {
  await useCustomersStore.fetchCustomer(customerId)
})
</script>
<template>
  <Header v-if="!useCustomersStore.loading && useCustomersStore.customer">
    <template #title
      >{{ useCustomersStore.customer.firstName }}
      {{ useCustomersStore.customer.lastName }}</template
    >
    <template #subtitle
      >View address for {{ useCustomersStore.customer.firstName }}
      {{ useCustomersStore.customer.lastName }}.</template
    >
    <template #actions>
      <AButton type="primary" @click="openCreateForm()"><PlusOutlined />Add Address</AButton>
    </template>
  </Header>

  <Section>
    <ARow :gutter="16">
      <ACol v-if="!useCustomersStore.loading && useCustomersStore.customer" span="8">
        <CustomerDetails :customer="useCustomersStore.customer" @edit="openEditForm" />
      </ACol>
      <ACol v-if="addressFormVisibility" span="16">
        <AddressForm :address="selectedAddress" @close="closeForm" />
      </ACol>
    </ARow>
  </Section>
</template>

<style scoped></style>
