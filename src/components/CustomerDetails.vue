<script setup>
import Card from '@/components/Card.vue'
import Label from '@/components/typography/Label.vue'
import Body from '@/components/typography/Body.vue'
import AddressCard from '@/components/cards/AddressCard.vue'

const { customer } = defineProps({
  customer: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <Card class="customer-details-container">
    <AFlex class="top">
      <AAvatar class="avatar"> {{ customer.firstName?.[0] }}{{ customer.lastName?.[0] }} </AAvatar>

      <AFlex class="customer-details" vertical>
        <Body class="customer-name"> {{ customer.firstName }} {{ customer.lastName }} </Body>
        <Label>{{ customer.phone }}</Label>
      </AFlex>
    </AFlex>
    <ADivider class="divider" />
    <AFlex class="addresses-section" vertical>
      <AFlex class="address-details" vertical>
        <Body class="address-title">Addresses</Body>
        <Label>
          {{ customer.addresses.length }} saved address{{
            customer.addresses.length !== 1 ? 'es' : ''
          }}
        </Label>
      </AFlex>

      <AFlex class="addresses-container" vertical>
        <AddressCard v-for="address in customer.addresses" :key="address.id" :address="address" />
      </AFlex>
    </AFlex>
  </Card>
</template>

<style scoped>
.addresses-section {
  gap: var(--space-md);
}

.address-title {
  font-weight: bold;
  color: var(--text-primary);
}
.address-details {
  gap: var(--space-xs);
}

.addresses-container {
  gap: var(--space-sm);
}

.divider {
  border: 1px solid var(--border);
  margin: 1rem 0;
}

.customer-details-container {
  display: flex;
  min-width: 30%;
  gap: var(--space-md);
}

.top {
  gap: var(--space-md);
  align-items: center;
}

.avatar {
  color: var(--surface);
  background-color: var(--primary);
  font-weight: bold;
}

.customer-name {
  color: var(--text-primary);
  font-weight: bold;
}
</style>
