<script setup>
import Header from '@/components/Header.vue'
import Section from '@/components/Section.vue'
import CustomerDetails from '@/components/CustomerDetails.vue'

import customersStore from '@/stores/customersStore.js'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'

const useCustomersStore = customersStore()
const route = useRoute()
const customerId = route.params.id

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
    <AFlex>
      <CustomerDetails
        v-if="!useCustomersStore.loading && useCustomersStore.customer"
        :customer="useCustomersStore.customer"
      />
    </AFlex>
  </Section>
</template>
