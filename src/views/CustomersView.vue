<script setup>
import Header from '@/components/Header.vue'
import { UserAddOutlined } from '@ant-design/icons-vue'
import Section from '@/components/Section.vue'

import CustomerForm from '@/components/CustomerForm.vue'
import CustomerList from '@/components/CustomerList.vue'

import customersStore from '@/stores/customersStore.js'
import { onMounted, ref } from 'vue'
import AddressList from '@/components/AddressList.vue'

const useCustomersStore = customersStore()

const customerFormVisibility = ref(false)

function openEditForm(customer) {
  useCustomersStore.customer = customer
  customerFormVisibility.value = true
}

function openCreateForm() {
  useCustomersStore.customer = null
  customerFormVisibility.value = true
}

function closeForm() {
  useCustomersStore.customer = null
  customerFormVisibility.value = false
}

onMounted(async () => {
  await useCustomersStore.fetchCustomers()
})
</script>

<template>
  <Header>
    <template #title>Customers</template>
    <template #subtitle> {{ useCustomersStore.customers.length }} customer records </template>
    <template #actions>
      <AButton type="primary" @click="openCreateForm">
        <UserAddOutlined />
        New Customer
      </AButton>
    </template>
  </Header>

  <Section>
    <AFlex class="content">
      <CustomerList :customers="useCustomersStore.customers" @edit="openEditForm" />
      <AFlex class="right" vertical>
        <CustomerForm v-if="customerFormVisibility" @close="closeForm" />

        <AddressList v-if="customerFormVisibility && useCustomersStore.customer" />
      </AFlex>
    </AFlex>
  </Section>
</template>

<style scoped>
.content,
.right {
  gap: var(--space-lg);
}
</style>
