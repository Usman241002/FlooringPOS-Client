<script setup>
import Header from '@/components/Header.vue'
import { UserAddOutlined } from '@ant-design/icons-vue'
import Section from '@/components/Section.vue'

import CustomerForm from '@/components/forms/CustomerForm.vue'
import CustomerList from '@/components/tables/CustomerList.vue'

import useCustomersStore from '@/stores/customersStore.js'
import { onMounted, ref } from 'vue'
import AddressList from '@/components/tables/AddressList.vue'

const customersStore = useCustomersStore()

const customerFormVisibility = ref(false)

function openEditForm(customer) {
  customersStore.customer = customer
  customerFormVisibility.value = true
}

function openCreateForm() {
  customersStore.customer = null
  customerFormVisibility.value = true
}

function closeForm() {
  customersStore.customer = null
  customerFormVisibility.value = false
}

onMounted(async () => {
  await customersStore.fetchCustomers()
})
</script>

<template>
  <Header>
    <template #title>Customers</template>
    <template #subtitle> {{ customersStore.customers.length }} customer records </template>
    <template #actions>
      <AButton type="primary" @click="openCreateForm">
        <UserAddOutlined />
        New Customer
      </AButton>
    </template>
  </Header>

  <Section>
    <ARow :gutter="[16, 16]" class="customers-layout">
      <ACol :span="12">
        <CustomerList :customers="customersStore.customers" @edit="openEditForm" />
      </ACol>

      <ACol v-if="customerFormVisibility" :span="12">
        <AFlex class="right" vertical>
          <CustomerForm @close="closeForm" />

          <AddressList v-if="customersStore.customer" />
        </AFlex>
      </ACol>
    </ARow>
  </Section>
</template>

<style scoped>
.customers-layout {
  width: 100%;
}

.right {
  gap: var(--space-lg);
  width: 100%;
  min-width: 0;
}
</style>
