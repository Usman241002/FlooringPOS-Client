<script setup>
import Header from '@/components/Header.vue'
import { UserAddOutlined } from '@ant-design/icons-vue'
import Section from '@/components/Section.vue'

import CustomerForm from '@/components/CustomerForm.vue'
import CustomerList from '@/components/CustomerList.vue'

import customersStore from '@/stores/customersStore.js'
import { onMounted, ref } from 'vue'

const useCustomerStore = customersStore()

const customerFormVisibility = ref(false)
const selectedCustomer = ref(null)

function openEditForm(customer) {
  selectedCustomer.value = customer
  customerFormVisibility.value = true
}

function openCreateForm() {
  selectedCustomer.value = null
  customerFormVisibility.value = true
}

function closeForm() {
  customerFormVisibility.value = false
  selectedCustomer.value = null
}

onMounted(async () => {
  await useCustomerStore.fetchCustomers()
})
</script>

<template>
  <Header>
    <template #title>Customers</template>
    <template #subtitle> {{ useCustomerStore.customers.length }} customer records </template>
    <template #actions>
      <AButton type="primary" @click="openCreateForm">
        <UserAddOutlined />
        New Customer
      </AButton>
    </template>
  </Header>

  <Section>
    <AFlex class="content">
      <CustomerList
        :customers="useCustomerStore.customers"
        :selectedCustomer="selectedCustomer"
        @edit="openEditForm"
      />
      <CustomerForm v-if="customerFormVisibility" :customer="selectedCustomer" @close="closeForm" />
    </AFlex>
  </Section>
</template>

<style scoped>
.content {
  gap: var(--space-lg);
}
</style>
