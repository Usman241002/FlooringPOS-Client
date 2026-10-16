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
    <ARow :gutter="[16, 16]" class="customer-details-container">
      <ACol span="8">
        <CustomerDetails
          v-if="!useCustomersStore.loading && useCustomersStore.customer"
          :customer="useCustomersStore.customer"
        />
      </ACol>
    </ARow>
  </Section>
</template>

<style scoped>
.customer-details-container {
  gap: var(--space-lg);
}
</style>
