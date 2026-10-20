<script setup>
import Header from '@/components/Header.vue'
import Section from '@/components/Section.vue'
import CustomerDetails from '@/components/CustomerDetails.vue'

import useCustomersStore from '@/stores/customersStore.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'
import AddressForm from '@/components/forms/AddressForm.vue'
import useAddressesStore from '@/stores/addressesStore.js'

const customersStore = useCustomersStore()
const addressesStore = useAddressesStore()
const route = useRoute()
const customerId = route.params.id

const addressFormVisibility = ref(false)

function openEditForm(address) {
  addressFormVisibility.value = true
  addressesStore.address = address
}

function openCreateForm() {
  addressFormVisibility.value = true
  addressesStore.address = null
}

function closeForm() {
  addressFormVisibility.value = false
  addressesStore.address = null
}

onMounted(async () => {
  await customersStore.fetchCustomer(customerId)
})
</script>
<template>
  <Header v-if="!customersStore.loading && customersStore.customer">
    <template #title
      >{{ customersStore.customer.firstName }} {{ customersStore.customer.lastName }}</template
    >
    <template #subtitle
      >View address for {{ customersStore.customer.firstName }}
      {{ customersStore.customer.lastName }}.</template
    >
    <template #actions>
      <AButton type="primary" @click="openCreateForm()"><PlusOutlined />Add Address</AButton>
    </template>
  </Header>

  <Section>
    <ARow :gutter="16">
      <ACol v-if="!customersStore.loading && customersStore.customer" span="8">
        <CustomerDetails :customer="customersStore.customer" @edit="openEditForm" />
      </ACol>
      <ACol v-if="addressFormVisibility" span="16">
        <AddressForm :address="addressesStore.address" @close="closeForm" />
      </ACol>
    </ARow>
  </Section>
</template>

<style scoped></style>
