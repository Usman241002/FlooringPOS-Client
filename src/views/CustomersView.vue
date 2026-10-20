<script setup>
import Header from '@/components/Header.vue'
import { UserAddOutlined } from '@ant-design/icons-vue'
import Section from '@/components/Section.vue'

import CustomerForm from '@/components/forms/CustomerForm.vue'
import CustomerList from '@/components/tables/CustomerList.vue'

import useCustomersStore from '@/stores/customersStore.js'
import useAddressesStore from '@/stores/addressesStore.js'
import { onMounted, ref } from 'vue'
import AddressList from '@/components/tables/AddressList.vue'
import AddressForm from '@/components/forms/AddressForm.vue'

const customersStore = useCustomersStore()
const addressesStore = useAddressesStore()

const customerFormVisibility = ref(false)
const addressFormVisibility = ref(false)

function openCustomerEditForm(customer) {
  customersStore.customer = customer
  customerFormVisibility.value = true
  addressFormVisibility.value = false
}

function openCreateCustomerForm() {
  customersStore.customer = null
  customerFormVisibility.value = true
  addressFormVisibility.value = false
}

function closeCustomerForm() {
  customersStore.customer = null
  customerFormVisibility.value = false
  addressFormVisibility.value = false
}

onMounted(async () => {
  await customersStore.fetchCustomers()
})

function openEditAddressForm(address) {
  addressesStore.address = address
  addressFormVisibility.value = true
}

function openCreateAddressForm() {
  addressFormVisibility.value = true
  addressesStore.address = null
}

function closeAddressForm() {
  addressFormVisibility.value = false
  addressesStore.address = null
}
</script>

<template>
  <Header>
    <template #title>Customers</template>
    <template #subtitle> {{ customersStore.customers.length }} customer records </template>
    <template #actions>
      <AButton type="primary" @click="openCreateCustomerForm">
        <UserAddOutlined />
        New Customer
      </AButton>
    </template>
  </Header>

  <Section>
    <ARow :gutter="[16, 16]" class="customers-layout">
      <ACol :span="12">
        <CustomerList :customers="customersStore.customers" @edit="openCustomerEditForm" />
      </ACol>

      <ACol v-if="customerFormVisibility" :span="12">
        <AFlex class="right" vertical>
          <CustomerForm @close="closeCustomerForm" />

          <AddressList
            v-if="customersStore.customer"
            @click="openCreateAddressForm"
            @edit="openEditAddressForm"
          />
          <AddressForm
            v-if="customersStore.customer && addressFormVisibility"
            :key="addressesStore.address?.id"
            :address="addressesStore.address"
            @close="closeAddressForm"
          />
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
