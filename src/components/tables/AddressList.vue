<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/typography/Body.vue'
import AddressCard from '@/components/cards/AddressCard.vue'
import { EditOutlined } from '@ant-design/icons-vue'

import customersStore from '@/stores/customersStore.js'

const useCustomersStore = customersStore()
</script>

<template>
  <Card class="address-list">
    <template #header>
      <AFlex vertical>
        <Body class="title"> Address List </Body>
        <Body class="subtitle">
          {{ useCustomersStore.customer.addresses.length }} saved address{{
            useCustomersStore.customer.addresses.length > 1 ? 'es' : ''
          }}
        </Body>
      </AFlex>
      <RouterLink :to="'/customers/' + useCustomersStore.customer.id">
        <AButton type="text"><EditOutlined />Edit</AButton>
      </RouterLink>
    </template>
    <AFlex class="addresses-container" vertical>
      <AddressCard
        v-for="address in useCustomersStore.customer.addresses"
        v-bind:key="address.id"
        :address="address"
      />
    </AFlex>
  </Card>
</template>

<style scoped>
.addresses-container {
  gap: var(--space-sm);
}

.address-list {
  min-width: 100%;
  gap: var(--space-sm);
  height: fit-content;
  align-self: flex-start;
}

.title {
  color: var(--text-primary);
  font: var(--body);
  font-weight: bold;
}

.subtitle {
  color: var(--text-secondary);
  font: var(--body);
}
</style>
