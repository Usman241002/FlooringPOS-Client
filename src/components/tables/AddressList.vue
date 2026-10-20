<script setup>
import Card from '@/components/Card.vue'
import Body from '@/components/typography/Body.vue'
import AddressCard from '@/components/cards/AddressCard.vue'
import useCustomersStore from '@/stores/customersStore.js'
import { PlusOutlined } from '@ant-design/icons-vue'

const customersStore = useCustomersStore()

const emit = defineEmits(['click', 'edit'])

function handleClick() {
  emit('click')
}

function handleEdit(address) {
  emit('edit', address)
}
</script>

<template>
  <Card class="address-list">
    <template #header>
      <AFlex vertical>
        <Body class="title"> Address List </Body>
        <Body class="subtitle">
          {{ customersStore.customer.addresses.length }} saved address{{
            customersStore.customer.addresses.length === 1 ? '' : 'es'
          }}
        </Body>
      </AFlex>
      <AButton type="text" @click="handleClick"><PlusOutlined />Add Address</AButton>
    </template>
    <AFlex class="addresses-container" vertical>
      <AddressCard
        v-for="address in customersStore.customer.addresses"
        v-bind:key="address.id"
        :address="address"
        @edit="handleEdit"
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
